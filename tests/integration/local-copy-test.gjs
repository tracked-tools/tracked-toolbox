import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { localCopy } from '#src/index';

class CustomInput extends Component {
  @localCopy('args.text') text;

  @action
  updateText({ target }) {
    this.text = String(target.value);

    if (this.args.onInput) {
      this.args.onInput(this.text);
    }
  }

  <template>
    <input
      aria-label="Custom Input"
      value={{this.text}}
      {{on "input" this.updateText}}
    />
  </template>
}

module('Integration | Utils | @localCopy', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    assert.expect(5);
    this.set('text', 'default');

    await render(
      <template>
        <CustomInput @text={{this.text}} @onInput={{this.onInput}} />
      </template>,
    );

    assert
      .dom('input')
      .hasValue('default', 'remote value is passed through correctly');

    this.set('onInput', (value) =>
      assert.strictEqual(value, 'hello!', 'updated value sent'),
    );

    await fillIn('input', 'hello!');

    assert.dom('input').hasValue('hello!', 'local value is updated correctly');
    assert.strictEqual(
      this.text,
      'default',
      'remote value is not updated correctly',
    );

    this.set('text', 'world!');

    assert
      .dom('input')
      .hasValue(
        'world!',
        'local value is updated correctly when remote value is updated',
      );
  });
});
