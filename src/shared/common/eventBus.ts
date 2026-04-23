import emitter from 'tiny-emitter/instance';

/**
 * Global event bus backed by tiny-emitter.
 *
 * Usage:
 *   import eventBus from '@/shared/common/eventBus';
 *   eventBus.$on('my-event', handler);
 *   eventBus.$emit('my-event', payload);
 *   eventBus.$off('my-event', handler);
 */
const eventBus = {
  $on: (...args: Parameters<typeof emitter.on>) => emitter.on(...args),
  $once: (...args: Parameters<typeof emitter.once>) => emitter.once(...args),
  $off: (...args: Parameters<typeof emitter.off>) => {
    try {
      return emitter.off(...args);
    } catch (e) {
      console.warn('[eventBus] Failed to remove listener:', e);
    }
  },
  $emit: (...args: Parameters<typeof emitter.emit>) => emitter.emit(...args),
};

export default eventBus;
