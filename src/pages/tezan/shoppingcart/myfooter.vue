<template> 
  <myfooter :backgroundColor="backgroundColor" :bottom="90">  
	  <div class="checkbox"> 
			<checkbox :value="select_value" @checkchange="changevalue" :label="select_label"></checkbox>
	  </div>  
      <div class="info">
	     <div class="heji_info">
	        <text class="text" >合计:</text>
			<text class="text red relax">¥ {{total_price | number_format}}</text> 
		</div>
		<div class="zongji_info">
	        <text class="text" >邮费:</text>
			<text class="text red relax">¥ {{total_postage | number_format}}</text>
			<text class="text" > 共</text>
			<text class="text red relax" >{{total_quantity}}</text>
			<text class="text" >件商品</text>
		</div>
      </div>
	  <div class="footer-border"></div>
	  
      <div class="button-wrap buynow" :style="{backgroundColor:buttonColor}" @click="onbuttonclick">
        <text class="button-title" >{{buttonLabel}}</text>
      </div> 
  </myfooter>
</template>


<script>
import Vue from 'vue'
import footer from '../common/footer.vue';
import checkbox from '../common/checkbox.vue'; 
import {number_format} from '../../../rest/common' 

Vue.filter('number_format', function(value) {
    return number_format(value, 2, ".", ",");
}) 
	
export default { 
  components: { 
	  checkbox,  
	  'myfooter':footer,
  },
  props: {  
    total_price: {
      type: Number,
      default: 0
    },
    total_quantity: {
      type: Number,
      default: 0
    },
    total_postage: {
      type: Number,
      default: 0
    },
    select_label: {
      type: String,
      default: ''
    },
    select_value: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    buttonColor: {
      type: String,
      default: '#b4272d'
    },
    buttonLabel: {
      type: String,
      default: '立即结算'
    }
  }, 
  methods: {  
		changevalue(event)
		{ 
			 this.$emit('checkboxchanged', event); 
		},
		onbuttonclick()
		{
			this.$emit('onbuttonclicked', {}); 
		}
  }
};
</script>

<style scoped>
  .iconfont {
	font-family: iconfont;
  } 
  .button-wrap {
    flex: 1;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
  .checkbox { 
    width: 200px;
  	height: 100px;
    align-items: center;
    justify-content: center;
  }  
  .info { 
    width: 350px;
  	height: 100px;
    align-items: flex-end;
    justify-content: center;
	padding-right:15px;
	
  }
  .heji_info
  {
  	 flex-direction: row; 
  }
  .zongji_info
  {
 	 flex-direction: row;
  }
  .text {
     font-size: 30px;
     color: #333333;  
	 line-height: 40px;
	 height: 40px;
  }
  .red {
     color: #ff0000;
  }
  .relax {
     padding-left:5px;
	 padding-right:5px;
  }
  
  .footer-border {
    width: 2px;
    height: 100px;
    background-color: #dddddd;
  } 
  
  .button-wrap:active {
    background-color: #eeeeee;
  }

  .button-title {
    font-size: 38px;
    color: #ffffff;
    font-weight: 700;
	background-color:transparent;
  }
  .buynow { 
	 background-color: #b4272d;
	 color:#ffffff;
  }
  
  
</style>

