(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{nM9R:function(t,e,a){"use strict";a.r(e);var n=a("mK77"),r=a.n(n),s=a("Ico4"),c=a.n(s),p=a("UWy3"),u=a.n(p),o=a("sy1d");function i(t){return l.apply(this,arguments)}function l(){return l=u()(c.a.mark(function t(e){return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(o["a"])("/api/bookmarks/list/tableList",{method:"POST",data:r()({},e)}));case 1:case"end":return t.stop()}},t)})),l.apply(this,arguments)}var d=a("5lth"),f={namespace:"bookmarksCard",state:{list:[],opt:{list:[],pagination:{}}},effects:{fetch:c.a.mark(function t(e,a){var n,r,s,p;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=a.call,s=a.put,t.next=4,r(i,n);case 4:return p=t.sent,t.next=7,s({type:"queryList",payload:p});case 7:case"end":return t.stop()}},t)}),cascader:c.a.mark(function t(e,a){var n,r,s,p;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=a.call,s=a.put,t.next=4,r(d["b"],n);case 4:return p=t.sent,t.next=7,s({type:"getOpt",payload:p});case 7:case"end":return t.stop()}},t)})},reducers:{queryList:function(t,e){return r()({},t,e.payload)},getOpt:function(t,e){return r()({},t,{opt:e.payload})}}};e["default"]=f}}]);