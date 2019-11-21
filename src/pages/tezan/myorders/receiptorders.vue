<template>   
  <div class="wrapper" >
         <div class="order-info"> 
             <mycell :cellStyle="{height:'110px'}" > 
 			        <text slot="label" class="cell-label">订单号:</text> 
 					<text slot="title" class="cell-text">{{info.mall_orders_no}}</text> 
					<text slot="action" class="cell-text aftersaleservice" @click="onneedserviceclicked">退换/售后</text> 
             </mycell>
 			 <div class="products" @click="onorderdetailclicked(info.id)">
 			     <products :items="info.products"></products>
 			 </div> 
             <mycell :cellStyle="{height:'110px'}"> 
 			        <text slot="label" class="cell-label">合计:</text> 
 					<text slot="title" class="cell-text price">¥ {{info.sumorderstotal}}</text>  
					<text slot="action" class="cell-text confirmreceipt" @click="onconfirmreceiptclicked" >确认收货 {{countdown | totime}}</text> 
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
  Vue.filter('totime', function(value) {  
  		    if (value <= 0)
			{
				return "";
			}
  			else  if (value > 86400)
			{
			    var day = Math.floor(value / 86400); 
				var remain = value % 86400;
				if (remain > 3600)
				{
				    var hour = Math.floor(remain / 3600); 
					var remain = remain % 3600;
					var minute = Math.floor(remain / 60);  
			        return  day + '天' + hour + '小时';
				}
				else
				{
					var minute = Math.floor(remain / 60);  
			        return  day + '天' +( "00" + minute ).substr(-2) + '分';
				} 
			}
  			else if (value > 3600)
			{
			    var hour = Math.floor(value / 3600); 
				var remain = value % 3600;
				var minute = Math.floor(remain / 60); 
				var second = remain % 60; 
		        return  hour + '小时' + ( "00" + minute ).substr(-2) + '分';
			}
			else
			{
				var minute = Math.floor(value / 60);  
		        return  ( "00" + minute ).substr(-2) + '分';
			}
	   	    
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
		 var deliverytime = this.info.deliverytime;
		 var time = Date.parse(todatetime(deliverytime)) / 1000;
		 var timestamp = Date.parse(new Date()) / 1000;
		 var diff = 86400*7 - (timestamp - time);
		 
		 if (diff < 0)
		 {
		   		this.countdown = 0;
		 }
		 else
		 {
		   		this.countdown = diff;
		 }
		 this.showconfirmreceipt = true;
 		 var that = this;
 		 setTimeout(() => { that.timer(); }, 1000);
		 console.log('deliverytime : ' + JSON.stringify(deliverytime)); 
		 console.log('________time_' + time + '________timestamp_' + timestamp + '_________' + diff); 
		 
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
				else
				{
					this.countdown = 0;
				}
		  },
		  
 		  onorderdetailclicked(orderid)
		  { 
		  	 	   var params = {};
			   	   params.orderid = orderid;
				   this.$router.push({path:'/orderdetail',query:params});
		  },
		  onneedserviceclicked()
		  {
 	 	  	   var params = {};
		   	   params.orderid = this.info.id;
			   this.$router.push({path:'/needservice',query:params}); 
		  },
		  onconfirmreceiptclicked()
		  {
				var that = this;
  	 	  	    var params = {}; 
		        this.$notice.confirm({
		            title: '警告',
		            message: '您确定需要确认收货吗?', 
		            okCallback () {   
							confirmreceipt_submit(that.info.id).then( res => {  
							 	 console.log('___________confirmreceipt_submit_________' + JSON.stringify(res));    
							 	 that.$router.push('/appraise');
			   				},
							function(error) {
		 	 					that.$notice.toast({ message: error }); 
							}); 
		            }
		        });
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
	.confirmreceipt
	{
		 line-height: 70px; 
		 width:330px;
	     height:70px;
		 text-align:center;
		 background-color: #b4272d;
		 color:#ffffff;
 		 font-weight: 500;
 		 font-family: sans-serif-medium;
		 border-radius: 10px;
	}
	.aftersaleservice
	{
		 line-height: 70px; 
		 width:200px;
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

