<template>
    <div class="wrapper"> 
        <div class="gb-box">
            <div class="i-gd" v-for="(i,index) in products">
                <div class="gd-bg" @click="showdetail(i.productid)">
                    <lazyimage :width=270 :height=193 :src="i.productlogo" :index="index" :limit=10></lazyimage>
                </div> 
                <text class="gd-tlt">{{i.productname}}</text>
				<div :ref="'shoppingcart_'+i.productid" class="gd-txt-info" @click="onaddshoppingcartclick(i.productid,i.productlogo)">
	                <text class="gd-price">¥{{i.shop_price}}</text>
					<text class="shoppingcart-icon iconfont" v-if="logined && i.hasproperty === 0">&#xe62f;</text>  
				</div>
            </div>
        </div>
		<div ref="addshoppingcart" class="addshoppingcart" v-if="showthumbnail">
			<image class="productlogo" resize="cover" :src="productlogo"></image> 
		</div>
    </div>
</template>
<script>
var event = weex.requireModule('bmEvents');
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation');

import {addshoppingcart} from '../../../rest/api' 
import {get_profileid} from '../../../rest/profile' 
import lazyimage from '../common/lazyimage.vue'; 

export default {
    props: ["products"], 
    components: { 
		 lazyimage,
    },
    data() {
        return {  
 		   showthumbnail: false,
		   productlogo: "",
		   logined:false,
        }
    },
	mounted(){   
		get_profileid().then(profileid => { 
		    this.logined = true;
		}); 
	},
    methods: {
	    showdetail(productid) {  
			 this.$router.push({path:'/detail',query:{from:'category',productid: productid}});
	    },   
	    onaddshoppingcartclick (productid,productlogo) {  
		  if(!this.logined) return;
		  if(this.showthumbnail) return;
		  this.showthumbnail = true; 
		  var divid = 'shoppingcart_'+productid; 
		  var refid = this.$refs[divid][0];
          var that = this;  
		  dom.getComponentRect( refid, option => {  
		      var top = option.size.top - 240;
			  var left = option.size.left; 
		        animation.transition(that.$refs.addshoppingcart, {
		            styles: {
		                transform: 'translate(' + left + 'px, ' + top + 'px)',
		            },
		            duration: 0,  
		            delay: 0  
		        },
				function () {  
					that.productlogo = productlogo;
		  		    dom.getComponentRect('viewport', option => {  			 
		                 var height = option.size.height;
		   	             animation.transition(that.$refs.addshoppingcart, {
		   	                   styles: {  
		   	                       transform: 'translate(300px, ' + (height - 150) + 'px) scale(0.01)',
		   	                   }, 
		   	                   duration: 1000, 
		   	                   timingFunction: 'ease-in',
		   	                   delay: 50  
		   	               }, 
		   	   			function () { 
		   	   	 			that.showthumbnail = false;  
							that.productlogo = "";
		   	   	 	        animation.transition(that.$refs.addshoppingcart, {
		   	   	 	            styles: {
		   	   	 	                transform: 'translate(0,0)',
		   	   	 	            },
		   	   	 	            duration: 0, 
		   	   	 	            timingFunction: 'ease-out',
		   	   	 	            delay: 0  
		   	   	 	        });
		             	});
		            }); 
				});
		  });  
 		 addshoppingcart(String(productid),"",1).then( res => {  
 			Vue.prototype.$storage.deleteSync('shoppingcart_count');    
	        document.dispatchEvent(new Event('shoppingcart'));
 		 }); 
	    }, 
    }
}
</script> 
<style scoped>
.iconfont {
    font-family: iconfont;
}

.wrapper {
    background-color: #ffffff; 
    padding-top: 10px; 
    width: 588px;
}

.tlt {
    text-align: center;
    color: #333333;
    width: 750px;
    padding: 10px;
    font-size: 30px;
}

.gb-box {
    padding: 16px;
    
	width: 588px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.i-gd {
    width: 270px;
    height: 290px; 
}

.gd-bg {
    background-color: #f4f4f4;
}

.gd-img {
    width: 270px;
    height: 193px;
}

.gd-tlt {
    font-size: 28px;
    color: #333333;
    width: 270px;
    margin-top: 15px;
    overflow: hidden;
    lines: 1;
    
    text-overflow: ellipsis;
} 
 
.gd-txt-info {
    align-items: center;
    justify-content: space-between; 
	flex-direction: row;  
    margin-top: 5px;
}
.gd-price {
    font-size: 32px;
    width: 200px;
	height: 60px;    
    color: #b4282d;
    overflow: hidden;
    lines: 1;
    
    text-overflow: ellipsis;  
}

.shoppingcart-icon {
    font-size: 38px;
    width: 60px;
	height: 60px;    
    color: #b4282d;
	text-align: right;  
}

.addshoppingcart {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 270px;
    height: 193px;
}

.productlogo { 
    width: 270px;
    height: 193px;  
}
</style>