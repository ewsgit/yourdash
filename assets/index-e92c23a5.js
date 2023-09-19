import{r as a,j as t,e as R,b as v,B as k,h as J,I as y,Y as w,c as f,R as C,a as q}from"./index-01aaedfa.js";import{D as S}from"./DropdownButton-4eefff29.js";import{T as O}from"./TextBox-6a285a1c.js";const L=({onChange:n,options:r,onBlur:x,label:c,placeholder:u,className:d,onKeyDown:b})=>{const[N,m]=a.useState(!1),[o,p]=a.useState([]),h=a.useRef(null);return t.jsxs("div",{className:R("relative transition-all border-none",d),children:[t.jsx("span",{className:R("pl-2 pr-2 bg-base-700 absolute -top-1 left-2.5 text-sm z-10 [line-height:.65rem] select-none text-base-400"),children:c}),t.jsx("input",{placeholder:u,className:`w-full pl-2 pt-1 pb-1 pr-2 outline-none relative z-0 rounded-button-rounding bg-base-700 transition-all ${N?"hover:border-green-400 focus-within:border-green-400 border-2 border-base-600":"border-2 border-red-400"}`,type:"text",onFocus:s=>{r.includes(s.currentTarget.value)&&s.currentTarget.value!=="/"?p([]):p(r.filter(i=>i.includes(s.currentTarget.value)))},onBlur:s=>{x&&x(s)},onKeyDown:s=>b==null?void 0:b(s),ref:h,onChange:s=>{const i=s.currentTarget.value;if(!i)return m(!1);n(i),p(r.filter(j=>j.includes(i))),r.includes(i)?(i!=="/"&&p([]),m(!0)):m(!1)}}),o.length!==0&&t.jsx(v,{className:"absolute top-full z-10 w-max flex flex-col p-2 gap-1",children:o.slice(0,25).map(s=>t.jsx(k,{className:"h-6 whitespace-nowrap w-full text-left",onClick:()=>{h.current&&(h.current.value=s,n(h.current.value),p([]),m(!0))},children:s},s))})]})};function A(n){f.getJson("/app/endpoints/endpoints",r=>{const x=r.map(c=>{var u;return((u=c==null?void 0:c.route)==null?void 0:u.path)||null}).filter(c=>c!==null);n(x)})}const I=()=>{const n=J("endpoints"),[r,x]=a.useState("JSON"),[c,u]=a.useState("GET"),[d,b]=a.useState({}),[N,m]=a.useState(""),[o,p]=a.useState(""),[h,s]=a.useState([]),[i,j]=a.useState(!0),[E,l]=a.useState(!1),[T,g]=a.useState("");return a.useEffect(()=>{A(e=>s(e))},[]),t.jsxs("main",{children:[t.jsxs("header",{className:"w-full p-3 flex items-center justify-between sticky top-0 bg-container-bg text-container-fg",children:[t.jsxs("section",{className:"flex items-center justify-center h-full gap-2",children:[t.jsx(S,{items:[{name:"Get",onClick(){u("GET")}},{name:"Post",onClick(){u("POST")}},{name:"Delete",onClick(){u("DELETE")}}],children:"Get"}),t.jsx(S,{items:[{name:"Text",onClick(){x("Text")}},{name:"JSON",onClick(){x("JSON")}}],children:"JSON"})]}),t.jsx("section",{className:"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",children:t.jsxs("div",{className:"flex items-center justify-center h-full gap-1.5",children:[t.jsx(y,{className:"h-9 aspect-square",useDefaultColor:!0,icon:w.YourDashLogo}),t.jsx("h2",{className:"text-3xl font-semibold tracking-wide",children:n("APPLICATION_NAME")})]})}),t.jsx("section",{className:"flex items-center justify-center h-full gap-2",children:t.jsx(k,{onClick:()=>{switch(l(!1),j(!0),c){case"GET":switch(r){case"Text":f.getText(o,e=>{g(e)},e=>{l(e)},d);break;case"JSON":f.getJson(o,e=>{g(e)},e=>{l(e)},d);break;default:l(n("INTERNAL_ERROR"))}break;case"POST":switch(r){case"Text":f.postText(o,JSON.parse(N),e=>{g(e)},e=>{l(e)},d);break;case"JSON":f.postJson(o,JSON.parse(N),e=>{g(e)},e=>{l(e)},d);break;default:l(n("INTERNAL_ERROR"))}break;case"DELETE":switch(r){case"Text":f.deleteText(o,e=>{g(e)},e=>{l(e)},d);break;case"JSON":f.deleteJson(o,e=>{g(e)},e=>{l(e)},d);break;default:l(n("INTERNAL_ERROR"))}break;default:l(n("INTERNAL_ERROR"))}},children:n("SEND_REQUEST.LABEL")})})]}),t.jsxs("main",{className:"p-3 grid grid-cols-[2fr,3fr] gap-2",children:[t.jsxs("section",{className:"bg-container-bg text-container-fg rounded-container-rounding p-2 h-max flex flex-col",children:[t.jsx(L,{options:h,label:"Request Endpoint",onChange:e=>{p(e)},className:"mb-2"}),c!=="GET"&&t.jsxs(t.Fragment,{children:[t.jsx("span",{className:"-mb-0.5 text-opacity-60 text-container-fg",children:"Request Body"}),t.jsx(O,{defaultValue:`{
  
}`,onChange:e=>{m(e.currentTarget.value)}})]}),t.jsx("span",{className:"-mb-0.5 text-opacity-60 text-container-fg",children:"Request Extra Headers"}),t.jsx(O,{defaultValue:`{
  
}`,onChange:e=>{b(JSON.parse(e.currentTarget.value))}})]}),!i&&t.jsxs("section",{className:"overflow-x-auto w-auto",children:[t.jsx("pre",{className:"bg-container-tertiary-bg text-container-fg p-4 rounded-container-rounding w-auto",children:r==="JSON"?JSON.stringify(T,null,2):T}),E&&t.jsx("pre",{className:"bg-container-tertiary-bg text-red-400 p-4 rounded-container-rounding",children:E})]})]})]})},G=()=>t.jsx(C,{children:t.jsx(q,{index:!0,element:t.jsx(I,{})})});export{G as default};
