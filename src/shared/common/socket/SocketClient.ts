import { toString } from 'lodash-es';

import { READY_STATE, HEART_BEAT_MESSAGE } from './constants';
import { jsonDecode } from '@/helpers';
import { ConnectionOptions } from './interface';

const HEART_BEAT_TIME = 10000;

export class SocketClient {
  client: WebSocket | null = null;
  missedHeartbeats = 0;
  heartBeatInterval: ReturnType<typeof setInterval> | undefined = undefined;
  pollRetryConnection: ReturnType<typeof setInterval> | undefined = undefined;
  presentSubs: string[] = [];
  failedSubQueue: { name: string; value: any }[] = [];
  opts: ConnectionOptions = {
    url: '',
    wsKey: '',
    reconnection: true,
    reconnectionAttempts: 5,
    maxMissedHeartbeats: 3,
    reconnectionDelay: 1000,
    onMessageCallback: null,
  };

  constructor(opts: Partial<ConnectionOptions>) {
    this.opts = { ...this.opts, ...opts };
  }

  /**
   * Connect to websocket.
   *
   * @return client
   */
  connect(configs: Partial<ConnectionOptions> = {}) {
    if (configs) {
      this.opts = { ...this.opts, ...configs };
    }

    if (!this.client || this.client.readyState === READY_STATE.CLOSED) {
      this.client = new WebSocket(this.opts.url);
      this.client.onopen = () => {
        this.processQueue();

        this.onPing();
      };

      this.client.onmessage = (e) => {
        // Ping message
        if (toString(e.data) === HEART_BEAT_MESSAGE) {
          this.missedHeartbeats = 0;
          return;
        }

        if (this.opts.onMessageCallback) {
          this.opts.onMessageCallback(e);
        }
      };

      if (this.opts.reconnection) {
        this.client.addEventListener('close', this.reconnect.bind(this));
      }
    }
    return this.client;
  }

  isAvailableClient() {
    return !!this.client;
  }

  /**
   *  Reconnect websocket.
   *
   * @return void
   */
  reconnect() {
    this.pollRetryConnection = setInterval(() => {
      const client = this.connect();
      client.onopen = () => {
        this.processQueue();

        this.onPing();
        clearInterval(this.pollRetryConnection);

        // Subscribe all event before lost connect
        const newSubList = [...this.presentSubs];
        this.presentSubs = [];
        newSubList.forEach((item) => {
          this.emitSub(item);
        });
      };
    }, this.opts.reconnectionDelay);
  }

  onPing() {
    if (this.heartBeatInterval) {
      clearInterval(this.heartBeatInterval);
    }

    this.heartBeatInterval = undefined;

    this.client?.send(HEART_BEAT_MESSAGE);
    this.missedHeartbeats = 0;
    this.heartBeatInterval = setInterval(() => {
      this.missedHeartbeats++;
      if (this.missedHeartbeats >= this.opts.maxMissedHeartbeats) {
        console.log('Too many missed heartbeats.');
        clearInterval(this.heartBeatInterval);
        this.heartBeatInterval = undefined;
        this.client?.close();
        return;
      }

      this.client?.send(HEART_BEAT_MESSAGE);
    }, HEART_BEAT_TIME);
  }

  processQueue() {
    this.failedSubQueue.forEach((queueItem) => {
      if (queueItem.name === 'sub') {
        this.emitSub(queueItem.value);
      }

      if (queueItem.name === 'unsub') {
        this.emitUnsub(queueItem.value);
      }
    });
    this.failedSubQueue = [];
  }

  /**
   *  Send subscribe to an event.
   *
   * @param type - event type
   * @return void
   */
  emitSub(type) {
    if (this.client?.readyState !== READY_STATE.OPEN) {
      this.failedSubQueue.push({
        name: 'sub',
        value: type,
      });
      return;
    }

    if (this.presentSubs.includes(type)) {
      this.client.send(`${this.opts.wsKey}|sub|${type}`);
      return;
    }

    if (this.client?.readyState === READY_STATE.OPEN) {
      this.client.send(`${this.opts.wsKey}|sub|${type}`);

      // Add sub
      this.presentSubs.push(type);
    }
  }

  /**
   *  Send unsubscribe to an event.
   *
   * @param type - event type
   * @return void
   */
  emitUnsub(type) {
    if (this.client?.readyState !== READY_STATE.OPEN) {
      this.failedSubQueue.push({
        name: 'unsub',
        value: type,
      });
      return;
    }

    if (this.client?.readyState === READY_STATE.OPEN) {
      const subIndex = this.presentSubs.indexOf(type);

      // Remove sub list and send unsub event
      if (subIndex > -1) {
        this.presentSubs.splice(subIndex, 1);
        this.client.send(`${this.opts.wsKey}|unsub|${type}`);
      }
    }
  }

  on(eventName, fn) {
    this.client?.addEventListener(eventName, fn);
  }

  off(eventName, fn) {
    this.client?.removeEventListener(eventName, fn);
  }

  /**
   *  Close connection.
   *
   * @return void
   */
  close() {
    this.presentSubs = [];
    this.failedSubQueue = [];
    clearInterval(this.heartBeatInterval);
    clearInterval(this.pollRetryConnection);

    if (this.opts.reconnection) {
      this.client?.removeEventListener('close', this.reconnect);
    }

    if (this.client) {
      this.client.close();
    }
  }

  filterMessage(messageEvent, eventNames) {
    const data = messageEvent.data;

    if (toString(data) === HEART_BEAT_MESSAGE) {
      return;
    }

    const message = jsonDecode(data) || null;

    if (!data) {
      return;
    }

    if (!eventNames) {
      return message;
    }

    if (eventNames.includes(message.event)) {
      return message;
    }
  }
}
