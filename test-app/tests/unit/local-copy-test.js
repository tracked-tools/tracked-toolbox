import { module, test } from 'qunit';
import { localCopy } from 'tracked-toolbox';

module('Unit | Utils | @localCopy', () => {
  test('it works', function (assert) {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @localCopy('remote.value') value;
    }

    let local = new Local();

    assert.strictEqual(local.value, 123, 'defaults to the remote value');

    local.value = 456;

    assert.strictEqual(local.value, 456, 'local value updates correctly');
    assert.strictEqual(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.value,
      789,
      'local value updates to new remote value'
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('it works with a getter', function (assert) {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      @localCopy(() => remote.value) value;
    }

    let local = new Local();

    assert.strictEqual(local.value, 123, 'defaults to the remote value');

    local.value = 456;

    assert.strictEqual(local.value, 456, 'local value updates correctly');
    assert.strictEqual(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.value,
      789,
      'local value updates to new remote value'
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('it requires a path or getter', function (assert) {
    assert.throws(() => {
      class Local {
        @localCopy value;
      }

      new Local();
    }, /@localCopy\(\) must be given a memo path or memo function/);
  });

  test('value initializer works', function (assert) {
    class Remote {
      value;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @localCopy('remote.value', 123) value;
    }

    let local = new Local();

    assert.strictEqual(local.value, 123, 'defaults to the initializer value');
    assert.strictEqual(remote.value, undefined, 'remote value is undefined');

    local.value = 456;

    assert.strictEqual(local.value, 456, 'local value updates correctly');
    assert.strictEqual(remote.value, undefined, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.value,
      789,
      'local value updates to new remote value'
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('function initializer works', function (assert) {
    class Remote {
      value;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @localCopy('remote.value', () => 123) value;
    }

    let local = new Local();

    assert.strictEqual(local.value, 123, 'defaults to the initializer value');
    assert.strictEqual(remote.value, undefined, 'remote value is undefined');

    local.value = 456;

    assert.strictEqual(local.value, 456, 'local value updates correctly');
    assert.strictEqual(remote.value, undefined, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.value,
      789,
      'local value updates to new remote value'
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });

  test('it works when setting the value locally before accessing it', function (assert) {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @localCopy('remote.value') value;
    }

    let local = new Local();

    // set the value before reading it
    local.value = 456;

    assert.strictEqual(local.value, 456, 'local value updates correctly');
    assert.strictEqual(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.strictEqual(
      local.value,
      789,
      'local value updates to new remote value'
    );
    assert.strictEqual(remote.value, 789, 'remote value is updated');
  });
});
