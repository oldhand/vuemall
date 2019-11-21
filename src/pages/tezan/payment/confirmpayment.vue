<template>
      <div class="wrapper"> 
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" > 
		     <div class="payement-info">  
	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">订单号:</text> 
						<text slot="title" class="cell-text price">{{ order_info.mall_orders_no}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">总金额:</text> 
						<text slot="title" class="cell-text price">¥ {{ amount | number_format}}</text>
	            </mycell> 
 	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">卡劵优惠:</text>
						<text slot="title" class="cell-text disabled">没有可用的卡劵</text>  
 				 		<text slot="action" class="cell-action-icon iconfont disabled">&#xe672;</text>  
 	            </mycell>
	            <mycell :cellStyle="{height:'110px'}" v-if="rankcost == 0 && rank > 0" > 
				        <text slot="label" class="cell-label">积分抵扣:</text> 
						<checkbox class="checkbox-wrapper" slot="title" :value="userank" :label="userank_label" @checkchange="userank=!userank"></checkbox> 
						<div slot="action" class="row">   
						    <text class="action-text">积分:</text> 
 				 			<text class="action-text price"> {{rank}}</text>  
						</div>
	            </mycell>
	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">余额:</text> 
						<checkbox class="checkbox-wrapper" slot="title" :value="usemoney" :label="usemoney_label" @checkchange="usemoney=!usemoney"></checkbox> 
						<div slot="action" class="row">   
						    <text class="action-text">余额: </text> 
 				 			<text class="action-text price">¥{{money | number_format}}</text> 
						</div>
	            </mycell> 
	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">应付金额:</text> 
						<text slot="title" class="cell-text price">¥ {{ payment | number_format}}</text>
	            </mycell>
  	            <mycell title="微信支付" desc="由腾讯公司提供服务" :cellStyle="{height:'120px'}" @click.native="showsnackbar = false;selectpayment = 'weixin'" v-if="payment > 0"> 
  						<text slot="label" class="iconfont payment-icon weixin">&#xe7e5;</text>
  				 		<text slot="action" class="iconfont selected-icon" v-if="selectpayment == 'weixin'">&#xe671;</text>  
  	            </mycell>
  	            <mycell title="支付宝" desc="由阿里巴巴提供服务" :cellStyle="{height:'120px'}" @click.native="showsnackbar = false;selectpayment = 'alipay'" v-if="payment > 0"> 
  						<text slot="label" class="iconfont payment-icon alipay">&#xe7b1;</text>
  				 		<text slot="action" class="iconfont selected-icon" v-if="selectpayment == 'alipay'">&#xe671;</text>  
  	            </mycell>
			</div>   
		</scroller>  
		<myloading :show="showloading"
		                 type="trip"
						 :need-mask=true
		                 :loading-text="loadingtext"
						 ></myloading>
							
		<snackbar :show="showsnackbar" 
				  :stay-time="8000" 
				  :bottom="130" 
				  close-text="关闭"
				  :closeIcon=true 
				  :title="snackbar"></snackbar>
		
	    <myfooter>     
		         <div class="button-wrap payment" @click="onpaymentclick">
		          <text class="button-title" >立即支付</text>
		         </div>  
	    </myfooter> 
    </div>
</template> 

<script>
	import Vue from 'vue'
	import mycell from '../common/mycell.vue';
	import footer from '../common/footer.vue';
	import myloading from '../common/loading.vue';
	import snackbar from '../common/snackbar.vue'; 
	import checkbox from '../common/checkbox.vue';
	import {get_supplier_info,get_mq_info} from '../../../rest/api' 
	import {get_profile_info} from '../../../rest/profile' 
	import {get_order_info,saveorder} from './config'
	import {number_format,gettimestamp} from '../../../rest/common'   
 
    Vue.filter('number_format', function(value) {
        return number_format(value, 2, ".", ",");
    })
	 
    export default {
	    components: {
	        mycell,   
			'myfooter':footer,
			myloading,
			snackbar, 
			checkbox, 
	    },  
	    data() {
	        return {  
	 		    params:{},    
				orderid: '',
				supplier_info:{},
				order_info: {}, 
				profile_info: {}, 
				amount: 0,
				payment: 0,
				rank: 0,
				money: 0,
				usemoney: false,
				usemoney_label: '',
				userank: false,
				userank_label: '',
				rankcost: 1, 
				rankcostrate: 0,
				showloading:false,
				showsnackbar:false,
				snackbar:'',
				loadingtext:'',
				swaptime:0, 
				selectpayment:'weixin',  
				timestamp:0,
	        }
	    },
	  
		mounted(){    
			var that = this;
		    get_supplier_info().then(res => { 
				this.supplier_info = res;
				this.rankcostrate = res.rankcostrate;
				this.rankcost = res.rankcost; 
			});
		    if (this.$route.query)
			{
				 var params = this.$route.query;
		    	 console.log('____________confirmpayment_______________' + JSON.stringify(params));  
		   		 this.params = params; 
				 if (params.orderid && params.orderid != "")
				 {
				      this.orderid = params.orderid;
					  get_order_info(this.orderid).then(res => {
					  		  this.order_info = res;  
							  this.amount = res.sumorderstotal;
							  console.log('____confirmpayment______order_info_________' + JSON.stringify(res)); 
	  						  get_profile_info().then(profile_info => {
							  		console.log('____confirmpayment______profile_info_________' + JSON.stringify(profile_info)); 
	  						  		this.profile_info = profile_info;  
									this.rank =  profile_info.rank; 
									this.money =  profile_info.money; 
	  						  }); 
					  });
				 } 
			     
		    } 
	    },
	    watch: {
	      amount () {
	           setTimeout(() => {  this.calculate(); }, 50);
	      },
	      userank () {
	           setTimeout(() => {  this.calculate(); }, 50);
	      },
	      usemoney () {
	           setTimeout(() => {  this.calculate(); }, 50);
	      },
		  money () {
	           setTimeout(() => {  this.calculate(); }, 50);
	      },
		  rank () { 
		       setTimeout(() => {  this.calculate(); }, 50);
	      }
	    },
        methods: { 
			calculate()
			{ 
				this.showsnackbar = false;
			 	const {  amount,userank,usemoney,rank,money,rankcostrate  } = this; 
				this.usemoney_label = '可使用¥'+number_format(money, 2, ".");
				var dikou = (rank * rankcostrate / 100).toFixed(2);
				this.userank_label = '可抵扣¥'+number_format(dikou, 2, "."); 
				var accountpayable = amount;
				if (userank)
				{
					if (accountpayable > dikou)
					{
						accountpayable = accountpayable - dikou;
					}
					else
					{
						accountpayable = 0;
					} 
				}
				if (usemoney)
				{
					if (accountpayable > money)
					{
						accountpayable = accountpayable - money;
					}
					else
					{
						accountpayable = 0;
					} 
				}
				this.payment = accountpayable;
			},
		 
			onpaymentclick()
			{    
	 		    console.log('_____onpaymentclick_______________' + JSON.stringify(this.params) );  
				this.snackbar = '';
				this.showsnackbar = false;
				if (this.payment > 0)
				{
					if (this.selectpayment == 'weixin')
					{
						this.snackbar = '微信支付接口正在开发中....';
						this.showsnackbar = true;
					}
					else if (this.selectpayment == 'alipay')
					{
						this.snackbar = '支付宝接口正在开发中....';
						this.showsnackbar = true;
					}
				}
				else
				{
						var that = this;
						if (this.showloading) return;
						var nowtimestamp = gettimestamp(); 
						if (this.timestamp != 0)
						{
						    var diftime = nowtimestamp - this.timestamp;
							if (diftime <  10)
							{
								that.snackbar = '您刚刚提交了支付请求,请'+(10-diftime)+'秒后再试';
								that.showsnackbar = true;
								return;
							}
						}  
						this.timestamp = nowtimestamp; 
						this.showloading = true; 
						this.swaptime = 0;
						this.loadingtext = '正在提交支付请求,请稍候!'; 
						this.snackbar = '';
						this.showsnackbar = false;  
						
						this.timestamp = nowtimestamp;
						var key =  Math.floor(this.timestamp / 10);
						var params = {};
						params.orderid = this.orderid;
						params.key = key;
						params.userank = this.userank;
						params.rank = this.rank;
						params.usemoney = this.usemoney;
						params.money = this.money; 
						params.amount = this.amount; 
						params.payment = this.payment;  
						saveorder(params).then(res => {  
						    console.log('____________saveorder_________' + JSON.stringify(res));
							that.load_mq_info(res.id);    
						},
						function(error) {
							that.showloading = false;
							that.snackbar = '提交支付失败,请与管理员联系!('+error+')';
							that.showsnackbar = true; 
							 console.log('____________saveorderr_________' + error);  
						});
				} 
			},
			load_mq_info(mqid)
			{
				var that = this; 
				this.swaptime = this.swaptime + 1;
				this.loadingtext = '正在提交支付请求,已用时'+this.swaptime +'秒,请不要关闭窗口!';
				get_mq_info(mqid,'saveorder').then(res => {  
				    console.log('____________saveorderr_________' + JSON.stringify(res));  
					if (res.my.ack == 1)
					{
					    that.showloading = false;     
  						that.showsnackbar = false;
    		  	 	    var params = {};
    			   	    params.orderid = res.my.result;
						this.$router.push({path:'/paymentsuccess',query:params}); 
					}
					else if (res.my.ack == 2)
					{     
						that.showloading = false;    
   						that.snackbar = '支付失败!('+res.my.result+')';
   						that.showsnackbar = true;
					}
					else
					{
				       setTimeout(() => {
				          that.load_mq_info(mqid);
				        }, 1000);
					}
			         
				},
				function(error) {
					that.showloading = false;
					that.snackbar = error+',请与管理员联系!';
					that.showsnackbar = true; 
				});
			},
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
	.main-list { 
	    margin-bottom: 100px;
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
	.action-text {
	   font-size: 30px; 
	}
    .payment-icon { 
	    font-size: 60px;  
		width:135px;
		padding-left:30px;
    }
	.weixin
	{
	   color:green;
	}
	.alipay
	{
	   color:blue;
	}
	.selected-icon
	{
	    font-size: 40px;  
		width:36px;
		color: #b4272d;
		width:80px; 
	}
	 
    .button-wrap { 
        width: 750px;
    	height: 100px;
        align-items: center;
        justify-content: center;
    } 
    .button-wrap:active {
       background-color: #dfbd84;
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
	.disabled {
		color:#cccccc;
	}
	.row
	{
		flex-direction: row;
	    align-items: center;
	    justify-content: flex-start;
	}
	.checkbox-wrapper
	{
		padding-left: 15px;
	}
	 
</style>