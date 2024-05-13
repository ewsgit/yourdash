/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { FC, useRef, useState } from "react";

const PanAndZoom: FC<{ children: React.ReactNode; minZoom?: number; maxZoom?: number }> = ({
  children,
  minZoom,
  maxZoom,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scale, setScale] = useState(1);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const delta = event.deltaY;
    const newScale = scale + delta / 1000;
    setScale(Math.min(Math.max(newScale, minZoom ?? 0.1), maxZoom ?? 10));
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const startTranslateX = translateX;
    const startTranslateY = translateY;
    event.currentTarget.style.cursor = "grabbing";

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const handleMouseMove = (event: MouseEvent) => {
      event.stopPropagation();
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      setTranslateX(startTranslateX + deltaX);
      setTranslateY(startTranslateY + deltaY);
    };

    const handleMouseUp = () => {
      event.stopPropagation();
      event.currentTarget.style.cursor = "default";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const startTouches = event.touches;
    const startTranslateX = translateX;
    const startTranslateY = translateY;
    event.currentTarget.style.cursor = "grabbing";

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const handleTouchMove = (event: TouchEvent) => {
      event.stopPropagation();
      const currentTouches = event.touches;
      const deltaX = currentTouches[0].clientX - startTouches[0].clientX;
      const deltaY = currentTouches[0].clientY - startTouches[0].clientY;
      setTranslateX(startTranslateX + deltaX);
      setTranslateY(startTranslateY + deltaY);
    };

    const handleTouchEnd = () => {
      event.stopPropagation();
      event.currentTarget.style.cursor = "default";
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onWheel={handleWheel as unknown as React.WheelEventHandler<HTMLDivElement>}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transformOrigin: "center center",
          maxWidth: "max-content",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PanAndZoom;
