<template>
    <div class="wrapper">
	    <div class="close" @click="oncloseclick">
	        <text class="iconfont close-icon" >&#xe67a;</text> 
	    </div>
        <div class="login">
		    <text class="login-title">登录后，享有更多的功能</text>
            <div class="input-wrapper">
                <input class="input" type="number" maxlength="11" placeholder="请输入手机号"  v-model="mobile" :disabled="lockmobile"/> 
				<text class="iconfont input-icon" >&#xe67e;</text> 
            </div>
            <div class="input-wrapper" v-if="verifiymethod === 0">
                <input class="input" type="password" maxlength="20" placeholder="请输入密码" v-model="password" />
                <text class="iconfont password-icon" >&#xe67f;</text> 
            </div>
			
            <div class="input-wrapper" v-else>
                <input class="input" type="number" maxlength="6" placeholder="请输入验证码" v-model="verifycode" />
                <text class="iconfont password-icon" >&#xe67b;</text> 
				<text class="getverifiycode" :style="{color:verifybuttoncolor}" @click="onsendverifycode">{{verifybuttontext}}</text> 
            </div>
			
            <div class="verifiy-method-wrapper"> 
                <text class="verifiy-method" @click="onverifiymethodclick">使用{{verifiymethodlabel}}登录</text>
            </div>
			
			 <div class="button-wrapper">
				 <am-button :width="550" :disabled="loginbutton" text="登录" type="theme" @click.native="onloginclick"></am-button>
			 </div>
			  
            <div class="register-wrapper"> 
                <text class="input-register" @click="onregisterclick">手机号注册</text>
            </div>


			<div class="separate-wrapper">
					<text class="line">________</text>
					<text class="otherlogin">社交账号登录</text>
					<text class="line">________</text>
            </div>
			
			
			 
             <div class="third_login">
                 <text class="iconfont login-icon" @click="onweixinloginclick">&#xe636;</text> 
             </div>
        </div>  
    </div>
</template>
 
<script>
	import Vue from 'vue'
	import button from '../components/button.vue'  
	
	import {number_format,gettimestamp,random} from '../../../rest/common.js'  
	import {send}  from  '../../../rest/sendmobile.js'  
	import {get_mq_info} from '../../../rest/api.js' 
	import {sign,get_mobile_profile_info,weixinlogin,weixin_check_login,login} from '../../../rest/profile.js'
	import {umKey,appKey,appSecret} from '../../../rest/env'
	
export default {
	    components: {   
			 'am-button':button,  
	    },  
        data(){
           return {
			    verifiymethod:0, 
				verifiymethodlabel:'短信验证码', 
				mobile:'', 
				password:'',  
				verifycode:'',
				sendmobile:'',
				looptime:0,
			    lockmobile:false, 
			    verifybuttoncolor:'#ccc', 
			    verifybuttontext:'发送验证码',
			    verifybutton:false,
			    loginbutton:false, 
			    sendcode:'',
				profileid:'',
				loginkey:0,
			}
        },
		mounted() {   
 			Vue.prototype.$storage.get('mobile').then(mobile => { 
 				this.mobile = mobile;
				console.log('_____login__________'+this.mobile+'______________');   
 			});
			this.loginkey = random(123456,999999);
	    },
	    watch: {
	      mobile (val) { 
		    var that = this; 
		  	if (this.mobile.length == 11)
			{
				 get_mobile_profile_info(this.mobile).then(profile_info => {  
   					 this.verifybuttoncolor = '#333';
   					 this.verifybutton = true;
				 },
				 function(error) { 
					 console.log('_____login__________'+error+'______________');
					 that.$notice.toast({ message: that.mobile+'还没有注册,请先进行注册!'}); 
 					 that.verifybuttoncolor = '#ccc';
 					 that.verifybutton = false;
				}); 
			}
			else
			{
				this.verifybuttoncolor = '#ccc';
				this.verifybutton = false; 
				this.loginbutton = false;
			} 
			this.verifycode = '';
			this.verifyloginbutton(); 
	      }, 
	      verifycode (val) {
		  	if (this.verifycode.length == 6)
			{ 
				this.loginbutton = false;
			}
			else
			{ 
				this.loginbutton = true;
			} 
			this.verifyloginbutton();
	      },
	    },
        methods:{
            oncloseclick(){
			    const Navigator = weex.requireModule('navigator');
		        Navigator.pop({}, e => { });
            },
            onloginclick() { 
				var that = this; 
				console.log('_____login_______'+this.mobile+'______'+this.password+'__________');  
				if (this.mobile.length == 0)
				{
					this.$notice.toast({ message: '手机号码必填!' }); 
					return;
				}
				if (this.mobile.length != 11)
				{ 
					this.$notice.toast({ message: '请输入正确的手机号码!' }); 
					return;
				}
				if (this.verifiymethod == 0)
				{
					if (this.password.length == 0)
					{ 
						this.$notice.toast({ message: '密码必填!' }); 
						return;
					}
					if (this.password.length < 5)
					{ 
						this.$notice.toast({ message: '请输入正确的密码!' }); 
						return;
					}
					sign(this.mobile,this.password).then(res => {      
						  console.log('sign : ' + JSON.stringify(res));  
						  if (res.ok && res.ok == 'Sign is successful.')
						  { 
						  	   login(res.profileid).then(res => {  
							   	    this.$router.push('/index/usercenter'); 
								});
						  }
						  else
						  {
						  	  that.$notice.toast({ message: '登录失败！' }); 
						  }
					}, 
					function(error) {			
						that.$notice.toast({ message: error }); 
					});
				}
				else
				{
					if (this.verifycode.length == 0)
					{ 
						this.$notice.toast({ message: '验证码必填!' }); 
						return;
					}
					if (this.verifycode.length != 6)
					{ 
						this.$notice.toast({ message: '请输入正确的验证码!' }); 
						return;
					}
					if (this.verifycode == this.sendcode && this.profileid != '')
					{
				  	   login(this.profileid).then(res => {  
					   	  this.$router.push('/index/usercenter');
						}); 
					}
					else
					{
						that.$notice.toast({ message: '验证码输入错误！' }); 
					}
				}
				
            }, 
			onregisterclick()
			{
				 this.$router.push('/register');  
			},
			verifyloginbutton()
			{
				if (this.verifiymethod === 0)
				{ 
					if (this.mobile.length == 11)
					{
						this.loginbutton = false; 
					}
					else
					{
						this.loginbutton = true;
					}
				}
				else
				{  
					if (this.verifycode.length == 6 && this.mobile.length == 11)
					{
						this.loginbutton = false;
					}
					else
					{
						this.loginbutton = true;
					}
				}
			},
			onverifiymethodclick()
			{
				if (this.verifiymethod === 0)
				{
					this.verifiymethod = 1;
					this.verifiymethodlabel = '密码'; 
				}
				else
				{
					this.verifiymethod = 0;
					this.verifiymethodlabel = '短信验证码';  
				}
				this.verifyloginbutton();
			},
 		    onsendverifycode()
			{ 
				 var that = this;
				 get_mobile_profile_info(this.mobile).then(profile_info => {  
						that.profileid = profile_info.id;
		 				if (this.verifybutton)
		 				{
		 					 this.lockmobile = true;
		 					 this.verifybutton = false;  
		 					 var nowtimestamp = gettimestamp();   
		 					 this.sendcode = random(123456,999999);
		 					 var key =  Math.floor(nowtimestamp / 2);
		 					 var params = {};
		 					 params.mobile = this.mobile;
		 					 params.sendcode = this.sendcode; 
		 					 params.key = key; 
		 					 this.sendmobile = this.mobile;
							 that.verifybuttontext = '正在发送';
		 					 send(params).then(res => {  
		 					     console.log('____________send_verifycode_________' + JSON.stringify(res));  
		 						 that.load_mq_info(res.id);
		 					 },
		 					 function(error) { 
		 					  	 console.log('________error_____'+error+'____');
		 						 that.$notice.toast({ message: error}); 
		 						 that.lockmobile = false;
		 						 that.verifybutton = true;
		 					 }); 
		 				}
				 },
				 function(error) { 
				  	 console.log('________error_____'+error+'____');
					 that.$notice.toast({ message: error});  
					 that.lockmobile = false;
					 that.verifybutton = true;
					 that.profileid = '';
				 }); 
				
				
			},
			load_mq_info(mqid)
			{
				var that = this;  
				get_mq_info(mqid,'sendmobile').then(res => {  
				    console.log('____________send_verifycode_________' + JSON.stringify(res));  
					if (res.my.ack == 1)
					{ 
	   					 that.verifybuttontext = '发送成功';
	   					 that.verifybuttoncolor = '#ccc';
	   					 that.looptime = 120;
	   					 that.lockverifycode = false;
	   			         setTimeout(() => { that.loopverifycode(); }, 1000);
    		  	 	   
					}
					else if (res.my.ack == 2)
					{   
					 	that.$notice.toast({ message: res.my.result});    
						that.lockmobile = false;
					 	that.verifybutton = true; 
						that.verifybuttontext = '发送验证码';
					}
					else
					{
				       setTimeout(() => {
				          that.load_mq_info(mqid);
				        }, 1000);
					}
			         
				},
				function(error) { 
					that.$notice.toast({ message: error});    
					that.lockmobile = false;
				 	that.verifybutton = true;
				});
			},
		    loopverifycode()
			{
				var that = this;
				this.looptime = this.looptime - 1;
			 	this.verifybuttontext = this.looptime +'秒';
				if (this.looptime > 0)
				{
			         setTimeout(() => { that.loopverifycode(); }, 1000);
				}
				else
				{
					 this.lockmobile = false;
					 this.verifybutton = true;
					 this.verifybuttontext = '发送验证码',
					 this.verifybuttoncolor = '#333';
				}
			},
			onweixinloginclick()
			{
				var that = this; 
				var bmWXShare = weex.requireModule('bmWXShare');
				if (!bmWXShare.isInstallWXApp())
				{ 
					this.$notice.toast({ message: '没有检测到微信,不能使用微信登录!'});    
					return;
				}  
				
				bmWXShare.initUM(umKey); 
				 
			    bmWXShare.initWX({
			       appKey: appKey, // 微信开发平台申请的appkey
			       appSecret: appSecret, // appKey对应的appSecret，
			       redirectURL: 'login' // 授权回调页面
			     });  
				 
				 bmWXShare.authLogin(function(res){    
				    // 授权结果，成功的话会将所有的userInfo返回  
					if (res.status == 0)
					{
		   					var userInfo = res.data;
		   					var info = {};
		   					info.unionid = userInfo.unionid;
		   					info.openid = userInfo.openid;
		   					info.name = userInfo.name;
		   					info.country = userInfo.country;
		   					info.province = userInfo.province;
		   					info.city = userInfo.city;
		   					info.gender = userInfo.gender;
		   					info.iconurl = userInfo.iconurl;
							 
						    weixin_check_login(info).then(profileid => { 
								this.$notice.loading.hide();
								Vue.prototype.$storage.setSync('profileid',profileid);
						   	    that.$router.open({
						   	        name: "eros",
						   			params: 'usercenter', 
						   	    });
			 				},
			 				function(error) {  
   		 					    var nowtimestamp = gettimestamp();    
								info.key = nowtimestamp; 
								info.record = String(that.loginkey);
							    weixinlogin(info).then(res => { 
   		 					    	 console.log('____________weixinlogin_________' + JSON.stringify(res)); 
   		 						 	 that.load_weixinlogin_info(res.id);
								},
								function(error) {
									 console.log('________error_________' + JSON.stringify(error)); 
		 							 that.$notice.toast({ message: error});    
								});
			 					  
			 				});
					 } 
					 else
					 {     
					 	 	//that.$notice.alert({ message: JSON.stringify(res)});  
							that.$notice.toast({ message: '微信登录失败!'});    
					 }
				 });
			},
			load_weixinlogin_info(mqid)
			{
				var that = this;  
				get_mq_info(mqid,'weixinlogin').then(res => {  
				    console.log('____________weixinlogin_________' + JSON.stringify(res));  
					if (res.my.ack == 1)
					{
					    var profileid = res.my.result;
 				  	    login(profileid).then(res => {  
 					   	    that.$router.open({
 					   	        name: "eros",
 					   			params: 'usercenter', 
 					   	    });
 						}); 
					}
					else if (res.my.ack == 2)
					{       
						that.$notice.toast({ message: res.my.result});  
					}
					else
					{
				       setTimeout(() => {
				          that.load_mq_info(mqid);
				        }, 1000);
					}
			         
				},
				function(error) { 
					that.$notice.toast({ message: error});   
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
    }
  	.iconfont {
  	    font-family: iconfont;
  	} 
    .close {
	    position: fixed;
	    right: 0px;
	    top: 70px;
	    left: 30px; 
	  	opacity:0.8;
    }
    .close-icon { 
	  	width: 80px;
	  	height: 80px;
	  	font-size: 60px;    
	    justify-content: center;  
	  	opacity:0.8;
    }
	.login-title
	{
	    font-size: 38px;
	    color: #847b76;
	    font-weight: 700;
		text-align:center;
		padding-bottom:20px;
	}
    .login{
        margin-top: 240px;
    }
	.verifiy-method-wrapper
	{
	    width: 550px;
	    margin-left: 100px;
	    margin-right: 100px; 
		flex-direction: row;
		justify-content: flex-end;
	}
	.register-wrapper
	{
	    width: 550px;
	    margin-left: 100px;
	    margin-right: 100px; 
		margin-top: 30px;
		flex-direction: row;
		justify-content: flex-end;
		padding-bottom:40px;
	}
    .verifiy-method{
		color: #847b76;
        font-size: 30px;
    }
    .input-wrapper{
        width: 550px;
        margin-left: 100px;
        margin-right: 100px;
        margin-bottom: 30px;
		flex-direction: row;
		justify-content: space-between;
    }
    .input {
        font-size: 30px;
        height: 80px;
        width: 550px;
        padding-left: 90px;
        padding-top: 15px;
        padding-bottom: 15px;
        border-width:1px;
		color:#333333;
        border-color: #cccccc;
        border-radius:10px;
        outline: none;
    }
	.input-icon {
        position: absolute;
        top:10px;
		font-size: 60px; 
		color: #847b76;
        left: 15px;
        width: 60px;
        height: 60px;
    }
	.password-icon
	{
        position: absolute;
        top:10px;
		font-size: 60px; 
		color: #847b76;
        left: 15px;
        width: 60px;
        height: 60px;
	}
	
	.getverifiycode{
        position: absolute;
        top:10px;
		font-size: 30px; 
		color: #847b76;
        right: 15px;
        width: 180px;
        height: 60px;
		line-height: 60px;
        border-color: #cccccc;
        border-radius:5px;
		border-width:1px;
		text-align:center;
	}
    .button-wrapper{
		margin-top: 40px;
	    align-items: center;
	    justify-content: center;
    } 
    .input-forget{ 
        left: 30px;
		color: #847b76;
        font-size: 30px;
    }
    .input-register{  
		color: #847b76;
        font-size: 30px;
    }
	.separate-wrapper
	{
	    width: 550px;
	    margin-left: 100px;
	    margin-right: 100px; 
		flex-direction: row;
		justify-content: center; 
		padding-bottom:20px;
	}
	.otherlogin
	{
	    font-size: 30px;
	    color: #847b76;
	    font-weight: 500;
		text-align:center; 
		padding-left:8px;
		padding-right:8px;
	}
	.line
	{
	    font-size: 38px;
	    color: #847b76; 
		text-align:center;  
		margin-top: -20px;
	}
	.third_login
	{
		flex-direction: row;
		justify-content: center;
	}
	.login-icon
	{
	  	width: 110px;
	  	height: 110px;
		font-size: 70px; 
		line-height: 110px;
		text-align:center;
		color: #ffffff;  
	    background-color: green; 
	  	border-radius: 60px;  
	}
</style>