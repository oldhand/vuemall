<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A sSearch bar for city Search-->

<template>
  <div>
    <div :class="['wxc-search-bar','wxc-search-bar-'+theme]"
         :style="barStyle"  >
		 
	  <text  :style="{ width: width +'px'}"
             :class="['search-bar-disabled-input','search-bar-input-'+theme]"
			 @click="inputDisabledClicked" v-if="value == ''">{{placeholder}}</text>   
	  <text  :style="{ width: width +'px'}"
	           :class="['search-bar-disabled-input','search-bar-input-'+theme]"
			 @click="inputDisabledClicked" v-else>{{selectvalue}}</text>		 
       
  	  <text class="search-bar-icon iconfont" :aria-hidden="true">&#xe674;</text>  
    </div> 
	<am-popup :show.sync="showpopup" position="top" width="750"  height="750" :offset="{'margin-top': '0px'}" @clickmask="onclickmask"> 
	     <div class="popup-search-bar" :class="['wxc-popup-search-bar','wxc-search-bar-'+theme]"
	          :style="barStyle" >
	       <input @blur="onBlur"
	              @focus="onFocus"
	              @input="onInput"
	              @return="onSubmit"  
	              :disabled="disabled"
	              :value="selectvalue"
	              ref="search-input"
	 			  return-key-type="search"
	 			  singleline=true
	              :type="inputType"
	              :placeholder="placeholder" 
	 			  :style="{ width: needShowCancel ? '624px' : '730px' }"
	              :class="['search-bar-input','search-bar-input-'+theme]"/>
	       <div v-if="disabled"
	            @click="inputDisabledClicked"
	            class="disabled-input"></div>
	   	  <text class="search-bar-icon iconfont" :aria-hidden="true">&#xe674;</text> 
	   	  <text class="search-bar-close iconfont" v-if="showClose" :aria-hidden="true" @click="closeClicked">&#xe7b7;</text>
	      <text :class="['search-bar-button','search-bar-button-'+theme]"
	             :style="buttonStyle"
	             v-if="needShowCancel"
	             @click="cancelClicked">{{cancelLabel}}</text>
	     </div> 
         <scroller class="main-list" append="tree" paging-enabled="true"  show-scrollbar="false" ref="scroll" id="scroll"> 
 			   <text class="search-text" v-if="historys.length != 0">历史搜索</text> 
               <propselect title="" :items="historys" @select="onselectclick($event)"  v-if="historys.length != 0"/>
 			   <text class="search-text" v-if="items.length != 0">热门搜索</text> 
               <propselect title="" :items="items" @select="onselectclick($event)" v-if="items.length != 0" />
         </scroller>
	</am-popup>
  </div>
</template>

<style scoped>
  .iconfont {
    font-family: iconfont;
  }
 .wxc-search-bar {
   padding-left: 10px;
   padding-right: 10px;
   background-color: #fafafa;  
   height: 84px;
   flex-direction: row; 
 } 
 .wxc-popup-search-bar {
   padding-left: 10px;
   padding-right: 10px;
   background-color: #fafafa; 
   width: 750px;
   height: 84px;
   flex-direction: row;
 }

 .wxc-search-bar-yellow {
   background-color: #ffc900;
 }

 .search-bar-input {
   position: absolute;
   top: 10px;
   padding-top: 0;
   padding-bottom: 0;
   padding-right: 40px;
   padding-left: 60px;
   font-size: 26px; 
   height: 64px;
   line-height: 64px; 
   color:#333333;
   background-color: #E5E5E5;
   border-radius: 6px;
 }
 .search-bar-disabled-input { 
   position: absolute;
   top: 10px;
   padding-top: 0;
   padding-bottom: 0;
   padding-right: 40px;
   padding-left: 60px;
   font-size: 26px; 
   height: 64px;
   line-height: 70px; 
   color:#999999;
   background-color: #E5E5E5;
   border-radius: 6px;
 }

 .search-bar-input-yellow {
   background-color: #fff6d6;
 }

 .search-bar-icon {
   position: absolute;
   width: 30px;
   height: 30px;
   color: #999999;
   left: 34px;
   top: 28px;
 }

 .search-bar-close {
   position: absolute;
   width: 30px;
   height: 30px;
   color: #999999;
   right: 120px;
   top: 28px;
 }

 .search-bar-button {
   width: 94px;
   height: 56px;
   line-height: 56px; 
   font-size: 30px;
   text-align: center;
   background-color: #ffffff;
   margin-top: 5px;
   margin-right: 0;
   color: #999999;
   position: absolute;
   right: 8px;
   top: 10px;
 }

 .search-bar-button-yellow {
   background-color: #FFC900;
 }

 .input-has-dep {
   padding-left: 240px;
   width: 710px;
 }

 .bar-dep {
   width: 170px;
   padding-right: 12px;
   padding-left: 12px;
   height: 42px;
   align-items: center;
   flex-direction: row;
   position: absolute;
   left: 24px;
   top: 22px;
   border-right-style: solid;
   border-right-width: 1px;
   border-right-color: #C7C7C7;
 }

 .bar-dep-yellow {
   border-right-color: #C7C7C7;
 }

 .dep-text {
   flex: 1;
   text-align: center;
   font-size: 26px;
   color: #666666;
   margin-right: 6px;
   lines: 1;
   text-overflow: ellipsis;
 }

 .dep-arrow {
   width: 24px;
   height: 24px;
 }

 .icon-has-dep {
   left: 214px;
 }

 .disabled-input {
   width: 750px;
   height: 64px;
   position: absolute;
   left: 0;
   background-color: transparent;
 }

 .has-dep-disabled {
   width: 550px;
   left: 200px;
 } 
 .popup-search-bar {
   margin-top: 0px;
 }
 .search-text
 {
 	color:#777777;
	padding-left:20px;
 }
</style>

<script> 
  import popup from '../components/popup.vue'
  import propselect from '../components/propselect.vue'
  export default {
	components: {  
		'am-popup':popup, 
		propselect,
	},
    props: { 
      width: {
        type: Number,
        default: 730
      },
      value: {
        type: String,
        default: ''
      },
      alwaysShowCancel: {
        type: Boolean,
        default: false
      },
      inputType: {
        type: String,
        default: 'text'
      },
      mod: {
        type: String,
        default: 'default'
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: 'gray'
      },
      barStyle: {
        type: Object,
        default: () => ({})
      },
      defaultValue: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '搜索'
      },
	  historys:{
		 default: []
	  },
	  items:{
		 default: []
	  },
      cancelLabel: {
        type: String,
        default: '取消 '
      },
      depName: {
        type: String,
        default: ''
      }
    },
    computed: {
      needShowCancel () {
        return this.alwaysShowCancel || this.showCancel;
      },
      buttonStyle () {
        const { barStyle } = this;
        if (barStyle.backgroundColor) {
            return {backgroundColor:barStyle.backgroundColor}
        }
        return {}
      }
    },
    data: () => ({ 
      showCancel: false,
      showClose: false, 
	  showpopup:false,
	  selectvalue:'',
	  disabled:true,

    }),
    created () {
      this.defaultValue && (this.value = this.defaultValue);
      if (this.disabled) {
        this.showCancel = false;
        this.showClose = false;
      }
    },
	mounted(){
	 	this.selectvalue = this.value;
	},
    watch: {
      value () {
	       var that = this;
           setTimeout(() => {  that.selectvalue = that.value; }, 50);
      }, 
    },
    methods: {
      onBlur () {
        const self = this;
        setTimeout(() => {
          self.showCancel = false;
          self.detectShowClose();
  	  	  self.disabled = true; 
  		  self.showpopup = false; 
		  self.$emit('wxcsearchbarinputonblur', { value: self.selectvalue }); 
        }, 10);
      },
      autoBlur () {
        this.$refs['search-input'].blur();
      },
      onFocus () {
        if (this.isDisabled) {
          return;
        }
        this.showCancel = true;
        this.detectShowClose();
        this.$emit('wxcsearchbarinputonfocus', { value: this.selectvalue });
      },
      closeClicked () { 
        this.selectvalue = '';  
        this.showCancel && (this.showCancel = false);
        this.showClose && (this.showClose = false);
        this.$emit('wxcsearchbarcloseclicked', { value: this.selectvalue });
        this.$emit('wxcsearchbarinputoninput', { value: this.selectvalue });
      },
      onInput (e) {
        this.selectvalue = e.value;
        this.showCancel = true;
        this.detectShowClose();
        this.$emit('wxcsearchbarinputoninput', { value: this.selectvalue });
      },
      onSubmit (e) {
        this.onBlur();
        this.selectvalue = e.value;
        this.showCancel = true;
        this.detectShowClose();
        this.$emit('wxcsearchbarinputreturned', { value: this.selectvalue });
      },  
      cancelClicked () { 
        this.showCancel && (this.showCancel = false);
        this.showClose && (this.showClose = false);
        this.$emit('wxcsearchbarcancelclicked', { value: this.selectvalue });
      },
      detectShowClose () {
        this.showClose = (this.value.length > 0) && this.showCancel;
      },
      depClicked () {
        this.$emit('wxcsearchbardepchooseclicked', {});
      },
      inputDisabledClicked () {
	  	this.disabled = false; 
		this.showpopup = true; 
      },
	  onclickmask()
	  {
		  this.disabled = true;   
	  },
	  onselectclick(event)
	  {
			this.disabled = true;  
			this.selectvalue = event.key;
		  	this.disabled = true; 
			this.showpopup = false;
	  		if (this.selectvalue != this.value)
	  		{ 
	  		  	this.$emit('wxcsearchbarinputonblur', { value: this.selectvalue });
	  		} 
	  },
      setValue (value) {
          this.value = value;
      }
    }
  };
</script>
