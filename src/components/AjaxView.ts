import { ButtonType } from '../constant/html';
import { About, Home } from './Template';
import View, { renderComponent } from './View';

export default class AjaxView extends View {
  selectType: ButtonType;
  constructor(type: ButtonType) {
    super(document.getElementById('root') as HTMLElement);
    this.selectType = type;

    this.renderView(type);
  }

  destroy() {}

  renderView(type: ButtonType) {
    super.render({
      title: 'Ajax Router',
    });

    this.selectType = type;
    renderComponent('/ajax', type);

    return this;
  }
}
