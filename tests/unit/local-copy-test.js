import { module, test } from 'qunit';
import { localCopy } from 'tracked-toolbox';

module('Unit | Utils | @localCopy', () => {
  test('it works', (assert) => {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @localCopy('remote.value') value;
    }

    let local = new Local();

    assert.equal(local.value, 123, 'defaults to the remote value');

    local.value = 456;

    assert.equal(local.value, 456, 'local value updates correctly');
    assert.equal(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.equal(local.value, 789, 'local value updates to new remote value');
    assert.equal(remote.value, 789, 'remote value is updated');
  });

  test('it works with a getter', (assert) => {
    class Remote {
      value = 123;
    }

    let remote = new Remote();

    class Local {
      @localCopy(() => remote.value) value;
    }

    let local = new Local();

    assert.equal(local.value, 123, 'defaults to the remote value');

    local.value = 456;

    assert.equal(local.value, 456, 'local value updates correctly');
    assert.equal(remote.value, 123, 'remote value does not update');

    remote.value = 789;

    assert.equal(local.value, 789, 'local value updates to new remote value');
    assert.equal(remote.value, 789, 'remote value is updated');
  });

  test('it requires a path or getter', (assert) => {
    assert.throws(() => {
      class Local {
        @localCopy value;
      }

      new Local();
    }, /@localCopy\(\) must be given a path or getter function/);
  });

  test('value initializer works', assert => {
    class Remote {
      value;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @localCopy('remote.value', 123) value;
    }

    let local = new Local();

    assert.equal(local.value, 123, 'defaults to the initializer value');
    assert.equal(remote.value, undefined, 'remote value is undefined');

    local.value = 456;

    assert.equal(local.value, 456, 'local value updates correctly');
    assert.equal(remote.value, undefined, 'remote value does not update');

    remote.value = 789;

    assert.equal(local.value, 789, 'local value updates to new remote value');
    assert.equal(remote.value, 789, 'remote value is updated');
  });

  test('function initializer works', assert => {
    class Remote {
      value;
    }

    let remote = new Remote();

    class Local {
      remote = remote;

      @localCopy('remote.value', () => 123) value;
    }

    let local = new Local();

    assert.equal(local.value, 123, 'defaults to the initializer value');
    assert.equal(remote.value, undefined, 'remote value is undefined');

    local.value = 456;

    assert.equal(local.value, 456, 'local value updates correctly');
    assert.equal(remote.value, undefined, 'remote value does not update');

    remote.value = 789;

    assert.equal(local.value, 789, 'local value updates to new remote value');
    assert.equal(remote.value, 789, 'remote value is updated');
  });
});
