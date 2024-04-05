/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../core/htmlElement.js";

export default class SpanElement extends UKHTMLElement {
  constructor() {
    super(document.createElement("span"));

    return this;
  }

  setInnerText(text: string) {
    this.rawHtmlElement.innerText = text;
    return this;
  }

  dangerouslySetInnerHTML(html: string) {
    this.rawHtmlElement.innerHTML = html;
    return this;
  }
}
