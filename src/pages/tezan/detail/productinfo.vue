<template>
     <div class="info-wrap">
	         <div class="main-group">
			   	<text class="name" >{{info.productname}}</text> 
				<div class="container-info">  
				    <text>&nbsp;</text>
			        <div class="shop-price"><text class="shop-price-money" v-if="info.hasproperty == 1">最低 </text><text class="shop-price-money">¥</text><text class="shop-price-label">{{info.shop_price|number_format}}</text></div>  
				</div> 
				<div class="container-info">  
				    <text class="postage-label">邮费: ¥{{info.postage|number_format}}</text>
			        <text class="salevolume-label">最近销量{{info.salevolume}}笔</text>
				</div>
			</div>
			
            <div class="info-group"> 
 	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">优惠</text>
						<text slot="title" class="cell-text">领劵至少可减¥20</text>
						<div slot="action" class="cell-action">  
							<text class="cell-action-label">领劵</text> 
 				 			<text class="cell-action-icon iconfont">&#xe672;</text> 
						</div>
 	            </mycell> 
 	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">活动</text>
						<text slot="title" class="cell-text">闲置回收,换新享优惠</text>
						<div slot="action" class="cell-action">  
							<text class="cell-action-label">参加活动</text> 
 				 			<text class="cell-action-icon iconfont">&#xe672;</text> 
						</div>
 	            </mycell>
            </div>
			
            <div class="info-group"> 
 	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">服务</text>
						<text slot="title" class="cell-text">退换货,正品保障</text>
						<div slot="action" class="cell-action">    
 				 			<text class="cell-action iconfont">&#xe672;</text> 
						</div>
 	            </mycell> 
 	            <mycell :cellStyle="{height:'110px'}" v-if="info.hasproperty == 1" @cellclick="showpopup=true;"> 
				        <text slot="label" class="cell-label">规格</text>
						<text slot="title" class="cell-text">{{selectpropertylabel}}</text>
						<div slot="action" class="cell-action">   
 				 			<text class="cell-action-icon iconfont">&#xe672;</text> 
						</div>
 	            </mycell>  
 	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">单价</text>
						<text slot="title" class="cell-text price">¥ {{ shop_price | number_format }}</text> 
						
 	            </mycell>
 	            <mycell :cellStyle="{height:'110px'}" v-if="info.hasproperty == 0"> 
				        <text slot="label" class="cell-label">库存</text>
						<text slot="title" class="cell-text price">{{ inventory }} {{ info.measurementunit }}</text> 
						
 	            </mycell>
 	            <mycell :cellStyle="{height:'110px'}" v-if="info.hasproperty == 1"> 
				        <text slot="label" class="cell-label">数量</text>
						<div slot="title" class="cell-text row"> 
							<text class="cell-text-label">× </text> 
							<text class="cell-text-label price"> {{quantity}}</text> 
						</div>
 	            </mycell>
 	            <mycell :cellStyle="{height:'110px'}" v-if="info.hasproperty == 0"> 
				        <text slot="label" class="cell-label">数量</text>
					    <stepper slot="title" class="cell-text" :default-value="quantity"
					                   step="1"
					                   :max="maxquantity"
					                   min="1"
									   :read-only=true
					                   @steppervaluechanged="steppervaluechanged"></stepper>
 	            </mycell>
 	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">总价</text>
						<text slot="title" class="cell-text price">¥ {{total_price | number_format}}</text> 
 	            </mycell> 
 	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">市价</text> 
						<div slot="title" class="cell-text row"> 
							<text class="cell-text-label price">¥ {{market_price | number_format}}</text> 
							<text class="cell-text-label">   已经为您节省 </text> 
							<text class="cell-text-label price">¥{{save_money | number_format}}</text> 
						</div>
 	            </mycell>
 	            <mycell :cellStyle="{height:'110px'}" > 
				        <text slot="label" class="cell-label">评价</text> 
						<text slot="title" class="cell-text">好评数量({{appraise}})</text>
						<div slot="action" class="cell-action">   
						    <text class="cell-action-label appraise-action price">{{appraiserate}}%好评率</text> 
 				 			<text class="cell-action-icon iconfont">&#xe672;</text> 
						</div>
 	            </mycell>
            </div> 
			
		    <div class="detail-info">   
				<text class="detail-info-label">------------  图文详情  ------------</text> 
			</div> 
			<html class="detail-content" :inner="detailcontent"></html>
			<text>&nbsp;</text> 
		    <am-popup :show.sync="showpopup" position="bottom"  width="750"  height="1000">
			       <div class="popup-productlogo">
		           		<image ref="popup-productimage" class="popup-productimage" resize="cover" :src="productlogo"></image>
				   </div> 
		   		   <div ref="addshoppingcart" class="popup-addshoppingcart" v-if="showthumbnail">
		   				<image  class="popup-productimage" resize="cover" :src="productlogo"></image> 
		   		   </div>
			   	   <div class="popup-close" @click="onclosepopupclick">
			   	        <text class="iconfont popup-close-icon" @click="onclosepopupclick">&#xe67a;</text> 
			   	   </div> 
			   	   <div class="popup-productinfo">
				   		<div class="popup-shop-price">
				   	        <text class="popup-shop-price-money">¥</text>
							<text class="popup-shop-price-label">{{shop_price|number_format}}</text>
						</div>
						<text class="popup-inventory">库存{{inventory}}{{ measurementunit }}</text>
						<text class="popup-selected">{{selectpropertylabel}}</text>
			   	   </div>
		          <scroller class="popup-container" offset-accuracy="300px">
				 	 	<div class="property_type" v-for="(item,index) in property_type">
					    	<propselect :title="item.key+':'" :items="item.items" @select="onselectclick($event,item.key)"  />
						</div> 
				   		<div class="popup-quantity-container">
				   	        <text class="popup-quantity-label">数量:</text>
    					    <stepper class="popup-quantity" :default-value="quantity"
    					                   step="1"
    					                   :max="maxquantity"
    					                   min="1"
    									   :read-only=true
    					                   @steppervaluechanged="steppervaluechanged"></stepper>
						</div>
		          </scroller>  
		  	     <popupfooter>    
		  		    <div class="popup-footer">
		  		         <div class="popup-button-wrap" :class="[disabled ? 'disabled' : '']" @click="onpopupaddshoppingcartclicked">
		  		          		<text class="popup-button-title" >加入购物车</text>
		  		         </div>
		  		  	     <div class="popup-border"></div> 
		  		         <div class="popup-button-wrap" :class="[disabled ? 'disabled' : '']" @click="onbuynowclicked">
		  		          		<text class="popup-button-title" >立即购买</text>
		  		         </div> 
		  			</div>
		  	    </popupfooter>
		   </am-popup>
     </div>
</template>
<script> 
 import Vue from 'vue'
 import stepper  from '../common/stepper.vue';
 import footer from '../common/footer.vue'  
 import Html from '../common/html.vue'
 import mycell from './mycell.vue'; 
 import {number_format} from '../../../rest/common'
 import popup from '../components/popup.vue'
 import propselect from '../components/propselect.vue'
 
 Vue.filter('number_format', function(value) {
     return number_format(value, 2, ".", ",");
 }) 
 const animation = weex.requireModule('animation');
 var bmevent = weex.requireModule('bmEvents'); 
 
export default {  
	components: { 
	    stepper,
		Html,
		mycell,
		'popupfooter':footer,
		'am-popup':popup,
		propselect,
	},
    props: {
	      info: {
	        default: {}
	      }, 
	     quantity: {
	         type: Number,
	         default: 1
	     },
		 maxquantity: {
	         type: Number,
	         default: 999
	     },
	     shop_price: {
	         type: Number,
	         default: 0
	     },
	     market_price: {
	         type: Number,
	         default: 0
	     },
	     inventory: {
	         type: Number,
	         default: 0
	     },
		 measurementunit:
		 {
	         type: String,
	         default: '件'
		 },
		 property_type:{
			 default: {}
		 },  
		 productlogo:
		 {
	         type: String,
	         default: ''
		 },
		 selectpropertylabel:
		 {
	         type: String,
	         default: ''
		 },
	     total_price: {
	         type: Number,
	         default: 0
	     }, 
	     save_money: {
	         type: Number,
	         default: 0
	     },
		 appraise : {
 	         type: Number,
 	         default: 0
		 },
		 appraiserate : {
 	         type: Number,
 	         default: 100
		 }, 
         disabled: {
           type: Boolean,
           default: false
         },
		 
    },  
    data() {
        return { 
		   showpopup:false,
		   showthumbnail: false, 
        }
    }, 
    computed: { 
	      detailcontent: function() { 
	        return this.info.description;
	      }, 
     },
     created() {    
 		var that = this; 
		var globalEvent = weex.requireModule('globalEvent');
		globalEvent.addEventListener("showdetailpopup", function(e) {
				that.showpopup = false; 
			 	that.showpopup = true; 
		});
     },
	 methods: {   
	 		onselectclick(event,property)
			{ 
				 event.property = property;
				 this.$emit('onselectclicked', event);
			},  
			steppervaluechanged(event)
			{    
				 this.$emit('steppervaluechanged', event);
			},
	 		onclosepopupclick()
			{  
				this.showpopup = false; 
			},
		    onbuynowclicked () 
			{
			    if (!this.disabled && this.quantity > 0 && this.inventory > 0)
				{
			      this.$emit('onbuynowclicked', { });
				}
		    },
			onpopupaddshoppingcartclicked()
			{
			    if (!this.disabled && this.quantity > 0 && this.inventory > 0)
				{
					var that = this;
					if(this.showthumbnail) return;
					that.showthumbnail = true;  
			        setTimeout(() => { 			 
		   	            animation.transition(that.$refs.addshoppingcart, {
		   	                   styles: {  
		   	                       transform: 'translate(20px, ' + 800 + 'px) scale(0.01)',
		   	                   }, 
		   	                   duration: 1000, 
		   	                   timingFunction: 'ease-in',
		   	                   delay: 50  
		   	               }, 
		   	   			  function () { 
			   	   	 			that.showthumbnail = false; 
								that.$emit('onpopupaddshoppingcartclicked', { }); 
			   	   	 	        animation.transition(that.$refs.addshoppingcart, {
			   	   	 	            styles: {
			   	   	 	                transform: 'translate(0,0)',
			   	   	 	            },
			   	   	 	            duration: 10, 
			   	   	 	            timingFunction: 'ease-out',
			   	   	 	            delay: 0  
			   	   	 	        });
		             	 });
			        }, 50); 
				} 
			}
	 },
}
</script>
<style scoped> 


.iconfont {
    font-family: iconfont;
} 
.info-wrap {
    position: absolute;
    top: 550px;
    left: 0;
    right: 0;
	width: 750px; 
    align-items: center; 
	background-color: #f8f8f8; 
}  
.main-group
{
	width: 750px; 
	background-color: #ffffff;
}
.name {
	width: 750px;
    align-items: center;
    justify-content: center;
	height: 80px; 
	padding-left:20px;
	line-height: 80px;
    font-size: 48px;
    color: #333333;
    font-weight: 700;
    overflow: hidden;
    lines: 1;
    
    text-overflow: ellipsis;
} 
.container-info {  
	height: 80px;
	width: 750px;  
    align-items: flex-end;
    justify-content: space-between;
	flex-direction: row;
	flex-wrap:nowrap;
    border-bottom-width: 1px;
    border-bottom-color: #dddddd;
}   
.shop-price {  
	height: 80px;  
	line-height: 80px;   
	text-align: right;
    align-items: flex-end;
    justify-content: center;
	flex-direction: row;
}
.shop-price-money {
	font-size: 28px;
	color: #ff7070;
	font-weight: 700;
	padding-bottom:10px;
}
.shop-price-label {
	font-size: 68px;
	color: #ff7070;
	font-weight: 700;
	padding-right:20px;
} 
.postage-label{
	font-size: 30px;
	color: #cccccc; 
	padding-left:50px;
	line-height: 80px;  
}
.salevolume-label{
	font-size: 30px;
	color: #cccccc; 
	padding-right:50px;
	line-height: 80px;  
}

.info-group
{
 	margin-top: 15px; 
	background-color: #ffffff; 
    align-items: center;
    justify-content: center;
}
.cell-action
{
	flex-direction: row;
    align-items: flex-end;
    justify-content: center;
}
.row
{
	flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.cell-label { 
	font-size: 30px;  
	width:80px;
	color:#888888;
	font-weight: 600;
}
.cell-action-label
{
	font-size: 30px;  
	width:120px;
	text-align: right;
	color:#cccccc; 
}
.cell-text{ 
	font-size: 30px;  
	width:500px;
	color:#555555; 
}
.cell-text-label
{ 
	font-size: 30px; 
	color:#555555; 
}
.cell-action-icon{ 
	font-size: 30px;   
	color:#333333; 
}
.appraise-action
{
	width:180px;
}

.price {
    color: #b4282d
} 

.detail-info {  
	height: 80px;
	width: 750px;  
	margin-top: 15px; 
    align-items: center;
    justify-content: center; 
    border-bottom-width: 1px;
    border-bottom-color: #dddddd;
}  
.detail-info-label {
	width: 750px;  
	height: 80px; 
	line-height: 80px; 
	font-size: 36px;
	color: #aaaaaa;
	font-weight: 700; 
	text-align: center; 
	background-color: #eaeaea;  
} 
.detail-content
{
 	width: 750px;   
} 


.popup-productlogo
{ 
	position: absolute;
    top: 20px;
    left: 20px; 
	width: 250px;
    height: 179px;   
    border-radius: 15px;  
    border-width: 1px;
    border-style: solid;
    border-color: #dddddd;
	box-shadow:2px  2px 2px black;
}

.popup-addshoppingcart
{ 
	position: absolute;
    top: 20px;
    left: 20px; 
	width: 250px;
    height: 179px;   
    border-radius: 15px;  
    border-width: 1px;
    border-style: solid;
    border-color: #dddddd; 
	z-index: 9999; 
}
.popup-productimage
{    
	width: 250px;
    height: 179px;   
}

.popup-close {
    position: absolute;
    right: 30px;
    top: 30px; 
  	width: 80px;
  	height: 80px;
  	opacity:0.8;
	z-index: 101; 
}
.popup-close-icon { 
  	width: 80px;
  	height: 80px;
  	font-size: 60px;    
    justify-content: center;  
  	opacity:0.8;
}

.popup-productinfo
{ 
	position: absolute;
    top: 0px;
    left: 20px; 
	width: 750px;
    height: 220px;   
    align-items: flex-start;
    justify-content: center; 
	padding-left:270px;
}
.popup-shop-price {  
	height: 80px;  
	line-height: 80px;   
	text-align: left;
    align-items: flex-end;
    justify-content: flex-start;
	flex-direction: row; 
}
.popup-shop-price-money {
	font-size: 28px;
	color: #ff7070;
	font-weight: 700;
	padding-bottom:10px;
}
.popup-shop-price-label {
	font-size: 68px;
	color: #ff7070;
	font-weight: 700; 
} 

.popup-inventory {
    width: 450px;
	font-size: 30px;
	color: #666666; 
	padding-bottom:10px;
} 
.popup-selected {
	width: 450px;
	font-size: 30px;
	color: #666666; 
} 
.popup-container
{
	position: absolute;
	width: 750px; 
	height: 680px;
	margin-top: 220px;   
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #dddddd;
}

.popup-quantity-container
{
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #dddddd; 
	flex-direction: row;
}

.popup-quantity-label
{ 
    font-family: sans-serif-medium;
    font-weight: 500;
    font-size: 32px;
    line-height: 32px;
	padding-left: 20px;
	padding-top: 40px;
}
.popup-quantity
{ 
	padding-top: 30px;
	padding-left: 20px;
}	 

	
.popup-footer
{
	width:750px;
	height: 100px;
  	align-items: center;
  	justify-content: space-between; 
	flex-direction: row;
} 
.popup-border {
  width: 2px;
  height: 100px;
  background-color: #dddddd;
} 
.popup-button-wrap { 
    flex:1;
	height: 100px;
    align-items: center;
    justify-content: center;
	background-color: #b4272d; 
} 
.popup-button-wrap:active {
   background-color: #eeeeee;
} 
.popup-button-title {
      font-size: 38px;
      color: #ffffff;
      font-weight: 700;
      background-color:transparent;
	  
} 
.disabled
{
	background-color: #cccccc;  
}
.disabled:active
{
	background-color: #cccccc;  
}
.property_type
{
	padding-left:20px;
}

</style>