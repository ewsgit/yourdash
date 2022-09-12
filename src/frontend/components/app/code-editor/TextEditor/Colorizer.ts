/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import { TOKEN } from "./Typings";

export default function Colorize(tokens: TOKEN[][]) {
  let colors: { [key: string]: string } = {
    bracket: "#1696f0",
    unknown: "#c0bfbc",
    keyword: "#ffa348",
    operator: "#c0bfbc",
    string: "#5bc8af",
    function: "#FDC46C",
  };
  let output: TOKEN[][] = [];
  tokens.forEach(line => {
    let pushLineValue: TOKEN[] = [];
    line.forEach(token => {
      let pushValue: TOKEN = token;
      Object.keys(colors).forEach(color => {
        if (color === token.type) {
          pushValue.color = colors[color];
        }
        if (color === token.value) {
          pushValue.color = colors[color];
        }
      });
      pushLineValue.push(pushValue);
    });
    output.push(pushLineValue);
  });
  return output;
}
