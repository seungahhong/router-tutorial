import { ButtonType } from '../constant/html';
import View, { renderComponent } from './View';

export default class PushView extends View {
  selectType: ButtonType;

  constructor(type: ButtonType) {
    super(document.getElementById('root') as HTMLElement);
    this.selectType = type;

    this.renderView(type);
  }

  bindEvent() {
    this.navigation = document.getElementById('navigation') as HTMLUListElement;

    // 네비게이션을 클릭하면 주소창의 url이 변경되므로 HTTP 요청이 서버로 전송된다.
    // preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실행한다.

    this.navigation.addEventListener('click', (e) => {
      const target = e.target as HTMLAnchorElement;
      if (!target.matches('#navigation > li > a')) return;

      e.preventDefault();

      // 이동할 페이지의 path
      const path = target.getAttribute('href') as string;

      // pushState는 주소창의 url을 변경하지만 HTTP 요청을 서버로 전송하지는 않는다.
      window.history.pushState({}, '', path);

      renderComponent(path, this.selectType);
    });
  }

  destroy() {
    if (this.navigation) {
      this.navigation.removeEventListener('click', () => {});
      this.navigation = null;
    }
  }

  renderView(type: ButtonType) {
    super.render({
      title: 'PushState Router',
      homeLink: '/push',
      aboutLink: '/push-about',
    });

    this.selectType = type;
    this.bindEvent();
    renderComponent(window.location.pathname, type);

    return this;
  }
}
