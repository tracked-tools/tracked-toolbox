import Component from "@glimmer/component";

type Join<K extends string, L extends string> = `${K}.${L}`;

type AllNestedPropsOf<
  T extends unknown,
  K extends keyof T = keyof T
> = K extends string
  ? T[K] extends Record<string, unknown>
    ? K | Join<K, AllNestedPropsOf<T[K]>>
    : K
  : never;

type UsefulPropsOf<C extends Component> = Exclude<
  AllNestedPropsOf<C>,
  Exclude<AllNestedPropsOf<Component>, "args">
>;

/**
 * Turns a field in a deduped `@tracked` property. If you set the field to the
 * same value as it is currently, it will not notify a property change (thus,
 * deduping property changes). Otherwise, it is exactly the same as `@tracked`.
 */
export const dedupeTracked: PropertyDecorator;

/**
 * Creates a local copy of a remote value. The local copy can be updated
 * locally, but will also update if the remote value ever changes.
 *
 * @param memo The path to a "remote" property to track.
 * @param initializer This will be used if the remote value is `undefined`. If
 *   the initializer is a function, it will be called and its return value will
 *   be used as the default value.
 */
export function localCopy<C extends Component = Component, T = unknown>(
  memo: UsefulPropsOf<C>,
  initializer?: T | (() => T)
): PropertyDecorator;
/**
 * Creates a local copy of a remote value. The local copy can be updated
 * locally, but will also update if the remote value ever changes.
 *
 * @param getterFunction You can provide a getter function instead of a path to
 *   the decorator, which receives the object, key, and last as arguments. This
 *   allows you to get a remote value using more complex logic. You can also use
 *   this to do more complex logic for checking the value for changes, and for
 *   deriving the local value
 */
export function localCopy<C extends Component = Component, T = unknown>(
  getterFunction: (component: C, key: UsefulPropsOf<C>, last: T) => T
): PropertyDecorator;

interface TrackedResetConfig<C extends Component = Component, T = unknown> {
  /**
   * A path to a "remote" property to use to indicate when to reset to the
   * default value, or a function which returns the default value.
   */
  memo: UsefulPropsOf<C> | (() => T);

  /**
   * A function which can be used to provide a different value than the original
   * on updates.
   */
  update: (component: C, key: string, last: T) => T;
}

/**
 * Similar to @localCopy, but instead of copying the remote value, it will reset
 * to the class field's default value when another value changes.
 *
 * @param memo The path to a "remote" property to use to indicate when to reset
 *   to the default value.
 */
export function trackedReset<C extends Component>(
  memo: UsefulPropsOf<C>
): PropertyDecorator;

/**
 * Similar to @localCopy, but instead of copying the remote value, it will reset
 * to the class field's default value when another value changes.

 * @param config a configuration object with an update function, which can be
 *   used to provide a different value than the original on updates
 */
export function trackedReset<C extends Component = Component, T = unknown>(
  config: TrackedResetConfig<C, T>
): PropertyDecorator;
