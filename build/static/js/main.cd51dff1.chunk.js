(this["webpackJsonpflow-frontend"]=this["webpackJsonpflow-frontend"]||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),o=n(51),a=n.n(o),i=n(24),s=n(5),u=n(52),j=Object(c.createContext)(),d=n(55),f=n(2),l=n(1),b=function(e){var t=Object(c.useState)(""),n=Object(s.a)(t,2),r=n[0],o=n[1],a=Object(c.useContext)(j),i=a.Socket,u=a.name,d=a.setName,f=a.setRoom,b=a.setIsAdmin;return Object(c.useEffect)((function(){if(i){var t=function(t,n,c){f(t),b(c),d(n),c?e.history.push("/room/admin/"+t):e.history.push("/room/"+t)};return i.on("room-joined",t),function(){return i.off("room-joined",t)}}}),[i,b,d,e,f]),Object(l.jsx)("div",{className:"room-join-screen-wrapper",children:Object(l.jsxs)("div",{className:"room-join-box",children:[Object(l.jsx)("input",{onChange:function(e){return d(e.target.value)}}),Object(l.jsxs)("div",{children:[Object(l.jsx)("input",{placeholder:"room code",onChange:function(e){o(e.target.value)}}),Object(l.jsx)("button",{onClick:function(){return i.emit("join-room",r,u)},children:"Join Room"})]}),Object(l.jsx)("button",{onClick:function(){return i.emit("create-room",u)},children:"Create Room"})]})})},O=function(e){var t=e.onPenChange,n=e.onColorChange;return Object(l.jsxs)("div",{className:"canvas-control",children:[Object(l.jsxs)("div",{children:[Object(l.jsx)("label",{htmlFor:"pen-size",children:"Pen Size"}),Object(l.jsx)("input",{name:"pen-size",onChange:function(e){return t(e.target.value)},defaultValue:"10",type:"range",min:"1",max:"100"})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("label",{htmlFor:"pen-color",children:"Pen Color"}),Object(l.jsx)("input",{name:"pen-color",onChange:function(e){return n(e.target.value)},type:"color"})]}),Object(l.jsx)("button",{onClick:function(){return e.onClear()},children:"Clear"})]})},m=function(e){var t=Object(c.useContext)(j),n=t.Socket,o=t.room,a=t.isAdmin,i=Object(c.useRef)(),s=Object(c.useRef)(!1),u=Object(c.useRef)("#000000"),d=Object(c.useRef)(10),f=function(){n.emit("canvas-cleared",o),i.current.getContext("2d").clearRect(0,0,i.current.width,i.current.height)},b=function(e,t,n,c){var r=i.current.getContext("2d");r.beginPath(),r.strokeStyle=u.current,r.lineWidth=d.current,r.lineCap="round",r.moveTo(e,t),r.lineTo(n,c),r.stroke(),r.closePath()};return Object(c.useEffect)((function(){!a&&n&&n.on("canvas-cleared",(function(){return f()}))})),Object(c.useEffect)((function(){if(i.current&&a){var e=0,t=0;i.current.addEventListener("mousedown",(function(n){e=n.offsetX,t=n.offsetY,s.current=!0})),i.current.addEventListener("mouseup",(function(n){e=n.offsetX,t=n.offsetY,s.current=!1})),i.current.addEventListener("mousemove",(function(c){s.current&&(b(e,t,c.offsetX,c.offsetY),n.emit("canvas-edited",e,t,c.offsetX,c.offsetY,o),e=c.offsetX,t=c.offsetY,n.emit("canvas-image-edited",i.current.toDataURL("image/png"),o))})),i.current.addEventListener("touchstart",(function(n){n.preventDefault();var c=n.target.getBoundingClientRect();e=n.targetTouches[0].clientX-c.x,t=n.targetTouches[0].clientY-c.y,s.current=!0})),i.current.addEventListener("touchend",(function(e){e.preventDefault(),s.current=!1})),i.current.addEventListener("touchmove",(function(c){if(c.preventDefault(),s.current){var r=c.target.getBoundingClientRect(),a=c.targetTouches[0].clientX-r.x,u=c.targetTouches[0].clientY-r.y;b(e,t,a,u),n.emit("canvas-edited",e,t,c.offsetX,c.offsetY,o),e=a,t=u,n.emit("canvas-image-edited",i.current.toDataURL("image/png"),o)}}))}})),Object(c.useEffect)((function(){if(n){var e=function(e){!function(e){var t=i.current.getContext("2d"),n=new Image;n.src=e,n.onload=function(){t.drawImage(n,0,0,i.current.width,i.current.height)}}(e)};return n.on("canvas-image-update",e),function(){return n.off("canvas-image-update",e)}}}),[n,e]),Object(l.jsxs)(r.a.Fragment,{children:[Object(l.jsx)("canvas",{ref:i,width:e.width,height:9*e.width/16}),a&&Object(l.jsx)(O,{onClear:f,onPenChange:function(e){return d.current=e},onColorChange:function(e){return u.current=e}})]})},h=n(17),v=function(e){var t=Object(c.useState)([]),n=Object(s.a)(t,2),o=n[0],a=n[1],i=Object(c.useContext)(j),u=i.room,d=i.Socket,f=i.name,b=Object(c.useState)(""),O=Object(s.a)(b,2),m=O[0],v=O[1],x=Object(c.useState)(!1),p=Object(s.a)(x,2),g=p[0],w=p[1];Object(c.useEffect)((function(){if(d){var e=function(e){var t={name:e.name,message:e.message,isOwn:e.isOwn};a([].concat(Object(h.a)(o),[t]))};return d.on("chat-recieved",e),function(){return d.off("chat-recieved",e)}}}),[a,d,o]);var C={};return window.screen.width>768&&g&&(C={right:"0%"}),window.screen.width>768&&!g&&(C={right:"-30%"}),window.screen.width<768&&!g&&(C={top:"100%"}),window.screen.width<768&&g&&(C={top:"10%"}),Object(l.jsxs)(r.a.Fragment,{children:[Object(l.jsx)("button",{onClick:function(){return w(!g)},children:" Toggle Chat"}),Object(l.jsxs)("div",{className:"chatbox",style:C,children:[Object(l.jsx)("button",{onClick:function(){return w(!1)},children:"Down"}),Object(l.jsxs)("div",{className:"chatbox-chats",children:["dawd",o.map((function(e){return Object(l.jsx)("div",{children:e.name+" -- "+e.message})}))]}),Object(l.jsxs)("div",{className:"chat-message-box",children:[Object(l.jsx)("input",{onChange:function(e){return v(e.target.value)}}),Object(l.jsx)("button",{onClick:function(){return d.emit("new-chat",m,f,u)},children:"Send"})]})]})]})},x=n(32),p=n.n(x),g=n(53),w=n(54),C=function(e){var t=Object(c.useContext)(j),n=t.room,r=t.Socket,o=t.isAdmin,a=Object(c.useState)([]),i=Object(s.a)(a,2),u=i[0],d=i[1];return Object(c.useEffect)((function(){r&&r.on("files-uploaded",(function(e,t,n){d([].concat(Object(h.a)(u),[{link:URL.createObjectURL(new Blob([e],{type:n,name:t})),name:t}]))}))})),Object(l.jsxs)("div",{className:"file-box",children:[o&&Object(l.jsx)("input",{type:"file",onChange:function(){var e=Object(w.a)(p.a.mark((function e(t){var c,o,a,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=Object(g.a)(t.target.files),e.prev=1,c.s();case 3:if((o=c.n()).done){e.next=12;break}return a=o.value,e.next=7,a.arrayBuffer();case 7:i=e.sent,r.emit("file-upload",i,a.name,a.type,n),d([].concat(Object(h.a)(u),[{link:URL.createObjectURL(new Blob([a],{type:a.type,name:a.name})),name:a.name}]));case 10:e.next=3;break;case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),c.e(e.t0);case 17:return e.prev=17,c.f(),e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[1,14,17,20]])})));return function(t){return e.apply(this,arguments)}}()}),Object(l.jsx)("div",{className:"filebox-files",children:u.map((function(e){return Object(l.jsxs)("div",{className:"file-box-file",children:[Object(l.jsx)("span",{onClick:function(){return window.open(e.link)},children:e.name}),o&&Object(l.jsx)("button",{onClick:function(){var t=u.indexOf(e),n=Object(h.a)(u);n.splice(t,1),d(n)},children:"adaw"})]},e.name)}))})]})},k=function(e){return Object(c.useContext)(j).room||e.history.replace("/"),Object(l.jsxs)("div",{className:"room-page-wrapper",children:[e.admin&&Object(l.jsx)("div",{children:"you are an admin"}),Object(l.jsx)(m,{id:"canvas-element",width:.8*window.visualViewport.width}),Object(l.jsx)(C,{}),Object(l.jsx)(v,{})]})};var y=function(){var e=Object(c.useState)(),t=Object(s.a)(e,2),n=t[0],r=t[1],o=Object(c.useState)(),a=Object(s.a)(o,2),O=a[0],m=a[1],h=Object(c.useState)(),v=Object(s.a)(h,2),x=v[0],p=v[1],g=Object(c.useState)(),w=Object(s.a)(g,2),C=w[0],y=w[1];return Object(c.useEffect)((function(){var e=Object(u.io)("/");return r(e),function(){return e.disconnect()}}),[r]),Object(l.jsx)(j.Provider,{value:{Socket:n,room:O,setRoom:m,name:C,setName:y,isAdmin:x,setIsAdmin:p},children:Object(l.jsx)(d.a,{children:Object(l.jsxs)(f.c,{children:[Object(l.jsx)(f.a,{path:"/room/admin/:id",render:function(e){return Object(l.jsx)(k,Object(i.a)(Object(i.a)({},e),{},{admin:!0}))}}),Object(l.jsx)(f.a,{path:"/room/:id",render:function(e){return Object(l.jsx)(k,Object(i.a)({},e))}}),Object(l.jsx)(f.a,{path:"/",render:function(e){return Object(l.jsx)(b,Object(i.a)({},e))}})]})})})};n(99);a.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(y,{})}),document.getElementById("root"))},99:function(e,t,n){}},[[100,1,2]]]);
//# sourceMappingURL=main.cd51dff1.chunk.js.map