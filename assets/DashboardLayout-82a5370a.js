import{j as e,v as a,u as c,h as i,f as d,Y as x}from"./index-01aaedfa.js";import{R as o}from"./Row-b36c4d70.js";const n=({children:l,active:t,onClick:s})=>e.jsx("button",{type:"button",className:`${a.component} ${t?a.toggled:""}`,onClick:s,children:l}),h="_content_8ueyu_6",u={content:h},p=({username:l,fullName:t})=>{const s=c(),r=i("dash");return e.jsxs("main",{className:"flex flex-col w-full min-h-full h-full overflow-y-auto",children:[e.jsxs("header",{className:"p-6 pl-8 pr-8 flex flex-col from-container-bg to-transparent bg-gradient-to-b",children:[e.jsxs(o,{children:[e.jsx("span",{className:"text-5xl font-bold",children:r("LOCALIZED_GREETING",[t.first,t.last])}),e.jsx(d,{className:"ml-auto",icon:x.Gear,onClick:()=>{s("/app/a/settings/personalization/dashboard")}})]}),e.jsxs(o,{className:"pt-6 flex-wrap child:flex-grow md:child:flex-grow-0",children:[e.jsx(n,{onClick:()=>0,children:"Weather 20°C"}),e.jsx(n,{onClick:()=>0,active:!0,children:"Rain at 3pm"}),e.jsx(n,{onClick:()=>0,children:"You have 76 unread notifications"})]})]}),e.jsxs("section",{className:u.content,children:[e.jsx("div",{className:"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4",children:"Placeholder Widget"}),e.jsx("div",{className:"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4",children:"Placeholder Widget"}),e.jsx("div",{className:"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4",children:"Placeholder Widget"}),e.jsx("div",{className:"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4",children:"Placeholder Widget"})]})]})};export{p as default};
