<template>
      <div class="wrapper">
	     <div class="address-info">   
            <mycell v-if="selectdeliveraddressid != ''" :title="'收货人: '+deliveraddress.consignee +' '+deliveraddress.mobile" :desc="deliveraddress.address" :cellStyle="{height:'120px'}" @click.native="onaddressclick(deliveraddress.id)"> 
					<text slot="label" class="iconfont address-icon">&#xe65e;</text>
			 		<text slot="action" class="iconfont">&#xe672;</text> 
            </mycell>  
            <mycell v-else title="没有收货地址，请创建收货地址!"  :cellStyle="{height:'120px'}" @click.native="onaddressclick('')"> 
					<text slot="label" class="iconfont address-icon">&#xe65e;</text>
			 		<text slot="action" class="iconfont">&#xe672;</text> 
            </mycell>
			<image class="address-border" resize="cover" src="/images/address-border.jpg"></image>
		</div> 
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" > 
		     <div class="payement-info">  
	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">数量:</text> 
						<text slot="title" class="cell-text">共{{total_quantity}}件商品</text>
	            </mycell> 
	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">商品合计:</text> 
						<text slot="title" class="cell-text price">¥{{total_price}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">邮费:</text> 
						<text slot="title" class="cell-text price">¥{{total_postage}}</text>
	            </mycell>
	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">总计:</text> 
						<text slot="title" class="cell-text price">¥{{amount}}</text>
	            </mycell> 
			</div>  
			
			<div class="products">
			    <products :items="shoppingcarts"></products>
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
				  :title="snackbar"
				  @snackbarclose="snackbarclose"></snackbar>
		
	    <myfooter  :border=true>    
		    <div class="footer">
		  	     <div class="footer-info">
		  	        <text class="text" >应付: </text>
		  			<text class="text price">¥{{amount}}</text> 
		  		 </div>  
		  	     <div class="border"></div> 
		         <div class="button-wrap payment" @click="onpaymentclick">
		          <text class="button-title" >去付款</text>
		         </div> 
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
	import products from './products';
	import {get_profileid} from '../../../rest/profile' 
	import {analysis_shoppingcarts,get_mq_info} from '../../../rest/api' 
	import {getdefault_deliveraddress,getshoppingcarts,submitorder } from './config'
	import {number_format,gettimestamp} from '../../../rest/common'  
	 
    export default {
	    components: {
	        mycell,  
			products,
			'myfooter':footer,
			myloading,
			snackbar,
			 
	    },  
	    data() {
	        return {  
	 		    params:{},  
				deliveraddress:{},
				selectdeliveraddressid:'',
				shoppingcarts:[],
				total_quantity: 0,
				total_price: 0,
				total_postage: 0,
				amount:0,
				showloading:false,
				showsnackbar:false,
				snackbar:'',
				loadingtext:'',
				swaptime:0, 
				timestamp:0,
				record:0,
	        }
	    },
		mounted(){    
			var that = this;
		    if (this.$route.query)
			{ 
			   		 this.params = this.$route.query;
					 if (this.params.selectdeliveraddressid)
					 {
					 	 var selectdeliveraddressid = this.params.selectdeliveraddressid;
	   					 getdefault_deliveraddress(selectdeliveraddressid).then(res => { 
	   					 	this.deliveraddress = res;
	   						this.selectdeliveraddressid = res.id;
	   					    console.log('____________deliveraddress_________' + JSON.stringify(this.deliveraddress));   
	   					 });
					 }
					 else
					 {
						 getdefault_deliveraddress('').then(res => { 
						 	this.deliveraddress = res;
							this.selectdeliveraddressid = res.id;
						    console.log('____________deliveraddress_________' + JSON.stringify(this.deliveraddress));   
						 },
						 function(error) {
							  console.log('_______no_____deliveraddress_________');   
  							  that.selectdeliveraddressid = '';
						 });
					 } 
					 getshoppingcarts(this.params).then( res => {   
					 	this.shoppingcarts = res;
	   					console.log('____________getshoppingcarts_________' + JSON.stringify(res));   
						analysis_shoppingcarts(res).then(result => {  
								console.log('____________analysis_shoppingcarts_________' + JSON.stringify(result));
								this.total_quantity = result.total_quantity;
								this.total_price = number_format(result.total_price, 2, ".", ",");
								this.total_postage = number_format(result.postage, 2, ".", ",");
								this.amount = number_format(result.amount, 2, ".", ","); 
						});
	   				});			 
			}  
	    
	    },
        methods: {
			snackbarclose()
			{
				this.showsnackbar = false; 
			},
            onaddressclick()
			{ 
			     this.params.selectdeliveraddressid = this.selectdeliveraddressid; 
				 if (this.params.selectdeliveraddressid == '')
				 { 
				     this.params.openid = '';
				 	 this.$router.push({path:'/editaddress',query:this.params});
				 }
				 else
				 {
				  	 this.$router.push({path:'/selectaddress',query:this.params});
				 }
				
			},
			load_mq_info(mqid)
			{
				var that = this; 
				this.swaptime = this.swaptime + 1;
				this.loadingtext = '正在创建订单,已用时'+this.swaptime +'秒,请不要关闭窗口!';
				get_mq_info(mqid,'submitorder').then(res => {  
				    console.log('____________submitorder_________' + JSON.stringify(res));  
					if (res.my.ack == 1)
					{
					   var params = {};
					   params.orderid = res.my.result;
					   this.$router.push({path:'/confirmpayment',query:params}); 
					}
					else if (res.my.ack == 2)
					{     
						that.showloading = false;    
   						that.snackbar = '创建订单失败!('+res.my.result+')';
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
			onpaymentclick()
			{   
				var that = this;
				if (this.selectdeliveraddressid == "")
				{
					that.snackbar = '请您先录入收货地址！';
					that.showsnackbar = true;
					return;
				}
				if (this.showloading) return;
				var nowtimestamp = gettimestamp(); 
				if (this.timestamp != 0)
				{
				    var diftime = nowtimestamp - this.timestamp;
					if (diftime <  10)
					{
						that.snackbar = '您刚刚提交了创建订单请求,请'+(10-diftime)+'秒后再试';
						that.showsnackbar = true;
						return;
					}
				}
				if (this.record == 0)
				{
					this.record = nowtimestamp;
				}
				this.timestamp = nowtimestamp;
				var key =  Math.floor(this.timestamp / 10);
				this.params.key = key;
				this.params.record = this.selectdeliveraddressid; 
			    this.params.deliveraddressid = this.selectdeliveraddressid; 
				this.params.total_quantity = this.total_quantity;
				this.params.total_price = this.total_price;
				this.params.total_postage = this.total_postage;
				this.params.amount = this.amount;
				
	 		    console.log('_____onpaymentclick_______________' + JSON.stringify(this.params) );  
				this.showloading = true;
				this.swaptime = 0;
				this.loadingtext = '正在创建订单,请稍候!'; 
				this.snackbar = '';
				this.showsnackbar = false;
				Vue.prototype.$storage.deleteSync('shoppingcart_count');  
				submitorder(this.params).then(res => {  
				    console.log('____________submitorder_________' + JSON.stringify(res)); 
					that.load_mq_info(res.id);  
				},
				function(error) {
					that.showloading = false;
					that.snackbar = '创建订单失败,请与管理员联系!('+error+')';
					that.showsnackbar = true; 
				});  
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
	 
</style>