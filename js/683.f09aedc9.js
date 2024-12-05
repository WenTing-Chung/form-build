"use strict";(self["webpackChunkform_build"]=self["webpackChunkform_build"]||[]).push([[683],{8563:function(t,e,s){s.d(e,{A:function(){return u}});var a=function(){var t=this,e=t._self._c;return e("div",{class:["w-10 h-3 rounded-md cursor-pointer",t.status?"bg-[#52528c]":"bg-[#888]"],on:{click:function(e){return e.preventDefault(),t.changeSwitch.apply(null,arguments)}}},[e("div",{class:["w-5 h-5 rounded-full -translate-y-[20%] transition-all ease-in-out duration-300",t.status?"ml-[calc(100%_-_20px)] bg-[#acaccc] shadow-[0_0_6px_0_rgba(82,82,140,0.6)]":"bg-[#f9f9fb] shadow-[0_0_6px_0_rgba(85,85,85,0.5)]"]})])},i=[],r={name:"Switch-component",props:{status:{type:Boolean,default:!1}},methods:{changeSwitch(){this.$emit("switch_status",!this.status)}}},o=r,l=s(1656),n=(0,l.A)(o,a,i,!1,null,null,null),u=n.exports},683:function(t,e,s){s.r(e),s.d(e,{default:function(){return m}});var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"overflow-y-auto w-full h-full bg-[#eee] scroll-style"},[e("div",{staticClass:"mx-auto p-8 w-[min(100%,_1024px)]"},[e("div",{staticClass:"py-11 px-9 rounded-2xl bg-white"},[e("h2",{staticClass:"pb-5 border-b border-solid border-[#ccc] text-2xl"},[t._v("設定")]),e("div",{staticClass:"py-10 px-[50px] border-b border-solid border-[#ccc]"},[t._m(0),e("ul",{staticClass:"pl-9 pr-5"},[e("li",{staticClass:"mb-7"},[e("p",{staticClass:"mb-3.5 text-[#888] text-xs"},[t._v("表單呈現方式")]),e("div",{staticClass:"flex items-center justify-between"},[e("p",[t._v("顯示進度列")]),e("SwitchElement",{attrs:{status:t.form["progress_bar"]},on:{switch_status:function(e){return t.switchControl(e,"progress_bar")}}})],1)]),e("li",{staticClass:"mb-7"},[e("p",{staticClass:"mb-3.5 text-[#888] text-xs"},[t._v("題號顯示")]),e("div",{staticClass:"flex items-center justify-between"},[e("p",[t._v("題號顯示與不顯示")]),e("SwitchElement",{attrs:{status:t.form["question_number"]},on:{switch_status:function(e){return t.switchControl(e,"question_number")}}})],1)]),e("li",[e("p",{staticClass:"mb-3.5 text-[#888] text-xs"},[t._v("提交表單後")]),e("div",{staticClass:"relative"},[e("p",{class:["ease-in-out duration-200",{"absolute -top-2.5 left-3 py-0.5 px-1 bg-white text-[#5f6368] text-sm":t.edit_message}]},[t._v(" 確認訊息 ")]),e("div",{staticClass:"flex items-center justify-between"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form["submit_message"],expression:"form['submit_message']"}],class:["flex-1 mr-5 rounded bg-white",t.edit_message?"p-4 border border-solid border-[#dadce0]":"text-[#5f6368] italic text-sm"],attrs:{type:"text",disabled:!t.edit_message},domProps:{value:t.form["submit_message"]},on:{input:function(e){e.target.composing||t.$set(t.form,"submit_message",e.target.value)}}}),t.edit_message?[e("div",{staticClass:"flex"},[e("button",{staticClass:"p-2 rounded text-[#0054ff] text-lg hover:bg-[rgba(66,133,244,0.04)]",attrs:{type:"button"},on:{click:function(e){e.preventDefault(),t.edit_message=!1}}},[t._v(" 儲存 ")]),e("button",{staticClass:"p-2 rounded text-[#5f6368] text-lg hover:bg-[rgba(95,99,104,0.04)]",attrs:{type:"button"},on:{click:function(e){e.preventDefault(),t.form["submit_message"]=t.oldData["submit_message"],t.edit_message=!1}}},[t._v(" 取消 ")])])]:[e("button",{staticClass:"p-2 rounded text-[#0054ff] text-lg hover:bg-[rgba(66,133,244,0.04)]",attrs:{type:"button"},on:{click:function(e){e.preventDefault(),t.oldData["submit_message"]=t.form["submit_message"],t.edit_message=!0}}},[t._v(" 編輯 ")])]],2)])])])]),e("div",{staticClass:"mb-10 py-10 px-[50px]"},[e("div",{class:["flex items-center justify-between",{"mb-8":t.form["time_enable_status"]}]},[t._m(1),e("SwitchElement",{attrs:{status:t.form["time_enable_status"]},on:{switch_status:function(e){t.edit_timeValid=!1,t.switchControl(e,"time_enable_status")}}})],1),e("ul",{class:["pl-9 pr-5 overflow-hidden",t.form["time_enable_status"]?"max-h-[500px] h-auto transition-all ease-in-out duration-[500ms]":"max-h-0"]},[e("li",[e("p",{staticClass:"mb-3.5 text-[#888] text-xs"},[t._v("表單時間")]),e("div",{staticClass:"flex items-center justify-between"},[t.edit_timeValid?[e("div",{staticClass:"flex-1 mr-5"},[e("date-picker",{staticClass:"mr-3",attrs:{"value-type":"format",type:"datetime"},scopedSlots:t._u([{key:"input",fn:function(){return[e("input",{staticClass:"py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-base",attrs:{placeholder:"開始時間"},domProps:{value:t.form["start_time"]}})]},proxy:!0}],null,!1,786083936),model:{value:t.form["start_time"],callback:function(e){t.$set(t.form,"start_time",e)},expression:"form['start_time']"}}),e("span",[t._v("至")]),e("date-picker",{staticClass:"ml-3",attrs:{"value-type":"format",type:"datetime"},scopedSlots:t._u([{key:"input",fn:function(){return[e("input",{staticClass:"py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-base",attrs:{placeholder:"結束時間"},domProps:{value:t.form["end_time"]}})]},proxy:!0}],null,!1,3040797760),model:{value:t.form["end_time"],callback:function(e){t.$set(t.form,"end_time",e)},expression:"form['end_time']"}})],1)]:[e("input",{staticClass:"flex-1 mr-5 bg-white text-[#5f6368] italic text-sm",attrs:{type:"text",disabled:""},domProps:{value:t.dateShow}})],t.edit_timeValid?[e("div",{staticClass:"flex"},[e("button",{staticClass:"p-2 rounded text-[#0054ff] text-lg hover:bg-[rgba(66,133,244,0.04)]",attrs:{type:"button"},on:{click:function(e){e.preventDefault(),t.edit_timeValid=!1}}},[t._v(" 儲存 ")]),e("button",{staticClass:"p-2 rounded text-[#5f6368] text-lg hover:bg-[rgba(95,99,104,0.04)]",attrs:{type:"button"},on:{click:function(e){e.preventDefault(),t.form["start_time"]=t.oldData["start_time"],t.form["end_time"]=t.oldData["end_time"],t.edit_timeValid=!1}}},[t._v(" 取消 ")])])]:[e("button",{staticClass:"p-2 rounded text-[#0054ff] text-lg hover:bg-[rgba(66,133,244,0.04)]",attrs:{type:"button"},on:{click:function(e){e.preventDefault(),t.oldData["start_time"]=t.form["start_time"],t.oldData["end_time"]=t.form["end_time"],t.edit_timeValid=!0}}},[t._v(" 編輯 ")])]],2)])])]),e("div",{staticClass:"flex justify-center"},[e("button",{staticClass:"py-2.5 px-12 border border-solid border-[#52528c] rounded-full bg-[#52528c] hover:bg-[#424281] text-white font-bold text-2xl",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.saveSetting.apply(null,arguments)}}},[t._v(" 儲存設定 ")])])])])])},i=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"mb-8"},[e("h3",{staticClass:"mb-4 text-lg"},[t._v("簡報")]),e("p",[t._v("管理表單和回覆的顯示方式")])])},function(){var t=this,e=t._self._c;return e("div",[e("h3",{staticClass:"mb-4 text-lg"},[t._v("時間效期")]),e("p",[t._v("設定表單有效時間，過了時段就關閉")])])}],r=s(8563),o={name:"FormSettings",components:{SwitchElement:r.A},data:()=>({edit_message:!1,edit_timeValid:!1,form:{end_time:null,is_required_default:!1,progress_bar:!1,start_time:null,submit_message:"我們已經收到你回覆的表單",time_enable_status:!1,question_number:!1},oldData:{end_time:null,start_time:null,submit_message:""}}),metaInfo:{title:"表單設定"},created(){if(this.$route.query.formId){const t=Number(this.$route.query.formId);this.getSettingInfo(t)}},computed:{dateShow(){return this.form["start_time"]&&this.form["end_time"]?`${this.form["start_time"]} ~ ${this.form["end_time"]}`:"選擇日期區間"}},methods:{getSettingInfo(t){this.axios.settingInfo({id:t}).then((t=>{const{code:e,data:s}=t.data;200===e&&(this.form=s,this.form["submit_message"]="我們已經收到你回覆的表單")}))},switchControl(t,e){this.form[e]=t},saveSetting(){this.form["id"]=this.$route.query["formId"],this.axios.saveSetting(this.form).then((t=>{200===t.dat.code&&this.getSettingInfo()}))}}},l=o,n=s(1656),u=(0,n.A)(l,a,i,!1,null,null,null),m=u.exports}}]);