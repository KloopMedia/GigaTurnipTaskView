(this["webpackJsonpgigaturnip-taskview"]=this["webpackJsonpgigaturnip-taskview"]||[]).push([[0],{259:function(e,t,n){},465:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(22),r=n.n(i),s=(n(259),n(34)),o=n.n(s),l=n(49),u=n(13),j=n(149),d=n(25),b=n(235),h="api/v1/campaigns/",p="api/v1/taskstages/",O="api/v1/tasks/",f=n.n(b).a.create({baseURL:"https://journal-bb5e3.uc.r.appspot.com/"});f.interceptors.request.use((function(e){var t=localStorage.getItem("token");return t&&(e.headers.Authorization="JWT "+t),e}),(function(e){return Promise.reject(e)}));var g=f,m=(n(453),n(33)),x=n(14),v=n(21),S=n(63);S.a.initializeApp({apiKey:"AIzaSyCXiwOUNsbzKH7sbSAZrqA9f7VOeCMdUOQ",authDomain:"gigaturnip-b6b5b.firebaseapp.com",projectId:"gigaturnip-b6b5b",storageBucket:"gigaturnip-b6b5b.appspot.com",messagingSenderId:"414429242328",appId:"1:414429242328:web:a4685f5ac6895ea767c8ad",measurementId:"G-Y8JTEJMTET"});var k=new S.a.auth.GoogleAuthProvider;S.a.firestore().settings({ignoreUndefinedProperties:!0});var w=function(){return k.setCustomParameters({prompt:"select_account"}),S.a.auth().signInWithPopup(k)},y=function(){return S.a.auth().signOut().then((function(){return localStorage.removeItem("token")})).then((function(){return window.location.reload()}))},C=S.a,I=function(e,t,n){return n&&e?Object(v.a)(Object(v.a)({},e),t):t},_=function(){var e=Object(l.a)(o.a.mark((function e(t,n,a,c,i){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=4;break}return i||(a({}),c({})),e.next=4,Promise.all(t.map(function(){var e=Object(l.a)(o.a.mark((function e(t){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n.child(t.name).put(t),a((function(e){var n=Object(x.a)({},t.name,{status:"loading",progress:0});return e?Object(v.a)(Object(v.a)({},e),n):n})),r.on(C.storage.TaskEvent.STATE_CHANGED,(function(e){var n=e.bytesTransferred/e.totalBytes*100;a((function(e){var a=Object(x.a)({},t.name,{status:"loading",progress:n});return e?Object(v.a)(Object(v.a)({},e),a):a}))}),(function(e){console.log(e)}),(function(){r.snapshot.ref.getDownloadURL().then((function(e){console.log("FILE PATH",r.snapshot.ref.fullPath);var n=r.snapshot.ref.fullPath,s=e;a((function(e){var n=Object(x.a)({},t.name,{status:"complete",progress:100,url:s});return I(e,n,i)})),c((function(e){var a=Object(x.a)({},t.name,n);return I(e,a,i)}))}))}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:case 5:case"end":return e.stop()}}),e)})));return function(t,n,a,c,i){return e.apply(this,arguments)}}(),N=n(496),T=n(512),E=n(498),B=n(5),z=function(e){return Object(B.jsxs)(T.a,{display:"flex",alignItems:"center",children:[Object(B.jsx)(T.a,{width:"100%",mr:1,children:Object(B.jsx)(N.a,Object(v.a)({variant:"determinate"},e))}),Object(B.jsx)(T.a,{minWidth:35,children:Object(B.jsx)(E.a,{variant:"body2",color:"textSecondary",children:"".concat(Math.round(e.value),"%")})})]})},L=n(237),J=n(515),P=function(e){var t=e.schema,n=e.uiSchema,c=e.disabled,i=e.required,r=e.formContext,s=e.value,j=r.campaignId,d=r.chainId,b=r.stageId,h=r.userId,p=r.taskId,O=Object(a.useState)({}),f=Object(u.a)(O,2),g=f[0],S=f[1],k=Object(a.useState)({}),w=Object(u.a)(k,2),y=w[0],I=w[1],N=Object(a.useState)(""),T=Object(u.a)(N,2),E=T[0],P=T[1],U=Object(a.useState)(!1),A=Object(u.a)(U,2),D=A[0],G=A[1],W=Object(a.useState)(!1),F=Object(u.a)(W,2),R=F[0],M=F[1],q=Object(a.useState)(""),V=Object(u.a)(q,2),H=V[0],K=V[1],X=Object(a.useState)({}),Y=Object(u.a)(X,2),Q=Y[0],Z=Y[1],$=!(!n["ui:options"]||!n["ui:options"].private)&&n["ui:options"].private,ee=!(!n["ui:options"]||!n["ui:options"].multiple)&&n["ui:options"].multiple,te=Object.keys(g).length>0,ne=i&&!te,ae=void 0;j&&d&&b&&h&&p&&(ae=C.storage(),ae=(ae=$?ae.ref("private"):ae.ref("public")).child(j).child(d).child(b).child(h).child(p)),Object(a.useEffect)((function(){if(s&&Object.keys(s).length>0){console.log("value",s);var e=JSON.parse(s);Z(e),Object.keys(e).forEach((function(t){ie(e[t]).then((function(e){return S((function(n){return Object(v.a)(Object(v.a)({},n),{},Object(x.a)({},t,{url:e,status:"complete"}))}))}))}))}}),[s]);var ce=function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Files selected: ",Object(m.a)(t.target.files)),_(Object(m.a)(t.target.files),ae,S,I,ee),t.target.value=null;case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=function(e){return C.storage().ref(e).getDownloadURL()};Object(a.useEffect)((function(){if(y&&Object.keys(y).length>0){console.log("fileLinks",y);try{var t="";if(ee){var n=JSON.parse(s),a=Object(v.a)(Object(v.a)({},n),y);t=JSON.stringify(a)}else t=JSON.stringify(y);e.onChange(t)}catch(i){var c=JSON.stringify(y);console.error(i),e.onChange(c)}}}),[y]);var re=function(){var e=Object(l.a)(o.a.mark((function e(t){var n,a,c,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=Q,console.log("FILE CLICK VALUE",n),!(t in n)){e.next=22;break}return a=n[t],console.log(a),e.next=7,C.storage().ref().child(a).getMetadata();case 7:c=e.sent,i=c.contentType.split("/")[0],console.log("FILE TYPE",i),e.t0=i,e.next="image"===e.t0?13:"video"===e.t0?17:21;break;case 13:return P(g[t].url),K(c.contentType),G(!0),e.abrupt("break",22);case 17:return P(g[t].url),K(c.contentType),M(!0),e.abrupt("break",22);case 21:alert("\u0424\u0430\u0439\u043b \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0444\u043e\u0442\u043e \u0438\u043b\u0438 \u0432\u0438\u0434\u0435\u043e");case 22:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),se=function(){P(""),K(""),G(!1),M(!1)};return Object(B.jsxs)("div",{children:[D&&Object(B.jsx)(L.a,{src:[E],disableScroll:!1,backgroundStyle:{backgroundColor:"rgba(0,0,0,0.8)"},closeOnClickOutside:!0,onClose:se}),Object(B.jsx)(J.a,{open:R,onClose:se,fullWidth:!0,children:Object(B.jsxs)("video",{height:"360px",controls:!0,children:[Object(B.jsx)("source",{src:E,type:H}),"Your browser does not support the video tag."]})}),Object(B.jsx)("label",{className:"form-label",children:null===t||void 0===t?void 0:t.title}),Object(B.jsx)("br",{}),Object(B.jsx)("input",{disabled:c,required:ne,multiple:ee,type:"file",onChange:ce}),Object.keys(g).map((function(t,n){return Object(B.jsxs)("div",{children:[Object(B.jsxs)("div",{style:{display:"flex",alignItems:"baseline"},children:[Object(B.jsx)("p",{children:t}),"complete"===g[t].status&&Object(B.jsxs)("div",{style:{display:"flex",alignItems:"baseline"},children:[Object(B.jsx)("button",{onClick:function(){return re(t)},style:{fontSize:"14px",padding:0,margin:"0 10px"},type:"button",className:"btn btn-link text-success",children:"\u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0444\u0430\u0439\u043b"}),!c&&Object(B.jsx)("button",{onClick:function(){return function(t){var n=Q;if(t in n){delete n[t];var a=JSON.stringify(n);e.onChange(a)}var c=Object(v.a)({},y);t in c&&(delete c[t],I(c));var i=Object(v.a)({},g);t in i&&(delete i[t],S(i)),console.log("DELETE LOG",i)}(t)},style:{fontSize:"14px",padding:0,margin:"0 10px"},type:"button",className:"btn btn-link text-danger",children:"\u0443\u0434\u0430\u043b\u0438\u0442\u044c"})]})]}),"loading"===g[t].status&&Object(B.jsx)(z,{value:g[t].progress})]},t)}))]})},U=n(112),A=n(499),D=n(500),G=c.a.createContext(),W=function(e){var t=e.children,n=Object(a.useState)(null),c=Object(u.a)(n,2),i=c[0],r=c[1];return Object(a.useEffect)((function(){C.auth().onAuthStateChanged((function(e){e&&(r(e),e.getIdToken(!0).then((function(e){localStorage.setItem("token",e)})))})),C.auth().onIdTokenChanged((function(e){e&&e.getIdToken(!1).then((function(e){localStorage.setItem("token",e)}))}))}),[]),Object(B.jsx)(G.Provider,{value:{currentUser:i},children:t})},F=n(238),R=function(e){var t=e.data;return Object(B.jsx)(F.a,{id:"ViewerTinyMCE",value:t,toolbar:!1,inline:!1,disabled:!0,tinymceScriptSrc:"/GigaTurnipTaskView/tinymce/tinymce.min.js",init:{plugins:"autoresize",menubar:!1,image_advtab:!0,importcss_append:!0}})},M=function(){return g.get(h+"list_user_campaigns/").then((function(e){return e.data})).then((function(e){return console.log("user_campaigns",e),e}))},q=function(e){return g.get("".concat(O+e,"/list_displayed_previous/")).then((function(e){return e.data}))},V=function(){var e=Object(d.g)(),t=e.id,n=e.campaignId,c=Object(d.f)(),i=Object(a.useContext)(G).currentUser,r="/campaign/".concat(n,"/tasks"),s=Object(a.useState)({}),b=Object(u.a)(s,2),h=b[0],p=b[1],f=Object(a.useState)({}),m=Object(u.a)(f,2),x=m[0],v=m[1],S=Object(a.useState)({}),k=Object(u.a)(S,2),w=k[0],y=k[1],C=Object(a.useState)(!1),I=Object(u.a)(C,2),_=I[0],N=I[1],E=Object(a.useState)([]),z=Object(u.a)(E,2),L=z[0],J=z[1],W=Object(a.useState)({}),F=Object(u.a)(W,2),M=F[0],V=F[1],H=Object(a.useState)(""),K=Object(u.a)(H,2),X=K[0],Y=K[1],Q=Object(a.useState)(!1),Z=Object(u.a)(Q,2),$=Z[0],ee=Z[1],te={customfile:P};Object(a.useEffect)((function(){t&&i&&function(){var e=Object(l.a)(o.a.mark((function e(){var a,c,r,s,l,u,j;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.get(O+t+"/").then((function(e){return e.data}));case 2:return r=e.sent,(s=r.stage)&&s.rich_text&&Y(s.rich_text),V({campaignId:n.toString(),chainId:s.chain.id.toString(),stageId:s.id.toString(),userId:i.uid,taskId:r.id.toString()}),l=null!==(a=JSON.parse(s.json_schema))&&void 0!==a?a:{},u=null!==(c=JSON.parse(s.ui_schema))&&void 0!==c?c:{},e.next=10,q(t).then((function(e){return e.map((function(e){return{responses:e.responses,json_schema:JSON.parse(e.stage.json_schema),ui_schema:JSON.parse(e.stage.ui_schema)}}))}));case 10:j=e.sent,J(j),y(r.responses),p(l),v(u),N(r.complete);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[t,i]);return Object(B.jsxs)("div",{style:{width:"70%",minWidth:"400px",margin:"0 auto",display:"block",padding:10},children:[""!==X&&Object(B.jsx)("div",{style:{paddingBottom:20},children:Object(B.jsx)(R,{data:X})}),L.length>0&&Object(B.jsx)(A.a,{children:L.map((function(e,t){var n,a,c;return Object(B.jsx)(j.a,{schema:null!==(n=e.json_schema)&&void 0!==n?n:{},uiSchema:null!==(a=e.ui_schema)&&void 0!==a?a:{},formData:null!==(c=e.responses)&&void 0!==c?c:{},widgets:te,disabled:!0,children:" "},"prev_task_".concat(t))}))}),Object(B.jsx)(A.a,{children:Object(B.jsx)(j.a,{schema:null!==h&&void 0!==h?h:{},uiSchema:null!==x&&void 0!==x?x:{},formData:null!==w&&void 0!==w?w:{},formContext:M,liveOmit:!0,omitExtraData:!0,widgets:te,disabled:_,onChange:function(e){y(e.formData)},onSubmit:function(){ee(!0);var e={responses:w,complete:!0};g.patch(O+t+"/",e).then((function(){return ee(!1)})).then((function(){return c.push(r)}))},children:Object(B.jsxs)(T.a,{display:"flex",children:[Object(B.jsx)(U.a,{type:"submit",disabled:_,children:"Submit"}),$&&Object(B.jsx)(T.a,{paddingLeft:2,children:Object(B.jsx)(D.a,{})})]})})})]})},H=n(7),K=n(501),X=n(516),Y=n(36),Q=n(502),Z=n(503),$=n(504),ee=n(505),te=n(511),ne=n(518),ae=n(506),ce="GigaTurnip Tasks",ie=240,re=Object(K.a)((function(e){return Object(X.a)({root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:ie,width:"calc(100% - ".concat(ie,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},hide:{display:"none"},drawer:{width:ie,flexShrink:0,whiteSpace:"nowrap"},drawerOpen:{width:ie,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerClose:Object(x.a)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:e.spacing(7)+1},e.breakpoints.up("sm"),{width:e.spacing(9)+1}),toolbar:Object(v.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:e.spacing(0,1)},e.mixins.toolbar),content:{flexGrow:1},title:{flexGrow:1},formControl:{margin:e.spacing(1),alignItems:"center"},selectEmpty:{marginTop:e.spacing(2)},select:{},selectIcon:{fill:"white",top:"calc(50% - 14px)"}})})),se=function(e){var t=re(),n=(Object(Y.a)(),Object(d.f)()),c=Object(d.g)().campaignId,i=Object(a.useContext)(G).currentUser,r=e.children,s=Object(a.useState)(!1),o=Object(u.a)(s,2),l=o[0],j=(o[1],Object(a.useState)(c)),b=Object(u.a)(j,2),h=b[0],p=b[1],O=Object(a.useState)([]),f=Object(u.a)(O,2),g=f[0],m=f[1];console.log("CURRENT CAMPAIGN",c),Object(a.useEffect)((function(){M().then((function(e){return m(e)}))}),[]);return Object(B.jsxs)("div",{className:t.root,children:[Object(B.jsx)(Q.a,{}),Object(B.jsx)(Z.a,{position:"fixed",className:Object(H.a)(t.appBar,Object(x.a)({},t.appBarShift,l)),children:Object(B.jsxs)($.a,{children:[Object(B.jsx)(E.a,{variant:"h6",noWrap:!0,style:{cursor:"pointer"},onClick:function(){n.push("/")},children:ce}),Object(B.jsx)(A.a,{className:t.title}),Object(B.jsx)(E.a,{children:null===i||void 0===i?void 0:i.email}),Object(B.jsx)(ee.a,{className:t.formControl,size:"small",children:Object(B.jsx)(te.a,{className:t.select,autoWidth:!0,labelId:"campaign-select-label",id:"campaign-select-label",value:h,onChange:function(e){var t=e.target.value;console.log(t),p(t),n.push("/campaign/".concat(t,"/tasks"))},label:"Campaign",disableUnderline:!0,style:{color:"white"},inputProps:{classes:{icon:t.selectIcon}},children:g.map((function(e){return Object(B.jsx)(ne.a,{value:e.id,children:e.name},"".concat(e.name,"_").concat(e.id))}))})}),i?Object(B.jsx)(ae.a,{onClick:y,color:"inherit",children:"\u0412\u044b\u0439\u0442\u0438"}):Object(B.jsx)(ae.a,{onClick:w,color:"inherit",children:"\u0412\u043e\u0439\u0442\u0438"})]})}),Object(B.jsxs)("main",{className:t.content,children:[Object(B.jsx)("div",{className:t.toolbar}),r]})]})},oe=n(41),le=240,ue=Object(K.a)((function(e){return Object(X.a)({root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:le,width:"calc(100% - ".concat(le,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},hide:{display:"none"},drawer:{width:le,flexShrink:0,whiteSpace:"nowrap"},drawerOpen:{width:le,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerClose:Object(x.a)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:e.spacing(7)+1},e.breakpoints.up("sm"),{width:e.spacing(9)+1}),toolbar:Object(v.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:e.spacing(0,1)},e.mixins.toolbar),content:{flexGrow:1},title:{flexGrow:1}})})),je=function(e){var t=ue(),n=(Object(Y.a)(),c.a.useState(!1)),i=Object(u.a)(n,2),r=i[0],s=(i[1],e.children),o=Object(a.useContext)(G).currentUser;Object(d.f)();return Object(B.jsxs)("div",{className:t.root,children:[Object(B.jsx)(Q.a,{}),Object(B.jsx)(Z.a,{position:"fixed",className:Object(H.a)(t.appBar,Object(x.a)({},t.appBarShift,r)),children:Object(B.jsxs)($.a,{children:[Object(B.jsx)(E.a,{className:t.title,variant:"h6",noWrap:!0,children:ce}),Object(B.jsx)(E.a,{children:null===o||void 0===o?void 0:o.email}),o?Object(B.jsx)(ae.a,{onClick:y,color:"inherit",children:"\u0412\u044b\u0439\u0442\u0438"}):Object(B.jsx)(ae.a,{onClick:w,color:"inherit",children:"\u0412\u043e\u0439\u0442\u0438"})]})}),Object(B.jsxs)("main",{className:t.content,children:[Object(B.jsx)("div",{className:t.toolbar}),s]})]})},de=n(507),be=n(509),he=n(508),pe=Object(K.a)({root:{width:300},extra:{marginBottom:15}}),Oe=function(e){var t=pe(),n=e.data,a=n.id,c=n.name,i=n.description,r=n.campaign,s=e.onCardButtonClick,o=e.openCampaignInfo,l=e.selectable;return Object(B.jsxs)(de.a,{className:t.root,children:[Object(B.jsxs)(he.a,{children:[Object(B.jsx)(E.a,{variant:"h5",component:"h2",gutterBottom:!0,children:c}),Object(B.jsxs)(E.a,{className:t.extra,variant:"subtitle2",color:"textSecondary",children:["ID: ",a," ",r&&"Campaign: ".concat(r)]}),Object(B.jsx)(E.a,{variant:"body1",component:"p",children:i||Object(B.jsx)("br",{})})]}),Object(B.jsx)(be.a,{children:l?Object(B.jsx)(ae.a,{size:"small",onClick:function(){o&&o(a)},children:"\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435"}):Object(B.jsx)(ae.a,{size:"small",onClick:function(){s(a)},children:"\u041e\u0442\u043a\u0440\u044b\u0442\u044c"})})]})},fe=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)([]),r=Object(u.a)(i,2),s=r[0],o=r[1],l=Object(d.f)();Object(a.useEffect)((function(){M().then((function(e){return c(e)})),g.get(h+"list_user_selectable/").then((function(e){return e.data})).then((function(e){return console.log("selectable_campaigns",e),e})).then((function(e){return o(e)}))}),[]);var j=function(e){l.push("/campaign/about/".concat(e))},b=function(e){l.push("/campaign/".concat(e,"/tasks"))};return Object(B.jsxs)(A.a,{children:[Object(B.jsxs)(A.a,{children:[Object(B.jsx)(E.a,{align:"center",variant:"h4",children:"\u041c\u043e\u0438 \u043a\u0430\u043c\u043f\u0430\u043d\u0438\u0438"}),Object(B.jsx)(A.a,{container:!0,justifyContent:"center",children:n.map((function(e){return Object(B.jsx)(A.a,{item:!0,style:{padding:10},children:Object(B.jsx)(Oe,{data:e,onCardButtonClick:b,openCampaignInfo:j,selectable:!1})},e.id)}))})]}),Object(B.jsxs)(A.a,{children:[Object(B.jsx)(E.a,{align:"center",variant:"h4",children:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0435 \u043a\u0430\u043c\u043f\u0430\u043d\u0438\u0438"}),Object(B.jsx)(A.a,{container:!0,justifyContent:"center",children:s.map((function(e){return Object(B.jsx)(A.a,{item:!0,style:{padding:10},children:Object(B.jsx)(Oe,{data:e,onCardButtonClick:b,openCampaignInfo:j,selectable:!0})},e.id)}))})]})]})},ge=n(6),me=["children","value","index"],xe=function(e){var t=e.children,n=e.value,a=e.index,c=Object(ge.a)(e,me);return Object(B.jsx)("div",Object(v.a)(Object(v.a)({role:"tabpanel",hidden:n!==a,id:"simple-tabpanel-".concat(a),"aria-labelledby":"simple-tab-".concat(a)},c),{},{children:n===a&&Object(B.jsx)(T.a,{p:3,children:t})}))},ve=n(513),Se=n(510);function ke(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var we=Object(K.a)((function(e){return{root:{flexGrow:1,backgroundColor:e.palette.background.paper}}})),ye=function(e){var t=we(),n=e.value,a=e.handleChange;return Object(B.jsxs)(A.a,{children:[Object(B.jsx)("div",{className:t.root,children:Object(B.jsxs)(ve.a,{value:n,onChange:a,variant:"fullWidth",centered:!0,"aria-label":"simple tabs example",children:[Object(B.jsx)(Se.a,Object(v.a)({label:"\u041d\u0435\u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0435"},ke(0))),Object(B.jsx)(Se.a,Object(v.a)({label:"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0435"},ke(1))),e.showSelectable&&Object(B.jsx)(Se.a,Object(v.a)({label:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0435"},ke(2)))]})}),e.children]})},Ce=Object(K.a)({root:{width:300},extra:{marginBottom:15}}),Ie=function(e){var t=Ce(),n=e.id,a=(e.complete,e.name),c=e.description,i=e.creatable,r=e.selectable,s=Object(d.f)(),o=function(){s.push("".concat(s.location.pathname,"/").concat(n))},l=function(){(function(e){return g.post(p+e+"/create_task/").then((function(e){return e.data}))})(n).then((function(e){return s.push("".concat(s.location.pathname,"/").concat(e.id))})).catch((function(e){return alert(e)}))},u=function(){(function(e){return g.post(O+e+"/request_assignment/")})(n).then((function(e){return s.push("".concat(s.location.pathname,"/").concat(n))})).catch((function(e){return alert(e)}))};return Object(B.jsxs)(de.a,{className:t.root,children:[Object(B.jsxs)(he.a,{children:[Object(B.jsx)(E.a,{variant:"h5",component:"span",gutterBottom:!0,children:a}),Object(B.jsx)("br",{}),Object(B.jsx)(E.a,{variant:"subtitle2",component:"span",children:n&&!i?"ID: ".concat(n):Object(B.jsx)("br",{})}),Object(B.jsx)("br",{}),Object(B.jsx)(E.a,{variant:"body1",component:"span",children:c||Object(B.jsx)("br",{})})]}),Object(B.jsx)(be.a,{children:r?Object(B.jsx)(ae.a,{size:"small",onClick:u,children:"\u041e\u0442\u043a\u0440\u044b\u0442\u044c"}):i?Object(B.jsx)(ae.a,{size:"small",onClick:l,children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"}):Object(B.jsx)(ae.a,{size:"small",onClick:o,children:"\u041e\u0442\u043a\u0440\u044b\u0442\u044c"})})]})},_e=function(e){var t=e.complete,n=e.selectable,a=e.tasks,c=e.creatable;return Object(B.jsx)(A.a,{container:!0,direction:c?"row":"column",alignItems:"center",justifyContent:c?"flex-start":"center",children:a.map((function(e){var a,i,r;return c?(a=e.id,i=e.name,r=e.description):(a=e.id,i=e.stage.name,r=e.stage.description),Object(B.jsx)(A.a,{item:!0,style:{padding:10},children:Object(B.jsx)(Ie,{id:a,name:i,description:r,complete:t,selectable:n,creatable:c})},e.id)}))})},Ne=function(e){var t=Object(d.g)().campaignId,n=Object(a.useContext)(G).currentUser,c=Object(a.useState)(0),i=Object(u.a)(c,2),r=i[0],s=i[1],o=Object(a.useState)([]),l=Object(u.a)(o,2),j=l[0],b=l[1],h=Object(a.useState)([]),f=Object(u.a)(h,2),m=f[0],x=f[1],v=Object(a.useState)([]),S=Object(u.a)(v,2),k=S[0],w=S[1],y=Object(a.useState)([]),C=Object(u.a)(y,2),I=C[0],_=C[1];return Object(a.useEffect)((function(){(function(e){return g.get("".concat(O,"user_selectable/?stage__chain__campaign=").concat(e)).then((function(e){return e.data}))})(t).then((function(e){return b(e)})),function(e){return g.get("".concat(O,"user_relevant/?complete=",!0,"&stage__chain__campaign=").concat(e)).then((function(e){return e.data}))}(t).then((function(e){return x(e)})),function(e){return g.get("".concat(O,"user_relevant/?complete=",!1,"&stage__chain__campaign=").concat(e)).then((function(e){return e.data}))}(t).then((function(e){return w(e)})),function(e){return g.get("".concat(p,"user_relevant/?chain__campaign=").concat(e)).then((function(e){return e.data}))}(t).then((function(e){return _(e)}))}),[t]),n&&n.uid&&Object(B.jsxs)(A.a,{children:[Object(B.jsx)(_e,{creatable:!0,tasks:I}),Object(B.jsxs)(ye,{value:r,handleChange:function(e,t){s(t)},showSelectable:j.length>0,children:[Object(B.jsx)(xe,{value:r,index:0,children:Object(B.jsx)(_e,{complete:!1,tasks:k})}),Object(B.jsx)(xe,{value:r,index:1,children:Object(B.jsx)(_e,{complete:!0,tasks:m})}),j.length>0&&Object(B.jsx)(xe,{value:r,index:2,children:Object(B.jsx)(_e,{selectable:!0,tasks:j})})]})]})},Te=function(){var e=Object(d.g)().id,t=Object(d.f)(),n=Object(a.useState)(""),c=Object(u.a)(n,2),i=c[0],r=c[1],s=Object(a.useState)(""),o=Object(u.a)(s,2),l=o[0],j=o[1],b=Object(a.useState)(""),p=Object(u.a)(b,2),O=p[0],f=p[1];Object(a.useEffect)((function(){console.log(h,e),g.get(h+e+"/").then((function(e){return e.data})).then((function(e){var t=e.richText,n=e.name,a=e.description;n&&r(n),a&&j(a),t&&f(t)}))}),[e]);return Object(B.jsxs)("div",{style:{width:"70%",minWidth:"400px",margin:"0 auto",display:"block",padding:10},children:[Object(B.jsx)(E.a,{variant:"h3",align:"center",children:i}),Object(B.jsx)(E.a,{variant:"h6",align:"center",children:l}),O&&Object(B.jsx)(R,{data:O}),Object(B.jsx)(A.a,{container:!0,justifyContent:"center",style:{padding:20},children:Object(B.jsx)(ae.a,{variant:"contained",color:"primary",onClick:function(){(function(e){return g.post(h+e+"/join_campaign/")})(e).then((function(){return t.push("/campaign/".concat(e,"/tasks"))}))},children:"\u041f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f / \u041a\u043e\u0448\u0443\u043b\u0443\u0443"})})]})},Ee=function(){var e=Object(a.useContext)(G).currentUser;if(e){var t=localStorage.getItem("token");e.getIdToken(!1).then((function(e){t?e!==t&&(localStorage.setItem("token",e),window.location.reload()):(localStorage.setItem("token",e),window.location.reload())}))}return Object(B.jsx)("div",{children:Object(B.jsx)(oe.a,{children:Object(B.jsxs)(d.c,{children:[Object(B.jsx)(d.a,{exact:!0,path:"/campaign/about/:id",children:Object(B.jsx)(Te,{})}),Object(B.jsx)(d.a,{path:"/campaign/:campaignId",children:Object(B.jsxs)(se,{children:[Object(B.jsx)(d.a,{exact:!0,path:"/campaign/:campaignId/tasks",children:Object(B.jsx)(Ne,{})}),Object(B.jsx)(d.a,{exact:!0,path:"/campaign/:campaignId/tasks/:id",children:Object(B.jsx)(V,{})})]})}),Object(B.jsx)(d.a,{path:"/",children:Object(B.jsx)(je,{children:Object(B.jsx)(fe,{})})})]})})})},Be=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,520)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))};r.a.render(Object(B.jsx)(W,{children:Object(B.jsx)(Ee,{})}),document.getElementById("root")),Be()}},[[465,1,2]]]);
//# sourceMappingURL=main.0e063256.chunk.js.map