import{j as e,b as h,p,u as y,Y as a,I as b,r as d,k as c,S as k,v as D,t as j,O as P,h as w,C as B,x as _,D as z,y as L,B as S,z as I,R as $,a as r}from"./index-4cf28dcc.js";const A="_component_1oyy3_6",J="_title_1oyy3_14",R="_textContainer_1oyy3_21",f={component:A,title:J,textContainer:R},N=({children:s,title:n,description:t,icon:o,onClick:i})=>e.jsxs(h,{onClick:i,className:f.component,children:[e.jsx(p,{className:"aspect-square h-10",icon:o}),e.jsxs("div",{className:f.textContainer,children:[e.jsx("h2",{className:f.title,children:n}),e.jsx("span",{className:f.description,children:t})]}),s]}),u=({title:s,description:n,icon:t,href:o,external:i})=>{const v=y();return e.jsx(N,{onClick:()=>{i?window.location.href=o:v(o)},icon:t,title:s,description:n,children:e.jsx(p,{className:"aspect-square h-8",icon:i?a.Link:a.ChevronRight})})},m=({children:s,title:n,noBack:t})=>{const o=y();return e.jsxs("main",{className:"flex flex-col items-center ml-auto mr-auto w-full max-w-6xl pl-4 pr-4 min-h-full",children:[e.jsxs("section",{className:"flex items-center w-full gap-2 pt-8 pb-8 pl-4 pr-4 animate__animated animate__fadeIn animate__duration_250ms",children:[!t&&e.jsx(b,{onClick:()=>{o("..")},icon:a.ChevronLeft}),e.jsx("h1",{className:"font-bold text-container-fg text-4xl w-full text-left",children:n})]}),e.jsx("div",{className:"grid grid-cols-1 w-full xl:grid-cols-2 gap-2 animate__animated animate__fadeIn animate__100ms h-full overflow-x-hidden overflow-y-auto auto-rows-max",children:s})]})},V=()=>e.jsxs(m,{noBack:!0,title:"YourDash Settings",children:[e.jsx(u,{href:"/app/a/settings/profile",description:"Manage your user profile",title:"Profile",icon:a.Person}),e.jsx(u,{href:"/app/a/settings/personalization",description:"Customize your experience",title:"Personalization",icon:a.Paintbrush}),e.jsx(u,{href:"/app/a/settings/session",description:"Manage your login sessions",title:"Login sessions",icon:a.Login}),e.jsx(u,{href:"/app/a/settings/accessibility",description:"Toggle QOL features",title:"Accessibility",icon:a.Accessibility}),e.jsx(u,{href:"/app/a/settings/admin",description:"Hiya, Admin 👋",title:"Admin tools",icon:a.Tools}),e.jsx(u,{href:"/app/a/settings/developer",description:"For development purposes only",title:"Developer tools",icon:a.Tools})]});var x=(s=>(s[s.web=0]="web",s[s.desktop=1]="desktop",s[s.cli=2]="cli",s[s.external=3]="external",s))(x||{});const q=()=>{const[s,n]=d.useState(0),[t,o]=d.useState([]),[i,v]=d.useState([]);return d.useEffect(()=>{c.getJson("/core/sessions",l=>{o(l.sessions)}),c.getJson("/core/personal-server-accelerator/sessions",l=>{v(l.sessions)})},[s]),e.jsxs("div",{className:"h-full overflow-auto",children:[e.jsx("h1",{className:"font-bold text-container-fg text-4xl tracking-wide pb-4 pt-4 pl-6 pr-6 bg-container-bg",children:"YourDash Settings | Sessions"}),e.jsxs("main",{className:"ml-auto mr-auto w-full max-w-5xl p-4",children:[e.jsx("h2",{className:"ml-auto mr-auto w-full max-w-5xl font-semibold text-4xl tracking-wide pb-2",children:"Sessions"}),e.jsx("section",{className:"gap-2 flex flex-wrap",children:t.map(l=>e.jsxs(h,{className:"p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]",children:[e.jsxs("div",{className:"font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full",children:[l.id,l.type===x.web&&e.jsx(p,{className:"aspect-square h-8 m-auto ml-0",icon:a.Browser}),l.type===x.cli&&e.jsx(p,{className:"aspect-square h-8 m-auto ml-0",icon:a.Terminal}),l.type===x.desktop&&e.jsx(p,{className:"aspect-square h-8 m-auto ml-0",icon:a.DeviceDesktop}),l.type===x.external&&e.jsx(p,{className:"aspect-square h-8 m-auto ml-0",icon:a.Question})]}),e.jsxs("div",{className:"w-full bg-container-secondary-bg pl-4 p-3 flex text-container-fg items-center justify-between",children:[e.jsxs("span",{children:[l.type===x.web&&"Web",l.type===x.cli&&"Cli",l.type===x.desktop&&"Desktop",l.type===x.external&&"External"]}),e.jsx(b,{icon:a.X,onClick:()=>{c.deleteJson(`/core/session/${l.id}`,()=>{n(s+1)})}})]})]},l.id))}),e.jsx("h2",{className:"ml-auto mr-auto w-full max-w-5xl font-semibold text-4xl tracking-wide pb-2 pt-8",children:"PSA Supported Sessions"}),e.jsx("section",{className:"gap-2 flex flex-wrap",children:i.map(l=>e.jsxs(h,{className:"p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]",children:[e.jsxs("div",{className:"font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full",children:[l.id,e.jsx(p,{className:"aspect-square h-8 m-auto ml-0",icon:a.DeviceDesktop})]}),e.jsxs("div",{className:"w-full bg-container-secondary-bg pl-4 p-3 flex text-container-fg justify-between items-center",children:[e.jsx("span",{children:"Desktop"}),e.jsx(b,{icon:a.X,onClick:()=>{c.deleteJson(`/core/session/${l.id}`,()=>{n(s+1)})}})]})]},l.id))})]})]})},T=()=>{const s=y();return e.jsxs("main",{className:"grid grid-cols-1 grid-rows-[auto,1fr] md:grid-rows-none md:grid-cols-[auto,1fr] h-full w-full bg-bg",children:[e.jsx(k,{defaultState:D.NormalMinimised,title:"Settings",items:[{type:j.Button,icon:a.Home,label:"Home",onClick(){s("/app/a/settings/")}},{type:j.Button,icon:a.Paintbrush,label:"Personalization",onClick(){s("/app/a/settings/personalization")}},{type:j.Button,icon:a.Login,label:"Login sessions",onClick(){s("/app/a/settings/session")}},{type:j.Button,icon:a.Accessibility,label:"Accessibility",onClick(){s("/app/a/settings/accessibility")}},{type:j.Button,icon:a.Tools,label:"Admin tools",onClick(){s("/app/a/settings/admin")}}]}),e.jsx(P,{})]})},M=()=>e.jsxs(m,{title:"Personalization",children:[e.jsx(u,{href:"/app/a/settings/personalization/panel",description:"Customize your panel",title:"Panel",icon:a.Paintbrush}),e.jsx(u,{href:"/app/a/settings/personalization/dashboard",description:"Customize your dashboard",title:"Dashboard",icon:a.Paintbrush}),e.jsx(u,{href:"/app/a/settings/personalization/theme",description:"Customize the look of YourDash",title:"Theme",icon:a.Accessibility})]}),U="_component_1vbjj_6",g={component:U},F=({username:s,avatar:n,name:t})=>e.jsxs(h,{className:g.component,children:[e.jsx("img",{className:g.avatar,src:n,alt:"user's avatar"}),e.jsxs("div",{className:g.name,children:["name: ",t.first,", ",t.last]}),e.jsxs("div",{className:g.username,children:["username: ",s]})]}),G=()=>{const[s,n]=w.useState([]);return w.useEffect(()=>{n([{avatar:"",name:{first:"John",last:"Doe"},username:"johnd"},{avatar:"",name:{first:"Jane",last:"Doe"},username:"janed"}])}),e.jsx(e.Fragment,{children:s.map(t=>e.jsx(F,{username:t.username,avatar:t.avatar,name:t.name},t.username))})},W=()=>{const[s,n]=w.useState("usersView");switch(s){case"createUser":return e.jsx(e.Fragment,{children:"WIP"});case"usersView":return e.jsx(G,{});case"manageUser":return e.jsx(e.Fragment,{children:"WIP"})}},Q=()=>e.jsxs(m,{title:"Admin tools",children:[e.jsx(W,{}),e.jsx("section",{className:"w-full h-full flex flex-col items-center col-span-2",children:e.jsx(B,{})})]}),X=({value:s,setValue:n,...t})=>e.jsx(N,{...t,children:e.jsx(_,{setValue:o=>n(o),value:s})}),E=()=>{const[s,n]=d.useState(c.userDB.get("dash:useBrowserLayout")||!1);return e.jsx(m,{title:"Dashboard personalization",children:e.jsx(X,{title:"Use browser layout",icon:a.Browser,description:'Use the "browser" layout instead of the "dashboard" layout',value:s,setValue:t=>{c.userDB.set("dash:useBrowserLayout",t),n(t)}})})},C=({value:s,setValue:n,options:t,...o})=>e.jsx(N,{...o,children:e.jsx(z,{items:t.map(i=>({name:i.name,onClick:()=>{n(i.value)}})),children:s})}),K=()=>{const[s,n]=d.useState(c.userDB.get("core:panel:size")),[t,o]=d.useState(c.userDB.get("core:panel:side"));return e.jsxs(m,{title:"Panel",children:[e.jsx(C,{title:"Panel Size",icon:a.Gear,description:"Set the size of the panel and it's widgets",options:[{value:"small",name:"Small"},{value:"medium",name:"Medium (Default)"},{value:"large",name:"Large"}],value:s||"medium",setValue:i=>{n(i),c.userDB.set("core:panel:size",i),window.__yourdashCorePanelReload()}}),e.jsx(C,{title:"Panel Side",icon:a.Gear,description:"Set the side that the panel is on the screen",options:[{value:"top",name:"Top"},{value:"right",name:"Right"},{value:"bottom",name:"Bottom"},{value:"left",name:"Left (Default)"}],value:t||"left",setValue:i=>{o(i),c.userDB.set("core:panel:side",i),window.__yourdashCorePanelReload()}})]})},Z="_avatar_1804c_6",H={avatar:Z},Y=({name:s,username:n,avatar:t,bio:o,url:i})=>e.jsxs(h,{children:[e.jsx("img",{src:t,alt:"",className:H.avatar}),e.jsxs("div",{children:[e.jsx("span",{children:s.first}),e.jsx("span",{children:s.last})]}),e.jsxs("div",{children:["@",n]}),e.jsx("div",{children:o}),e.jsx("a",{href:i,children:i})]}),O=()=>{const[s,n]=w.useState({name:{first:"Admin",last:"Istrator"},avatar:"abc",username:"admin",bio:"This is the user's sample bio",url:"https://github.com/yourdash-app/yourdash"});return d.useEffect(()=>{c.getText("/core/user/current/avatar/original",t=>{n({...s,avatar:`${c.getInstanceUrl()}${t}`})})},[]),e.jsx(m,{title:"Profile",children:e.jsx(Y,{name:s.name,avatar:s.avatar,username:s.username,bio:s.bio,url:s.url})})},ee=()=>{const[s,n]=d.useState([]),[t,o]=d.useState(null);return d.useEffect(()=>{c.getJson("/core/personal-server-accelerator/sessions",i=>{n(i.sessions)})},[]),e.jsxs("div",{children:[e.jsx("h2",{children:"Personal Server Accelerator DEBUGGER"}),e.jsxs("main",{children:[e.jsxs("section",{children:[e.jsx("h2",{children:`Select a session: Session ${(t==null?void 0:t.id)||0} selected`}),e.jsx(L,{children:s.map(i=>e.jsx(h,{onClick:()=>{o(i)},className:"p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]",children:e.jsxs("div",{className:"font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full",children:[i.id,e.jsx(p,{className:"aspect-square h-8 m-auto ml-0",icon:a.DeviceDesktop})]})},i.id))})]}),e.jsx(S,{onClick:()=>{c.getJson(`/app/settings/debug/psa/update/${(t==null?void 0:t.id)||0}`,i=>0)},children:"Trigger update"})]})]})},se=()=>{const s=I();return e.jsx(e.Fragment,{children:e.jsx(S,{onClick:()=>{c.getJson("/app/settings/developer/install_all_applications",()=>(window.__yourdashCorePanelReload(),s.toast.success("Installed all applications"),0))},children:"Install all applications"})})},te=()=>e.jsxs(m,{title:"Developer tools",children:[e.jsx(ee,{}),e.jsx(se,{})]}),ae=()=>e.jsx(m,{title:"Accessibility",children:e.jsx("section",{className:"w-full h-full flex flex-col items-center col-span-2",children:e.jsx(B,{})})}),ie=()=>e.jsx($,{children:e.jsxs(r,{element:e.jsx(T,{}),children:[e.jsx(r,{index:!0,element:e.jsx(V,{})}),e.jsx(r,{path:"profile",children:e.jsx(r,{index:!0,element:e.jsx(O,{})})}),e.jsxs(r,{path:"personalization",children:[e.jsx(r,{index:!0,element:e.jsx(M,{})}),e.jsx(r,{path:"dashboard",element:e.jsx(E,{})}),e.jsx(r,{path:"panel",element:e.jsx(K,{})})]}),e.jsx(r,{path:"session",children:e.jsx(r,{index:!0,element:e.jsx(q,{})})}),e.jsx(r,{path:"accessibility",children:e.jsx(r,{index:!0,element:e.jsx(ae,{})})}),e.jsx(r,{path:"admin",children:e.jsx(r,{index:!0,element:e.jsx(Q,{})})}),e.jsx(r,{path:"developer",children:e.jsx(r,{index:!0,element:e.jsx(te,{})})})]})});export{ie as default};
