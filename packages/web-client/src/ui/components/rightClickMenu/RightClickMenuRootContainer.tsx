/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import { useEffect, useRef } from "react";
import RightClickMenuContext from "./RightClickMenuContext";
import RightClickMenuItem from "./RightClickMenuItem";
import styles from "./RightClickMenuRootContainer.module.scss";

const RightClickMenuRootContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [visible, setVisible] = React.useState(false);
  const [items, setItems] = React.useState([] as RightClickMenuItem[]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setVisible(false);
    });
  }, []);

  return (
    <RightClickMenuContext.Provider
      value={(x, y, width, height, vis, i) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const MENU_WIDTH = ref.current?.getBoundingClientRect().width || 200;
        const MENU_HEIGHT = ref.current?.getBoundingClientRect().height || 200;

        let resultX = x;
        let resultY = y;

        if (x + MENU_WIDTH >= screenWidth) {
          resultX = screenWidth - MENU_WIDTH;
        }

        if (y + MENU_HEIGHT >= screenHeight) {
          resultY = screenHeight - MENU_HEIGHT;
        }

        setPosition({
          x: resultX,
          y: resultY,
        });

        setVisible(vis);
        setItems(i);
      }}
    >
      <div
        ref={ref}
        style={{
          display: visible ? "flex" : "none",
          left: position.x,
          top: position.y,
        }}
        className={styles.component}
      >
        {items.map((item) => {
          return (
            <button type="button" onClick={item.onClick} key={item.label} tabIndex={2}>
              {item.label}
            </button>
          );
        })}
      </div>
      {children}
    </RightClickMenuContext.Provider>
  );
};

export default RightClickMenuRootContainer;
