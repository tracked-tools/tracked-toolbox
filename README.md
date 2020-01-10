tracked-toolbox
==============================================================================

Helpful utilities for writing applications with Ember Octane's autotracking!


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.8 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install tracked-toolbox
```


Usage
------------------------------------------------------------------------------

### `@localCopy`

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

You can also provide a getter function instead of a path to the decorator, which
receives the object, key, and last as arguments:

```js
export default class CustomInput extends Component {
  @localCopy((component) => component.args.text) text;
}
```

This allows you to get a remote value using more complex logic. You can also use
this to do more complex logic for checking the value for changes, and for
deriving the local value:

```js
export default class MyComponent extends Component {
  @localCopy((component, key, last) => {
    let arr = component.args.arr;

    let changed = arr.some((value, index) => value !== last[index]);

    return changed ? arr.slice() : last;
  }) arr;
}
```

In this example, it allows you to have a local copy of an array. Mutations to
the local array will not affect the upstream array, but changes to the upstream
array will update the local copy.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
