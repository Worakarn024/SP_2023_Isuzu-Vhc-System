(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{695:function(t,c,o){var content=o(719);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(20).default)("ae837916",content,!0,{sourceMap:!1})},718:function(t,c,o){"use strict";o(695)},719:function(t,c,o){var e=o(19)((function(i){return i[1]}));e.push([t.i,".conStart{justify-content:flex-start!important}.row-line,.rowLineTop{border-top:1px solid #ebebeb;color:#000}.TextCard{text-align:center}.container{align-items:center;border:0 solid #000;margin-bottom:30px;margin-top:30px}.vhc-btn{background-color:#ed1c24;color:#fff!important}.edit-btn,.vhc-btn{border:1px solid #ed1c24;border-radius:5px;box-shadow:0 3px 4px rgba(0,0,0,.25);color:#ed1c24;height:35px;width:125px}.edit-btn{background-color:transparent}.rowTitle{text-align:left}.contentRight{display:flex;justify-content:flex-end}",""]),e.locals={},t.exports=e},752:function(t,c,o){"use strict";o.r(c);var e=o(209),r=o(180),n=o(634),l=o(4),v=o(24),d=(o(26),o(25),{props:{car:{type:Object,required:!0}},computed:{formattedDate:function(){if(this.car.DateOfBirth){var t=this.car.DateOfBirth.split("-"),c=Object(v.a)(t,3),o=c[0],e=c[1],r=c[2];return"".concat(r,"-").concat(e,"-").concat(o)}return"ไม่พบข้อมูล"},fullName:function(){return(this.car.Cus_Name||this.car.Cus_Surename)&&this.car.Cus_Name&&this.car.Cus_Surename?this.car.Be+" "+this.car.Cus_Name+" "+this.car.Cus_Surename:"ไม่พบข้อมูล"}},methods:{getDetail:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function c(){return regeneratorRuntime.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,t.$store.dispatch("setCarId",t.car.id);case 2:return console.log(t.car),c.next=5,t.$store.dispatch("setcusId",t.car.CusNo);case 5:return c.next=7,t.$router.push("/more-info/info-customer");case 7:case"end":return c.stop()}}),c)})))()},setDataUser:function(){this.$store.dispatch("setUserDetail",this.car),this.$router.push("/vhc/dataincome"),console.log("this car",this.car)}}}),_=(o(718),o(43)),component=Object(_.a)(d,(function(){var t=this,c=t._self._c;return c("div",[c(e.a,{staticClass:"container",attrs:{"max-width":"400"}},[c(r.a,{staticClass:"TextCard"},[c(n.a,[c("div",{staticClass:"row rowLineTop"},[c("div",{staticClass:"rowTitle col col-4"},[t._v("ทะเบียนรถ:")]),t._v(" "),c("div",{staticClass:"contentRight col col-8 conStart"},[t._v(t._s(t.car.register||"ไม่พบข้อมูล"))])]),t._v(" "),c("div",{staticClass:"row row-line"},[c("div",{staticClass:"rowTitle col col-4"},[t._v("ชื่อเจ้าของรถ:")]),t._v(" "),c("div",{staticClass:"contentRight col col-8 conStart"},[t._v("\n\t\t\t\t\t\t"+t._s(t.fullName)+"\n\t\t\t\t\t")])]),t._v(" "),c("div",{staticClass:"row row-line"},[c("div",{staticClass:"rowTitle col col-4"},[t._v("ชื่อผู้รับบริการ:")]),t._v(" "),c("div",{staticClass:"contentRight col col-8 conStart"},[t._v(t._s(t.car.Updater||"ไม่พบข้อมูล"))])]),t._v(" "),c("div",{staticClass:"row row-line"},[c("div",{staticClass:"rowTitle col col-4"},[t._v("เบอร์ลูกค้า:")]),t._v(" "),c("div",{staticClass:"contentRight col col-8 conStart"},[t._v(t._s(t.car.M_Tel||"ไม่พบข้อมูล"))])]),t._v(" "),c("div",{staticClass:"row row-line"},[c("div",{staticClass:"rowTitle col col-4"},[t._v("วันเกิดลูกค้า:")]),t._v(" "),c("div",{staticClass:"contentRight col col-8 conStart"},[t._v(t._s(t.formattedDate))])]),t._v(" "),c("div",{staticClass:"row row-line"},[c("div",{staticClass:"rowTitle col col-4"},[t._v("วันที่:")]),t._v(" "),c("div",{staticClass:"contentRight col col-8 conStart"},[t._v("30-03-2565")]),t._v(" "),c("div",{staticClass:"rowTitle col col-4"},[t._v("เวลา:")]),t._v(" "),c("div",{staticClass:"contentRight col col-8 conStart"},[t._v("10:00:00")])]),t._v(" "),c("div",{staticClass:"row row-line"},[c("div",{staticClass:"rowTitle col col-4"},[t._v("สถานะ E-Tax:")]),t._v(" "),c("div",{staticClass:"contentRight col col-8 conStart"},[t._v(t._s(t.car.idref_cusno_e_tax||"ไม่พบข้อมูล"))])]),t._v(" "),c("div",{staticClass:"row row-line"},[c("div",{staticClass:"rowTitle col col-4"},[c("button",{staticClass:"edit-btn",on:{click:t.getDetail}},[t._v("แก้ไขข้อมูล")])]),t._v(" "),c("div",{staticClass:"contentRight col col-8",attrs:{cols:"8"}},[c("button",{staticClass:"vhc-btn",on:{click:t.setDataUser}},[t._v("ทำ VHC")])])])])],1)],1)],1)}),[],!1,null,null,null);c.default=component.exports}}]);