(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{693:function(t,e,o){var content=o(715);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(20).default)("3338b512",content,!0,{sourceMap:!1})},714:function(t,e,o){"use strict";o(693)},715:function(t,e,o){var c=o(19)((function(i){return i[1]}));c.push([t.i,".conStart{justify-content:flex-start!important}.row-line,.rowLineTop{border-top:1px solid #ebebeb;color:#000}.textCard{text-align:center}.container{align-items:center;border:0 solid #000;margin-bottom:25px;margin-top:25px}.vhc-btn{background-color:#ed1c24;color:#fff!important}.edit-btn,.vhc-btn{border:1px solid #ed1c24;border-radius:5px;box-shadow:0 3px 4px rgba(0,0,0,.25);color:#ed1c24;height:35px;width:125px}.edit-btn{background-color:transparent}.rowTitle{text-align:left}.contentRight{display:flex;justify-content:flex-end}",""]),c.locals={},t.exports=c},750:function(t,e,o){"use strict";o.r(e);var c=o(209),r=o(180),n=o(634),l=o(4),d=(o(26),{data:function(){return{list:""}},props:{item:{type:Object}},methods:{getDetail:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("setCarId",t.item.id);case 2:return console.log(t.item.id),e.next=5,t.$store.dispatch("setcusId",t.item.CusNo);case 5:return e.next=7,t.$router.push("/more-info/info-customer");case 7:case"end":return e.stop()}}),e)})))()},setDataUser:function(){this.$store.dispatch("setUserDetail",this.item),this.$router.push("/vhc/dataincome")}}}),v=(o(714),o(43)),component=Object(v.a)(d,(function(){var t=this,e=t._self._c;return e("div",[e(c.a,{staticClass:"container",attrs:{"max-width":"400"}},[e(r.a,{staticClass:"textCard"},[e(n.a,[e("div",{staticClass:"row rowLineTop"},[e("div",{staticClass:"rowTitle col col-4"},[t._v("ทะเบียนรถ:")]),t._v(" "),e("div",{staticClass:"contentRight col col-8 conStart"},[t._v(t._s(t.item.register))])]),t._v(" "),e("div",{staticClass:"row row-line"},[e("div",{staticClass:"rowTitle col col-4"},[t._v("เลขเครื่อง:")]),t._v(" "),e("div",{staticClass:"contentRight col col-8 conStart"},[t._v(t._s(t.item.chassis))])]),t._v(" "),e("div",{staticClass:"row row-line"},[e("div",{staticClass:"rowTitle col col-4"},[t._v("เลขแซลซี:")]),t._v(" "),e("div",{staticClass:"contentRight col col-8 conStart"},[t._v(t._s(t.item.engin_id))])]),t._v(" "),e("div",{staticClass:"row row-line"},[e("div",{staticClass:"rowTitle col col-4"},[t._v("ชื่อเจ้าของรถ:")]),t._v(" "),e("div",{staticClass:"contentRight col col-8 conStart"},[t._v("\n\t\t\t\t\t\t"+t._s(t.item.Be+" "+t.item.Cus_Name+" "+t.item.Cus_Surename)+"\n\t\t\t\t\t")])]),t._v(" "),e("div",{staticClass:"row row-line"},[e("div",{staticClass:"rowTitle col col-4"},[t._v("ชื่อผู้รับบริการ:")]),t._v(" "),e("div",{staticClass:"contentRight col col-8 conStart"},[t._v(t._s(t.item.Updater))])]),t._v(" "),e("div",{staticClass:"row row-line"},[e("div",{staticClass:"rowTitle col col-4"},[e("button",{staticClass:"edit-btn",on:{click:t.getDetail}},[t._v("แก้ไขข้อมูล")])]),t._v(" "),e("div",{staticClass:"contentRight col col-8",attrs:{cols:"8"}},[e("button",{staticClass:"vhc-btn",on:{click:t.setDataUser}},[t._v("ทำ VHC")])])])])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);