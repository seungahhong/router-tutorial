import { ButtonType } from '../constant/html';
import { on, remove } from '../helpers/events';
import View, { renderComponent } from './View';

export default class PushView extends View {
  selectType: ButtonType;

  constructor(type: ButtonType) {
    super(document.getElementById('root') as HTMLElement);
    this.selectType = type;

    this.renderView(type);
  }

  bindEvent() {
    const navigation = document.getElementById(
      'navigation',
    ) as HTMLUListElement;

    // 네비게이션을 클릭하면 주소창의 url이 변경되므로 HTTP 요청이 서버로 전송된다.
    // preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실행한다.

    on(navigation, 'click', (e) => {
      const target = e.target as HTMLAnchorElement;
      if (!target.matches('#navigation > li > a')) return;

      e.preventDefault();

      // 이동할 페이지의 path
      const path = target.getAttribute('href') as string;

      // pushState는 주소창의 url을 변경하지만 HTTP 요청을 서버로 전송하지는 않는다.
      window.history.pushState({}, '', path);

      renderComponent(path, this.selectType);
    });

    on(window, 'popstate', () => {
      const href = window.location.href;
      const path =
        href.indexOf('#') >= 0
          ? href.substring(href.lastIndexOf('#'))
          : href.substring(href.lastIndexOf('/'));

      // 앞으로/뒤로 가기 버튼을 클릭하면 window.location.pathname를 참조해 뷰를 전환한다.
      renderComponent(
        path,
        path.indexOf('ajax') >= 0
          ? 'AJAX'
          : path.indexOf('#') >= 0
          ? 'HASH'
          : 'PUSHSTATE',
      );
    });
  }

  unBindEvent(): void {
    const navigation = document.getElementById(
      'navigation',
    ) as HTMLUListElement;
    remove(navigation, 'click', () => {});
    remove(window, 'popstate', () => {});
  }

  destroy() {
    this.unBindEvent();
  }

  renderView(type: ButtonType) {
    super.render({
      title: 'PushState Router',
      homeLink: '/push',
      aboutLink: '/push-about',
    });

    this.selectType = type;
    renderComponent('/push', type);

    return this;
  }
}
