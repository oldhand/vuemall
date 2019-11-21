<template>
      <div class="wrapper">
	     <div class="address-info">   
            <mycell v-if="show" :title="'收货人: '+order_info.consignee +' '+order_info.mobile" :desc="order_info.address" :cellStyle="{height:'120px'}" > 
					<text slot="label" class="iconfont address-icon">&#xe65e;</text> 
            </mycell>  
			<image class="address-border" resize="cover" src="/images/address-border.jpg"></image>
		</div> 
		 <scroller class="main-list" offset-accuracy="300px"> 
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
						<text slot="title" class="cell-text price">¥ {{order_info.orderstotal | number_format}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">邮费:</text> 
						<text slot="title" class="cell-text price">¥ {{order_info.postage | number_format}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">总计:</text> 
						<text slot="title" class="cell-text price">¥ {{order_info.sumorderstotal | number_format}}</text>
	            </mycell> 
				<div class="box-border"></div>
				
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">订单状态:</text> 
						<text slot="title" class="cell-text price">{{order_info.order_status}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">下单时间:</text> 
						<text slot="title" class="cell-text price">{{order_info.published | simpledatetime}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade'"> 
				        <text slot="label" class="cell-label">支付时间:</text> 
						<text slot="title" class="cell-text price">{{order_info.paymenttime}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade' && order_info.deliverytime != ''"> 
				        <text slot="label" class="cell-label">发货时间:</text> 
						<text slot="title" class="cell-text price">{{order_info.deliverytime}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade' && order_info.confirmreceipt_time && order_info.confirmreceipt_time != ''" > 
				        <text slot="label" class="cell-label">确认收货:</text> 
						<text slot="title" class="cell-text price">{{order_info.confirmreceipt_time}}</text>
	            </mycell>
				<div class="box-border" v-if="order_info.tradestatus == 'trade'"></div>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade'"> 
				        <text slot="label" class="cell-label">支付方式:</text> 
						<text slot="title" class="cell-text">{{order_info.payment}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade' && order_info.discount > 0"> 
				        <text slot="label" class="cell-label">卡劵优惠:</text> 
						<text slot="title" class="cell-text price">¥ {{order_info.discount}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade' && order_info.vipdeductionmoney > 0" > 
				        <text slot="label" class="cell-label">VIP优惠:</text> 
						<text slot="title" class="cell-text price">¥ {{order_info.vipdeductionmoney}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade' && order_info.rankmoney > 0"> 
				        <text slot="label" class="cell-label">积分抵扣:</text> 
						<text slot="title" class="cell-text price">¥ {{order_info.rankmoney}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade' && order_info.usemoney > 0"> 
				        <text slot="label" class="cell-label">余额支付:</text> 
						<text slot="title" class="cell-text price">¥ {{order_info.usemoney}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade'"> 
				        <text slot="label" class="cell-label">实际支付:</text> 
						<text slot="title" class="cell-text price">¥ {{order_info.paymentamount}}</text>
	            </mycell>
				<div class="box-border"></div>
	            <mycell :cellStyle="{height:'70px'}" > 
				        <text slot="label" class="cell-label">发票:</text> 
						<text slot="title" class="cell-text">电子发票</text>
	            </mycell>
				<div class="box-border" v-if="order_info.tradestatus == 'trade' && order_info.deliverystatus == 'sendout' && order_info.invoicenumber != ''"></div>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade' && order_info.deliverystatus == 'sendout' && order_info.invoicenumber != ''" @click.native="onviewwiliuclicked"> 
				        <text slot="label" class="cell-label">物流:</text> 
						<text slot="title" class="cell-text">{{order_info.invoicename}}</text> 
 				 		<text slot="action" class="cell-action-icon iconfont">&#xe672;</text>  
	            </mycell>
	            <mycell :cellStyle="{height:'70px'}" v-if="order_info.tradestatus == 'trade' && order_info.deliverystatus == 'sendout' && order_info.invoicenumber != ''" @click.native="onviewwiliuclicked"> 
				        <text slot="label" class="cell-label">快递单号:</text> 
						<text slot="title" class="cell-text">{{order_info.invoicenumber}}</text>
						<div slot="action" class="cell-action">  
							<text class="cell-action-label">查看物流</text> 
 				 			<text class="cell-action-icon iconfont">&#xe672;</text> 
						</div>
	            </mycell>
				<div class="box-border"></div>
			</div>  
			<div class="products">
			    <products :items="order_info.products"></products>
			</div>  
		</scroller>  
    </div>
</template> 

<script>
	import Vue from 'vue'
	import mycell from '../common/mycell.vue';
	import footer from '../common/footer.vue'; 
	import products from './products'; 
	import {get_order_info} from './config'
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
			products,  
	    },  
	    data() {
	        return {  
	 		    params:{},  
				orderid:0,  
				order_info:{},  
				total_quantity: 0,
				total_price: 0,
				total_postage: 0,
				amount:0, 
				show:false,
	        }
	    },
		mounted(){     
		    if (this.$route.query)
			{
		    		 console.log('___________orderdetail_____________');   
			   		 this.params = this.$route.query;
					 this.orderid = this.params.orderid; 
					 get_order_info(this.orderid).then( res => {  
					 	console.log('___________get_order_info_______'+this.orderid+'_________' + JSON.stringify(res));    
					 	this.order_info = res; 
						this.show = true;
	   				});			 
			}    
	    },
        methods: {
             onviewwiliuclicked()
			 { 
		  	 	   var params = {};
			   	   params.invoicename = this.order_info.invoicename;
				   params.invoicenumber = this.order_info.invoicenumber; 
				   this.$router.push({path:'/wuliu',query:params});  
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
    .address-info{
        margin-top: 2px;
		width:750px; 
    } 
    .address-icon { 
	    font-size: 60px;  
		width:80px;
    }
	.main-list {  
	}
    .payement-info{
        margin-top: 10px;
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
	
	.footer
	{
		width:750px;
		height: 100px;
	  	align-items: center;
	  	justify-content: space-between;
	    padding-right:15px;
		flex-direction: row;
	}
    .footer-info {  
		width:500px;
    	height: 100px;
      	align-items: center;
      	justify-content: flex-start;
  	    padding-left:25px;
		flex-direction: row;
    } 
	
    .border {
      width: 2px;
      height: 100px;
      background-color: #dddddd;
    } 
    .button-wrap { 
        width: 250px;
    	height: 100px;
        align-items: center;
        justify-content: center;
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
    .payment { 
	  	background-color: #b4272d; 
    }
	.text {
	   font-size: 30px;
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
	
	
	.cell-action
	{
		flex-direction: row;
	    align-items: flex-end;
	    justify-content: center;
	} 
	.cell-action-label
	{
		font-size: 30px;  
		width:120px;
		text-align: right;
		color:#888888; 
	} 
	.cell-action-icon{ 
		font-size: 30px;   
		color:#333333; 
	}
	 
</style>