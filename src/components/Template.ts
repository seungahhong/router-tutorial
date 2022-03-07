import { ButtonType } from '../constant/html';

const createElement = (html: string) => {
  const $temp = document.createElement('template');
  $temp.innerHTML = html;
  return $temp.content;
};

export const Home = (selectType: ButtonType) => {
  return createElement(
    `<h1>${selectType}</h1><p>${selectType} Home Router 예제입니다.</p>`,
  );
};

export const About = (selectType: ButtonType) => {
  return createElement(
    `<h1>${selectType}</h1><p>${selectType} About Router 예제입니다.</p>`,
  );
};

export const NotFound = () => createElement('<h1>404 NotFound</p>');
