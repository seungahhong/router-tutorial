import { ButtonType } from '../constant/html';
import { emit, eventHandler, on } from '../helpers/events';
import AjaxView from './AjaxView';
import HashView from './HashView';
import PushView from './PushView';
import { renderComponent } from './View';

export default class MainView {
  ajaxView: AjaxView;
  hashView: HashView;
  pushStateView: PushView;
  root: HTMLElement;
  ajaxButton: HTMLButtonElement;
  hashButton: HTMLButtonElement;
  pushStateButton: HTMLButtonElement;

  constructor(selectType: ButtonType) {
    this.ajaxView = new AjaxView('AJAX');
    this.hashView = new HashView('HASH');
    this.pushStateView = new PushView('PUSHSTATE');

    this.root = document.getElementById('root') as HTMLElement;
    this.ajaxButton = document.getElementById('ajax') as HTMLButtonElement;
    this.hashButton = document.getElementById('hash') as HTMLButtonElement;
    this.pushStateButton = document.getElementById(
      'pushstate',
    ) as HTMLButtonElement;

    this.init(selectType);
  }

  init(selectType: ButtonType) {
    if (selectType === 'AJAX') {
      this.ajaxView.renderView('AJAX');
      this.ajaxView.bindEvent();
    } else if (selectType === 'HASH') {
      this.hashView.renderView('HASH');
      this.hashView.bindEvent();
    } else {
      this.pushStateView.renderView('PUSHSTATE');
      this.pushStateView.bindEvent();
    }

    this.style(selectType);
  }

  on(eventName: string, handler: eventHandler<Event>) {
    on(this.root, eventName, handler);
    return this;
  }

  bindEvent() {
    on(this.ajaxButton, 'click', () => {
      this.hashView.destroy();
      this.pushStateView.destroy();

      this.style('AJAX');
      emit(this.root, '@click', 'AJAX');
      this.ajaxView.renderView('AJAX');
      if (window.history.length > 0) {
        window.history.go(-window.history.length);
      }
      window.location.href = '/ajax';
    });

    on(this.hashButton, 'click', () => {
      this.ajaxView.destroy();
      this.pushStateView.destroy();

      this.style('HASH');
      emit(this.root, '@click', 'HASH');
      this.hashView.renderView('HASH');
      if (window.history.length > 0) {
        window.history.go(-window.history.length);
      }
      window.location.href = '/#';
    });

    on(this.pushStateButton, 'click', () => {
      this.ajaxView.destroy();
      this.hashView.destroy();

      this.style('PUSHSTATE');
      emit(this.root, '@click', 'PUSHSTATE');
      this.pushStateView.renderView('PUSHSTATE');
      if (window.history.length > 0) {
        window.history.go(-window.history.length);
      }
      window.location.href = '/push';
    });

    return this;
  }

  style(selectType: ButtonType) {
    this.ajaxButton.style.border = 'none';
    this.hashButton.style.border = 'none';
    this.pushStateButton.style.border = 'none';

    if (selectType === 'AJAX') {
      this.ajaxButton.style.border = '1px solid red';
    } else if (selectType === 'HASH') {
      this.hashButton.style.border = '1px solid red';
    } else {
      this.pushStateButton.style.border = '1px solid red';
    }
  }
}
