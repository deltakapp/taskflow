(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{125:function(e,t,n){},126:function(e,t,n){},127:function(e,t,n){},128:function(e,t,n){},129:function(e,t,n){},130:function(e,t,n){},143:function(e,t,n){},144:function(e,t,n){},145:function(e,t,n){},146:function(e,t,n){},147:function(e,t,n){},148:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(26),s=n.n(a),o=n(4),i=n(7),u=n(5),l=n(22),j=n(13),d=n(2),b=n.n(d),p=n(6),h=n(3),f="localhost"===window.location.hostname?"http://localhost:5000":"https://taskflow.herokuapp.com";function O(e,t,n){var c={method:e,headers:{Authorization:t,cache:"no-store"}};return n&&(c.headers["Content-Type"]="application/json",c.body=JSON.stringify(n)),c}function x(e){return g.apply(this,arguments)}function g(){return(g=Object(p.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text();case 2:if(e.t0=e.sent,e.t0){e.next=5;break}e.t0="Unknown Error. Please try again or contact the site administrator.";case 5:n=e.t0,alert("Error: ".concat(n));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){return[O,Object(o.c)(),x,"".concat(f,"/api"),Object(o.d)((function(e){return e.token}))]}var k=n(0);function v(){var e=m(),t=Object(h.a)(e,4),n=t[0],r=t[1],a=t[2],s=t[3],l=Object(u.g)(),d=Object(o.d)((function(e){return e.user}),o.b);function f(){return(f=Object(p.a)(b.a.mark((function e(t){var c,o,i,u,l;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),c=document.getElementById("user-email"),o=document.getElementById("user-password"),i=n("POST",null,{email:c.value,password:o.value}),e.next=6,fetch("".concat(s,"/users/login"),i);case 6:if(!(u=e.sent).ok){e.next=14;break}return e.next=10,u.json();case 10:l=e.sent,r({type:"user/loggedIn",payload:l.user,token:l.token}),e.next=15;break;case 14:a(u);case 15:c.value="",o.value="";case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return(O=Object(p.a)(b.a.mark((function e(){var t,c,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n("POST",null,{}),e.next=3,fetch("".concat(s,"/users/temp/"),t);case 3:if(!(c=e.sent).ok){e.next=12;break}return e.next=7,c.json();case 7:o=e.sent,r({type:"user/created",payload:Object(j.a)({flag:"TEMP"},o.user),token:o.token}),alert("A temporary user profile has been created for you. If you wish to save your projects, create an account by clicking on the user tab in the top right corner."),e.next=13;break;case 12:a(c);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(c.useEffect)((function(){d.id&&("TEMP"===d.flag?l("../preview/".concat(d.id,"/projects")):l("../users/".concat(d.id,"/projects")))}),[d,l]),Object(k.jsxs)("main",{className:"single",children:[Object(k.jsx)("img",{className:"logo",alt:"Taskflow.tech",src:"/logo.png"}),Object(k.jsx)("h1",{children:Object(k.jsx)("a",{href:"/",children:"Taskflow.tech"})}),Object(k.jsx)("h2",{children:"Login"}),Object(k.jsxs)("form",{onSubmit:function(e){return f.apply(this,arguments)},children:[Object(k.jsx)("input",{id:"user-email",type:"text",placeholder:"E-mail"}),Object(k.jsx)("input",{id:"user-password",type:"password",placeholder:"Password"}),Object(k.jsx)("button",{type:"submit",children:"Log In"})]}),Object(k.jsx)("h3",{children:Object(k.jsx)(i.b,{to:"/signup",children:"Sign Up"})}),Object(k.jsx)("br",{}),Object(k.jsx)("h3",{children:Object(k.jsx)("a",{href:"#",onClick:function(){return O.apply(this,arguments)},children:"Preview the app"})})]})}function y(){var e=Object(u.g)();return Object(c.useEffect)((function(){setTimeout((function(){e("/")}),1500)}),[e]),Object(k.jsxs)("main",{className:"single",children:[Object(k.jsx)("img",{className:"logo",alt:"Taskflow.tech",src:"/logo.png"}),Object(k.jsx)("h1",{children:Object(k.jsx)("a",{href:"/",children:"Taskflow.tech"})}),Object(k.jsx)("h2",{children:"You have been logged out and will be redirected."})]})}var w=n(15),I=n(49),C=n(27),N=(n(62),"projectTab"),T="stage";function S(e){var t=e.index,n=e.title,r=e.projectId,a=e.isActiveProject,s=e.reorderProjects,o=e.loadProject,i=Object(c.useRef)(null),u=Object(w.useDrop)({accept:N,hover:function(e,n){var c;if(i.current){var r=e.index,a=t;if(r!==a){var o=null===(c=i.current)||void 0===c?void 0:c.getBoundingClientRect(),u=(o.right-o.left)/2,l=n.getClientOffset().x-o.left;r<a&&l<u||r>a&&l>u||(s(r,a),e.index=a)}}}}),l=Object(h.a)(u,2)[1],j=Object(w.useDrag)({type:N,item:function(){return{title:n,index:t}},collect:function(e){return{isDragging:e.isDragging()}}}),d=Object(h.a)(j,2),b=d[0].isDragging?0:1;return(0,d[1])(l(i)),Object(k.jsx)("li",{ref:i,className:a?"active-project":"inactive-project",style:{opacity:b},children:Object(k.jsx)("button",{className:"btn",onClick:function(){return o(r)},children:n})})}function E(){var e=m(),t=Object(h.a)(e,5),n=t[0],r=t[1],a=t[2],s=t[3],i=t[4],l=Object(u.g)(),j=Object(o.d)((function(e){return e.user.projects}),o.b),d=Object(o.d)((function(e){return e.project.projectId})),f=Object(c.useState)(!1),O=Object(h.a)(f,2),x=O[0],g=O[1],v=Object(c.useCallback)(function(){var e=Object(p.a)(b.a.mark((function e(t){var c,o,u,l;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),c=n("POST",i,{title:"".concat(document.getElementById("new-project-title").value)}),e.next=4,fetch("".concat(s,"/projects/"),c);case 4:if(!(o=e.sent).ok){e.next=15;break}return u=o.headers.get("X-Auth-Token"),e.next=9,o.json();case 9:l=e.sent,console.log(o),r({type:"project/created",payload:l.project,token:u}),g(!1),e.next=16;break;case 15:a(o);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[i,n,r,a,s]),y=Object(c.useCallback)(function(){var e=Object(p.a)(b.a.mark((function e(t){var c,o,u,j;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=n("GET",i),e.next=3,fetch("".concat(s,"/projects/").concat(t),c);case 3:if(!(o=e.sent).ok){e.next=14;break}return u=o.headers.get("X-Auth-Token"),e.next=8,o.json();case 8:j=e.sent,console.log(o),r({type:"project/loaded",payload:j.project,token:u}),l("../projects/".concat(t)),e.next=15;break;case 14:a(o);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[i,n,r,a,s,l]),w=Object(c.useCallback)(function(){var e=Object(p.a)(b.a.mark((function e(t,c){var o,u,l,d;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i){e.next=2;break}return e.abrupt("return");case 2:return(o=Object(C.a)(j)).splice(c,0,o.splice(t,1)[0]),r({type:"user/reorderProjects",payload:o}),u=n("PATCH",i,{projects:o.map((function(e){return e.projectId}))}),e.next=8,fetch("".concat(s,"/users/"),u);case 8:(l=e.sent).ok?(d=l.headers.get("X-Auth-Token"))&&r({type:"token/refresh",token:d}):a(l);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[j,i,n,r,a,s]),I=Object(c.useCallback)((function(e,t,n){return Object(k.jsx)(S,{index:e,title:t,projectId:n,isActiveProject:n===d,reorderProjects:w,loadProject:y},n)}),[w,y]),N=x?Object(k.jsx)("div",{className:"overlay",children:Object(k.jsx)("div",{className:"overlay-inner",children:Object(k.jsxs)("form",{id:"new-project-creator",onSubmit:v,children:[Object(k.jsx)("label",{htmlFor:"new-project-title",children:"New Project:"}),Object(k.jsx)("input",{id:"new-project-title"}),Object(k.jsxs)("div",{className:"two-button mt-2",children:[Object(k.jsx)("button",{id:"submit",children:"Create Project"}),Object(k.jsx)("button",{className:"btn-close-task-creator ml-1",onClick:function(){return g(!1)},type:"button",children:"Cancel"})]})]})})}):Object(k.jsx)("li",{className:"add-project",children:Object(k.jsx)("button",{onClick:function(){return g(!0)},title:"Add new project",children:Object(k.jsx)("svg",{height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",children:Object(k.jsx)("path",{fillRule:"evenodd",d:"M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"})})})});return Object(k.jsxs)("nav",{id:"navbar",children:[Object(k.jsxs)("ul",{className:"tabrow",children:[null===j||void 0===j?void 0:j.map((function(e,t){return I(t,e.title,e.projectId)})),N]}),Object(k.jsx)("br",{})]})}n(125),n(126);function P(){var e=m(),t=Object(h.a)(e,5),n=t[0],c=t[1],r=(t[2],t[3]),a=t[4],s=Object(u.g)(),l=Object(o.d)((function(e){return e.user}),o.b);function j(e){e.preventDefault(),c({type:"project/unloaded"}),s("/users/".concat(l.id))}function d(){return f.apply(this,arguments)}function f(){return(f=Object(p.a)(b.a.mark((function e(){var t,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n("POST",a),e.next=3,fetch("".concat(r,"/users/logout"),t);case 3:(s=e.sent).ok||console.log(s),setTimeout((function(){c({type:"user/loggedOut"})}),500);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return"TEMP"===l.flag?Object(k.jsxs)("div",{id:"user-tab",children:[Object(k.jsx)("button",{id:"btn-user-name",onClick:j,children:l.name||"Anonymous User"}),Object(k.jsxs)("div",{id:"user-panel",children:[Object(k.jsx)("button",{onClick:function(){return s("/preview/".concat(l.id,"/signup"))},children:"Sign Up"}),Object(k.jsx)("button",{onClick:function(){return s("/preview/".concat(l.id,"/projects"))},children:"My Projects"}),Object(k.jsx)("button",{onClick:function(){return d()},id:"btn-logout",children:"Log Out"})]})]}):l.id?Object(k.jsxs)("div",{id:"user-tab",children:[Object(k.jsx)("button",{id:"btn-user-name",onClick:j,children:l.name||"Anonymous User"}),Object(k.jsxs)("div",{id:"user-panel",children:[Object(k.jsx)("button",{onClick:function(){return s("/users/".concat(l.id,"/settings"))},children:"Settings"}),Object(k.jsx)("button",{onClick:function(){return s("/users/".concat(l.id,"/projects"))},children:"My Projects"}),Object(k.jsx)("button",{onClick:function(){return d()},id:"btn-logout",children:"Log Out"})]})]}):Object(k.jsx)("div",{id:"user-tab",children:Object(k.jsx)(i.b,{to:"login",id:"btn-login",children:"Log In"})})}function A(){return function(){var e=Object(o.d)((function(e){return e.token})),t=Object(u.g)();Object(c.useEffect)((function(){e||t("../logout")}),[e,t])}(),Object(k.jsxs)("header",{id:"page-header",children:[Object(k.jsx)("div",{id:"app-title",children:Object(k.jsx)("img",{className:"logo",alt:"logo",src:"/logo-smol.png"})}),Object(k.jsx)(P,{})]})}n(127),n(128),n(129);function D(e){var t=e.stageId,n=m(),r=Object(h.a)(n,5),a=r[0],s=r[1],o=r[2],i=r[3],u=r[4],l=Object(c.useState)(!1),j=Object(h.a)(l,2),d=j[0],f=j[1],O=Object(c.useState)(""),x=Object(h.a)(O,2),g=x[0],v=x[1];function y(){return(y=Object(p.a)(b.a.mark((function e(n){var c,r,l,j;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),c=a("PATCH",u,{title:g}),e.next=4,fetch("".concat(i,"/stages/").concat(t),c);case 4:if(!(r=e.sent).ok){e.next=14;break}return f(!1),l=r.headers.get("X-Auth-Token"),e.next=10,r.json();case 10:j=e.sent,s({type:"stage/updated",payload:j,token:l}),e.next=15;break;case 14:o(r);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return d?Object(k.jsx)("div",{className:"overlay",children:Object(k.jsx)("div",{className:"overlay-inner",children:Object(k.jsxs)("form",{className:"stage-rename",onSubmit:function(e){return y.apply(this,arguments)},children:[Object(k.jsx)("label",{htmlFor:"rename",children:"Rename Stage:"}),Object(k.jsx)("input",{type:"text",className:"rename",maxLength:"30",value:g,onChange:function(e){return v(e.target.value)}}),Object(k.jsxs)("div",{className:"two-button mt-2",children:[Object(k.jsx)("button",{className:"btn-stage-rename mr-1",type:"submit",children:"Rename"}),Object(k.jsx)("button",{className:"btn-close-stage-rename ml-1",onClick:function(){return f(!1)},type:"button",children:"Cancel"})]})]})})}):Object(k.jsx)("button",{className:"btn",onClick:function(){console.log("togglebutton"),f(!0)},children:"Rename Stage"})}n(130);function B(e){var t=e.taskId,n=e.taskIndex,r=e.stageId,a=e.stageIndex,s=m(),i=Object(h.a)(s,5),u=i[0],l=i[1],j=i[2],d=i[3],O=i[4],x=Object(o.d)((function(e){return e.project.stages[a].tasks[n]})),g=Object(c.useState)(!1),v=Object(h.a)(g,2),y=v[0],w=v[1],I=Object(c.useState)(x.title),C=Object(h.a)(I,2),N=C[0],T=C[1],S=Object(c.useState)(x.details),E=Object(h.a)(S,2),P=E[0],A=E[1];function D(){return(D=Object(p.a)(b.a.mark((function e(){var n,c,a,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u("PATCH",O,{title:N,details:P}),e.next=3,fetch("".concat(d,"/stages/").concat(r,"/tasks/").concat(t),n);case 3:if(!(c=e.sent).ok){e.next=13;break}return a=c.headers.get("X-Auth-Token"),e.next=8,c.json();case 8:s=e.sent,l({type:"task/updated",payload:{stageId:r,task:s},token:a}),w(!1),e.next=14;break;case 13:j(c);case 14:w(!1);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return L.apply(this,arguments)}function L(){return(L=Object(p.a)(b.a.mark((function e(){var n,c,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u("DELETE",O),e.next=3,fetch("".concat(f,"/api/stages/").concat(r,"/tasks/").concat(t),n);case 3:(c=e.sent).ok?(a=c.headers.get("X-Auth-Token"),l({type:"task/deleted",payload:{stageId:r,taskId:t},token:a})):j(c);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var U=y?Object(k.jsxs)("div",{className:"task-title-bar",children:[Object(k.jsx)("input",{type:"text",className:"task-title-editor",placeholder:x.title,onChange:function(e){return T(e.target.value)}}),Object(k.jsxs)("div",{children:[Object(k.jsx)("button",{className:"btn-cancel-edit-task",onClick:function(){T(x.title),A(x.details),w(!1)},children:"\ud83d\udeab"}),Object(k.jsx)("button",{className:"btn-save-task",onClick:function(){return D.apply(this,arguments)},children:"\ud83d\udcbe"})]})]}):Object(k.jsxs)("div",{className:"task-title-bar",children:[Object(k.jsx)("p",{className:"task-title",children:x.title}),Object(k.jsx)("button",{className:"btn-edit-task",onClick:function(){return w(!0)},children:"\u270f\ufe0f"})]}),X=y?Object(k.jsx)("textarea",{className:"task-details",name:"task-details",rows:"4",value:P,onChange:function(e){return A(e.target.value)}}):Object(k.jsxs)("form",{children:[x.details&&Object(k.jsx)("hr",{}),Object(k.jsx)("p",{className:"task-details",children:x.details})]}),M=y&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("hr",{}),Object(k.jsxs)("div",{className:"task-options",children:[Object(k.jsx)("button",{className:"btn-delete-task",onClick:function(){return B()},children:"\ud83d\uddd1\ufe0f Delete Task"}),Object(k.jsx)("button",{className:"btn-complete-task",onClick:function(){return B()},children:"\u2714\ufe0f Mark Complete"})]})]});return Object(k.jsxs)("div",{className:"task-card",children:[U,X,M]})}function L(e){var t=e.stageId,n=e.toggleTaskCreator,r=m(),a=Object(h.a)(r,5),s=a[0],o=a[1],i=a[2],u=a[3],l=a[4],j=Object(c.useState)(""),d=Object(h.a)(j,2),f=d[0],O=d[1],x=Object(c.useState)(""),g=Object(h.a)(x,2),v=g[0],y=g[1];function w(){return(w=Object(p.a)(b.a.mark((function e(c){var r,a,j,d;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.preventDefault(),r=s("POST",l,{title:f,details:v}),e.next=4,fetch("".concat(u,"/stages/").concat(t,"/tasks"),r);case 4:if(!(a=e.sent).ok){e.next=16;break}return j=a.headers.get("X-Auth-Token"),e.next=9,a.json();case 9:d=e.sent,o({type:"task/created",payload:{task:d,stageId:t},token:j}),n(!1),O(""),y(""),e.next=17;break;case 16:i(a);case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(k.jsx)("div",{className:"task-creator",children:Object(k.jsxs)("form",{onSubmit:function(e){return w.apply(this,arguments)},children:[Object(k.jsx)("textarea",{className:"new-task-title",placeholder:"Enter a task",maxLength:"31",value:f,onChange:function(e){return O(e.target.value)}}),Object(k.jsx)("textarea",{className:"new-task-details",placeholder:"Enter details (optional)",maxLength:"500",value:v,onChange:function(e){return y(e.target.value)}}),Object(k.jsxs)("div",{className:"two-button mt-2",children:[Object(k.jsx)("button",{className:"btn-create-task mr-1",type:"submit",children:"Create Task"}),Object(k.jsx)("button",{className:"btn-close-task-creator ml-1",onClick:function(){return n(!1)},type:"button",children:"Cancel"})]})]})})}function U(e){var t=e.stageId,n=e.stageIndex,r=e.title,a=e.reorderStages,s=m(),i=Object(h.a)(s,5),u=i[0],l=i[1],j=i[2],d=i[3],f=i[4],O=Object(c.useRef)(null),x=Object(o.d)((function(e){return e.project.stages[n]})),g=Object(o.d)((function(e){return e.project.stages[n].tasks})),v=Object(c.useState)(!1),y=Object(h.a)(v,2),I=y[0],C=y[1],N=Object(w.useDrop)({accept:T,hover:function(e,t){var c;if(O.current){var r=e.index,s=n;if(r!==s){var o=null===(c=O.current)||void 0===c?void 0:c.getBoundingClientRect(),i=(o.right-o.left)/2,u=t.getClientOffset().x-o.left;r<s&&u<i||r>s&&u>i||(a(r,s),e.index=s)}}}}),S=Object(h.a)(N,2)[1],E=Object(w.useDrag)({type:T,item:function(){return{title:r,stageIndex:n}},collect:function(e){return{isDragging:e.isDragging()}}}),P=Object(h.a)(E,2);P[0].isDragging;function A(){return A=Object(p.a)(b.a.mark((function e(t){var n,c,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u("DELETE",f),e.next=3,fetch("".concat(d,"/stages/").concat(t),n);case 3:(c=e.sent).ok?(r=c.headers.get("X-Auth-Token"),l({type:"stage/deleted",payload:{stageId:t},token:r})):j(c);case 5:case"end":return e.stop()}}),e)}))),A.apply(this,arguments)}(0,P[1])(S(O));var U=g?g.map((function(e,c){return Object(k.jsx)(B,{taskId:e.taskId,taskIndex:c,stageId:t,stageIndex:n},e.taskId)})):null;return Object(k.jsxs)("section",{className:"stage",ref:O,children:[Object(k.jsxs)("div",{className:"stage-header",children:[Object(k.jsx)("h3",{className:"stage-title",children:x.title}),!I&&Object(k.jsxs)("div",{className:"stage-options",children:[Object(k.jsx)("div",{className:"btn-toggle-task-creator",onClick:function(){return C(!0)},children:"\u2795"}),Object(k.jsxs)("div",{className:"dropdown",children:["\u2630",Object(k.jsx)("div",{className:"dropdown-content mt-4",children:Object(k.jsxs)("ul",{children:[Object(k.jsx)("li",{children:Object(k.jsx)(D,{stageId:t})}),Object(k.jsx)("li",{children:Object(k.jsx)("button",{className:"btn",onClick:function(){return function(e){return A.apply(this,arguments)}(t)},children:"Delete Stage"})})]})})]})]}),I&&Object(k.jsx)(L,{stageId:t,toggleTaskCreator:C})]}),U]},t)}function X(e){var t=e.projectId,n=m(),r=Object(h.a)(n,5),a=r[0],s=r[1],o=r[2],i=r[3],u=r[4],l=Object(c.useState)(!1),j=Object(h.a)(l,2),d=j[0],f=j[1],O=Object(c.useState)(""),x=Object(h.a)(O,2),g=x[0],v=x[1];function y(){return(y=Object(p.a)(b.a.mark((function e(n){var c,r,l,j;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),c=a("POST",u,{title:g,projectId:t}),e.next=4,fetch("".concat(i,"/stages"),c);case 4:if(!(r=e.sent).ok){e.next=15;break}return l=r.headers.get("X-Auth-Token"),e.next=9,r.json();case 9:j=e.sent,s({type:"stage/created",payload:j,token:l}),f(!1),v(""),e.next=16;break;case 15:o(r);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return d?Object(k.jsx)("div",{className:"overlay",children:Object(k.jsx)("div",{className:"overlay-inner",children:Object(k.jsxs)("form",{onSubmit:function(e){return y.apply(this,arguments)},children:[Object(k.jsx)("label",{htmlFor:"new-stage-title",children:"Create Stage:"}),Object(k.jsx)("input",{type:"text",id:"new-stage-title",value:g,maxLength:"29",required:!0,onChange:function(e){return v(e.target.value)}}),Object(k.jsxs)("div",{className:"two-button mt-2",children:[Object(k.jsx)("button",{className:"btn-create-stage",type:"submit",children:"Create Stage"}),Object(k.jsx)("button",{className:"btn-toggle-stage-creator",onClick:function(){return f(!1)},children:"Cancel"})]})]})})}):Object(k.jsx)("section",{className:"stage create",children:Object(k.jsx)("button",{className:"btn",onClick:function(){return f(!0)},children:"Create Stage"})})}function M(){var e=m(),t=Object(h.a)(e,5),n=t[0],r=t[1],a=t[2],s=t[3],i=t[4],u=Object(o.d)((function(e){return e.project.projectId})),l=Object(o.d)((function(e){return e.project.stages}),o.b),j=Object(c.useCallback)(function(){var e=Object(p.a)(b.a.mark((function e(t,c){var o,j,d,p;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i){e.next=2;break}return e.abrupt("return");case 2:return(o=Object(C.a)(l)).splice(c,0,o.splice(t,1)[0]),r({type:"project/reorderStages",payload:o}),j=n("PATCH",i,{stages:o.map((function(e){return e.stageId}))}),e.next=8,fetch("".concat(s,"/projects/").concat(u),j);case 8:(d=e.sent).ok?(p=d.headers.get("X-Auth-Token"))&&r({type:"token/refresh",token:p}):a(d);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[l,i,u,n,r,a,s]),d=null===l||void 0===l?void 0:l.map((function(e,t){return Object(k.jsx)(U,{stageId:e.stageId,stageIndex:t,title:e.title,reorderStages:j},e.stageId)}));return Object(k.jsxs)("div",{id:"project-board",children:[d,Object(k.jsx)(X,{projectId:u})]})}function H(){return Object(k.jsxs)(w.DndProvider,{backend:I.HTML5Backend,children:[Object(k.jsx)(A,{}),Object(k.jsx)(E,{}),Object(k.jsx)("main",{children:Object(k.jsx)(M,{})})]})}function R(){var e=m(),t=Object(h.a)(e,5),n=t[0],r=t[1],a=t[2],s=t[3],i=t[4],l=Object(u.g)(),j=Object(o.d)((function(e){return e.user}));function d(){return(d=Object(p.a)(b.a.mark((function e(t){var c,o,u,l,d,p,h;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),c=document.getElementById("user-name"),o=document.getElementById("user-email"),u=document.getElementById("user-password-1"),l=document.getElementById("user-password-2"),u.value===l.value){e.next=10;break}return alert("Passwords do not match. Try again."),u.value="",l.value="",e.abrupt("return");case 10:return d="TEMP"===j.flag?n("POST",i,{name:c.value,email:o.value,password:u.value,flag:"IMPORT"}):n("POST",null,{name:c.value,email:o.value,password:u.value}),e.next=13,fetch("".concat(s,"/users"),d);case 13:if(!(p=e.sent).ok){e.next=22;break}return e.next=17,p.json();case 17:h=e.sent,r({type:"user/created",payload:h.user,token:h.token}),alert("User created: \nName: ".concat(h.user.name,"\nEmail: ").concat(h.user.email)),e.next=23;break;case 22:a(p);case 23:c.value="",o.value="",u.value="",l.value="";case 27:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(c.useEffect)((function(){j.id&&"TEMP"!==j.flag&&l("../users/".concat(j.id,"/projects"))}),[j.id,l]),Object(k.jsx)("div",{className:"single",children:Object(k.jsxs)("form",{onSubmit:function(e){return d.apply(this,arguments)},children:[Object(k.jsx)("input",{id:"user-name",type:"text",placeholder:"User Name"}),Object(k.jsx)("input",{id:"user-email",type:"text",placeholder:"Email Address"}),Object(k.jsx)("input",{id:"user-password-1",type:"password",placeholder:"Password"}),Object(k.jsx)("input",{id:"user-password-2",type:"password",placeholder:"Re-type password"}),Object(k.jsx)("button",{type:"submit",children:"Sign Up"})]})})}function F(){return Object(k.jsxs)("main",{className:"single",children:[Object(k.jsx)("img",{className:"logo",alt:"Taskflow.tech",src:"/logo.png"}),Object(k.jsx)("h1",{children:Object(k.jsx)("a",{href:"/",children:"Taskflow.tech"})}),Object(k.jsx)("h2",{children:"Sign Up"}),Object(k.jsx)(R,{}),Object(k.jsx)("h3",{children:Object(k.jsx)(i.b,{to:"/",children:"Log In"})})]})}n(143);function G(){var e=Object(o.d)((function(e){return e.user})),t={fontWeight:"bold",color:"black",textDecoration:"none"},n={color:"blue",textDecoration:"underline"},c="TEMP"===e.flag?Object(k.jsx)("li",{children:Object(k.jsx)(i.c,{to:"signup",style:function(e){return e.isActive?t:n},children:"Sign Up"})}):Object(k.jsx)(i.c,{to:"settings",style:function(e){return e.isActive?t:n},children:"User Settings"});return Object(k.jsxs)("main",{children:[Object(k.jsx)(A,{}),Object(k.jsx)("nav",{id:"user-mode-selector",children:Object(k.jsxs)("ul",{id:"user-modes",children:[Object(k.jsx)("li",{children:Object(k.jsx)(i.c,{to:"projects",style:function(e){return e.isActive?t:n},children:"My Projects"})}),c]})}),Object(k.jsx)("hr",{}),Object(k.jsx)(u.a,{})]})}n(144),n(145);function W(){var e=m(),t=Object(h.a)(e,5),n=t[0],r=t[1],a=t[2],s=t[3],i=t[4],l=Object(u.g)(),j=Object(c.useState)(!1),d=Object(h.a)(j,2),f=d[0],O=d[1];Object(o.d)((function(e){return e.user}),o.b);function x(){return(x=Object(p.a)(b.a.mark((function e(t){var c,o,u,j;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),c=n("POST",i,{title:"".concat(document.getElementById("new-project-title").value)}),e.next=4,fetch("".concat(s,"/projects/"),c);case 4:if(!(o=e.sent).ok){e.next=15;break}return u=o.headers.get("X-Auth-Token"),e.next=9,o.json();case 9:return j=e.sent,e.next=12,r({type:"project/created",payload:j.project,token:u});case 12:l("../project/".concat(j.project.projectId)),e.next=16;break;case 15:a(o);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return f?Object(k.jsxs)("form",{id:"new-project-creator",onSubmit:function(e){return x.apply(this,arguments)},children:[Object(k.jsx)("h3",{children:"Start a new project:"}),Object(k.jsx)("input",{id:"new-project-title",placeholder:"Project Title"}),Object(k.jsx)("button",{id:"submit",children:"Create Project"}),Object(k.jsx)("button",{id:"btn-toggle-project-creator",onClick:function(){return O(!1)},children:"Cancel"})]}):Object(k.jsx)("button",{id:"btn-toggle-project-creator",onClick:function(){return O(!0)},children:"Start New Project"})}function J(){var e=m(),t=Object(h.a)(e,5),n=t[0],c=t[1],r=t[2],a=t[3],s=t[4],l=Object(u.g)(),j=Object(o.d)((function(e){return e.user.projects}),o.b),d=Object(o.d)((function(e){return e.user}));function f(){return(f=Object(p.a)(b.a.mark((function e(t){var o,i,u;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=n("DELETE",s),e.next=3,fetch("".concat(a,"/projects/").concat(t),o);case 3:(i=e.sent).ok?(u=i.headers.get("X-Auth-Token"),c({type:"project/deleted",payload:{projectId:t},token:u})):r(i);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return(O=Object(p.a)(b.a.mark((function e(t){var o,i,u,j;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=n("GET",s),e.next=3,fetch("".concat(a,"/projects/").concat(t),o);case 3:if(!(i=e.sent).ok){e.next=13;break}return u=i.headers.get("X-Auth-Token"),e.next=8,i.json();case 8:j=e.sent,c({type:"project/loaded",payload:j.project,token:u}),l("../../../projects/".concat(t)),e.next=14;break;case 13:r(i);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x=j?j.map((function(e){return Object(k.jsxs)("li",{children:[Object(k.jsx)("div",{className:"project-title",children:e.title}),Object(k.jsx)("button",{className:"btn-edit-project",onClick:function(){return function(e){return O.apply(this,arguments)}(e.projectId)},children:"Edit"}),Object(k.jsx)("button",{className:"btn-delete-projct",onClick:function(){return function(e){return f.apply(this,arguments)}(e.projectId)},children:"Delete"})]},e.projectId)})):null;return Object(k.jsxs)("div",{id:"projects-menu",className:"double",children:[j&&Object(k.jsx)("ul",{id:"projects-list",children:x}),Object(k.jsx)(W,{}),(d.flag="TEMP")&&Object(k.jsx)("button",{children:Object(k.jsx)(i.c,{to:"signup",id:"signup-link",children:"Sign up to save work"})})]})}n(146);function V(){var e=Object(u.g)(),t=Object(o.d)((function(e){return e.user})),n=m(),r=Object(h.a)(n,5),a=r[0],s=r[1],i=r[2],l=r[3],j=r[4],d=Object(c.useState)(!1),f=Object(h.a)(d,2),O=f[0],x=f[1],g=Object(c.useState)(t.name),v=Object(h.a)(g,2),y=v[0],w=v[1],I=Object(c.useState)(!1),C=Object(h.a)(I,2),N=C[0],T=C[1],S=Object(c.useState)(t.email),E=Object(h.a)(S,2),P=E[0],A=E[1],D=Object(c.useState)(!1),B=Object(h.a)(D,2),L=B[0],U=B[1];function X(e){return M.apply(this,arguments)}function M(){return(M=Object(p.a)(b.a.mark((function e(t){var n,c,r,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=a("PATCH",j,{name:y}),e.next=4,fetch("".concat(l,"/users/"),n);case 4:if(!(c=e.sent).ok){e.next=15;break}return r=c.headers.get("X-Auth-Token"),e.next=9,c.json();case 9:o=e.sent,x(!1),s({type:"user/patched",payload:o,token:r}),alert("Username successfully changed"),e.next=16;break;case 15:i(c);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(e){return R.apply(this,arguments)}function R(){return(R=Object(p.a)(b.a.mark((function e(t){var n,c,r,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=a("PATCH",j,{email:P}),e.next=4,fetch("".concat(l,"/users/"),n);case 4:if(!(c=e.sent).ok){e.next=15;break}return r=c.headers.get("X-Auth-Token"),e.next=9,c.json();case 9:o=e.sent,T(!1),s({type:"user/patched",payload:o,token:r}),alert("Email address successfully changed"),e.next=16;break;case 15:i(c);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(e){return G.apply(this,arguments)}function G(){return(G=Object(p.a)(b.a.mark((function e(n){var c,r,o,u,d,p;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),c=document.getElementById("current-password").value,r=document.getElementById("new-password-1").value,o=document.getElementById("new-password-2").value,r===o){e.next=8;break}alert("New passwords do not match"),e.next=13;break;case 8:return u=a("PATCH",j,{email:t.email,oldPassword:c,newPassword:r}),e.next=11,fetch("".concat(l,"/users"),u);case 11:(d=e.sent).ok?(p=d.headers.get("X-Auth-Token"),U(!1),s({type:"user/patched",payload:{},token:p}),alert("Password successfully changed")):i(d);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(){return(W=Object(p.a)(b.a.mark((function t(){var n,c,r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!0!==window.confirm("Are you sure you want to delete your account?")){t.next=8;break}return n=a("DELETE",j),t.next=4,fetch("".concat(l,"/users"),n);case 4:(c=t.sent).ok?(r=c.headers.get("X-AUTH-TOKEN"),s({type:"user/deleted",payload:{},token:r}),alert("User deleted"),e("/")):i(c),t.next=9;break;case 8:return t.abrupt("return");case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function J(){return(J=Object(p.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:document.getElementById("current-password").value="",document.getElementById("new-password-1").value="",document.getElementById("new-password-2").value="",U(!1);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(k.jsxs)("div",{id:"user-settings-menu",className:"double",children:[Object(k.jsx)("h3",{children:"User Name:"}),O?Object(k.jsxs)("form",{onSubmit:X,children:[Object(k.jsx)("input",{type:"text",value:y,onChange:function(e){return w(e.target.value)}}),Object(k.jsx)("button",{type:"submit",onClick:X,children:"Save"}),Object(k.jsx)("button",{type:"button",onClick:function(){x(!1),w(t.name)},children:"Cancel"})]}):Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("p",{children:t.name}),Object(k.jsx)("button",{onClick:function(){return x(!0)},children:"Edit"})]}),Object(k.jsx)("h3",{children:"Email Address:"}),N?Object(k.jsxs)("form",{onSubmit:H,children:[Object(k.jsx)("input",{type:"text",value:P,onChange:function(e){return A(e.target.value)}}),Object(k.jsx)("button",{type:"submit",onClick:H,children:"Save"}),Object(k.jsx)("button",{type:"button",onClick:function(){T(!1),A(t.email)},children:"Cancel"})]}):Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("p",{children:t.email}),Object(k.jsx)("button",{onClick:function(){return T(!0)},children:"Edit"})]}),Object(k.jsx)("h3",{children:"Password"}),L?Object(k.jsxs)("form",{onSubmit:F,children:[Object(k.jsx)("p",{children:"Current password:"}),Object(k.jsx)("input",{id:"current-password",type:"text"}),Object(k.jsx)("p",{children:"Enter new password:"}),Object(k.jsx)("input",{id:"new-password-1",type:"text"}),Object(k.jsx)("p",{children:"Re-enter new password:"}),Object(k.jsx)("input",{id:"new-password-2",type:"text"}),Object(k.jsx)("button",{type:"submit",onClick:F,children:"Save"}),Object(k.jsx)("button",{type:"button",onClick:function(){return function(){return J.apply(this,arguments)}()},children:"Cancel"})]}):Object(k.jsx)("button",{onClick:function(){return U(!0)},children:"Change Password"}),Object(k.jsx)("br",{}),Object(k.jsx)("button",{id:"btn-delete-user",onClick:function(){return function(){return W.apply(this,arguments)}()},children:"Delete User"})]})}var z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,150)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))},_={projectId:null,title:"",stages:[]};var q={};var K=Object(l.combineReducers)({project:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0,n=Object(j.a)({},e),c=t.payload;switch((t.type.startsWith("project")||t.type.startsWith("stage")||t.type.startsWith("task"))&&console.log(c),t.type){case"project/reorderStages":return n.stages=c,n;case"project/created":return n.projectId||(n=c),n;case"project/loaded":return n=c;case"project/unloaded":case"user/loggedOut":return _;case"project/deleted":return c.projectId===n.projectId?_:n;case"stage/created":return n.stages=n.stages.concat(c),n;case"stage/updated":var r=n.stages.findIndex((function(e){return e.stageId===c.stageId}));return n.stages[r]=c,n;case"stage/deleted":return n.stages=n.stages.filter((function(e){return e.stageId!==c.stageId})),n;case"task/created":var a=n.stages.find((function(e){return e.stageId===c.stageId}));return a.tasks=a.tasks.concat(c.task),n;case"task/deleted":var s=n.stages.find((function(e){return e.stageId===c.stageId}));return s.tasks=s.tasks.filter((function(e){return e.taskId!==c.taskId})),n;case"task/updated":var o=n.stages.findIndex((function(e){return e.stageId===c.stageId})),i=n.stages[o].tasks.findIndex((function(e){return e.taskId===c.task.taskId}));return n.stages[o].tasks[i]=c.task,n;default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;console.log(t);var n=Object(j.a)({},e),c=t.payload;switch(t.type){case"user/created":return n=c;case"user/loggedIn":return(n=c).flag="LOGGED_IN",n;case"user/loggedOut":return n={flag:"LOGGED_OUT"};case"user/deleted":return n={flag:"DELETED"};case"user/patched":return c.name&&(n.name=c.name),c.email&&(n.email=c.email),n;case"user/reorderProjects":return n.projects=c,n;case"project/created":return n.projects=n.projects.concat({title:c.title,projectId:c.projectId}),n;case"project/deleted":return n.projects=n.projects.filter((function(e){return e.projectId!==c.projectId})),n;default:return e}},token:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;return t.token?t.token:"user/loggedOut"===t.type?"":e}}),Y=K;n(147);s.a.render(Object(k.jsx)(r.a.StrictMode,{children:Object(k.jsx)(o.a,{store:Object(l.createStore)(Y),children:Object(k.jsx)(i.a,{children:Object(k.jsx)(u.d,{children:Object(k.jsxs)(u.b,{path:"/",element:Object(k.jsx)(u.a,{}),children:[Object(k.jsx)(u.b,{index:!0,element:Object(k.jsx)(v,{})}),Object(k.jsx)(u.b,{path:"signup",element:Object(k.jsx)(F,{})}),Object(k.jsx)(u.b,{path:"logout",element:Object(k.jsx)(y,{})}),Object(k.jsxs)(u.b,{path:"users/:userId/",element:Object(k.jsx)(G,{}),children:[Object(k.jsx)(u.b,{path:"projects",element:Object(k.jsx)(J,{})}),Object(k.jsx)(u.b,{path:"settings",element:Object(k.jsx)(V,{})})]}),Object(k.jsxs)(u.b,{path:"preview/:userId/",element:Object(k.jsx)(G,{}),children:[Object(k.jsx)(u.b,{path:"projects",element:Object(k.jsx)(J,{})}),Object(k.jsx)(u.b,{path:"signup",element:Object(k.jsx)(R,{})})]}),Object(k.jsx)(u.b,{path:"projects/:projectId",element:Object(k.jsx)(H,{})}),Object(k.jsx)(u.b,{path:"preview/project/projectId",element:Object(k.jsx)(H,{})}),Object(k.jsx)(u.b,{path:"*",element:Object(k.jsx)(v,{})})]})})})})}),document.getElementById("root")),z()},62:function(e,t,n){}},[[148,1,2]]]);
//# sourceMappingURL=main.cd7c0731.chunk.js.map