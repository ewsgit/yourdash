import{r as f,j as t,q as r,f as c,Y as l}from"./index-01aaedfa.js";const x=({children:o,containerClassName:a,className:i,compactControls:s,...u})=>{const e=f.useRef(null);return t.jsxs("div",{...u,className:`${r.component} ${a}`,children:[t.jsx("div",{className:`${r.main} ${s&&r.mainControlsCompact} ${i}`,ref:e,onScroll:n=>n.preventDefault(),children:o}),t.jsx("div",{className:`${r.controls} ${s&&r.controlsCompact}`,children:o instanceof Array?t.jsxs(t.Fragment,{children:[t.jsx(c,{icon:l.ChevronLeft,onClick:()=>{if(!e.current)return;const n=e.current;n.scrollTo({left:n.scrollLeft-n.getBoundingClientRect().width/4*3})}}),t.jsx(c,{icon:l.ChevronRight,onClick:()=>{if(!e.current)return;const n=e.current;n.scrollTo({left:n.scrollLeft+n.getBoundingClientRect().width/4*3})}})]}):null})]})};export{x as C};
