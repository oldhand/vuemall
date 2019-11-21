<template>
      <div class="wrapper">
	     <div class="setup">  
            <mycell label="消息推送" > 
				  <myswitch :value="push_status" @wxchange="onpushchange" /> 
            </mycell> 
			<!--
            <mycell label="清除缓存" >
                <text slot="action" class="iconfont cache">196.MB</text>  
				<text slot="action" class="iconfont">&#xe672;</text>
            </mycell>-->
		</div> 
	     <div class="about">  
		    <!--
            <mycell label="客服" @click.native="onopenclick('customservice','客服')">
                 <text slot="action" class="iconfont">&#xe672;</text> 
            </mycell> 
			-->
            <mycell label="联系我们" @click.native="onopenclick('contactus','联系我们')">
                 <text slot="action" class="iconfont">&#xe672;</text> 
            </mycell>
		</div>
	     <div class="about">  
		    <!--
            <mycell label="帮助中心" @click.native="onopenclick('help','帮助中心')">
                 <text slot="action" class="iconfont">&#xe672;</text> 
            </mycell>-->
            <mycell label="意见反馈" @click.native="onopenclick('feedback','意见反馈')">
                 <text slot="action" class="iconfont">&#xe672;</text> 
            </mycell>
            <mycell label="关于平台" @click.native="onopenclick('about','关于平台')">
                 <text slot="action" class="iconfont">&#xe672;</text> 
            </mycell> 
		</div>
		<!--
	     <div class="logout-wrapper">    
            <div class="logout" @click="onlogoutclick">
                <text class="logout-txt">退出登录</text>
            </div>
		</div>
		-->
    </div>
</template> 

<script>
	import Vue from 'vue'
	import mycell from '../common/mycell.vue';
	import myswitch from '../common/switch.vue'; 
	import {get_push_status,update_push_status} from '../../../rest/profile'  
	
    export default {
	    components: {
	        mycell, 
			myswitch,
	    },  
	    data() {
	        return { 
	            push_status:false, 
	        }
	    },
		created() {    
		        var that = this; 
				get_push_status().then(res => {   
				     that.push_status = res;  
				});
		},
        methods: {
            onlogoutclick() {
				Vue.prototype.$storage.deleteSync('profileid'); 
				Vue.prototype.$storage.deleteSync('shoppingcart_count');   
		   	    this.$router.push('/index/usercenter');
            },
		    onopenclick(router,name) { 
			   this.$router.push('/'+router); 
		    },
			onpushchange(event)
			{ 
				if (this.push_status != event) 
				{
					console.log('_____update_push_status___' + event + '_______'+this.push_status+'_______');  
					this.push_status = event;
					update_push_status(event);
				}
				
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
	.login-title
	{
	    font-size: 38px;
	    color: #847b76;
	    font-weight: 700;
		text-align:center;
		padding-bottom:20px;
	}
    .setup{
        margin-top: 10px;
    }
    .about{
        margin-top: 10px;
    }
    .logout-wrapper{ 
        margin-top: 40px;
	    align-items: center;
	    justify-content: center;
    }
    .logout {
        height: 100px;
        width: 750px;
        background-color: #ffffff;  
    }
    .logout:active {
      background-color: #eeeeee;
    }
    .logout-txt{
        height: 100px; 
        text-align: center;
        line-height: 100px;
        color: #333333;
        font-size: 35px;
    }
	.cache {
	    color: #b4282d;
		padding-right:10px;
	}
	 
</style>