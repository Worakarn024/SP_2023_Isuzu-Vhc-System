(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{697:function(t,o,n){var content=n(723);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(20).default)("5cc6b0b3",content,!0,{sourceMap:!1})},722:function(t,o,n){"use strict";n(697)},723:function(t,o,n){var e=n(19)((function(i){return i[1]}));e.push([t.i,".dialog-overlay{background-color:rgba(0,0,0,.5);display:flex;height:100%;justify-content:center;left:0;top:0;width:100%}.dialog,.dialog-overlay{align-items:center;position:fixed}.dialog{background-color:#fff;font-weight:700;left:50%;padding:20px;text-align:center;top:50%;transform:translate(-50%,-50%)}.customer-btn{background-color:#cf1818;margin-bottom:5px;margin-top:10px}.car-btn,.customer-btn{border-radius:5px;border-radius:10px;color:#fff;padding:8px;width:200px}.car-btn{background-color:#000;margin-bottom:10px;margin-top:5px}@media (max-width:767px){.dialog{height:200px;width:300px}}@media (min-width:768px) and (max-width:1023px){.dialog{height:200px;width:300px}}@media (min-width:1024px){.dialog{height:200px;width:300px}}",""]),e.locals={},t.exports=e},753:function(t,o,n){"use strict";n.r(o);var e={props:{visible:{type:Boolean,default:!1}},methods:{showDialog:function(){this.dialogVisible=!0},hideDialog:function(){this.dialogVisible=!1}}},r=(n(722),n(43)),component=Object(r.a)(e,(function(){var t=this,o=t._self._c;return t.visible?o("div",{staticClass:"dialog-overlay",on:{click:function(o){return t.$emit("close")}}},[o("div",{staticClass:"dialog",on:{click:function(t){t.stopPropagation()}}},[o("p",[t._v("ทำรายการใหม่")]),t._v(" "),o("button",{staticClass:"customer-btn",on:{click:function(o){return t.$router.push("/register/customer")}}},[t._v("เปิดประวัติลูกค้าใหม่")]),t._v(" "),o("button",{staticClass:"car-btn",on:{click:function(o){return t.$router.push("/register/car")}}},[t._v("เปิดประวัติรถใหม่")])])]):t._e()}),[],!1,null,null,null);o.default=component.exports}}]);