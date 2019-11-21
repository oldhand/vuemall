<template>
    <div class="detail-wrapper">  
        <scroller class="main-detail-list" offset-accuracy="300px" @scroll="scroll"> 
			<image ref="productimage" class="detail-header-bg" resize="cover" :src="productinfo.productlogo"></image> 
			<div ref="addshoppingcart" class="addshoppingcart" v-if="showthumbnail">
				<image  class="productlogo" resize="cover" :src="productinfo.productlogo"></image> 
			</div>
		    <minibar :show="showminibar"></minibar>  
			<productinfo 
			     :info="productinfo" 
				 :property_type="property_type"
				 :shop_price="shop_price"
				 :market_price="market_price"
				 :total_price="total_price"
				 :save_money="save_money" 
				 :quantity="quantity"
				 :maxquantity="maxquantity"
				 :inventory="inventory"
				 :productlogo="productlogo"
				 :selectpropertylabel="selectpropertylabel"
				 :disabled="!selected"
				 @onselectclicked="onselectclick"
			     @steppervaluechanged="steppervaluechanged"
				 @onpopupaddshoppingcartclicked="onpopupaddshoppingcartclicked"
				 @onbuynowclicked="onbuynowclicked"></productinfo>
			<myfooter ref="myfooter" :shoppingcart="shoppingcart" @onaddshoppingcartclicked="onaddshoppingcartclicked" @onbuynowclicked="onbuynowclicked"></myfooter>
			<go-top @goTop="goTopHandler" :show="showGoTop"></go-top>
        </scroller>
		
    </div>
</template>
<script> 
import Vue from 'vue'
import minibar from './minibar.vue'; 
import myfooter from './myfooter.vue'  
import goTop from '../common/goTop.vue';
import productinfo from './productinfo.vue' 
import {product_info,get_product_info} from './config' 
import {get_profileid} from '../../../rest/profile'
import {addshoppingcart,get_shoppingcart_count,get_share_config} from '../../../rest/api'
import weixin from '../../../rest/weixin'

const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation');
 

export default {
    components: { 
	     minibar, 
		 productinfo,
		 myfooter,
		 goTop,
    },
     
    mounted() {   
		console.log('__detail___param________' + JSON.stringify(this.$route.query)); 
	    if (this.$route.query)
		{  
		   var param = this.$route.query; 
		   if (param.productid && param.productid != '')
		   { 
			   this.productid = param.productid; 
			   get_product_info(this.productid).then(mall_product_info => {  
			      this.productinfo = mall_product_info; 
				  console.log('mall_product_info : ' + JSON.stringify(mall_product_info));  
				  console.log('_____property_type__________' + JSON.stringify(mall_product_info.optional_property)); 
				  this.selectpropertylabel = '可选: '+ mall_product_info.optional_property.join(','); 
				  this.productlogo = mall_product_info.productlogo;
				  this.hasproperty  = mall_product_info.hasproperty;
				  if (this.hasproperty == '1')
				  {
					  this.property_type = mall_product_info.property_type;
					  this.propertys = mall_product_info.propertys;
					  this.shop_price = 0;
					  this.market_price = 0;
					  this.inventorys = mall_product_info.inventorys;
					  this.inventory = 0;
					  this.total_price = 0;
					  this.save_money = 0;
					  this.propertyid = '';
					  this.selected = false;
				  }
				  else
				  {
					  this.property_type = mall_product_info.property_type;
					  this.propertys = mall_product_info.propertys;
					  this.shop_price = mall_product_info.shop_price;
					  this.market_price = mall_product_info.market_price;
					  this.inventorys = {};
					  this.inventory = mall_product_info.inventory;
					  this.maxquantity = this.inventory;
					  this.total_price = this.shop_price * this.quantity;
					  this.save_money = (this.market_price - this.shop_price) * this.quantity;
					  this.selected = true;
				  }  
				    var that = this;
				    get_share_config().then(res => {
		  				var link = window.location.href.split('#')[0]; 
		  				var url = '/detail?productid='+that.productid;
		  				link = link + "oauth2.php?a=" + that.$store.state.appid + "&p=" + that.$store.state.profileid + "&u=" + btoa(url);
						res.share_title = that.productinfo.productname;
						res.share_description = that.productinfo.simple_desc;
						res.share_link = link;
						weixin.share(res,function() {
							console.log('__________share___________okokokokok____________');   
							 
						});
					});
					
			   });
		    	
		   }
		   else
		   {
		   
		   } 
	    }
		get_profileid().then(profileid => { 
		    this.logined = true;
	 	    get_shoppingcart_count().then(res => {  
	 			this.shoppingcart = Number(res); 
	 	    });
		},
		function(error) {	
			this.logined = false;		
			this.shoppingcart = 0; 
		});  
	  
    },
    data() {
        return {
		   productid: 0,
		   shoppingcart: 0,
		   productinfo : {}, 
		   showGoTop: false,
		   showminibar: true,
		   showthumbnail: false, 
		   logined:false,
		   quantity:1,
		   maxquantity:999,
		   selectpropertylabel:'',
		   hasproperty:0,
		   productlogo:'',
		   property_type:{},
		   propertys:{},
		   propertyid:'',
		   shop_price:0,
		   market_price:0,
		   inventory:0,
		   inventorys:{},
		   total_price:0,
		   save_money:0,
		   selected:false, 
        }
    },
    methods: {  
        scroll (e) { 
            const referenceValue = 1200
            const offsetY = Math.abs(Number(e.contentOffset.y))
            if (!this.showGoTop && offsetY > referenceValue) {
                this.showGoTop = true;
				this.showminibar = false;
            }
            if (this.showGoTop && offsetY < referenceValue) {
                this.showGoTop = false;
				this.showminibar = true;
            }  
        }, 
		onpopupaddshoppingcartclicked()
		{
		    console.log('____onpopupaddshoppingcartclicked________' + this.selected + '_________' );  
			if (this.selected)
			{
				if (this.logined)
				{
					var that = this; 
					addshoppingcart(String(this.productid),this.propertyid,this.quantity).then(res => {
					    
					});
					that.shoppingcart = that.shoppingcart + 1;
					Vue.prototype.$storage.deleteSync('shoppingcart_count');
				}
			}
		},
		onaddshoppingcartclicked () { 
		   console.log('____onaddshoppingcartclicked________' + this.selected + '_________' );  
			if (this.selected)
			{
				if (this.logined && this.quantity > 0 && this.inventory > 0)  
				{
					var that = this;
					if(this.showthumbnail) return;
					that.showthumbnail = true; 
					addshoppingcart(String(this.productid),this.propertyid,this.quantity).then(res => {
					    
					});
					Vue.prototype.$storage.deleteSync('shoppingcart_count');
				    setTimeout(() => {
				        dom.getComponentRect(this.$refs.myfooter, option => { 
						    var top = option.size.bottom;	  			 
				            animation.transition(that.$refs.addshoppingcart, {
				                   styles: {  
				                       transform: 'translate(-250px, ' + (top - 280) + 'px) scale(0.01)',
				                   }, 
				                   duration: 1000, 
				                   timingFunction: 'ease-in',
				                   delay: 50  
				               }, 
				   			function () { 
				   	 			that.showthumbnail = false; 
								that.shoppingcart = that.shoppingcart + 1;
				   	 	        animation.transition(that.$refs.addshoppingcart, {
				   	 	            styles: {
				   	 	                transform: 'translate(0,0)',
				   	 	            },
				   	 	            duration: 10, 
				   	 	            timingFunction: 'ease-out',
				   	 	            delay: 0  
				   	 	        });
			          	 	});
				         });
				    },50);			        
				} 
			}
			else
			{   
		        document.dispatchEvent(new Event('showdetailpopup'));
			}
			
		},
		onbuynowclicked () {
			if (!this.selected)
			{ 
				 document.dispatchEvent(new Event('showdetailpopup'));
		    }
		    else
		    {
			 	 if (this.logined && this.quantity > 0 && this.inventory > 0)  
				 {
				   var params = {from:'detail',productid:this.productid,propertyid:this.propertyid,quantity:this.quantity};
				   this.$router.push({path:'/submitorder',query:params}); 
				 }
			  
		    } 
		},
		compare(array1, array2) 
		{
			if (Array.isArray(array1) && Array.isArray(array2))
			{
				 return  (array1.length == array2.length) && array1.every(function(element, index) { return element === array2[index]; });
			}
			else if (array1 == array2)
			{
				return true;
			}
			return false;
		},
 		onselectclick(event)
		{    
			 var selectpropertys = [];
			 var selectpropertyids = [];
			 var selected = true;
			 for (var groupkey in this.property_type) 
			 {
			     var groupkey_info = this.property_type[groupkey];  
				 var groupselected = false;
   				 for (var propertykey in groupkey_info.items) 
   				 {
   				     var propertys_info = groupkey_info.items[propertykey];  
					 if (propertys_info.selected)
					 {
					 	selectpropertys.push(propertys_info.title);
						selectpropertyids.push(propertys_info.key);
						groupselected = true;
					 } 
   				 } 
				 if (!groupselected)
				 {
				 	selected = false;
				 }
			 }  
	         this.selectpropertylabel = '已选: '+ selectpropertys.join(',');   
			 console.log('___'+this.selectpropertylabel+'______');
			 if (selected)
			 {  
			 	 if (this.logined)
				 {
				 	this.selected = true;
				 } 
			 	 selectpropertyids = selectpropertyids.sort(); 
				 var find = false;
   				 for (var i in this.propertys) 
   				 {
				 	var property_info = this.propertys[i];  
					//console.log('__________' + JSON.stringify(property_info.propertyids) + '________' + JSON.stringify(selectpropertyids) ); 
					if (this.compare(selectpropertyids,property_info.propertyids))
					{ 
						find = true;
						this.shop_price = property_info.shop_price;
						this.market_price = property_info.market_price;
						this.total_price = this.shop_price * this.quantity;
						this.save_money = (this.market_price - this.shop_price) * this.quantity;
						if (property_info.imgurl && property_info.imgurl != '')
						{
							this.productlogo = property_info.imgurl;
						} 
						console.log('____select_property_info________' + JSON.stringify(property_info) ); 
						console.log('____inventorys________' + JSON.stringify(this.inventorys) );
						var inventory = this.inventorys[property_info.id];
						this.propertyid = property_info.id;
					    if (inventory > 0)
						{
						    this.inventory = inventory;
							if (this.quantity > this.inventory )
							{
								this.quantity = this.inventory; 
							}
							if (this.inventory > 999)
							{
								this.maxquantity = 999;
							}
							else
							{
								this.maxquantity = this.inventory;
							} 
						} 
						else
						{
							this.inventory  = 0;
							this.maxquantity = 0;
							this.quantity = 0;
						} 
						break;
					} 
				 }
				 if (!find)
				 {
					 this.selected = false;
					 this.inventory  = 0;
					 this.maxquantity = 0;
					 this.quantity = 0;
					 this.$notice.toast({ message: '商品数据异常，请联系管理员进行修复!' });
				 }
			 } 
		}, 
 	   steppervaluechanged(event)
 	   {    
	   		console.log('onselectclick : ____steppervaluechanged________' + JSON.stringify(event) );  
 			this.quantity = event.value; 
			this.total_price = this.shop_price * this.quantity;
			this.save_money = (this.market_price - this.shop_price) * this.quantity;
 	   },
        goTopHandler () {
		    const dom = weex.requireModule('dom')
            dom.scrollToElement(this.$refs.productimage, { offset: 0 });
			this.showGoTop = false;
			this.showminibar = true;
        },
    }
}
</script>
<style scoped>
  .iconfont {
      font-family: iconfont;
  }

  .detail-wrapper {
      background-color: #fafafa;
    
      flex-wrap: nowrap;
      flex-direction: row;
  } 
  .main-detail-list {  
      background-color: #fafafa;
      position: fixed;
      top: 0px; 
      bottom: 90px;
      left: 0;
      right: 0;
  }
  .minibar { 
  	position: absolute;
      margin-top: 60px;  
  	z-index: 101; 
  }
  .detail-header-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
  	  width: 750px;
      height: 550px;
  	  z-index: 100; 
      border-bottom-width: 1px;
      border-bottom-color: #dddddd;
  }


  .addshoppingcart {
      position: fixed;
      top: 150px;
      left: 250px;
      right: 250px;
      width: 250px;
      height: 179px;  
	  z-index: 9999;  
  }

  .productlogo { 
  	width: 250px;
      height: 179px;   
  }
</style>
 