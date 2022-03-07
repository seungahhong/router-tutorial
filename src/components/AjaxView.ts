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

      renderComponent(path, this.selectType);
    });
  }

  destroy() {}

  renderView(type: ButtonType) {
    super.render({
      title: 'Ajax Router',
      homeLink: '/ajax',
      aboutLink: '/ajax-about',
    });

    this.selectType = type;
    this.bindEvent();
    renderComponent(window.location.pathname, type);

    return this;
  }
}
