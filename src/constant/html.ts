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

export const getPushHtml = ({ title, homeLink, aboutLink }: HtmlProps) => `
    <h1 style="font-size: 20px; margin-bottom: 20px;">${title}</h1>
    <nav>
      <ul id="navigation" style="display: flex;">
        <li style="margin-right: 10px;"><a id="${homeLink}" href="${homeLink}">Home</a></li>
        <li><a id="${aboutLink}" href="${aboutLink}">About</a></li>
      </ul>
    </nav>
    <div style="margin-top: 5px;">
      <button id="back" style="padding: 5px; border: 1px solid black;">back</button>
      <button id="forward" style="padding: 5px; border: 1px solid black;">forward</button>
      <button id="go(-1)" style="padding: 5px; border: 1px solid black;">go(-1)</button>
      <button id="go(1)" style="padding: 5px; border: 1px solid black;">go(1)</button>
      <button id="go(2)" style="padding: 5px; border: 1px solid black;">go(2)</button>
      <button id="go(-2)" style="padding: 5px; border: 1px solid black;">go(-2)</button>
      <button id="refresh" style="padding: 5px; border: 1px solid black;">go() | go(0)</button>
      <button id="replace" style="padding: 5px; border: 1px solid black;">replace(home -> about)</button>
      <button id="alert" style="padding: 5px; border: 1px solid black;">alert on/off</button>
    </div>
    <div id="length"></div>
    <div id="template"></div>
`;
