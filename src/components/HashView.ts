import { ButtonType } from '../constant/html';
import { About, Home } from './Template';
import View, { renderComponent } from './View';

export default class HashView extends View {
  selectType: ButtonType;
  constructor(type: ButtonType) {
    super(document.getElementById('root') as HTMLElement);

    this.selectType = type;
    this.renderView(type);
  }

  bindEvent(): void {
    // const navigation = document.getElementById(
    //   'navigation',
    // ) as HTMLUListElement;

    // 네비게이션을 클릭하면 주소창의 url이 변경되므로 HTTP 요청이 서버로 전송된다.

    // navigation.addEventListener('click', (e) => {
    //   const target = e.target as HTMLAnchorElement;
    //   if (!target.matches('#navigation > li > a')) return;

    //   // 이동할 페이지의 path
    //   const href = target.getAttribute('href') as string;
    //   const path = href.substring(href.lastIndexOf('#'));

    //   renderComponent(path, this.selectType);
    // });

    window.addEventListener('hashchange', (event: HashChangeEvent) => {
      const href = event.newURL;

      if (href.lastIndexOf('#') === -1) {
        window.location.href = '/push';
      }

      const path = href.substring(href.lastIndexOf('#'));

      renderComponent(path, this.selectType);
    });
  }

  unBindEvent(): void {
    // const navigation = document.getElementById(
    //   'navigation',
    // ) as HTMLUListElement;
    // if (navigation) {
    //   navigation.removeEventListener('click', () => {});
    // }

    window.removeEventListener('hashchange', () => {});
  }

  destroy() {}

  renderView(type: ButtonType) {
    super.render(
      {
        title: 'Hash Router',
        homeLink: '#',
        aboutLink: '#about',
      },
      this.selectType,
    );

    this.selectType = type;
    const href = window.location.href;
    if (href.lastIndexOf('#') !== -1) {
      const path = href.substring(href.lastIndexOf('#'));
      renderComponent(path, type);
    }

    return this;
  }
}
