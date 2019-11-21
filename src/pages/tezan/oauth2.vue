<template>
    <div class="oauth2-wrapper"> 
		  <text class="indicator">{{message}}</text> 
    </div>
</template>
<style scoped>
.oauth2-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
	background-color: #fafafa; 
    align-items: center;
    justify-content: center;
} 
.iconfont {
    font-family: iconfont;
} 	 
.indicator {
    position: absolute;
    top: 210px;
    color: #888888;
    font-size: 30px; 
} 
</style>
<script> 
	import Vue from 'vue' 
	import base64 from '../../rest/base64' 
	import weixin from '../../rest/weixin'
    export default { 
        data () {
            return {
	             message:'正在进行微信身份认证,请稍候..',
			}
        },   
		mounted(){		
            var that = this;
			this.$notice.loading.show()  		 
			console.log('_______uri_____________'+base64.decode(this.$store.state.uri)); 
			console.log('______appid____________'+this.$store.state.appid);
			
			if (this.$store.state.mqid != '')
			{
				let mqid = this.$store.state.mqid; 
				weixin.checkmq(mqid).then(res => {   
					that.message = '恭喜您,认证成功!'; 
		   			that.$store.commit('profileid',res);  
	     	   		that.$store.commit('loginstatus',2);
					that.$notice.loading.hide();	
					this.$router.replace('/index/home'); 
				}, 
				function(error) { 
				    that.$notice.loading.hide();
					that.$store.commit('errormsg',error);
					that.$router.replace('/viewerrormsg');
				});
				
			}
			else
			{	
			    this.$notice.loading.hide();
				this.$store.commit('errormsg',"mqid为空!");
				this.$router.replace('/viewerrormsg');
			}
	    },
        methods: {
             
        }
    }
</script>