import MainView from './components/MainView';
import { ButtonType } from './constant/html';

class Controller {
  mainView: MainView | null;
  selectType: ButtonType;

  constructor(path: string) {
    if (path === '/') {
      window.location.href = '/push';
    }

    this.selectType =
      path.indexOf('/ajax') >= 0
        ? 'AJAX'
        : path.indexOf('#') >= 0
        ? 'HASH'
        : 'PUSHSTATE';
    this.mainView = new MainView(this.selectType);
  }

  init() {
    this.mainView?.bindEvent();
    this.mainView?.on('@click', (event) => {
      this.selectType = (event as CustomEvent).detail;
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
