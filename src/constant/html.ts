export type ButtonType = 'AJAX' | 'HASH' | 'PUSHSTATE';

export interface HtmlProps {
  title: string;
  homeLink?: string;
  aboutLink?: string;
}

export const getHtml = ({ title, homeLink, aboutLink }: HtmlProps) => `
  <h1 style="font-size: 20px; margin-bottom: 20px;">${title}</h1>
  <nav>
    <ul id="navigation" style="display: flex;">
      <li style="margin-right: 10px;"><a id="${homeLink}" href="${homeLink}">Home</a></li>
      <li><a id="${aboutLink}" href="${aboutLink}">About</a></li>
    </ul>
  </nav>
  <div id="template"></div>
`;

export const getAjaxHtml = ({ title }: HtmlProps) => `
  <h1 style="font-size: 20px; margin-bottom: 20px;">${title}</h1>
  <div id="template"></div>
`;
