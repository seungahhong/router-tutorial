import { ButtonType, getHtml, getPushHtml, HtmlProps } from '../constant/html';
import { eventHandler } from '../helpers/events';
import { on, emit, remove } from '../helpers/events';
import { About, Home, NotFound } from './Template';

export const routes = [
  { path: '/push', component: Home },
  { path: '/push-about', component: About },
  { path: '#', component: Home },
  { path: '#about', component: About },
  { path: '/ajax', component: Home },
  { path: '/ajax-about', component: About },
];

export const renderComponent = async (path: string, type: ButtonType) => {
  try {
    const component =
      routes.find((route: any) => route.path === path)?.component || NotFound;
    (document.getElementById('template') as HTMLDivElement).replaceChildren(
      await component(type),
    );
    document.querySelectorAll('a').forEach((item: HTMLAnchorElement) => {
      item.style.color = 'black';
    });
    if (document.getElementById(path)) {
      (document.getElementById(path) as HTMLElement).style.color = 'red';
    }
  } catch (err) {
    console.error(err);
  }
};

export default class View {
  element: HTMLElement;
  routers: any;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  on(eventName: string, handler: eventHandler<Event>) {
    on(this.element, eventName, handler);
    return this;
  }

  remove(eventName: string, handler: eventHandler<Event>) {
    remove(this.element, eventName, handler);

    return this;
  }

  emit(eventName: string, value?: string) {
    emit(this.element, eventName, value);

    return this;
  }

  render({ title, homeLink, aboutLink }: HtmlProps, type: ButtonType) {
    this.element.innerHTML =
      type === 'AJAX' || type === 'HASH'
        ? getHtml({ title, homeLink, aboutLink })
        : getPushHtml({ title, homeLink, aboutLink });
    return this;
  }
  bindEvent() {}
  unBindEvent() {}
}
