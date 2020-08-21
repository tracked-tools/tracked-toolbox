import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { createCache, getValue } from '@glimmer/tracking/primitives/cache';

class Meta {
  prevRemote;
  peek;
  @tracked value;
}

function getOrCreateMeta(instance, metas, initializer) {
  let meta = metas.get(instance);

  if (meta === undefined) {
    meta = new Meta();
    metas.set(instance, meta);

    meta.value = meta.peek =
      typeof initializer === 'function' ? initializer.call(instance) : initializer;
  }

  return meta;
}

export function localCopy(memo, initializer) {
  assert(
    `@localCopy() must be given a memo path or memo function as its first argument, received \`${String(
      memo
    )}\``,
    typeof memo === 'string' || typeof memo === 'function'
  );

  let metas = new WeakMap();

  return (_prototype, key) => {
    let memoFn =
      typeof memo === 'function'
        ? (obj, last) => memo.call(obj, obj, key, last)
        : (obj) => get(obj, memo);

    return {
      get() {
        let meta = getOrCreateMeta(this, metas, initializer);
        let { prevRemote } = meta;

        let incomingValue = memoFn(this, prevRemote);

        if (prevRemote !== incomingValue) {
          // If the incoming value is not the same as the previous incoming value,
          // update the local value to match the new incoming value, and update
          // the previous incoming value.
          meta.value = meta.prevRemote = incomingValue;
        }

        return meta.value;
      },

      set(value) {
        getOrCreateMeta(this, metas, initializer).value = value;
      },
    };
  };
}

export function trackedReset(memoOrConfig) {
  assert(
    `@trackedReset() must be given a memo path, a memo function, or config object with a memo path or function as its first argument, received \`${String(
      memoOrConfig
    )}\``,
    typeof memoOrConfig === 'string' ||
      typeof memoOrConfig === 'function' ||
      (typeof memoOrConfig === 'object' &&
        memoOrConfig !== null &&
        memoOrConfig.memo !== undefined)
  );

  let metas = new WeakMap();

  return (_prototype, key, desc) => {
    let memo, update;
    let initializer = desc.initializer ?? (() => undefined);

    if (typeof memoOrConfig === 'object') {
      memo = memoOrConfig.memo;
      update = memoOrConfig.update ?? initializer;
    } else {
      memo = memoOrConfig;
      update = initializer;
    }

    let memoFn =
      typeof memo === 'function'
        ? (obj, last) => memo.call(obj, obj, key, last)
        : (obj) => get(obj, memo);

    return {
      get() {
        let meta = getOrCreateMeta(this, metas, initializer);
        let { prevRemote } = meta;

        let incomingValue = memoFn(this, prevRemote);

        if (incomingValue !== prevRemote) {
          meta.prevRemote = incomingValue;
          meta.value = meta.peek = update.call(this, this, key, meta.peek);
        }

        return meta.value;
      },

      set(value) {
        getOrCreateMeta(this, metas, initializer).value = value;
      },
    };
  };
}

export function cached(target, key, value) {
  assert('@cached can only be used on getters', value && value.get);

  let { get, set } = value;

  let caches = new WeakMap();

  return {
    get() {
      let cache = caches.get(this);

      if (cache === undefined) {
        cache = createCache(get.bind(this));
        caches.set(this, cache);
      }

      return getValue(cache);
    },

    set,
  };
}

export function dedupeTracked(target, key, desc) {
  let { initializer } = desc;
  let { get, set } = tracked(target, key, desc);

  let values = new WeakMap();

  return {
    get() {
      if (!values.has(this)) {
        let value = initializer?.call(this);
        values.set(this, value);
        set.call(this, value);
      }

      return get.call(this);
    },

    set(value) {
      if (!values.has(this) || value !== values.get(this)) {
        values.set(this, value);
        set.call(this, value);
      }
    },
  };
}
