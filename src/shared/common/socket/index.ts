// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { eventBus } from '@/shared/hooks';
import { SocketClient } from './SocketClient';

const socketClient = new SocketClient({
  onMessageCallback: (e) => {
    eventBus.$emit('WEBSOCKET__message', e);
  },
});
socketClient.sendSubEvent = socketClient.emitSub;
socketClient.sendUnSubEvent = socketClient.emitUnsub;

export { socketClient };
