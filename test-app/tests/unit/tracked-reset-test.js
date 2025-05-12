import { module, test } from 'qunit';
import { trackedReset } from 'tracked-toolbox';

module('Unit | Utils | @trackedReset', () => {
  test('it works', function (assert) {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @trackedReset('remote.value') someOtherValue = 123;
    }

    let local = new Local();

    assert.strictEqual(
      local.someOtherValue,
      123,
      'defaults to the remote value',
    );

    local.someOtherValue = 456;

    assert.strictEqual(
      local.someOtherValue,
      456,
      'local value updates correctly',
    );
    assert.strictEqual(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.someOtherValue,
      123,
      'local value reset to original value',
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('it works with a getter', function (assert) {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      @trackedReset(() => remote.value) someOtherValue = 123;
    }

    let local = new Local();

    assert.strictEqual(
      local.someOtherValue,
      123,
      'defaults to the remote value',
    );

    local.someOtherValue = 456;

    assert.strictEqual(
      local.someOtherValue,
      456,
      'local value updates correctly',
    );
    assert.strictEqual(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.someOtherValue,
      123,
      'local value updates to original value',
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('initializer is rerun when reset occurs', function (assert) {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @trackedReset('remote.value') someOtherValue = [];
    }

    let local = new Local();

    assert.deepEqual(local.someOtherValue, [], 'defaults to the remote value');

    let originalValue = local.someOtherValue;

    local.someOtherValue = 456;

    assert.strictEqual(
      local.someOtherValue,
      456,
      'local value updates correctly',
    );
    assert.strictEqual(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.deepEqual(
      local.someOtherValue,
      [],
      'local value reset to original value',
    );
    assert.notEqual(
      local.someOtherValue,
      originalValue,
      'initializer was rerun',
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('initializer can reference this', function (assert) {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      default = 123;

      @trackedReset('remote.value') someOtherValue = this.default;
    }

    let local = new Local();

    assert.strictEqual(
      local.someOtherValue,
      123,
      'defaults to the remote value',
    );

    local.someOtherValue = 456;

    assert.strictEqual(
      local.someOtherValue,
      456,
      'local value updates correctly',
    );
    assert.strictEqual(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.someOtherValue,
      123,
      'local value reset to original value',
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('it works with an update function', function (assert) {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @trackedReset({
        memo: 'remote.value',
        update(component, key, last) {
          return Math.max(this.remote.value, last);
        },
      })
      someOtherValue = 123;
    }

    let local = new Local();

    assert.strictEqual(
      local.someOtherValue,
      123,
      'defaults to the remote value',
    );

    local.someOtherValue = 456;

    assert.strictEqual(
      local.someOtherValue,
      456,
      'local value updates correctly',
    );
    assert.strictEqual(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.someOtherValue,
      789,
      'local value updated using the update function',
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('it works with an update function and memo function', function (assert) {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @trackedReset({
        memo() {
          return this.remote.value;
        },

        update(component, key, last) {
          return Math.max(this.remote.value, last);
        },
      })
      someOtherValue = 123;
    }

    let local = new Local();

    assert.strictEqual(
      local.someOtherValue,
      123,
      'defaults to the remote value',
    );

    local.someOtherValue = 456;

    assert.strictEqual(
      local.someOtherValue,
      456,
      'local value updates correctly',
    );
    assert.strictEqual(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.someOtherValue,
      789,
      'local value updated using the update function',
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('it requires a path or getter', function (assert) {
    assert.throws(() => {
      class Local {
        @trackedReset value;
      }

      new Local();
    }, /@trackedReset\(\) must be given a memo path, a memo function, or config object with a memo path or function as its first argument/);
  });
});
