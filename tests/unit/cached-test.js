import { module, test } from 'qunit';
import { tracked } from '@glimmer/tracking';
import { cached } from 'tracked-toolbox';

module('Unit | Utils | @localCopy', () => {
  test('it works', (assert) => {
    class Foo {
      get counter() {
        if (!this.initial) {
          this.initial = 0;
        }
        this.initial++;
        return this.initial;
      }

      @tracked count = 0;

      @cached
      get value() {
        return this.count + this.counter;
      }
    }

    const item = new Foo();
    assert.deepEqual(item.value, 1, 'memoized result returned correctly1');
    assert.deepEqual(item.value, 1, 'memoized result returned correctly2');
    item.count++;
    assert.deepEqual(item.value, 3, 'memoized result returned correctly3');
  });
});
