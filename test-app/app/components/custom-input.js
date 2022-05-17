import Component from '@glimmer/component';
import { action } from '@ember/object';
import { localCopy } from 'tracked-toolbox';

export default class CustomInput extends Component {
  @localCopy('args.text') text;

  @action
  updateText({ target }) {
    this.text = String(target.value);

    if (this.args.onInput) {
      this.args.onInput(this.text);
    }
  }
}
