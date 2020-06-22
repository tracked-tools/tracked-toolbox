import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { TrackedWeakMap } from 'tracked-maps-and-sets';
import { createCache, getValue } from '@glimmer/tracking/primitives/cache';

export function localCopy(pathOrGetter, initializer) {
  assert(
    `@localCopy() must be given a path or getter function as its first argument, received \`${String(
      pathOrGetter
    )}\``,
    typeof pathOrGetter === 'string' || typeof pathOrGetter === 'function'
  );

  let previousValues = new WeakMap();
  let localValues = new TrackedWeakMap();

  return (_prototype, key) => {
    let getter =
      typeof pathOrGetter === 'function'
        ? (obj, last) => pathOrGetter(obj, key, last)
        : obj => get(obj, pathOrGetter);

    return {
      get() {
        let previousValue = previousValues.get(this);
        let incomingValue = getter(this, previousValue);

        if (incomingValue !== previousValue) {
          // If the incoming value is not the same as the previous incoming value,
          // update the local value to match the new incoming value, and update
          // the previous incoming value.
          localValues.set(this, incomingValue);
          previousValues.set(this, incomingValue);
        } else if (initializer !== undefined && !localValues.has(this)) {
          // If localValues doesn't have a value yet, it means that this is the
          // initial run. It also means that incomingValue === previousValue === undefined
          // since there is no previousValue yet. So, we initialize the value using
          // initializer, if it exists.
          localValues.set(
            this,
            typeof initializer === 'function' ? initializer() : initializer
          );
        }

        return localValues.get(this);
      },

      set(value) {
        localValues.set(this, value);
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
