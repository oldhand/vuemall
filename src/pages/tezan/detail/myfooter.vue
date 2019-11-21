<template>
  <myfooter :backgroundColor="backgroundColor">  
	  <div class="icon" v-if="logined && collection" @click="oncollectionclicked">
	    <text class="button-title iconfont" :style="{'color':'#dfbd84'}">&#xe615;</text> 
	  </div>
	  <div class="icon" v-if="logined && !collection" @click="oncollectionclicked">
	    <text class="button-title iconfont" >&#xe618;</text> 
	  </div> 
	  <div class="footer-border" v-if="logined"></div>
	  <div class="icon" v-if="logined" @click="onshoppingcartclick">
	    <text class="button-title iconfont" >&#xe61f;</text>
		<text class="i-notice" v-if="shoppingcart > 0">{{shoppingcart}}</text>
	  </div>  
	  <div class="footer-border" v-if="logined"></div>
      <div class="button-wrap" v-if="logined" @click="onaddshoppingcartclick">
        <text class="button-title" >加入购物车</text>
      </div> 
      <div class="footer-border" v-if="logined"></div>
      <div class="button-wrap button-color" v-if="logined" @click="onbuynowclick">
        <text class="button-title white-color" >立即购买</text>
      </div> 
      <div class="button-wrap login-color" v-if="!logined" @click="onloginclick">
        <text class="button-title white-color" >去登录</text>
      </div>
  </myfooter>
</template>

<style scoped>
  .iconfont {
	font-family: iconfont;
  } 
  .button-wrap {
    flex: 1;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
  .icon {
    width: 100px;
    height: 100px; 
    align-items: center;
    justify-content: center;
  }
  .icon:active {
    background-color: #eeeeee;
  }
  .i-notice{
	  font-size: 20px;
	  position: absolute;
	  top:13px;
	  right: 13px;
	  height: 30px;
	  width: 30px;
	  border-radius: 100%; 
	  line-height: 30px;
	  text-align: center;
	  color: #ffffff;
	  background-color: #ff0000;
  }
  .footer-border {
    width: 2px;
    height: 100px;
    background-color: #dddddd;
  }

  .button-wrap:active {
    background-color: #eeeeee;
  }

  .button-title {
    font-size: 38px;
    color: #999999;
    font-weight: 700;
	background-color:transparent;
  }
  .button-color { 
  	background-color: #b4272d;
  }
  .login-color { 
  	background-color: green;
  }
  .white-color { 
  	 color: #ffffff;
  }
</style>

<script>
import footer from '../common/footer.vue';
import {get_profileid} from '../../../rest/profile'

import {check_product_collection_info,update_product_collection_info} from './config' 

export default { 
  components: { 'myfooter':footer },
  props: { 
    shoppingcart: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    }, 
  },
  data() {
      return { 
	     logined:false,
		 collection:false,
		 productid:'',
		 profileid:'',
      }
  },
  mounted() {  
	get_profileid().then(profileid => { 
	    this.logined = true; 
		console.log('__detail___param________' + JSON.stringify(this.$route.query)); 
	    if (this.$route.query)
		{  
		   var param = this.$route.query;
		   if (param.productid && param.productid != '')
		   {
			    this.productid = param.productid; 
				this.profileid = profileid; 
			    check_product_collection_info(profileid,param.productid).then(collection => {  
					this.collection = collection;
				});
			}
		};
	},
	function(error) {	
		this.logined = false;	 
	});   
  },
  methods: { 
	oncollectionclicked()
	{
		this.collection = !this.collection;  
 		if (this.productid != '' && this.profileid != '')
 		{ 
		    update_product_collection_info(this.profileid,this.productid,this.collection); 
		} 
	},
    onaddshoppingcartclick () {
      this.$emit('onaddshoppingcartclicked', { });
    },
	onshoppingcartclick()
	{ 
		this.$router.push('/index/shoppingcart');  
	},
    onloginclick () {
     	this.$router.push('/login'); 
    },
    onbuynowclick () {
        this.$emit('onbuynowclicked', { });
    }
  }
};
</script>
