(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-us-us"],{"186b":function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"content",style:{"background-color":e.page_info.page_background_color}},[a("v-uni-view",{staticClass:"sortable sortable-panel",attrs:{id:"sort-1"}},[e._l(e.sorts.child,(function(t,i){return["st-search"==t.sorts?a("st-search",{attrs:{isPhone:e.isPhone,dat:t},on:{getUnique:function(t){arguments[0]=t=e.$handleEvent(t),e.activeGetUnique.apply(void 0,arguments)}}}):e._e(),"st-swiper"==t.sorts?a("st-swiper",{attrs:{isPhone:e.isPhone,dat:t},on:{getUnique:function(t){arguments[0]=t=e.$handleEvent(t),e.activeGetUnique.apply(void 0,arguments)}}}):e._e(),"st-form"==t.sorts?a("st-form",{attrs:{isPhone:e.isPhone,dat:t},on:{getUnique:function(t){arguments[0]=t=e.$handleEvent(t),e.activeGetUnique.apply(void 0,arguments)}}}):e._e(),"st-input"==t.sorts?a("st-input",{attrs:{isPhone:e.isPhone,dat:t},on:{getUnique:function(t){arguments[0]=t=e.$handleEvent(t),e.activeGetUnique.apply(void 0,arguments)}}}):e._e(),"st-button"==t.sorts?a("st-button",{attrs:{isPhone:e.isPhone,dat:t},on:{getUnique:function(t){arguments[0]=t=e.$handleEvent(t),e.activeGetUnique.apply(void 0,arguments)}}}):e._e(),"st-applys"==t.sorts?a("st-applys",{attrs:{isPhone:e.isPhone,dat:t},on:{getUnique:function(t){arguments[0]=t=e.$handleEvent(t),e.activeGetUnique.apply(void 0,arguments)}}}):e._e(),"st-notice"==t.sorts?a("st-notice",{attrs:{isPhone:e.isPhone,dat:t},on:{getUnique:function(t){arguments[0]=t=e.$handleEvent(t),e.activeGetUnique.apply(void 0,arguments)}}}):e._e(),"st-shop-list"==t.sorts?a("st-shop-list",{attrs:{isPhone:e.isPhone,dat:t},on:{getUnique:function(t){arguments[0]=t=e.$handleEvent(t),e.activeGetUnique.apply(void 0,arguments)}}}):e._e()]}))],2)],1)},s=[]},"27e2":function(e,t,a){"use strict";var i=a("4ea4");a("c975"),a("fb6a"),a("a434"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var n=i(a("1da1")),s=i(a("d61a")),d=i(a("26be")),r=i(a("83a8")),o=i(a("1131")),c=i(a("b99c")),l=i(a("305a")),h=i(a("5384")),u=i(a("016c")),f=i(a("4d40")),p={components:{"st-search":d.default,"st-form":r.default,"st-swiper":o.default,"st-button":c.default,"st-input":l.default,"st-applys":h.default,"st-notice":u.default,"st-shop-list":f.default},data:function(){return{page_info:{},data_sorts:[],sorts:[],isPhone:!1,isShowDelete:!1,isShowDeleteStyle:!1,delete_unique:-1,id:1009,back_data:[],advance_data:[],back_last_data:{},back_advance_len:10}},mounted:function(){window.addEventListener("message",this.save);var e=navigator.userAgent.toLowerCase(),t=this;setTimeout((function(){-1!=e.indexOf("windows")?(t.getEff(!1),t.isPhone=!1):(t.getEff(!0),t.isPhone=!0)}),500),this.getPageTheme()},computed:{isPageChange:function(){return this.data_sorts==JSON.stringify(this.sorts)}},methods:{getEff:function(e){var t=this;return(0,n.default)(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:i=t,t.http.getSortable(i.id).then(function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i.page_info=a,i.data_sorts=a.sortable,t.next=4,JSON.parse(a.sortable);case 4:i.sorts=t.sent,i.initSortable("sort-1",e,1),i.setPageInfo(a),setTimeout((function(){for(var t in i.sorts.child)i.sorts.child[t].child_id&&i.initSortable(i.sorts.child[t].child_id,e,2)}),100);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return a.stop()}}),a)})))()},initSortable:function(e,t,a){var i=this;return(0,n.default)(regeneratorRuntime.mark((function n(){var d,r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return d=i,n.next=3,document.getElementById(e);case 3:return r=n.sent,o={},n.next=7,{group:{name:"sort",pull:!0,put:!1},animation:200,forceFallback:!0,dragClass:"choose-active",chosenClass:"choose-active_1",disabled:t,filter:".st-item-fixed",scroll:!1,handle:".st-item-handle-1",onStart:function(e){d.isShowDelete=!0},onAdd:function(e){var t=e.to.id,a=e.from.id,i=e.oldIndex,n=e.newIndex;if("del"==t){var s=d.searchByIdAndIndex(a,i),r={id:a,type:"delete",index:i,item:s};d.back_data.push(r),d.deleteComp(a,t,i,n),e.item.style.width=0,e.item.style.height=0,e.item.style.overflow="hidden"}d.$forceUpdate()},onUpdate:function(t){var a=t.to.id,n=(t.from.id,t.oldIndex),s=t.newIndex;d.saveSort(s,n,e),d.isShowDelete=!1,d.pageIsChange();var r={id:a,old_index:s,new_index:n,type:"sort"};i.back_data.push(r),i.back_data.length>i.back_advance_len&&(i.back_data=i.back_data.slice(i.back_data.length-i.back_advance_len))}};case 7:o=n.sent,-1==a&&(o.group.pull=!1,o.group.put=!0),setTimeout((function(){s.default.create(r,o)}),300);case 11:case"end":return n.stop()}}),n)})))()},saveSort:function(e,t,a){var i=this;return(0,n.default)(regeneratorRuntime.mark((function n(){var s,d,r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s=i,d=s.sorts,d.id==a)t<e?(d.child.splice(e+1,0,d.child[t]),d.child.splice(t,1)):(d.child.splice(e,0,d.child[t]),d.child.splice(t+1,1));else for(r in d.child)o=d.child[r],o.child_id==a&&(t<e?(o.child.splice(e+1,0,o.child[t]),o.child.splice(t,1)):(o.child.splice(e,0,o.child[t]),o.child.splice(t+1,1)));s.sorts=d,uni.setStorageSync("sortable",s.sorts);case 5:case"end":return n.stop()}}),n)})))()},save:function(e){var t=this,a=e.data,i=a.data;switch(a.method){case"layoutSave":t.saveLayout();break;case"add-st":t.addComponent(i);break;case"update":t.updateAttr(i);break;case"deleteCompUnique":t.deleteCompUnique();break;case"backData":t.backData();break;case"advance":t.advance();break;case"setPageSuccess":t.setPageSuccess();break;case"updatePageTheme":t.updatePageTheme();break}},saveLayout:function(){var e=this,t=JSON.stringify(this.sorts);this.http.save_page(e.id,t)},addComponent:function(e){var t=this,a=this,i=e.attr_obj;i.unique=Math.floor((new Date).getTime()/1e3),-1==i.child_id&&(i.child_id=Math.floor((new Date).getTime())),this.sorts.child.splice(0,0,i);var n={id:this.sorts.id,type:"add",index:0,item:i};this.back_data.push(n),this.back_data.length>this.back_advance_len&&(this.back_data=this.back_data.slice(this.back_data.length-this.back_advance_len)),i.child_id&&setTimeout((function(){a.initSortable(i.child_id,t.isPhone,2)}),100)},updateAttr:function(e){var t=this,a=this.sorts;for(var i in a.child)if(a.child[i].unique==e.unique){var n=JSON.parse(JSON.stringify(a.child[i])),s={id:a.id,type:"update",unique:a.child[i].unique,item:n,new_data:e};for(var d in JSON.stringify(s.item)!=JSON.stringify(this.back_last_data.item)&&(this.back_data.push(s),this.back_data.length>this.back_advance_len&&(this.back_data=this.back_data.slice(this.back_data.length-this.back_advance_len))),e)t.sorts.child[i][d]=e[d];break}this.pageIsChange(),this.$forceUpdate()},deleteComp:function(e,t,a,i){var n=this.sorts;if(n.id==e)n.child.splice(a,1);else for(var s in n.child)n.child[s].child_id==e&&n.child[s].child.splice(a,1)},pageIsChange:function(){this.isPageChange?window.parent.postMessage({method:"pageLayoutChange",data:{flag:!1}},"*"):window.parent.postMessage({method:"pageLayoutChange",data:{flag:!0}},"*")},activeGetUnique:function(e){this.delete_unique=e.unique,window.parent.postMessage({method:"activeGetUnique",data:{item:e}},"*")},deleteCompUnique:function(){var e=this.sorts,t=!1;for(var a in e.child){if(e.child[a].unique==this.delete_unique){var i={id:e.id,type:"delete",index:a,item:e.child[a]};this.back_data.push(i),this.back_data.length>this.back_advance_len&&(this.back_data=this.back_data.slice(this.back_data.length-this.back_advance_len)),e.child.splice(a,1),t=!0;break}if(e.child[a].child&&e.child[a].child.length)for(var n in e.child[a].child){var s=e.child[a].child[n];if(s.unique==this.delete_unique){var d={id:e.child[a].id,type:"delete",index:n,item:s};this.back_data.push(d),e.child[a].child.splice(n,1),t=!0;break}}if(t)break}this.pageIsChange()},backData:function(){if(!(this.back_data.length<=0)){var e=this,t=this.sorts,a=this.back_data.pop();switch(this.advance_data.push(JSON.parse(JSON.stringify(a))),this.advance_data.length>this.back_advance_len&&(this.advance_data=this.advance_data.slice(this.advance_data.length-this.back_advance_len)),a.type){case"sort":this.saveSort(a.new_index,a.old_index,a.id);break;case"delete":if(t.id==a.id)this.sorts.child.splice(a.index,0,a.item),a.item.child_id&&setTimeout((function(){e.initSortable(a.item.child_id,e.isPhone,2)}),100);else{var i=t.child;for(var n in i)i[n].id==a.id&&this.sorts.child[n].child.splice(a.index,0,a.item)}break;case"add":this.sorts.child.splice(a.index,1);break;case"update":if(t.id==a.id)for(var s in t.child)if(t.child[s].unique==a.unique){for(var d in a.item)this.sorts.child[s][d]=a.item[d];break}window.parent.postMessage({method:"activeGetUnique",data:{item:JSON.parse(JSON.stringify(a.item))}},"*"),this.$forceUpdate();break}this.back_last_data=JSON.parse(JSON.stringify(a)),this.pageIsChange()}},searchByIdAndIndex:function(e,t){var a=this.sorts;if(a.id==e)return a.child[t];var i=a.child;for(var n in i)if(i[n].id==e)return i[n][t];return-1},advance:function(){if(!(this.advance_data.length<=0)){var e=this,t=this.sorts,a=this.advance_data.pop();switch(a.type){case"sort":this.saveSort(a.old_index,a.new_index,a.id);break;case"delete":if(t.id==a.id)this.sorts.child.splice(a.index,1),a.item.child_id&&setTimeout((function(){e.initSortable(a.item.child_id,e.isPhone,2)}),100);else{var i=t.child;for(var n in i)i[n].child_id==a.child_id&&this.sorts.child[n].child.splice(a.index,1)}break;case"add":this.sorts.child.splice(a.index,0,a.item);break;case"update":if(t.id==a.id)for(var s in t.child)if(t.child[s].unique==a.unique){for(var d in a.new_data)this.sorts.child[s][d]=a.new_data[d];break}window.parent.postMessage({method:"activeGetUnique",data:{item:JSON.parse(JSON.stringify(a.new_data))}},"*"),this.$forceUpdate();break}this.pageIsChange()}},setPageInfo:function(e){uni.setNavigationBarTitle({title:e.page_name})},setPageSuccess:function(){this.getEff()},getPageTheme:function(){this.http.getPageTheme().then((function(e){setTimeout((function(){uni.setNavigationBarColor({backgroundColor:"#ff0000"})}),1e3)}))},updatePageTheme:function(){this.getPageTheme()}}};t.default=p},"3db0":function(e,t,a){var i=a("79c8");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("2b2fd66b",i,!0,{sourceMap:!1,shadowMode:!1})},"6ec6":function(e,t,a){"use strict";a.r(t);var i=a("186b"),n=a("97c2");for(var s in n)"default"!==s&&function(e){a.d(t,e,(function(){return n[e]}))}(s);a("df4e");var d,r=a("f0c5"),o=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"40d3a6e9",null,!1,i["a"],d);t["default"]=o.exports},"79c8":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */.mt-3[data-v-40d3a6e9]{margin-top:%?30?%}.mr-3[data-v-40d3a6e9]{margin-right:%?30?%}.mb-3[data-v-40d3a6e9]{margin-bottom:%?30?%}.ml-3[data-v-40d3a6e9]{margin-left:%?30?%}\r\n/* sortable class */.sortable-panel[data-v-40d3a6e9]{position:relative}.sortable-panel > *[data-v-40d3a6e9]{position:relative}.st-item-fixed-1[data-v-40d3a6e9]{background-color:#6c6c6c;color:silver}.st-item-fixed-1 > *[data-v-40d3a6e9]{background-color:#6c6c6c;color:silver}\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.sortable_delete[data-v-40d3a6e9]{position:fixed;top:%?2?%;left:%?2?%;width:%?250?%;height:%?250?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border:%?2?% dotted #f56c6c;padding:%?40?%;border-radius:%?20?%;color:#f56c6c;z-index:999;background-color:#fff;-webkit-transition:all 1s;transition:all 1s;overflow:hidden}.sortable_delete *[data-v-40d3a6e9]{width:0;height:0;overflow:hidden}.content[data-v-40d3a6e9]{min-height:calc(100vh - 44px)}.content .sortable[data-v-40d3a6e9]{width:100%}.content .sortable > *[data-v-40d3a6e9]{margin-top:%?30?%;margin-bottom:%?30?%}.content .sortable > *[data-v-40d3a6e9]:first-child{margin-top:0}.content .sortable > *[data-v-40d3a6e9]:last-child{margin-bottom:0;padding-bottom:%?30?%}',""]),e.exports=t},"97c2":function(e,t,a){"use strict";a.r(t);var i=a("27e2"),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,(function(){return i[e]}))}(s);t["default"]=n.a},df4e:function(e,t,a){"use strict";var i=a("3db0"),n=a.n(i);n.a}}]);