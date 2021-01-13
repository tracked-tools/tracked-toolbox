// Fully and robustly type-safe types for Ember's `get` and `set` helpers!

import { expectTypeOf } from "expect-type";

/** Given `Join<"a", "b">`, produces the type `"a.b"` */
type Join<K extends string, L extends string> = `${K}.${L}`;

type Impossible = never;

/**
 * Given an object `T`, determine all the allowed paths within it, including
 * top-level keys and nested keys.
 *
 * For example, given this object:
 *
 * ```ts
 * interface Nested {
 *   top: {
 *     middle: {
 *       bottom: string;
 *     }
 *   }
 * }
 * ```
 *
 * Then `AllKeys<Nested>` will be `"top" | "top.middle" | "top.middle.bottom"`.
 *
 * **NOTE:** for arbitrarily-complex objects, this may be *very* expensive. It
 * has to recurse every possible path on the key to build up the final list of
 * paths, which may itself produce a very large union which will then be input
 * to *other* type-level functions.
 */
// prettier-ignore
type AnyPathIn<
  T extends unknown,
  K extends keyof Unproxied<T> = keyof Unproxied<T>
> = K extends string
  ? | K
    | (Unproxied<Unproxied<T>[K]> extends infer U | null | undefined
      ? Join<K, AnyPathIn<U>>
      : Join<K, AnyPathIn<Unproxied<Unproxied<T>[K]>>>)
  : never;

/**
 * Given a type `T` and a `Path` which is a string, look up the nested value for
 * the path.
 *
 * For example, given an object like this:
 *
 * ```ts
 * interface Nested {
 *   top: {
 *     middle: {
 *       bottom: string;
 *     }
 *   }
 * }
 * ```
 *
 * we can get the type of `bottom`:
 *
 * ```ts
 * type Bottom = PropType<Nested, 'top.middle.bottom'>;
 * ```
 *
 * Here `Bottom` will be a `string`.
 */
// prettier-ignore
type Inner<T, Path extends string> =
  string extends Path ? unknown :
  Path extends keyof Unproxied<T> ? Unproxied<Unproxied<T>[Path]> :
  Path extends `${infer K}.${infer R}` ?
    K extends keyof Unproxied<T>
    ? PropType<Unproxied<Unproxied<T>[K]>, R>
    : unknown
  : unknown;

// prettier-ignore
type PropType<T, Path extends string> =
  T extends ObjectProxy<any>
    ? Unproxied<T> extends null | undefined
      ? Inner<NonNullable<Unproxied<T>>, Path> | undefined
      : Inner<Unproxied<T>, Path>
    : T extends null | undefined
      ? Inner<NonNullable<T>, Path> | undefined
      : Inner<T, Path>
  ;

type Test = {
  a?: string;
  z: string;
  b: ObjectProxy<string>;
  c: {
    a: string;
    b?: ObjectProxy<string>;
  };
  d: {
    a: {
      a: string;
    };
    b?: ObjectProxy<{
      a: string;
    }>;
  };
};

type ResolvedPath = AnyPathIn<Test>;
type In<A, Cond> = A extends Cond ? true : false;
type A = In<"a.length", ResolvedPath>;
type B = In<"z.length", ResolvedPath>;
type ResolvedType = PropType<Test, "a.length">;

// We can now define type-safe versions of Ember's `get` and `set` helpers!
// These have the *exact* same semantics as those do, but are type-safe and will
// provide completions.
declare function get<T, K extends AnyPathIn<T>>(
  obj: T,
  path: K
): PropType<Unproxied<T>, K>;

declare function getProperties<T, K extends AnyPathIn<Unproxied<T>>>(
  obj: T,
  paths: K[]
): PropsIn<Unproxied<T>, K>;
declare function getProperties<T, K extends AnyPathIn<Unproxied<T>>>(
  obj: T,
  ...paths: K[]
): PropsIn<Unproxied<T>, K>;

declare function set<T, P extends AnyPathIn<T>>(
  obj: T,
  path: P,
  value: PropType<Unproxied<T>, P>
): PropType<Unproxied<T>, P>;

declare function setProperties<
  T,
  Keys extends AnyPathIn<T>,
  Props extends Partial<{ [K in Keys]: PropType<T, K> }>
>(obj: T, properties: Props): Props;

// Given deeply nested objects, we can get autocompletion help *and* type safety
// against typos etc.:
declare let deeplyNested: { top: { middle: { bottom: string } } };
let doubleLength = get(deeplyNested, "top.middle.bottom.length") * 2;
get(deeplyNested, "top.middle.bottom.length") * 2;
set(deeplyNested, "top.middle", { bottom: "cool" });
set(deeplyNested, "top", { middle: { bottom: "wow" } });
set(deeplyNested, "top.middle.bottom", "amaze");
get(deeplyNested, "nonsense");
get(deeplyNested, "nonsense.at.any.level");
get(deeplyNested, "top.middle.even.if.starts.legit");

declare let nestedAndMultiple: {
  topA: { middleA: string };
  topB: number;
  topC: string;
};

let { topA, topB } = getProperties(nestedAndMultiple, "topA", "topB");
let total = topA.middleA.length + topB;

setProperties(nestedAndMultiple, { topB: 12, topC: "hello" });

// The real `ObjectProxy` in Ember is a bit more complicated than this, but this
// will do to get the idea across. It has `get` and `set` methods on it which
// allow you to deeply get or set items which may or may not have been proxied
// (just as the real `Ember.get` and `Ember.set` methods do, and using the same
// means as the `get` above does).
interface ObjectProxy<T> {
  get<K extends AnyPathIn<T>>(key: K): PropType<T, K>;
  set<K extends AnyPathIn<T>>(key: K, value: PropType<T, K>): void;
}

// Utility type that gives us the result of whatever is wrapped in an
// `ObjectProxy` as defined above.
type Unproxied<T> = T extends ObjectProxy<infer U> ? U : T;

// If we actually *have* an instance of an `ObjectProxy`...
declare let someProxy: ObjectProxy<{ someProp: string }>;

// ...we cannot directly access the fields on it.
someProxy.someProp; // 😭

// However, we *can* use `get` and then access the result! This works both for
// the `get` on the object...
someProxy.get("someProp").length; // 🎉

// ...and the standalone `get`:
get(someProxy, "someProp").length; // 🎉

// This can go as deeply as we need it to!
declare let nestedProxies: ObjectProxy<{
  top: ObjectProxy<{
    middle: ObjectProxy<{
      bottom: ObjectProxy<string>;
    }>;
  }>;
}>;
nestedProxies.get("top.middle.bottom").length; // 🎉
get(nestedProxies, "top.middle.bottom").length; // 🎉

type PropsIn<T, K extends AnyPathIn<T>> = Pick<{ [P in K]: PropType<T, P> }, K>;

// This is a "pretend" version of the `@ember-data/model` class, with everything
// stripped away except that it has an `id` on it.
class EmberDataModel {
  declare id: string;
}

// Given an Ember Data model subclass, we can treat `ObjectProxy` as a stand-in
// for things like async relationships (which in fact use `ObjectProxy` under
// the hood to build out `PromiseObject` and `PromiseArray`.)
class SomeModel extends EmberDataModel {
  // imagine these have `@attr('string)` and `@attr('number')` on them
  declare aLocalAttr: string;
  declare anotherLocalAttr: number;

  declare aHasMany: ObjectProxy<
    Array<
      ObjectProxy<{
        baz: ObjectProxy<string>;
      }>
    >
  >;
  declare aBelongsTo: ObjectProxy<AnotherModel>;

  get derived(): number {
    this.get("aLocalAttr");

    return aLocalAttr?.length ?? 0;
  }
}

declare class AnotherModel extends EmberDataModel {
  itsOwnAttr?: number;
  itsOwnRelationship: ObjectProxy<YetAnotherModel>;
}

declare class YetAnotherModel extends EmberDataModel {
  withAnotherAttr?: string;
}

// Now, given these "relationships" on a model, we can see all of the patterns
// working we would expect from Ember. Again: play around with this and see what
// kinds of errors you get, how autocompletion works, etc.!
declare let someModel: SomeModel;
get(someModel, "aHasMany").map((item) => get(item, "baz").length);

let l = get(someModel, "aLocalAttr.length");
let x = get(someModel, "aHasMany").map((item) => get(item, "baz").length * 2);
let y = get(someModel, "aBelongsTo.itsOwnRelationship.withAnotherAttr.length");

let { aBelongsTo, aLocalAttr } = getProperties(
  someModel,
  "aBelongsTo",
  "aLocalAttr"
);

// SUMMARY: while we hopefully won't need these *long*-term, and while they will
// likely be opt-in when we release them (since they do have some costs and
// overhead), these advanced types close the last remaining gap
