<template>
    <div class="wrapper">
        <shop-header @editchanged="editchanged" :status="isedit" ></shop-header> 
        <div class="slogan"  v-if="shoppingcartmsgbutton">
            <text class="i-slg">{{shoppingcartmsg}}</text> 
			<div class="i-slg-link" @click="mainbuttonclick" v-if="showtogetherbutton">
				<text class="i-slg-text">去凑单</text> 
				<text class="i-slg-icon iconfont">&#xe672;</text>
			</div>
        </div>
        <scroller class="main-shoppingcart-list" offset-accuracy="300px" @scroll="scroll" :style="{'margin-top':scroller_margin_top}"> 
            <div ref="top" class="shop-cart">
                <div v-if="showemptyshoppingcarts && logined" class="cart-empty">
                    <image class="img-empty" resize="contain" src="/images/shoppingcart.png"></image>
                    <text class="txt-empty">您需要买点什么吗?</text> 
                </div>
				<div class="carts" v-if="showshoppingcarts && logined">
				    <carts :items="shoppingcarts" @checkboxchanged="checkboxchanged" @steppervaluechanged="steppervaluechanged"></carts>
				</div>
			    <text v-if="showlogin" class="login-title">您还没有登录!</text>  
	   			 <div class="button-wrapper" v-if="showlogin">
	   				 <am-button :width=550 text="去登录" type="theme" @click.native="onloginclick"></am-button>
	   			 </div>
            </div> 
			 
			<myfooter ref="myfooter"  
				v-if="showfooter"
			    :total_price="total_price" 
				:total_quantity="total_quantity" 
				:total_postage="total_postage" 
				:select_label="select_label"  
				:select_value="select_value"
				:buttonColor="buttonColor" 
				:buttonLabel="buttonLabel"  
				@checkboxchanged="footercheckboxchanged" 
				@onbuttonclicked="onbuttonclicked"></myfooter>
			<go-top @goTop="goTopHandler" :show="showGoTop"></go-top> 
        </scroller>
    </div>
</template>
<script>
import Vue from 'vue'
import header from './header'; 
import button from '../components/button.vue' 
import myfooter from './myfooter.vue'  
import goTop from '../common/goTop.vue';
import checkbox from '../common/checkbox.vue';
import checkboxlist from '../common/checkboxlist.vue'; 
import carts from './carts';
import {number_format} from '../../../rest/common'
import { getshoppingcarts,updateshoppingcart,deleteshoppingcart } from './config'
import {analysis_shoppingcarts} from '../../../rest/api' 
import {get_profileid} from '../../../rest/profile' 

const dom = weex.requireModule('dom') 


export default {  
    components: {
		'am-button':button, 
        'shop-header': header, 
		 carts,
		 myfooter,
		 goTop,
		 checkboxlist,
		 checkbox, 
    },   
	mounted() {  
		var that = this;
		get_profileid().then(profileid => { 
		    that.logined = true; 
			that.shoppingcart_init(); 
			that.showlogin = false;
		},
		function(error) {	
			that.logined = false;	
		    that.showshoppingcarts = false;
		    that.showemptyshoppingcarts = false;
		    that.showfooter = false; 
			that.showlogin = true;
		}); 
    }, 
    data() {
        return { 
			shoppingcartmsg:'',
			shoppingcartmsgbutton:false,
			scroller_margin_top:'144px',
			showtogetherbutton:false,
	  	    showGoTop: false,  
			showshoppingcarts: false,
			showfooter: false,
			showemptyshoppingcarts : false,
			select_value: false,
			select_label: '',
			selectids: [],
			total_quantity: 0,
			total_price: 0,
			total_postage: 0,
			postage: 0,
			shoppingcarts:[],
			buttonColor:"#b4272d",
			buttonLabel:"立即结算",
 	  	    isedit: false,   
 		    logined:false, 
			showlogin:false, 
        }
    },
    methods: {  
       scroll (e) { 
           const referenceValue = 1200
           const offsetY = Math.abs(Number(e.contentOffset.y))
           if (!this.showGoTop && offsetY > referenceValue) {
               this.showGoTop = true; 
           }
           if (this.showGoTop && offsetY < referenceValue) {
               this.showGoTop = false; 
           }  
       },  
       goTopHandler () { 
            dom.scrollToElement(this.$refs.top, { offset: 0 });
			this.showGoTop = false; 
       },
	   shoppingcart_init()
	   {  
			var that = this;
		    getshoppingcarts().then(res => {   
			    console.log('getshoppingcarts : ' + JSON.stringify(res));     
				if (res.length > 0)
				{
				    that.selectids = [];
					that.showshoppingcarts = true;
					that.showemptyshoppingcarts = false;
					for (var i in res)
					{
						var mall_shoppingcart_info = res[i];  
						that.selectids.push(mall_shoppingcart_info.id);
					}
					that.shoppingcarts = res;   
					that.select_label = '已选(' + String(res.length) + ')';
					that.select_value = true;
					
					analysis_shoppingcarts(res).then(res => {  
							that.total_quantity = res.total_quantity;
							that.total_price = res.total_price;
							that.total_postage = res.postage;
							that.showfooter = true;
							console.log('________________'+res.postage+'____'+res.total_price+'_________');
							if (this.isedit)
							{
			 				   that.shoppingcartmsg = '请选择需要删除的商品!';
			 				   that.showtogetherbutton = false;
							   that.shoppingcartmsgbutton= true;
							   that.scroller_margin_top = '138px';
							}
							else if (res.postage == 0 && res.total_price > 0)
							{
			 				   that.shoppingcartmsg = '已经符合免邮条件';
			 				   that.showtogetherbutton = false;
							   that.shoppingcartmsgbutton= true;
							   that.scroller_margin_top = '138px'; 
							}
							else
							{
							   if (res.totalpricefreeshipping > 0 && res.totalquantityfreeshipping > 0)
							   {
							       var remainder = res.totalpricefreeshipping  - that.total_price;
								   var remainder_quantity = res.totalquantityfreeshipping  - that.total_quantity;
		 		 				   that.shoppingcartmsg = '再购¥'+number_format(remainder, 2, ".", ",")+'或'+remainder_quantity+'件商品可免邮费';
		 		 				   that.showtogetherbutton = true;
								   that.shoppingcartmsgbutton= true;
								   that.scroller_margin_top = '138px';
							   } 
							   else if (res.totalpricefreeshipping > 0 )
							   {
							       var remainder = res.totalpricefreeshipping  - that.total_price;
		 		 				   that.shoppingcartmsg = '再购¥'+number_format(remainder, 2, ".", ",")+'商品可免邮费';
		 		 				   that.showtogetherbutton = true;
								   that.shoppingcartmsgbutton= true;
								   that.scroller_margin_top = '138px';
							   } 
							   else if (res.totalquantityfreeshipping > 0 )
							   {
							       var remainder_quantity = res.totalquantityfreeshipping  - that.total_quantity;
		 		 				   that.shoppingcartmsg = '再购'+remainder_quantity+'件商品可免邮费';
		 		 				   that.showtogetherbutton = true;
								   that.shoppingcartmsgbutton= true;
								   that.scroller_margin_top = '138px';
							   }
							   else
							   {
		 		 				   that.shoppingcartmsg = '';
		 		 				   that.showtogetherbutton = false;
								   that.shoppingcartmsgbutton= false;
								   that.scroller_margin_top = '44px';
							   }
						    }
							console.log('_______******______________analysis_shoppingcarts : ' + JSON.stringify(res));  
					});
				}
				else
				{ 
 				   that.shoppingcartmsg = '';
 				   that.showtogetherbutton = false;
				   that.shoppingcartmsgbutton= false;
				   that.scroller_margin_top = '44px';
				   that.showshoppingcarts = false;
				   that.showemptyshoppingcarts = true;
				   that.showfooter = false;
				   
				}			
			}); 
	   },
	   shoppingcart_refresh()
	   {  
			this.selectids = [];
			var that = this;
			if (this.shoppingcarts.length > 0)
			{
			 	that.selectids = [];
				this.showshoppingcarts = true;
				this.showemptyshoppingcarts = false; 
			    var res = this.shoppingcarts;
				for (var i in res)
				{
					var mall_shoppingcart_info = res[i];  
				    if (mall_shoppingcart_info.selected == 1)
					{ 
						this.selectids.push(mall_shoppingcart_info.id);
					}
				}  
				if (this.selectids.length > 0)
				{
					this.select_label = '已选(' + String(this.selectids.length) + ')';
					this.select_value = true;
					this.buttonColor = "#b4272d";
				}
				else
				{
					this.select_label = '已选(0)';
					this.select_value = false;
					this.buttonColor = "#cccccc";
				} 
				analysis_shoppingcarts(res).then(res => {  
						that.total_quantity = res.total_quantity;
						that.total_price = res.total_price;
						that.total_postage = res.postage;
						that.showfooter = true;
						if (this.isedit)
						{
		 				   that.shoppingcartmsg = '请选择需要删除的商品!';
		 				   that.showtogetherbutton = false;
						   that.shoppingcartmsgbutton= true;
						   that.scroller_margin_top = '138px';
						}
						else if (res.postage == 0 && res.total_price > 0)
						{
		 				   that.shoppingcartmsg = '已经符合免邮条件';
		 				   that.showtogetherbutton = false;
						   that.shoppingcartmsgbutton= true;
						   that.scroller_margin_top = '138px'; 
						}
						else
						{
						   if (res.totalpricefreeshipping > 0 && res.totalquantityfreeshipping > 0)
						   {
						       var remainder = res.totalpricefreeshipping  - that.total_price;
							   var remainder_quantity = res.totalquantityfreeshipping  - that.total_quantity; 
	 		 				   that.shoppingcartmsg = '再购¥'+number_format(remainder, 2, ".", ",")+'或'+remainder_quantity+'件商品可免邮费';
	 		 				   that.showtogetherbutton = true;
							   that.shoppingcartmsgbutton= true;
							   that.scroller_margin_top = '138px';
						   } 
						   else if (res.totalpricefreeshipping > 0 )
						   {
						       var remainder = res.totalpricefreeshipping  - that.total_price;
	 		 				   that.shoppingcartmsg = '再购¥'+number_format(remainder, 2, ".", ",")+'商品可免邮费';
	 		 				   that.showtogetherbutton = true;
							   that.shoppingcartmsgbutton= true;
							   that.scroller_margin_top = '138px';
						   } 
						   else if (res.totalquantityfreeshipping > 0 )
						   {
						       var remainder_quantity = res.totalquantityfreeshipping  - that.total_quantity;
	 		 				   that.shoppingcartmsg = '再购'+remainder_quantity+'件商品可免邮费';
	 		 				   that.showtogetherbutton = true;
							   that.shoppingcartmsgbutton= true;
							   that.scroller_margin_top = '138px';
						   }
						   else
						   {
	 		 				   that.shoppingcartmsg = '';
	 		 				   that.showtogetherbutton = false;
							   that.shoppingcartmsgbutton= false;
							   that.scroller_margin_top = '44px';
						   }
					    }
						console.log('_______******______________analysis_shoppingcarts : ' + JSON.stringify(res));
				}); 
			}
			else
			{
			   that.shoppingcartmsg = '';
			   that.showtogetherbutton = false;
			   that.shoppingcartmsgbutton= false;
			   that.scroller_margin_top = '44px';
			   that.showshoppingcarts = false;
			   that.showemptyshoppingcarts = true;
			   that.showfooter = false;
			}	 
	   },
	   steppervaluechanged(event)
	   {   
			 var shoppingcartid = event.id;
			 var value = event.value;
			 var update = false;
			 for (var i in this.shoppingcarts)
			 {
				if (this.shoppingcarts[i].id == shoppingcartid)
				{ 
					var shop_price = this.shoppingcarts[i].shop_price; 
					var quantity = this.shoppingcarts[i].quantity; 
					if (Number(value) != Number(quantity))
					{
						var total_price = Number(shop_price) * Number(value);
						this.shoppingcarts[i].quantity = Number(value);
						this.shoppingcarts[i].total_price = total_price;
						update = true;
					} 
				} 
			 }
			 if (update)
			 {
				 this.shoppingcart_refresh();
				 updateshoppingcart(shoppingcartid,value).then( res => {   
					  document.dispatchEvent(new Event('shoppingcartchanged'));
				 });
			 } 
	   },
	   checkboxchanged(event)
	   {  
	         console.log('________checkboxchanged_________' + JSON.stringify(event));  
			 var shoppingcartid = event.id; 
			 for (var i in this.shoppingcarts)
			 {
				if (this.shoppingcarts[i].id == shoppingcartid)
				{ 
					console.log('___'+shoppingcartid+'______'+event.value+'____'+this.shoppingcarts[i].selected+'________');
					this.shoppingcarts[i].selected = event.value; 
				} 
			 }
			 this.shoppingcart_refresh();
	   }, 
	   
	   footercheckboxchanged(select)
	   {  
			 for (var i in this.shoppingcarts)
			 {
				 this.shoppingcarts[i].selected = select;  
			 }
			 this.shoppingcart_refresh();
	   },
	   editchanged(status)
	   {   
	       if (status)
		   {	
				 for (var i in this.shoppingcarts)
				 {
					 this.shoppingcarts[i].selected = false;  
				 } 
				 this.buttonLabel = "删除所选";
				 this.isedit = true;
		   } 
		   else
		   {
		   		this.buttonLabel = "立即结算";
				this.isedit = false;
		   
		   } 
		   this.shoppingcart_refresh(); 
	   },
	   onbuttonclicked()
	   {
	   		if (this.isedit)
			{ 
				 let ids = [];
				 let shoppingcarts = [];
				 for (var i in this.shoppingcarts)
				 {				 
				 	shoppingcarts.push(this.shoppingcarts[i]);
				 }
				 for (var i in shoppingcarts)
				 {
					 if (shoppingcarts[i].selected == true)
					 {
					     ids.push(shoppingcarts[i].id);	  
		   				 for (var j in this.shoppingcarts)
		   				 {
		   					 if (this.shoppingcarts[j].id == shoppingcarts[i].id)
		   					 { 					
		   					 	this.shoppingcarts.splice(j,1); 
		   					 } 
		   				 }
					 } 
				 }  
				 this.shoppingcart_refresh(); 
				 deleteshoppingcart(ids).then( res => {  
				       document.dispatchEvent(new Event('shoppingcartchanged'));
				 })
			}
			else
			{
				   var params = {from:'shoppingcart',ids:this.selectids};
				   this.$router.push({path:'/submitorder',query:params}); 
			}
	   
	   },
       mainbuttonclick () { 
		   this.$router.push('/index');
       },
       onloginclick () {  
           this.$router.push('/login');
       },

    }
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}

.wrapper {
    background-color: #fafafa;
}

.main-shoppingcart-list {
    position: fixed;
    top: 0px; 
    bottom: 90px;
    left: 0;
    right: 0; 
}

.slogan {
    position: fixed; 
    left: 0;
    right: 0;
    top: 74px;
	height: 80px;
    width: 750px; 
    flex-direction: row;
    flex-wrap: nowrap;
	background-color: #fef8d8;
    align-items: center;
    justify-content: space-between;
	z-index: 101;
}

.i-slg {
	flex: 1;
    height: 80px;
	line-height: 80px; 
    font-size: 30px;  
    text-align: left; 
	padding-left: 15px;
	color: #f0911d; 
}
.i-slg-text {
	flex: 1;
    height: 80px;
	line-height: 80px; 
    font-size: 30px;  
    text-align: left; 
	color: #f0911d; 
}
.i-slg-icon { 
	width: 50px;
    height: 80px;
	line-height: 80px; 
    font-size: 30px;  
    text-align: left; 
	color: #f0911d; 
}
.i-slg-link { 
	height: 80px;
	width: 180px;
	color: #f0911d; 
	align-items: center;
	justify-content: center;
	flex-direction: row;
}

.shop-cart {}

.carts {
    
}


.cart-empty {
    height: 750px;
	margin-top: 0px;
	align-items: center;
	justify-content: center;
}

.img-empty { 
    width: 230px;
    height: 230px;  
}

.txt-empty { 
    text-align: center;
    font-size: 30px;
    width: 750px; 
    color: #999999;
}
.login-title
{
	padding-top:80px;
    font-size: 38px;
    color: #847b76;
    font-weight: 700;
	text-align:center;
	padding-bottom:20px;
}
.button-wrapper{
	margin-top: 40px;
    align-items: center;
    justify-content: center;
} 

</style>