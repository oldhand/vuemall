<template>   
  <div class="wrapper" >
         <div class="order-info" v-if="show"> 
             <mycell :cellStyle="{height:'110px'}" > 
 			        <text slot="label" class="cell-label">订单号:</text> 
 					<text slot="title" class="cell-text">{{info.mall_orders_no}}</text>
					<text slot="action" class="cell-text" v-if="allowpayment && info.cancel == 0" @click="oncancelclicked">取消订单</text> 
					<text slot="action" class="cell-text" v-else>下单时间: {{info.published | simpledate}}</text> 
             </mycell>
 			 <div class="products" @click="onorderdetailclicked(info.id)">
 			     <products :items="info.products"></products>
 			 </div>
             <mycell :cellStyle="{height:'110px'}" v-if="allowpayment && info.cancel == 0" > 
 			        <text slot="label" class="cell-label">应付:</text> 
 					<text slot="title" class="cell-text price">¥ {{info.sumorderstotal}}</text>
					<text slot="action" class="cell-text payment" @click="onpaymentclicked">继续付款 {{countdown | topaymenttime}}</text> 
             </mycell> 
             <mycell :cellStyle="{height:'110px'}" v-else> 
 			        <text slot="label" class="cell-label">合计:</text> 
 					<text slot="title" class="cell-text price">¥ {{info.sumorderstotal}}</text> 
					<text slot="action" class="cell-text iconfont" @click="ondeletclicked">&#xe616; 删除</text> 
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
  import {updateorder} from './config'
 
  Vue.filter('number_format', function(value) {
      return number_format(value, 2, ".", ",");
  })
  
  Vue.filter('simpledate', function(value) { 
        return date_format(todatetime(value), "MM-DD HH:mm");
  }) 
  
  Vue.filter('topaymenttime', function(value) {  
   	    var second = value % 60;
		var minute = Math.floor(value / 60);
        return  ( "00" + minute ).substr(-2) + '分' + ( "00" + second ).substr(-2) + '秒';
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
	     allowpayment : false,
		 countdown: 0,
		 show: true, 
      }
    },  
	mounted() {  
		var timestamp = Date.parse(new Date()) / 1000;
		var published = Date.parse(todatetime(this.info.published)) / 1000;
		var difftime = timestamp-published;
		if (difftime > 3600)
		{
			this.allowpayment = false;
			this.countdown = difftime;
		}
		else
		{
			this.allowpayment = true;
			this.countdown = 3600 - difftime;
		} 
		var that = this;
        setTimeout(() => { that.timer(); }, 1000);
	}, 
    methods: {
 		timer()
		{
			this.countdown -= 1;
			var that = this;
			if (this.countdown > 0)
			{
				setTimeout(() => { that.timer(); }, 1000);
			} 
		},
		oncancelclicked()
		{
		    var that = this;
            this.$notice.confirm({
                title: '警告',
                message: '订单号为'+that.info.mall_orders_no+'的订单,确定需要取消吗?', 
                okCallback () { 
                   updateorder(that.info.id,{cancel:'1'}).then(res =>{
				   		that.info.cancel = 1; 
				   });
                }
            })
		},
		onpaymentclicked()
		{
		   var params = {};
		   params.orderid = this.info.id;
		   this.$router.push({path:'/confirmpayment',query:params}); 
		},
	    onorderdetailclicked(orderid)
	   {
	  	 	   var params = {};
		   	   params.orderid = orderid; 
			   this.$router.push({path:'/orderdetail',query:params});
	   },
		ondeletclicked()
		{
			var that = this;
	        this.$notice.confirm({
	            title: '警告',
	            message: '确定需要删除当前订单吗?', 
	            okCallback () { 
                    updateorder(that.info.id,{deleted:'1'}).then(res =>{
 				   		 that.show = false;
 				   });
	            }
	        })
		}
		
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
	.payment
	{
		 line-height: 70px; 
		 width:300px;
	     height:70px;
		 text-align:center;
		 background-color: #b4272d;
		 color:#ffffff;
 		 font-weight: 500;
 		 font-family: sans-serif-medium;
		 border-radius: 10px;
	}
	.iconfont {
	    font-family: iconfont;
	}
	
</style> 

