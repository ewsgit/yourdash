import{j as e,c as v,u as b,b as l,d as N,r as m,I,U as B,e as y,T,f as j,g as u,h as R,B as f,i as h,k as P,D as E,m as S}from"./index-ad359391.js";import{R as k}from"./RightClickMenuContext-291e5f7a.js";const A="_launcherButton_1wcy6_10",D="_launcherButtonIcon_1wcy6_42",F="_widgetContainer_1wcy6_46",L={launcherButton:A,launcherButtonIcon:D,widgetContainer:F},M="_applicationLauncher_u8tid_10",U="_content_u8tid_25",J="_sideTop_u8tid_43",q="_sideRight_u8tid_68",z="_sideBottom_u8tid_94",O="_sideLeft_u8tid_119",Q="_invisible_u8tid_145",G="_footer_u8tid_150",d={applicationLauncher:M,content:U,sideTop:J,sideRight:q,sideBottom:z,sideLeft:O,invisible:Q,footer:G},K=({items:i,children:o,className:t})=>e.jsx(v.Consumer,{children:n=>e.jsx("div",{className:t,onContextMenu:c=>{c.stopPropagation(),c.preventDefault();const a=c.currentTarget.getBoundingClientRect();n.createMenu({x:c.pageX,y:c.pageY,width:a.width,height:a.height,items:i});const s=r=>{r.preventDefault(),n.destroyMenu(),window.removeEventListener("click",s),window.removeEventListener("contextmenu",s)};window.addEventListener("click",s),window.addEventListener("contextmenu",s)},children:o})}),V="_grid_1ayy9_6",X="_itemIcon_1ayy9_14",Y="_itemLabel_1ayy9_21",W="_item_1ayy9_14",H="_itemContent_1ayy9_34",w={grid:V,itemIcon:X,itemLabel:Y,item:W,itemContent:H},Z=({modules:i})=>{const o=b();return e.jsx("section",{className:w.grid,children:i.map(t=>e.jsx(K,{items:[{label:"Pin To Panel",async onClick(){var n;return await l.postJson("/core/panel/quick-shortcuts/create",{id:t.id,moduleType:t.type}),(n=window.__yourdashCorePanelQuickShortcutsReload)==null||n.call(window),0}},{label:"Open In New Tab",onClick(){return window.open(`${window.location.origin}${window.location.pathname}/app/a/${t.id}`,"_blank"),0}}],className:w.item,children:e.jsxs(N,{onClick:()=>{o(t.url)},className:w.itemContent,children:[e.jsx("img",{className:w.itemIcon,src:`${l.getInstanceUrl()}${t.icon}`,draggable:!1,loading:"lazy",alt:""}),e.jsx("span",{className:w.itemLabel,children:t.displayName})]})},t.id))})},ee="_searchBar_1e44p_6",te={searchBar:ee},$=({items:i,children:o,...t})=>{const n=m.useContext(k);return e.jsx("section",{...t,onContextMenu:c=>{c.stopPropagation(),c.preventDefault();const a=c.currentTarget.getBoundingClientRect();n(c.pageX,c.pageY,a.width,a.height,!0,i);const s=r=>{r.preventDefault(),n(0,0,a.width,a.height,!1,[]),window.removeEventListener("click",s),window.removeEventListener("contextmenu",s)};window.addEventListener("click",s),window.addEventListener("contextmenu",s)},children:o})},ne="_grid_mw6bn_6",ie="_itemIcon_mw6bn_14",oe="_itemLabel_mw6bn_21",se="_item_mw6bn_14",ae="_itemContent_mw6bn_35",g={grid:ne,itemIcon:ie,itemLabel:oe,item:se,itemContent:ae},ce=({applications:i})=>{const o=b();return e.jsx("section",{className:g.grid,children:i.map(t=>e.jsx($,{items:[{label:"Pin To Panel",async onClick(){var n;return await l.postJson("/core/panel/quick-shortcuts/create",{id:t.id,moduleType:t.type}),(n=window.__yourdashCorePanelQuickShortcutsReload)==null||n.call(window),0}},{label:"Open In New Tab",onClick(){return window.open(`${window.location.origin}${window.location.pathname}/app/a/${t.id}`,"_blank"),0}}],className:g.item,onClick:()=>{o(t.url)},children:e.jsxs("div",{className:g.itemContent,children:[e.jsx("img",{loading:"lazy",className:g.itemIcon,src:`${l.getInstanceUrl()}${t.icon}`,draggable:!1,alt:""}),e.jsx("span",{className:g.itemLabel,children:t.displayName})]})},t.id))})},re=({items:i,className:o,icon:t})=>{const n=m.useContext(k),[c,a]=m.useState(!1);return e.jsx(I,{icon:t,className:o,onClick:s=>{s.stopPropagation(),s.preventDefault();const r=s.currentTarget.getBoundingClientRect();if(c){n(0,0,r.width,r.height,!1,[]),a(!1);return}n(r.left,r.bottom,r.width,r.height,!0,i.map(_=>({label:_.label,onClick:()=>{_.onClick()},shortcut:_.shortcut}))),a(!0);const C=_=>{_.preventDefault(),n(0,0,r.width,r.height,!1,[]),a(!1),window.removeEventListener("click",C),window.removeEventListener("contextmenu",C)};window.addEventListener("click",C),window.addEventListener("contextmenu",C)}})},le="_grid_bno12_6",de="_itemIcon_bno12_14",ue="_itemLabel_bno12_21",me="_item_bno12_14",_e="_itemContent_bno12_35",p={grid:le,itemIcon:de,itemLabel:ue,item:me,itemContent:_e},he=({applications:i})=>{const o=b();return e.jsx("section",{className:p.grid,children:i.map(t=>e.jsx($,{items:[{label:"Pin To Panel",async onClick(){var n;return await l.postJson("/core/panel/quick-shortcuts/create",{id:t.id,moduleType:t.type}),(n=window.__yourdashCorePanelQuickShortcutsReload)==null||n.call(window),0}},{label:"Open In New Tab",onClick(){return window.open(`${window.location.origin}${window.location.pathname}/app/a/${t.id}`,"_blank"),0}}],className:p.item,onClick:()=>{o(t.url)},children:e.jsxs("div",{className:p.itemContent,children:[e.jsx("img",{loading:"lazy",className:p.itemIcon,src:`${l.getInstanceUrl()}${t.icon}`,draggable:!1,alt:""}),e.jsx("span",{className:p.itemLabel,children:t.displayName}),e.jsx(re,{className:"ml-auto",items:[{label:"Pin To Panel",async onClick(){var n;return await l.postJson("/core/panel/quick-shortcuts/create",{id:t.id,moduleType:t.type}),(n=window.__yourdashCorePanelQuickShortcutsReload)==null||n.call(window),0}},{label:"Open In New Tab",onClick(){return window.open(`${window.location.origin}${window.location.pathname}/app/a/${t.id}`,"_blank"),0}}],icon:B.ThreeBars})]})},t.id))})};let x=[];const we=({apps:i,layout:o})=>{const t=b(),[n,c]=y.useState(i);return m.useEffect(()=>{c(i)},[i]),e.jsxs(e.Fragment,{children:[e.jsx(T,{accessibleName:"Search Applications",placeholder:"Search Applications",className:j(te.searchBar,"top-0 sticky z-10"),onEnter:()=>{x.length===1&&t(`/app/a/${x[0].displayName}`)},onChange:a=>{x=i.filter(s=>s.displayName.toLowerCase().includes(a.toLowerCase())||s.description.toLowerCase().includes(a.toLowerCase())||s.displayName.toLowerCase().includes(a.toLowerCase())),c(x)},icon:u.Search}),o==="large-grid"&&e.jsx(Z,{modules:n}),o==="small-grid"&&e.jsx(ce,{applications:n}),o==="list"&&e.jsx(he,{applications:n})]})},ge=({side:i,visible:o})=>{var s;const t=b(),n=R(()=>l.getJson("/core/panel/applications"),[])||[],[c,a]=y.useState("large-grid");return e.jsxs("div",{className:j(d.applicationLauncher,i==="top"&&`${d.sideTop} animate__slideInLeft`,i==="right"&&`${d.sideRight} animate__slideInDown`,i==="bottom"&&`${d.sideBottom} animate__slideInLeft`,i==="left"&&`${d.sideLeft} animate__slideInDown`,"animate__animated animate__duration_500ms",!o&&d.invisible),children:[e.jsx(f,{className:d.content,children:e.jsx(we,{apps:n,layout:c})}),e.jsxs(f,{className:d.footer,children:[e.jsx(h,{accessibleLabel:"Logout",className:d.logoutButton,icon:u.Logout,onClick:()=>{l.logout(),t("/login")}}),e.jsx("div",{children:e.jsx(h,{accessibleLabel:"Profile",icon:u.Person,"aria-label":"User Profile Settings",onClick:()=>{t("/instance-profiles/me")}})}),e.jsx("span",{children:((s=l.userDB.get("user:name"))==null?void 0:s.first)||"Unknown First Name"}),e.jsx(h,{accessibleLabel:"Filter small grid",className:"ml-auto",icon:u.Filter,onClick:()=>{a("small-grid")}}),e.jsx(h,{accessibleLabel:"Filter large grid",icon:u.Filter,onClick:()=>{a("large-grid")}}),e.jsx(h,{accessibleLabel:"Filter list",icon:u.Filter,onClick:()=>{a("list")}})]})]})},pe=m.memo(ge),xe=({side:i})=>{const[o,t]=y.useState(!1),n=P();return m.useEffect(()=>{t(!1)},[n]),e.jsx(E,{children:e.jsxs("div",{className:L.widgetContainer,children:[e.jsx("button",{"aria-label":"Application Launcher",className:L.launcherButton,onClick:()=>t(!o),children:e.jsx(S,{icon:u.AppLauncher,className:L.launcherButtonIcon})}),e.jsx(pe,{side:i,visible:o})]})})};export{xe as default};
