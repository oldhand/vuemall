<template>
      <div class="wrapper">
	     <div class="paymentloading">   
	   	     <div class="loading" v-if="showwaiting"> 
			 	 <waiting :show="showwaiting" width="60" height="60"></waiting>
				 <text class="loading-text" >{{waittext}}</text>   
	   	     </div> 
			 <div class="success" v-if="showsuccess"> 
			     <div class="loading-container" >
			         <text class="loading-icon iconfont">&#xe671;</text> 
			     </div>  
	   	         <text class="success-text">支付成功</text>  
			 </div>
		</div> 
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" > 
		     <div class="payement-info">  
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">订单号:</text> 
						<text slot="title" class="cell-text">{{order_info.mall_orders_no}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">数量:</text> 
						<text slot="title" class="cell-text">共{{order_info.productcount}}件商品</text>
	            </mycell> 
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">商品合计:</text> 
						<text slot="title" class="cell-text price">¥{{order_info.orderstotal | number_format}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">邮费:</text> 
						<text slot="title" class="cell-text price">¥{{order_info.postage | number_format}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">总计:</text> 
						<text slot="title" class="cell-text price">¥{{order_info.sumorderstotal | number_format}}</text>
	            </mycell>  
				<div class="box-border" v-if="showsuccess"></div>
	            <mycell :cellStyle="{height:'70px'}" v-if="showsuccess"> 
				        <text slot="label" class="cell-label">支付方式:</text> 
						<text slot="title" class="cell-text">{{order_info.payment}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="showsuccess && order_info.discount > 0"> 
				        <text slot="label" class="cell-label">卡劵优惠:</text> 
						<text slot="title" class="cell-text price">{{order_info.discount}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="showsuccess && order_info.vipdeductionmoney > 0" > 
				        <text slot="label" class="cell-label">VIP优惠:</text> 
						<text slot="title" class="cell-text price">{{order_info.vipdeductionmoney}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="showsuccess && order_info.rankmoney > 0"> 
				        <text slot="label" class="cell-label">积分抵扣:</text> 
						<text slot="title" class="cell-text price">{{order_info.rankmoney}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="showsuccess"> 
				        <text slot="label" class="cell-label">余额支付:</text> 
						<text slot="title" class="cell-text price">{{order_info.usemoney}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="showsuccess"> 
				        <text slot="label" class="cell-label">实际支付:</text> 
						<text slot="title" class="cell-text price">{{order_info.paymentamount}}</text>
	            </mycell>
				<div class="box-border"></div>  
			     <div class="logout-wrapper">    
		            <div class="goto" @click="ongotoclick">
		                <text class="goto-txt">返回首页</text>
		            </div>
				</div>
			</div>   
		</scroller>  
    </div>
</template> 

<script>
    import Vue from 'vue'
	import mycell from '../common/mycell.vue';
	import footer from '../common/footer.vue';  
	import waiting from '../common/waiting.vue';  
	import {get_order_info} from '../myorders/config'
	import {number_format,date_format,todatetime} from '../../../rest/common' 
	
    Vue.filter('simpledatetime', function(value) {
       return date_format(todatetime(value), "YYYY-MM-DD HH:mm");
    })
	 
	
    Vue.filter('number_format', function(value) {
        return number_format(value, 2, ".", ",");
    }) 
	 
    export default {
	    components: {
	        mycell,    
			waiting,   
	    },  
	    data() {
	        return {  
	 		    params:{},  
				orderid:0,  
				order_info:{},   
				show:false,
				showwaiting:true,
				waittext:'正在获取订单信息!',
				showsuccess:false,
				tradestatus:'',
				swaptime:0, 
	        }
	    },
		mounted(){    
			var that = this;
		    if (this.$route.query)
			{
				 var params = this.$route.query;
		   		 this.params = params;
				 this.orderid = params.orderid; 
				 get_order_info(this.orderid).then( res => {  
				 	console.log('___________get_order_info_______'+this.orderid+'_________' + JSON.stringify(res));    
				 	this.order_info = res; 
					this.show = true;
					this.tradestatus = res.tradestatus; 
					if ( this.tradestatus == 'trade' ) 
					{
						this.showwaiting = false;
						this.showsuccess = true;
					}
					else
					{
						this.waittext = '正在等待付款通知!';
						this.showwaiting = true;
				        setTimeout(() => {
				          that.loop_load();
				        }, 1000);
					}
   				});			 
		    }  
	    
	    },
        methods: {
	         loop_load()
			 {
			 	 var that = this;
				 get_order_info(this.orderid).then( res => {  
					 	console.log('___________get_order_info_______'+that.orderid+'_________' + JSON.stringify(res));  
						that.tradestatus = res.tradestatus; 
						if ( res.tradestatus == 'trade' ) 
						{
							that.showwaiting = false;
							that.showsuccess = true;
						}
						else
						{
							that.swaptime += 1;
							that.waittext = '正在等待付款通知!'+'('+this.swaptime+'秒)'; 
					        setTimeout(() => {
					          that.loop_load();
					        }, 1000);
						}
   				});
	 
			 },
             ongotoclick()
			 {
				 	this.$router.push('/index'); 
			 }
        }
    }
</script>
<style scoped>
    .wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
		background-color: #fafafa;
    }
  	.iconfont {
  	    font-family: iconfont;
  	}  
	.address-border
	{
		width:750px;
		height:4px;
	}
    .paymentloading{ 
		width:750px; 
		height: 150px;
	    border-bottom-width: 2px;
	    border-bottom-color: #cccccc;
    } 
	
	.loading {
	    padding-bottom: 20px;
		margin-top: 20px; 
		align-items: center;  
	}
	.loading-container
	{ 
		width: 60px;
		height: 60px;
		background-color: #3cc576;
	    justify-content: center;
		align-items: center;  
		border-radius: 60px; 
		line-height: 120px; 
	} 
	.loading-icon { 
		text-align: center;
		color: #ffffff;
		font-size: 30px; 
	} 
	
	.loading-text { 
		margin-top: 10px;
	    text-align: center;
	    font-size: 30px;
		font-weight: 700;
	    width: 750px; 
	    color: #aaaaaa;
	}
	.success {
	    padding-bottom: 20px;
		margin-top: 20px; 
		align-items: center;  
	}
	.success-text { 
		margin-top: 10px;
	    text-align: center;
	    font-size: 30px;
		font-weight: 700;
	    width: 750px;
	    color: #3cc576;;
	} 
	.main-list {  
	}
    .payement-info{ 
		width:750px; 
    }
	.cell-label { 
		font-size: 30px;  
		width:130px;
		text-align:right;
		color:#888888;
		font-weight: 600;
	}
	.cell-text {
	   font-size: 30px;
	   padding-left:15px;
	}
	 
	.price {
	    color: #b4282d
	}
	.box-border
	{
		width:750px;
		height:15px;
		background-color: #cccccc; 
	}
    .goto-wrapper{  
	    align-items: center;
	    justify-content: center;
    }
    .goto {
        height: 100px;
        width: 750px;
        background-color: #ffffff;  
    }
    .goto:active {
      background-color: #eeeeee;
    }
    .goto-txt{
        height: 100px; 
        text-align: center;
        line-height: 100px;
        color: #b4282d;
		font-weight: 700;
        font-size: 35px;
    }
	
	 
</style>