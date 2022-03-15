import { module, test } from 'qunit';
import { dedupeTracked, cached } from 'tracked-toolbox';

module('Unit | Utils | @dedupeTracked', () => {
  test('it works', function (assert) {
    let count = 0;

    class Person {
      @dedupeTracked _name = 'Tomster';

      @cached
      get name() {
        count++;

        return this._name;
      }
    }

    const person = new Person();

    assert.strictEqual(person.name, 'Tomster', 'name is correct');
    assert.strictEqual(count, 1, 'getter is called the first time');

    person._name = 'Tomster';

    assert.strictEqual(person.name, 'Tomster', 'name is correct');
    assert.strictEqual(
      count,
      1,
      'getter is not called again after updating to the same value'
    );

    person._name = 'Zoey';

    assert.strictEqual(person.name, 'Zoey', 'name is correct');
    assert.strictEqual(
      count,
      2,
      'getter is called again after updating to a different value'
    );
  });

  test('it works without an initializer', function (assert) {
    let count = 0;

    class Person {
      @dedupeTracked _name;

      @cached
      get name() {
        count++;

        return this._name;
      }
    }

    const person = new Person();

    assert.strictEqual(
      person.name,
      undefined,
      'name should start as undefined'
    );
    assert.strictEqual(count, 1, 'getter is called the first time');

    person._name = undefined;

    assert.strictEqual(person.name, undefined, 'name is still undefined');
    assert.strictEqual(
      count,
      1,
      'getter is not called again after updating to the same value'
    );

    person._name = 'Zoey';

    assert.strictEqual(person.name, 'Zoey', 'name is correct');
    assert.strictEqual(
      count,
      2,
      'getter is called again after updating to a different value'
    );
  });

  test('it requires no parameters or exactly one comparator', function (assert) {
    assert.throws(() => {
      // eslint-disable-next-line no-unused-vars
      class Person {
        @dedupeTracked() _name;
      }
    });

    assert.throws(() => {
      // eslint-disable-next-line no-unused-vars
      class Person {
        @dedupeTracked(1) _name;
      }
    });

    assert.throws(() => {
      // eslint-disable-next-line no-unused-vars
      class Person {
        @dedupeTracked(() => true, 1) _name;
      }
    });
  });

  test('it works when passed a custom comparator', function (assert) {
    let count = 0;

    class Person {
      @dedupeTracked((a, b) => a.length === b.length) _name = 'foo';

      @cached
      get name() {
        count++;

        return this._name;
      }
    }

    const person = new Person();

    assert.strictEqual(person.name, 'foo', 'name is correct');
    assert.strictEqual(count, 1, 'getter is called the first time');

    person._name = 'bar';

    assert.strictEqual(person.name, 'foo', 'name is correct');
    assert.strictEqual(
      count,
      1,
      'getter is not called again after updating to the "same" value'
    );

    person._name = 'Zoey';

    assert.strictEqual(person.name, 'Zoey', 'name is correct');
    assert.strictEqual(
      count,
      2,
      'getter is called again after updating to a different value'
    );
  });
});
