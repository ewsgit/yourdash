/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import defaultTheme from "./defaultTheme";
import { TokenType } from "./tokenType";

export enum FontWeight {
  Normal,
  Bold,
  Bolder,
  Lighter
}

export enum TextDecoration {
  None,
  Underline,
  Overline,
  LineThrough
}

export default class Token {
  type: TokenType;
  value: string;
  textDecoration?: string;
  errorMessage?: string;
  warningMessage?: string;
  weakWarningMessage?: string;
  infoMessage?: string;
  fontWeight: string;
  
  constructor(
    value: string,
    type: TokenType,
    textDecoration?: string,
    errorMessage?: string,
    warningMessage?: string,
    weakWarningMessage?: string,
    infoMessage?: string,
    fontWeight?: string
  ) {
    this.value = value;
    this.type = type;
    this.textDecoration = textDecoration;
    this.errorMessage = errorMessage;
    this.warningMessage = warningMessage;
    this.weakWarningMessage = weakWarningMessage;
    this.infoMessage = infoMessage;
    this.fontWeight = fontWeight || "400";
  }
  
  render() {
    const tokenSpan = document.createElement( "span" );
    
    tokenSpan.textContent = this.value;
    tokenSpan.style.color = defaultTheme.tokenTypes[this.type] || "#555555";
    tokenSpan.style.fontWeight = "400";
    
    return tokenSpan;
  }
}
