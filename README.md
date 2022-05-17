# tracked-toolbox

Helpful utilities for writing applications with Ember Octane's revision
tracking!


## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v14 or above


## Installation

```
ember install tracked-toolbox
```

## Usage

### Minimizing updates

#### `@cached`

Adds weak-caching to a getter, so that it tracks its execution, and only updates
when tracked state that the getter used changes.

```js
import { tracked } from '@glimmer/tracking';
import { cached } from 'tracked-toolbox';

class Person {
  @tracked firstName = 'Tom';
  @tracked lastName = 'Dale';

  @cached
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

##### When to use it

Sometimes, a given getter has to run an expensive computation, like a complex
math calculation or a data fetch. In those cases, you may want to add a layer of
caching -- but caching by *value* can also be very costly, especially if your
cache key is an object, not just a simple value. `@cached` allows you to have a
cache key that is extremely cheap: simply whether any of the tracked properties
used by the getter have changed.

As with caching in general, you should still only apply this when you *know* you
need it (measure the performance first!). While it is as cheap a kind of caching
as possible, it is still not free, requiring both checking whether the tracked
properties have updated and the memory cost of their previous values: low but
definitely not zero!

#### `@dedupeTracked`

Turns a field in a deduped `@tracked` property. If you set the field to the same
value as it is currently, it will not notify a property change (thus, deduping
property changes). Otherwise, it is exactly the same as `@tracked`.

```js
import { dedupeTracked } from 'tracked-toolbox';

class Counter {
  @dedupeTracked count = 0;
}
```

##### When to use it

`@tracked` updates *any* time you set a value, even if it's the same value. So,
for example, if a tracked property depends on user input, if they set it to the
same value, it would trigger updates. Most of the time, this doesn't really
matter, but sometimes updates depending on that can be very expensive. Using
`@dedupeTracked` solves this problem, while adding the cost of a small cache.

As with the other caching utilities, don't reach for this *every* time: caching
is sometimes more expensive than just recomputing values!

### Forking tracked state

In general, you should prefer to derive component state from the arguments to
the component, rather than creating new tracked state. However, there are times
when a component actually does logically need to generate *new* tracked state
which still needs to update when its arguments change, but which is still local
to the component.

#### `@localCopy`

Creates a local copy of a remote value. The local copy can be updated locally,
but will also update if the remote value ever changes:

```js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { localCopy } from 'tracked-toolbox';

export default class CustomInput extends Component {
  // This defaults to the value of this.args.text
  @localCopy('args.text') text;

  @action
  updateText({ target }) {
    // this updates the value of `text`, but does _not_ update
    // the value of `this.args.text`
    this.text = String(target.value);

    if (this.args.onInput) {
      // this action could then update the upstream value
      this.args.onInput(this.text);
    }
  }
}
```

In this example, if `args.text` were to ever change externally, then the local
`text` property would also update. The local copy is not a clone of the value
passed in, it is the actual value itself, so values like arrays and objects
will still be affected upstream if their values are changed.

An initializer can be provided as the second parameter to the decorator. This
will be used if the remote value is `undefined`:

```js
export default class CustomInput extends Component {
  @localCopy('args.text', 'placeholder') text;
}
```

If the initializer is a function, it will be called and its return value will be
used as the default value.

#### `@trackedReset`

Similar to `@localCopy`, but instead of copying the remote value, it will reset
to the class field's default value when another value changes.

```js
export default class CustomSelect extends Component {
  @trackedReset('args.selectableValues') selected = null;
}
```

You can also provide a configuration object with an `update` function, which can
be used to provide a different value than the original on updates.

```js
@trackedReset({
  memo: 'args.items.length',
  update(component, key, last) {
    return Math.min(last, this.args.items.length);
  }
})
selectedIndex = 0;
```

`memo` must either be a path or a function that returns the value to memoize
against.

##### When to use it

`@trackedReset` is primarily useful in contexts like a component which manages
the state of an overall page, and therefore which needs to update when the page
changes. For example, you might have a component which represents a form for a
given profile, at `/profile/:id`. When navigating to edit a different profile,
if you do not reset the internal state of the form component, it could end up
preserving the previous profile's form data, since Ember will reuse the
component instance and simply update its arguments.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
