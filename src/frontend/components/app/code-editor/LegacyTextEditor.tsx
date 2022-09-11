/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React, { useEffect, useState } from "react";
import Tokenize from "./codesense/Tokenizer";
import Colorize from "./codesense/Colorizer";
import { TOKEN } from "./codesense/Typings";
import getCharacterWidth from "../../../lib/getCharacterWidth";

export default function TextEditor() {
    const [ code, setCode ] = useState([ '(this is a test) === "aaa" "ass sss aaa" `hmmm mmmm mmmm mmm`  bbb this is a test', "and this is a function aaa() r", "Lorem ipsum dolor sit amet consectetur", "adipisicing elit. Unde excepturi fugiat voluptatum?" ]);
    const [ tokenizedCode, setTokenizedCode ] = useState([] as TOKEN[][]);
    const [ linesOfCode, setLinesOfCode ] = useState([] as number[]);
    const [ cursorPosition, setCursorPosition ] = useState({ x: 0, y: 0 } as { x: number; y: number });
    const [ fontConfig, setFontConfig ] = useState({
        fontSize: 18,
        lineHeight: 18 * 1.2,
        fontFamily: "Jetbrains Mono"
    })
    let pressedKeys: string[] = [];
    useEffect(() => {
        setTokenizedCode(Colorize(Tokenize(code, "js")));
        setLinesOfCode(code.map((str, ind) => ind));
    }, [ code ]);
    let onKeyDownEvent = (e: KeyboardEvent) => {
        e.preventDefault()
        if (pressedKeys.indexOf(e.key) === -1) {
            pressedKeys.push(e.key);
        }
        onKeyPress();
    };
    let onKeyUpEvent = (e: KeyboardEvent) => {
        e.preventDefault()
        if (pressedKeys.indexOf(e.key) !== -1) {
            pressedKeys.splice(pressedKeys.indexOf(e.key), 1);
        }
    };
    let onKeyPress = () => {
        pressedKeys.map(key => {
            console.log(key, cursorPosition)
            switch (key) {
                case "ArrowUp":
                    if (cursorPosition.y !== 0) setCursorPosition({
                        x: cursorPosition.x,
                        y: cursorPosition.y - 1
                    });
                    break;
                case "ArrowDown":
                    if (cursorPosition.y !== tokenizedCode.length) setCursorPosition({
                        x: cursorPosition.x,
                        y: cursorPosition.y + 1
                    });
                    break;
                case "ArrowLeft":
                    setCursorPosition({
                        y: cursorPosition.y,
                        x: cursorPosition.x - 1
                    });
                    break;
                case "ArrowRight":
                    setCursorPosition({
                        y: cursorPosition.y,
                        x: cursorPosition.x + 1
                    });
                    break;
            }
        });
    };
    return (<div className={`w-full h-full grid grid-cols-[auto,1fr] relative select-none`}>
        <div className={`pr-2 pl-2 pt-2 bg-content-normal shadow-md z-10 text-text-secondary`}>
            {linesOfCode.map(line => {
                return <div style={{
                    fontSize: fontConfig.fontSize + "px",
                    lineHeight: fontConfig.lineHeight + "px",
                    fontFamily: fontConfig.fontFamily
                }} key={line}>{line + 1}</div>;
            })}
        </div>
        <div className="bg-content-light pt-2 pl-2 w-full h-full overflow-scroll">
            <pre
                className={`relative cursor-text w-full h-full`}
                tabIndex={0}
                onFocus={e => {
                    e.target.addEventListener("keydown", onKeyDownEvent);
                    e.target.addEventListener("keyup", onKeyUpEvent);
                }}
                onBlur={e => {
                    e.target.removeEventListener("keydown", onKeyDownEvent);
                    e.target.removeEventListener("keyup", onKeyUpEvent);
                }}
                onClick={e => {
                    e.preventDefault();
                    setCursorPosition({
                        x: Math.round((e.clientX - e.currentTarget.getClientRects()[ 0 ].x) / getCharacterWidth(fontConfig.fontFamily, fontConfig.fontSize + "px")),
                        y: Math.floor((e.clientY - e.currentTarget.getClientRects()[ 0 ].y) / fontConfig.lineHeight),
                    });
                }}
            >
                {tokenizedCode.map((line, ind) => {
                    return (<span key={ind} className={`flex`}>
                        {line.map((token, tokenInd) => {
                            return (<span key={tokenInd} style={{
                                color: token.color,
                                fontWeight: token.bold ? "bold" : "normal",
                                fontSize: fontConfig.fontSize + "px",
                                lineHeight: fontConfig.lineHeight + "px",
                                fontFamily: fontConfig.fontFamily
                            }}>
                                {token.value}
                            </span>);
                        })}
                    </span>);
                })}
                <div
                    className={`w-0.5 bg-branding-primary absolute top-0 left-0 animate-pulse`}
                    style={{
                        height: fontConfig.lineHeight + "px",
                        left: cursorPosition.x * getCharacterWidth(fontConfig.fontFamily, fontConfig.fontSize + "px") + "px",
                        top: cursorPosition.y * fontConfig.lineHeight
                    }}></div>
            </pre>
        </div>
    </div>);
}
