<template>   
  <div class="wrapper" >
         <div class="order-info"> 
             <mycell :cellStyle="{height:'110px'}" > 
 			        <text slot="label" class="cell-label">订单号:</text> 
 					<text slot="title" class="cell-text">{{info.mall_orders_no}}</text> 
					<text slot="action" class="cell-text">{{info.order_status}}</text> 
             </mycell>
 			 <div class="products" @click="onorderdetailclicked(info.id)">
 			     <products :items="info.products"></products>
 			 </div> 
             <mycell :cellStyle="{height:'110px'}"> 
 			        <text slot="label" class="cell-label">合计:</text> 
 					<text slot="title" class="cell-text price">¥ {{info.sumorderstotal}}</text>  
					
					<text slot="action" class="cell-text viewbutton" v-if="info.returnedgoodsstatus=='yes'" @click="onaftersaleserviceclicked" >查看售后情况</text> 
					<text slot="action" class="cell-text viewbutton" v-if="info.appraisestatus=='yes' && info.returnedgoodsstatus!='yes'" @click="onappraiseclicked" >查看评价</text> 
             </mycell> 
			 <div class="box-border"></div>
         </div>  
  </div>
</template>

<script> 
  import Vue from 'vue'
  import mycell from '../common/mycell.vue';  
  import products from './products';
  import {number_format,date_format,todatetime} from '../../../rest/common'   
  import {updateorder,confirmreceipt_submit} from './config'
 
  Vue.filter('number_format', function(value) {
      return number_format(value, 2, ".", ",");
  })
  
  Vue.filter('simpledate', function(value) { 
        return date_format(todatetime(value), "MM-DD HH:mm");
  })  
    
  export default {
	  props: { 
	    info: {
	      type: Object,
	      default: {}
	    },
	}, 
    components: {  
		 mycell,
		 products,
	},
    data () {
      return {   
		 countdown: 0,
		 showconfirmreceipt: false,
      }
    }, 	
	mounted() {     
		 
	},
    methods: {  
 		  onorderdetailclicked(orderid)
		  { 
		  	 	   var params = {};
			   	   params.orderid = orderid;
				   this.$router.push({path:'/orderdetail',query:params});
		  },
		  onappraiseclicked()
		  {
 	 	  	   var params = {};
		   	   params.orderid = this.info.id;
			   this.$router.push({path:'/viewappraise',query:params}); 
		  },
		  onaftersaleserviceclicked()
		  {
 	 	  	   var params = {};
		   	   params.orderid = this.info.id;
			   this.$router.push({path:'/viewaftersaleservice',query:params}); 
		  },
     }
  }
</script>
<style scoped>  
	.wrapper
	{
		width:750px;
	    margin-top: 1px;  
		background-color: #ffffff; 
	}
	.order-info
	{
		width:750px;   
	} 
	.box-border
	{
		width:750px;
		height:15px;
		background-color: #cccccc; 
	}
	.cell-label { 
		font-size: 30px;  
		width:100px;
		text-align:right;
		color:#888888;
		font-weight: 600;
	}
	.cell-text {
	   font-size: 30px;
	   padding-left:15px;
	}
	.action-text {
	   font-size: 30px; 
	} 
	.price {
	    color: #b4282d
	}
	.disabled {
		color:#cccccc;
	}
	.row
	{
		flex-direction: row;
	    align-items: center;
	    justify-content: flex-start;
	} 
	.viewbutton
	{
		 line-height: 70px; 
		 width:230px;
	     height:70px;
		 text-align:center;
		 background-color: #ff7409;
		 color:#ffffff;
 		 font-weight: 500;
 		 font-family: sans-serif-medium;
		 border-radius: 10px;
	}
	.iconfont {
	    font-family: iconfont;
	}
	
</style> 

