(this["webpackJsonpgigaturnip-taskview"]=this["webpackJsonpgigaturnip-taskview"]||[]).push([[0],{290:function(e,t,n){},498:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(67),i=n.n(r),s=(n(290),n(41)),o=n.n(s),u=n(58),l=n(8),j=n(83),d=n(28),b=n(122),h=n.n(b),p="api/v1/campaigns/",O="api/v1/taskstages/",f="api/v1/tasks/",x=h.a.create({baseURL:"https://journal-bb5e3.uc.r.appspot.com/"});x.interceptors.request.use((function(e){var t=localStorage.getItem("token");return t&&(e.headers.Authorization="JWT "+t),e}),(function(e){return Promise.reject(e)}));var g=x,m=(n(254),n(22)),v=n(6),S=n(21),k=n(75);k.a.initializeApp({apiKey:"AIzaSyCXiwOUNsbzKH7sbSAZrqA9f7VOeCMdUOQ",authDomain:"gigaturnip-b6b5b.firebaseapp.com",projectId:"gigaturnip-b6b5b",storageBucket:"gigaturnip-b6b5b.appspot.com",messagingSenderId:"414429242328",appId:"1:414429242328:web:a4685f5ac6895ea767c8ad",measurementId:"G-Y8JTEJMTET"});var y=new k.a.auth.GoogleAuthProvider;k.a.firestore().settings({ignoreUndefinedProperties:!0});var w=function(){return y.setCustomParameters({prompt:"select_account"}),k.a.auth().signInWithPopup(y)},C=function(){return k.a.auth().signOut().then((function(){return localStorage.removeItem("token")})).then((function(){return window.location.reload()}))},_=k.a,I=function(e,t,n){return n&&e?Object(S.a)(Object(S.a)({},e),t):t},T=function(){var e=Object(u.a)(o.a.mark((function e(t,n,a,c,r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=4;break}return r||(a({}),c({})),e.next=4,Promise.all(t.map(function(){var e=Object(u.a)(o.a.mark((function e(t){var i,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=t.name.replace(/\./g,"_").replace(/ /g,"_"),console.log(i),s=n.child(i).put(t),a((function(e){var t=Object(v.a)({},i,{status:"loading",progress:0});return e?Object(S.a)(Object(S.a)({},e),t):t})),s.on(_.storage.TaskEvent.STATE_CHANGED,(function(e){var t=e.bytesTransferred/e.totalBytes*100;a((function(e){var n=Object(v.a)({},i,{status:"loading",progress:t});return e?Object(S.a)(Object(S.a)({},e),n):n}))}),(function(e){console.log(e)}),(function(){s.snapshot.ref.getDownloadURL().then((function(e){console.log("FILE PATH",s.snapshot.ref.fullPath);var t=s.snapshot.ref.fullPath,n=e;a((function(e){var t=Object(v.a)({},i,{status:"complete",progress:100,url:n});return I(e,t,r)})),c((function(e){var n=Object(v.a)({},i,t);return I(e,n,r)}))}))}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:case 5:case"end":return e.stop()}}),e)})));return function(t,n,a,c,r){return e.apply(this,arguments)}}(),E=n(547),D=n(552),N=n(548),J=n(3),L=function(e){return Object(J.jsxs)(E.a,{display:"flex",alignItems:"center",children:[Object(J.jsx)(E.a,{width:"100%",mr:1,children:Object(J.jsx)(D.a,Object(S.a)({variant:"determinate"},e))}),Object(J.jsx)(E.a,{minWidth:35,children:Object(J.jsx)(N.a,{variant:"body2",color:"textSecondary",children:"".concat(Math.round(e.value),"%")})})]})},P=n(269),z=n(544),F=function(e){var t=e.schema,n=e.uiSchema,c=e.disabled,r=e.required,i=e.formContext,s=e.value,j=i.campaignId,d=i.chainId,b=i.stageId,h=i.userId,p=i.taskId,O=Object(a.useState)({}),f=Object(l.a)(O,2),x=f[0],g=f[1],k=Object(a.useState)({}),y=Object(l.a)(k,2),w=y[0],C=y[1],I=Object(a.useState)(""),E=Object(l.a)(I,2),D=E[0],N=E[1],F=Object(a.useState)(!1),B=Object(l.a)(F,2),U=B[0],A=B[1],G=Object(a.useState)(!1),W=Object(l.a)(G,2),M=W[0],q=W[1],V=Object(a.useState)(""),R=Object(l.a)(V,2),H=R[0],K=R[1],X=Object(a.useState)({}),Y=Object(l.a)(X,2),Q=Y[0],Z=Y[1],$=!(!n["ui:options"]||!n["ui:options"].private)&&n["ui:options"].private,ee=!(!n["ui:options"]||!n["ui:options"].multiple)&&n["ui:options"].multiple,te=Object.keys(x).length>0,ne=r&&!te,ae=void 0;j&&d&&b&&h&&p&&(ae=_.storage(),ae=(ae=$?ae.ref("private"):ae.ref("public")).child(j).child(d).child(b).child(h).child(p)),Object(a.useEffect)((function(){if(s&&Object.keys(s).length>0){console.log("value",s);var e=JSON.parse(s);Z(e),Object.keys(e).forEach((function(t){re(e[t]).then((function(e){return g((function(n){return Object(S.a)(Object(S.a)({},n),{},Object(v.a)({},t,{url:e,status:"complete"}))}))}))}))}}),[s]);var ce=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Files selected: ",Object(m.a)(t.target.files)),T(Object(m.a)(t.target.files),ae,g,C,ee),t.target.value=null;case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),re=function(e){return _.storage().ref(e).getDownloadURL()};Object(a.useEffect)((function(){if(w&&Object.keys(w).length>0){console.log("fileLinks",w);try{var t="";if(ee){var n=JSON.parse(s),a=Object(S.a)(Object(S.a)({},n),w);t=JSON.stringify(a)}else t=JSON.stringify(w);e.onChange(t)}catch(r){var c=JSON.stringify(w);console.error(r),e.onChange(c)}}}),[w]);var ie=function(){var e=Object(u.a)(o.a.mark((function e(t){var n,a,c,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=Q,console.log("FILE CLICK VALUE",n),!(t in n)){e.next=22;break}return a=n[t],console.log(a),e.next=7,_.storage().ref().child(a).getMetadata();case 7:c=e.sent,r=c.contentType.split("/")[0],console.log("FILE TYPE",r),e.t0=r,e.next="image"===e.t0?13:"video"===e.t0?17:21;break;case 13:return N(x[t].url),K(c.contentType),A(!0),e.abrupt("break",22);case 17:return N(x[t].url),K(c.contentType),q(!0),e.abrupt("break",22);case 21:alert("\u0424\u0430\u0439\u043b \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0444\u043e\u0442\u043e \u0438\u043b\u0438 \u0432\u0438\u0434\u0435\u043e");case 22:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),se=function(){N(""),K(""),A(!1),q(!1)};return Object(J.jsxs)("div",{children:[U&&Object(J.jsx)(P.a,{src:[D],disableScroll:!1,backgroundStyle:{backgroundColor:"rgba(0,0,0,0.8)"},closeOnClickOutside:!0,onClose:se}),Object(J.jsx)(z.a,{open:M,onClose:se,fullWidth:!0,children:Object(J.jsxs)("video",{height:"360px",controls:!0,children:[Object(J.jsx)("source",{src:D,type:H}),"Your browser does not support the video tag."]})}),Object(J.jsx)("label",{className:"form-label",children:null===t||void 0===t?void 0:t.title}),Object(J.jsx)("br",{}),Object(J.jsx)("input",{disabled:c,required:ne,multiple:ee,type:"file",onChange:ce}),Object.keys(x).map((function(t,n){return Object(J.jsxs)("div",{children:[Object(J.jsxs)("div",{style:{display:"flex",alignItems:"baseline"},children:[Object(J.jsx)("p",{children:t}),"complete"===x[t].status&&Object(J.jsxs)("div",{style:{display:"flex",alignItems:"baseline"},children:[Object(J.jsx)("button",{onClick:function(){return ie(t)},style:{fontSize:"14px",padding:0,margin:"0 10px"},type:"button",className:"btn btn-link text-success",children:"\u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0444\u0430\u0439\u043b"}),!c&&Object(J.jsx)("button",{onClick:function(){return function(t){var n=Q;if(t in n){delete n[t];var a=JSON.stringify(n);e.onChange(a)}var c=Object(S.a)({},w);t in c&&(delete c[t],C(c));var r=Object(S.a)({},x);t in r&&(delete r[t],g(r)),console.log("DELETE LOG",r)}(t)},style:{fontSize:"14px",padding:0,margin:"0 10px"},type:"button",className:"btn btn-link text-danger",children:"\u0443\u0434\u0430\u043b\u0438\u0442\u044c"})]})]}),"loading"===x[t].status&&Object(J.jsx)(L,{value:x[t].progress})]},t)}))]})},B=n(131),U=n(546),A=n(554),G=c.a.createContext(),W=function(e){var t=e.children,n=Object(a.useState)(null),c=Object(l.a)(n,2),r=c[0],i=c[1];return Object(a.useEffect)((function(){_.auth().onAuthStateChanged((function(e){e&&(i(e),e.getIdToken(!0).then((function(e){localStorage.setItem("token",e)})))})),_.auth().onIdTokenChanged((function(e){e&&e.getIdToken(!1).then((function(e){localStorage.setItem("token",e)}))}))}),[]),Object(J.jsx)(G.Provider,{value:{currentUser:r},children:t})},M=n(274),q=function(e){var t=e.data;return Object(J.jsx)(M.a,{id:"ViewerTinyMCE",value:t,inline:!1,disabled:!0,tinymceScriptSrc:"/GigaTurnipTaskView/tinymce/tinymce.min.js",init:{plugins:"autoresize",toolbar:!1,menubar:!1,image_advtab:!0,importcss_append:!0}})},V=function(e,t,n){var a=e.results,c=e.count,r=Math.ceil(c/10);console.log("numOfPages",r),console.log("results",a),t(a),n(r)},R=function(e){return g.post(f+e+"/request_assignment/")},H=function(e,t){return console.log(t),t&&t>0?g.get("".concat(f,"user_selectable/?stage__chain__campaign=").concat(e,"&limit=10&offset=").concat(10*(t-1))).then((function(e){return e.data})):g.get("".concat(f,"user_selectable/?stage__chain__campaign=").concat(e)).then((function(e){return e.data})).then((function(e){return console.log("getSelectableTasks",e),e}))},K=function(e){return g.get("".concat(f,"user_relevant/?complete=",!0,"&stage__chain__campaign=").concat(e)).then((function(e){return e.data})).then((function(e){return console.log("getCompleteTasks",e),e}))},X=function(e){return g.get("".concat(f,"user_relevant/?complete=",!1,"&stage__chain__campaign=").concat(e)).then((function(e){return e.data})).then((function(e){return console.log("getOpenTasks",e),e}))},Y=function(e){return g.get("".concat(f+e,"/list_displayed_previous/")).then((function(e){return e.data}))},Q=n(23),Z=function(e){var t,n,c,r=e.id,i=e.placeholder,s=e.required,o=e.readonly,u=e.disabled,j=e.label,d=e.value,b=e.onChange,p=e.onBlur,O=e.onFocus,f=e.autofocus,x=e.options,g=e.schema,m=e.rawErrors,v=void 0===m?[]:m;console.log("options",x);var S=null!==(t=x.searchField)&&void 0!==t?t:"search",k=null!==(n=x.responseField)&&void 0!==n?n:"text",y=null!==(c=null===x||void 0===x?void 0:x.params)&&void 0!==c?c:"",w=Object(a.useState)([]),C=Object(l.a)(w,2),_=C[0],I=C[1],T=function(){if(x.webhook){var e="".concat(x.webhook,"?").concat(S,"=").concat(d+y);h.a.get(e).then((function(e){return e.data})).then((function(e){return I(e)}))}},E="string"===g.type?"text":"".concat(g.type);return Object(J.jsxs)(Q.a.Group,{className:"mb-0",children:[Object(J.jsxs)(Q.a.Label,{className:v.length>0?"text-danger":"",children:[j||g.title,(j||g.title)&&s?"*":null]}),Object(J.jsx)(Q.a.Control,{id:r,placeholder:i,autoFocus:f,required:s,disabled:u,readOnly:o,className:v.length>0?"is-invalid":"",list:"examples_".concat(r),type:E,value:d||0===d?d:"",onChange:function(e){var t=e.target.value;return T(),b(""===t?x.emptyValue:t)},onBlur:function(e){var t=e.target.value;return p(r,t)},onFocus:function(e){var t=e.target.value;return O(r,t)}}),_?Object(J.jsx)("datalist",{id:"examples_".concat(r),children:_.map((function(e){return Object(J.jsx)("option",{value:e[k]},e[k])}))}):null]})},$=function(e){var t=Object(d.g)(),n=t.id,c=t.campaignId;!n&&e.id&&(n=e.id);var r=Object(d.f)(),i=Object(a.useContext)(G).currentUser,s="/campaign/".concat(c,"/tasks"),b=Object(a.useState)({}),h=Object(l.a)(b,2),p=h[0],O=h[1],x=Object(a.useState)({}),m=Object(l.a)(x,2),v=m[0],S=m[1],k=Object(a.useState)({}),y=Object(l.a)(k,2),w=y[0],C=y[1],_=Object(a.useState)(!1),I=Object(l.a)(_,2),T=I[0],D=I[1],N=Object(a.useState)([]),L=Object(l.a)(N,2),P=L[0],z=L[1],W=Object(a.useState)({}),M=Object(l.a)(W,2),V=M[0],R=M[1],H=Object(a.useState)(""),K=Object(l.a)(H,2),X=K[0],Q=K[1],$=Object(a.useState)(!1),ee=Object(l.a)($,2),te=ee[0],ne=ee[1],ae=Object(a.useState)(!1),ce=Object(l.a)(ae,2),re=ce[0],ie=ce[1],se={customfile:F,autocomplete:Z};Object(a.useEffect)((function(){n&&i&&function(){var e=Object(u.a)(o.a.mark((function e(){var t,a,r,s,u,l,j;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.get(f+n+"/").then((function(e){return e.data}));case 2:return r=e.sent,(s=r.stage)&&s.rich_text&&Q(s.rich_text),R({campaignId:c.toString(),chainId:s.chain.id.toString(),stageId:s.id.toString(),userId:i.uid,taskId:r.id.toString()}),u=null!==(t=JSON.parse(s.json_schema))&&void 0!==t?t:{},l=null!==(a=JSON.parse(s.ui_schema))&&void 0!==a?a:{},e.next=10,Y(n).then((function(e){return e.map((function(e){return{responses:e.responses,json_schema:JSON.parse(e.stage.json_schema),ui_schema:JSON.parse(e.stage.ui_schema)}}))}));case 10:j=e.sent,z(j),C(r.responses),O(u),S(l),D(r.complete),ie(!0);case 17:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[n,i]);return Object(J.jsxs)("div",{style:{width:"70%",minWidth:"400px",margin:"0 auto",display:"block",padding:10},children:[""!==X&&Object(J.jsx)("div",{style:{paddingBottom:20},children:Object(J.jsx)(q,{data:X})}),P.length>0&&Object(J.jsx)(U.a,{children:P.map((function(e,t){var n,a,c;return Object(J.jsx)(j.a,{schema:null!==(n=e.json_schema)&&void 0!==n?n:{},uiSchema:null!==(a=e.ui_schema)&&void 0!==a?a:{},formData:null!==(c=e.responses)&&void 0!==c?c:{},widgets:se,disabled:!0,children:" "},"prev_task_".concat(t))}))}),Object(J.jsx)(U.a,{children:Object(J.jsx)(j.a,{schema:p,uiSchema:v,formData:w,formContext:V,liveOmit:!0,omitExtraData:!0,widgets:se,disabled:T,onChange:function(e){C(e.formData);var t={responses:e.formData};g.patch(f+n+"/",t)},onSubmit:function(){ne(!0);var e={responses:w,complete:!0};g.patch(f+n+"/",e).then((function(){return ne(!1)})).then((function(){return r.push(s)}))},children:Object(J.jsxs)(E.a,{display:"flex",children:[Object(J.jsx)(B.a,{type:"submit",disabled:T||!re,children:"Submit"}),te&&Object(J.jsx)(E.a,{paddingLeft:2,children:Object(J.jsx)(A.a,{})})]})})})]})},ee=n(7),te=n(35),ne=n(543),ae=n(549),ce=n(551),re=n(550),ie="GigaTurnip Tasks",se=n(555),oe=240,ue=function(e){return{width:oe,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen}),overflowX:"hidden"}},le=function(e){return Object(v.a)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:"calc(".concat(e.spacing(7)," + 1px)")},e.breakpoints.up("sm"),{width:"calc(".concat(e.spacing(9)," + 1px)")})},je=Object(ee.a)("div")((function(e){var t=e.theme;return Object(S.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:t.spacing(0,1)},t.mixins.toolbar)})),de=Object(ee.a)(ae.a,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return Object(S.a)({zIndex:t.zIndex.drawer+1,transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen})},n&&{marginLeft:oe,width:"calc(100% - ".concat(oe,"px)"),transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen})})})),be=(Object(ee.a)(ne.a,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return Object(S.a)(Object(S.a)({width:oe,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box"},n&&Object(S.a)(Object(S.a)({},ue(t)),{},{"& .MuiDrawer-paper":ue(t)})),!n&&Object(S.a)(Object(S.a)({},le(t)),{},{"& .MuiDrawer-paper":le(t)}))})),function(e){Object(te.a)();var t=Object(d.f)(),n=(Object(d.g)().campaignId,Object(a.useContext)(G).currentUser),c=e.children,r=Object(a.useState)(!1),i=Object(l.a)(r,2),s=i[0];i[1];return Object(J.jsxs)(E.a,{sx:{display:"flex"},children:[Object(J.jsx)(re.a,{}),Object(J.jsx)(de,{position:"fixed",open:s,children:Object(J.jsxs)(ce.a,{children:[Object(J.jsx)(N.a,{variant:"h6",noWrap:!0,component:"div",sx:{cursor:"pointer",flexGrow:1},onClick:function(){t.push("/")},children:ie}),Object(J.jsx)(N.a,{children:null===n||void 0===n?void 0:n.email}),n?Object(J.jsx)(se.a,{onClick:C,color:"inherit",children:"\u0412\u044b\u0439\u0442\u0438"}):Object(J.jsx)(se.a,{onClick:w,color:"inherit",children:"\u0412\u043e\u0439\u0442\u0438"})]})}),Object(J.jsxs)(E.a,{component:"main",sx:{flexGrow:1,p:0},children:[Object(J.jsx)(je,{}),c]})]})}),he=n(57),pe=Object(ee.a)("div")((function(e){var t=e.theme;return Object(S.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:t.spacing(0,1)},t.mixins.toolbar)})),Oe=function(e){var t=e.children,n=Object(a.useContext)(G).currentUser;Object(d.f)();return Object(J.jsxs)(E.a,{sx:{flexGrow:1},children:[Object(J.jsx)(ae.a,{position:"static",children:Object(J.jsxs)(ce.a,{children:[Object(J.jsx)(N.a,{variant:"h6",noWrap:!0,component:"div",sx:{flexGrow:1},children:ie}),Object(J.jsx)(N.a,{children:null===n||void 0===n?void 0:n.email}),n?Object(J.jsx)(se.a,{onClick:C,color:"inherit",children:"\u0412\u044b\u0439\u0442\u0438"}):Object(J.jsx)(se.a,{onClick:w,color:"inherit",children:"\u0412\u043e\u0439\u0442\u0438"})]})}),Object(J.jsxs)(E.a,{component:"main",sx:{flexGrow:1,p:3},children:[Object(J.jsx)(pe,{}),t]})]})},fe=n(556),xe=n(558),ge=n(557),me=function(e){var t=e.data,n=t.id,a=t.name,c=t.description,r=t.campaign,i=e.onCardButtonClick,s=e.openCampaignInfo,o=e.selectable;return Object(J.jsxs)(fe.a,{sx:{width:300},children:[Object(J.jsxs)(ge.a,{children:[Object(J.jsx)(N.a,{variant:"h5",component:"h2",gutterBottom:!0,children:a}),Object(J.jsxs)(N.a,{variant:"subtitle2",color:"textSecondary",children:["ID: ",n," ",r&&"Campaign: ".concat(r)]}),Object(J.jsx)(N.a,{variant:"body1",component:"p",children:c||Object(J.jsx)("br",{})})]}),Object(J.jsx)(xe.a,{children:o?Object(J.jsx)(se.a,{size:"small",onClick:function(){s&&s(n)},children:"\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435"}):Object(J.jsx)(se.a,{size:"small",onClick:function(){i(n)},children:"\u041e\u0442\u043a\u0440\u044b\u0442\u044c"})})]})},ve=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)([]),i=Object(l.a)(r,2),s=i[0],o=i[1],u=Object(d.f)();Object(a.useEffect)((function(){g.get(p+"list_user_campaigns/").then((function(e){return e.data})).then((function(e){return console.log("user_campaigns",e),e})).then((function(e){return c(e)})),g.get(p+"list_user_selectable/").then((function(e){return e.data})).then((function(e){return console.log("selectable_campaigns",e),e})).then((function(e){return o(e)}))}),[]);var j=function(e){u.push("/campaign/about/".concat(e))},b=function(e){u.push("/campaign/".concat(e,"/tasks"))};return Object(J.jsxs)(U.a,{children:[n&&n.length>0&&Object(J.jsxs)(U.a,{children:[Object(J.jsx)(N.a,{align:"center",variant:"h4",children:"\u041c\u043e\u0438 \u043a\u0430\u043c\u043f\u0430\u043d\u0438\u0438"}),Object(J.jsx)(U.a,{container:!0,justifyContent:"center",children:n.map((function(e){return Object(J.jsx)(U.a,{item:!0,style:{padding:10},children:Object(J.jsx)(me,{data:e,onCardButtonClick:b,openCampaignInfo:j,selectable:!1})},e.id)}))})]}),s&&s.length>0&&Object(J.jsxs)(U.a,{children:[Object(J.jsx)(N.a,{align:"center",variant:"h4",children:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0435 \u043a\u0430\u043c\u043f\u0430\u043d\u0438\u0438"}),Object(J.jsx)(U.a,{container:!0,justifyContent:"center",children:s.map((function(e){return Object(J.jsx)(U.a,{item:!0,style:{padding:10},children:Object(J.jsx)(me,{data:e,onCardButtonClick:b,openCampaignInfo:j,selectable:!0})},e.id)}))})]})]})},Se=n(127),ke=["children","value","index"],ye=function(e){var t=e.children,n=e.value,a=e.index,c=Object(Se.a)(e,ke);return Object(J.jsx)("div",Object(S.a)(Object(S.a)({role:"tabpanel",hidden:n!==a,id:"simple-tabpanel-".concat(a),"aria-labelledby":"simple-tab-".concat(a)},c),{},{children:n===a&&Object(J.jsx)(E.a,{children:t})}))},we=n(539),Ce=n(559);function _e(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var Ie=function(e){var t=e.value,n=e.handleChange;return Object(J.jsxs)(E.a,{sx:{width:"100%",bgcolor:"background.paper"},children:[Object(J.jsxs)(we.a,{value:t,onChange:n,centered:!0,variant:"fullWidth",children:[Object(J.jsx)(Ce.a,Object(S.a)({label:"\u041d\u0435\u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0435"},_e(0))),Object(J.jsx)(Ce.a,Object(S.a)({label:"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0435"},_e(1))),e.showSelectable&&Object(J.jsx)(Ce.a,Object(S.a)({label:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0435"},_e(2)))]}),e.children]})},Te=function(e){var t=e.id,n=(e.complete,e.name),a=e.description,c=e.creatable,r=e.selectable,i=Object(d.f)(),s=function(){i.push("".concat(i.location.pathname,"/").concat(t))},o=function(){(function(e){return g.post(O+e+"/create_task/").then((function(e){return e.data}))})(t).then((function(e){return i.push("".concat(i.location.pathname,"/").concat(e.id))})).catch((function(e){return alert(e)}))},u=function(){R(t).then((function(e){return i.push("".concat(i.location.pathname,"/").concat(t))})).catch((function(e){return alert(e)}))};return Object(J.jsxs)(fe.a,{sx:{width:300},children:[Object(J.jsxs)(ge.a,{children:[Object(J.jsx)(N.a,{variant:"h5",component:"span",gutterBottom:!0,children:n}),Object(J.jsx)("br",{}),Object(J.jsx)(N.a,{variant:"subtitle2",component:"span",children:t&&!c?"ID: ".concat(t):Object(J.jsx)("br",{})}),Object(J.jsx)("br",{}),Object(J.jsx)(N.a,{variant:"body1",component:"span",children:a||Object(J.jsx)("br",{})})]}),Object(J.jsx)(xe.a,{children:r?Object(J.jsx)(se.a,{size:"small",onClick:u,children:"\u041e\u0442\u043a\u0440\u044b\u0442\u044c"}):c?Object(J.jsx)(se.a,{size:"small",onClick:o,children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"}):Object(J.jsx)(se.a,{size:"small",onClick:s,children:"\u041e\u0442\u043a\u0440\u044b\u0442\u044c"})})]})},Ee=n(561),De=n(562),Ne=n(560),Je=n(272),Le=n.n(Je),Pe=function(e){var t=e.id,n=e.taskData,c=e.isAssigned,r=e.refreshTasks,i=Object(d.g)().campaignId,s=Object(a.useContext)(G).currentUser,b=Object(a.useState)({}),h=Object(l.a)(b,2),p=h[0],O=h[1],x=Object(a.useState)({}),m=Object(l.a)(x,2),v=m[0],S=m[1],k=Object(a.useState)({}),y=Object(l.a)(k,2),w=y[0],C=y[1],_=Object(a.useState)(!1),I=Object(l.a)(_,2),T=I[0],D=I[1],N=Object(a.useState)([]),L=Object(l.a)(N,2),P=L[0],z=L[1],W=Object(a.useState)({}),M=Object(l.a)(W,2),q=M[0],V=M[1],R=Object(a.useState)(!1),H=Object(l.a)(R,2),K=H[0],X=H[1],Y={customfile:F};Object(a.useEffect)((function(){n&&s&&function(){var e=Object(u.a)(o.a.mark((function e(){var t,a,c,r,u,l,j;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=(c=n).stage,V({campaignId:i.toString(),chainId:r.chain.id.toString(),stageId:r.id.toString(),userId:s.uid,taskId:c.id.toString()}),u=null!==(t=JSON.parse(r.json_schema))&&void 0!==t?t:{},l=null!==(a=JSON.parse(r.ui_schema))&&void 0!==a?a:{},j=c.displayed_prev_tasks.map((function(e){return{responses:e.responses,json_schema:JSON.parse(e.stage.json_schema),ui_schema:JSON.parse(e.stage.ui_schema)}})),z(j),C(c.responses),O(u),S(l),D(c.complete);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[n,s]);return Object(J.jsx)(U.a,{container:!0,children:Object(J.jsxs)(U.a,{direction:"row",container:!0,spacing:1,children:[P.length>0&&Object(J.jsx)(U.a,{container:!0,item:!0,sm:6,xs:12,sx:{display:"block"},children:P.map((function(e,t){var n,a,c;return Object(J.jsx)(j.a,{schema:null!==(n=e.json_schema)&&void 0!==n?n:{},uiSchema:null!==(a=e.ui_schema)&&void 0!==a?a:{},formData:null!==(c=e.responses)&&void 0!==c?c:{},widgets:Y,disabled:!0,children:" "},"prev_task_".concat(t))}))}),Object(J.jsx)(U.a,{container:!0,item:!0,sm:P.length>0?6:12,xs:12,sx:{display:"block"},children:Object(J.jsx)(j.a,{schema:null!==p&&void 0!==p?p:{},uiSchema:null!==v&&void 0!==v?v:{},formData:null!==w&&void 0!==w?w:{},formContext:q,liveOmit:!0,omitExtraData:!0,widgets:Y,disabled:T||!c,onChange:function(e){C(e.formData);var n={responses:e.formData};g.patch(f+t+"/",n)},onSubmit:function(){X(!0);var e={responses:w,complete:!0};g.patch(f+t+"/",e).then((function(){return X(!1)})).then((function(){return r&&r()})).catch((function(e){alert(e),X(!1)}))},children:Object(J.jsxs)(E.a,{display:"flex",children:[Object(J.jsx)(B.a,{type:"submit",disabled:T||!c,children:"Submit"}),K&&Object(J.jsx)(E.a,{paddingLeft:2,children:Object(J.jsx)(A.a,{})})]})})})]})})},ze=n(536),Fe=n(271),Be=n.n(Fe),Ue=["expand"],Ae=Object(ee.a)((function(e){e.expand;var t=Object(Se.a)(e,Ue);return Object(J.jsx)(Ne.a,Object(S.a)({},t))}))((function(e){var t=e.theme;return{transform:e.expand?"rotate(180deg)":"rotate(0deg)",marginLeft:"auto",transition:t.transitions.create("transform",{duration:t.transitions.duration.shortest})}})),Ge=function(e){var t=e.id,n=(e.complete,e.name),c=(e.description,e.creatable),r=(e.selectable,e.task),i=e.expand,s=e.refreshTasks,o=Object(a.useState)(!1),u=Object(l.a)(o,2),j=u[0],d=u[1],b=Object(a.useState)(!1),h=Object(l.a)(b,2),p=h[0],O=h[1];Object(a.useEffect)((function(){d(i)}),[i]);return Object(J.jsxs)(fe.a,{children:[Object(J.jsx)(Ee.a,{action:Object(J.jsxs)(ze.a,{direction:"row",spacing:1,children:[Object(J.jsx)(se.a,{size:"small",variant:p?"text":"outlined",disabled:p,sx:{borderRadius:"5em"},onClick:function(){R(t).then((function(e){return O(!0)})).catch((function(e){alert(e),s&&s()}))},children:p?Object(J.jsx)(Be.a,{color:"primary"}):"Get"}),Object(J.jsx)(Ae,{expand:j,onClick:function(){d(!j)},disabled:c,"aria-expanded":j,"aria-label":"show more",children:Object(J.jsx)(Le.a,{})})]}),sx:{py:1,px:2},title:n,subheader:"ID: ".concat(t),titleTypographyProps:{variant:"h6"},subheaderTypographyProps:{variant:"caption"}}),Object(J.jsx)(De.a,{in:j,timeout:"auto",unmountOnExit:!0,children:Object(J.jsx)(ge.a,{children:Object(J.jsx)(Pe,{id:t,taskData:r,isAssigned:p,refreshTasks:s})})})]})},We=function(e){var t=e.complete,n=e.selectable,c=e.tasks,r=e.creatable,i=e.refreshTasks,s=Object(a.useState)(!1),o=Object(l.a)(s,2),u=o[0],j=o[1];return Object(J.jsxs)(U.a,{container:!0,direction:r?"row":"column",alignItems:"center",justifyContent:r?"flex-start":"center",children:[n&&Object(J.jsx)(se.a,{variant:"contained",onClick:function(){j(!u)},children:u?"\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0432\u0441\u0435":"\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0432\u0441\u0435"}),c.map((function(e){if(r){var a=e.id,c=e.name,s=e.description;return Object(J.jsx)(U.a,{item:!0,sx:{p:1},children:Object(J.jsx)(Te,{id:a,name:c,description:s,complete:t,selectable:n,creatable:r})},e.id)}var o=e.id.toString(),l=e.stage.name,j=e.stage.description;return n?Object(J.jsx)(U.a,{item:!0,sx:{p:1,width:"100%"},children:Object(J.jsx)(Ge,{id:o,name:l,description:j,complete:t,selectable:n,creatable:r,task:e,expand:u,refreshTasks:i})},e.id):Object(J.jsx)(U.a,{item:!0,style:{padding:10},children:Object(J.jsx)(Te,{id:o,name:l,description:j,complete:t,selectable:n,creatable:r})},e.id)}))]})},Me=n(540),qe=function(e){var t=Object(d.g)().campaignId,n=Object(a.useContext)(G).currentUser,r=Object(a.useState)(0),i=Object(l.a)(r,2),s=i[0],o=i[1],u=Object(a.useState)([]),j=Object(l.a)(u,2),b=j[0],h=j[1],p=Object(a.useState)([]),f=Object(l.a)(p,2),x=f[0],m=f[1],v=Object(a.useState)([]),S=Object(l.a)(v,2),k=S[0],y=S[1],w=Object(a.useState)([]),C=Object(l.a)(w,2),_=C[0],I=C[1],T=Object(a.useState)(0),D=Object(l.a)(T,2),N=D[0],L=D[1],P=c.a.useState(1),z=Object(l.a)(P,2),F=z[0],B=z[1],A=function(){H(t).then((function(e){return V(e,h,L)})),K(t).then((function(e){return m(e)})),X(t).then((function(e){return y(e)})),function(e){return g.get("".concat(O,"user_relevant/?chain__campaign=").concat(e)).then((function(e){return e.data}))}(t).then((function(e){return I(e)}))};return Object(a.useEffect)((function(){A()}),[t]),n&&n.uid&&Object(J.jsxs)(U.a,{children:[Object(J.jsx)(We,{creatable:!0,tasks:_}),Object(J.jsxs)(Ie,{value:s,handleChange:function(e,t){o(t)},showSelectable:b.length>0,children:[Object(J.jsx)(ye,{value:s,index:0,children:Object(J.jsx)(We,{complete:!1,tasks:k})}),Object(J.jsx)(ye,{value:s,index:1,children:Object(J.jsx)(We,{complete:!0,tasks:x})}),b.length>0&&Object(J.jsxs)(ye,{value:s,index:2,children:[Object(J.jsx)(We,{selectable:!0,tasks:b,refreshTasks:A}),Object(J.jsx)(E.a,{pb:2,display:"flex",justifyContent:"center",children:Object(J.jsx)(Me.a,{count:N,page:F,onChange:function(e,n){B(n),n&&(0===s?X(t).then((function(e){return y(e)})):1===s?K(t).then((function(e){return m(e)})):2===s&&H(t,n).then((function(e){return V(e,h,L)})))},showFirstButton:!0,showLastButton:!0})})]})]})]})},Ve=function(){var e=Object(d.g)().id,t=Object(d.f)(),n=Object(a.useState)(""),c=Object(l.a)(n,2),r=c[0],i=c[1],s=Object(a.useState)(""),o=Object(l.a)(s,2),u=o[0],j=o[1],b=Object(a.useState)(""),h=Object(l.a)(b,2),O=h[0],f=h[1];Object(a.useEffect)((function(){console.log(p,e),function(e){return g.get(p+e+"/").then((function(e){return e.data}))}(e).then((function(e){var t=e.richText,n=e.name,a=e.description;n&&i(n),a&&j(a),t&&f(t)}))}),[e]);return Object(J.jsxs)("div",{style:{width:"70%",minWidth:"400px",margin:"0 auto",display:"block",padding:10},children:[Object(J.jsx)(N.a,{variant:"h3",align:"center",children:r}),Object(J.jsx)(N.a,{variant:"h6",align:"center",children:u}),O&&Object(J.jsx)(q,{data:O}),Object(J.jsx)(U.a,{container:!0,justifyContent:"center",style:{padding:20},children:Object(J.jsx)(se.a,{variant:"contained",color:"primary",onClick:function(){(function(e){return g.post(p+e+"/join_campaign/")})(e).then((function(){return t.push("/campaign/".concat(e,"/tasks"))}))},children:"\u041f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f / \u041a\u043e\u0448\u0443\u043b\u0443\u0443"})})]})},Re=function(){var e=Object(a.useContext)(G).currentUser;if(e){var t=localStorage.getItem("token");e.getIdToken(!1).then((function(e){t?e!==t&&(localStorage.setItem("token",e),window.location.reload()):(localStorage.setItem("token",e),window.location.reload())}))}return Object(J.jsx)("div",{children:Object(J.jsx)(he.a,{children:Object(J.jsxs)(d.c,{children:[Object(J.jsx)(d.a,{exact:!0,path:"/campaign/about/:id",children:Object(J.jsx)(Ve,{})}),Object(J.jsx)(d.a,{path:"/campaign/:campaignId",children:Object(J.jsxs)(be,{children:[Object(J.jsx)(d.a,{exact:!0,path:"/campaign/:campaignId/tasks",children:Object(J.jsx)(qe,{})}),Object(J.jsx)(d.a,{exact:!0,path:"/campaign/:campaignId/tasks/:id",children:Object(J.jsx)($,{})})]})}),Object(J.jsx)(d.a,{path:"/",children:Object(J.jsx)(Oe,{children:Object(J.jsx)(ve,{})})})]})})})},He=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,563)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};i.a.render(Object(J.jsx)(W,{children:Object(J.jsx)(Re,{})}),document.getElementById("root")),He()}},[[498,1,2]]]);
//# sourceMappingURL=main.4f4cb32c.chunk.js.map