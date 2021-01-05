import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { dedupeTracked, cached } from 'tracked-toolbox';

module('Unit | Utils | @dedupeTracked', () => {
  test('it works', (assert) => {
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

    assert.equal(person.name, 'Tomster', 'name is correct');
    assert.equal(count, 1, 'getter is called the first time');

    person._name = 'Tomster';

    assert.equal(person.name, 'Tomster', 'name is correct');
    assert.equal(count, 1, 'getter is not called again after updating to the same value');

    person._name = 'Zoey';

    assert.equal(person.name, 'Zoey', 'name is correct');
    assert.equal(count, 2, 'getter is called again after updating to a different value');
  });

  test('it works without an initializer', (assert) => {
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

    assert.equal(person.name, undefined, 'name should start as undefined');
    assert.equal(count, 1, 'getter is called the first time');

    person._name = undefined;

    assert.equal(person.name, undefined, 'name is still undefined');
    assert.equal(count, 1, 'getter is not called again after updating to the same value');

    person._name = 'Zoey';

    assert.equal(person.name, 'Zoey', 'name is correct');
    assert.equal(count, 2, 'getter is called again after updating to a different value');
  });

  test('it works with an EmberObject', (assert) => {
    let count = 0;

    class Person extends EmberObject {
      @dedupeTracked _name;

      @cached
      get name() {
        count++;

        return this._name;
      }
    }

    const person = Person.create({ _name: 'Zoey' });

    assert.equal(person._name, 'Zoey', 'name should be initialized correctly');
    assert.equal(person.name, 'Zoey', 'name should be initialized correctly');
    assert.equal(count, 1, 'getter is called the first time');

    person._name = 'Zoey';

    assert.equal(person.name, 'Zoey', 'name is unchanged');
    assert.equal(count, 1, 'getter is not called again after updating to the same value');

    person._name = 'Tomster';

    assert.equal(person.name, 'Tomster', 'name is correct');
    assert.equal(count, 2, 'getter is called again after updating to a different value');
  });
});
