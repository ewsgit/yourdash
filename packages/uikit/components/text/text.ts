/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import DivElement from "../../html/divElement.js";
import styles from "./text.module.scss";

export default class Text extends SoloComponent {
  htmlElement: DivElement;
  textValue: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, nobis?";

  constructor(text?: string) {
    super();

    this.htmlElement = new DivElement();
    this.htmlElement.setInnerText(this.textValue);
    this.htmlElement.addClass(styles.component);

    if (text) this.setText(text);

    return this;
  }

  public setText(text: string) {
    this.textValue = text;
    this.htmlElement.setInnerText(this.textValue);

    return this;
  }
}
