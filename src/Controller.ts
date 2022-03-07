import MainView from './components/MainView';
import { ButtonType } from './constant/html';

class Controller {
  mainView: MainView | null;

  constructor() {
    if (!localStorage.getItem('selectType')) {
      localStorage.setItem('selectType', 'HASH');
    }

    this.mainView = new MainView(
      localStorage.getItem('selectType') as ButtonType,
    );
  }

  init() {
    this.mainView?.bindEvent();
    this.mainView?.on('@click', (event) => {
      localStorage.setItem('selectType', (event as CustomEvent).detail);
    });
  }

  destroy() {
    if (!this.mainView) {
      this.mainView = null;
    }

    this.unBindEvent();
  }

  unBindEvent() {}
}

export default Controller;
