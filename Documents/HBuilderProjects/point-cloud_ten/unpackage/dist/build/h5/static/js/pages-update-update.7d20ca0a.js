(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-update-update"],{4297:function(t,e,a){"use strict";(function(t,n){var i=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=i(a("5530")),l={data:function(){return{item:{_id:"",ID:0,data:"",tall:"",width:"",mark:0},name:""}},onLoad:function(e){var a=this,i=e.item,u=t.database();this.item=JSON.parse(i),u.collection("class").where("ID =="+this.item.ID).get().then((function(t){n("log",t," at pages/update/update.vue:34"),n("log",t.result.data[0].name," at pages/update/update.vue:35"),a.name=t.result.data[0].name})).catch((function(t){})),n("log","this.item"," at pages/update/update.vue:42")},methods:{submit:function(){var e=t.database(),a=(0,u.default)({},this.item);n("log",this.item," at pages/update/update.vue:48"),delete a._id,e.collection("growData").doc(this.item._id).update(a).then((function(t){n("log",t," at pages/update/update.vue:51")})),uni.navigateTo({url:"../info/info?ID="+this.item.ID+"&name="+decodeURIComponent(this.name)})}}};e.default=l}).call(this,a("a9ff")["default"],a("0de9")["log"])},"605d":function(t,e,a){"use strict";a.r(e);var n=a("a50b"),i=a("7653");for(var u in i)"default"!==u&&function(t){a.d(e,t,(function(){return i[t]}))}(u);var l,o=a("f0c5"),d=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"7741970a",null,!1,n["a"],l);e["default"]=d.exports},7653:function(t,e,a){"use strict";a.r(e);var n=a("4297"),i=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,(function(){return n[t]}))}(u);e["default"]=i.a},a50b:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return u})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("uni-easyinput",{attrs:{placeholder:"植株的编号ID"},model:{value:t.item.ID,callback:function(e){t.$set(t.item,"ID",t._n(e))},expression:"item.ID"}}),a("uni-easyinput",{attrs:{placeholder:"记录的日期[例如 2021-8-1]"},model:{value:t.item.data,callback:function(e){t.$set(t.item,"data",e)},expression:"item.data"}}),a("uni-easyinput",{attrs:{placeholder:"算法计算的高度(cm)"},model:{value:t.item.tall,callback:function(e){t.$set(t.item,"tall",e)},expression:"item.tall"}}),a("uni-easyinput",{attrs:{placeholder:"算法计算的宽度(cm)"},model:{value:t.item.width,callback:function(e){t.$set(t.item,"width",e)},expression:"item.width"}}),a("v-uni-button",{attrs:{type:"default"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("提交")])],1)},u=[]}}]);