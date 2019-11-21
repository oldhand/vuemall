<template>
    <div class="wrapper">
	    <div class="close" @click="oncloseclick">
	        <text class="iconfont close-icon" >&#xe67a;</text> 
	    </div>
        <div class="register">
		    <text class="register-title">手机号注册</text>
            <div class="input-wrapper">
                <input class="mobileinput" type="number" maxlength="11" placeholder="请输入手机号" v-model="mobile" :disabled="lockmobile"/> 
				<text class="iconfont input-icon" >&#xe67e;</text>  
            </div>  
            <div class="input-wrapper">
                <input class="input" type="number" maxlength="6" placeholder="请输入验证码" v-model="verifycode"/>
                <text class="iconfont password-icon" >&#xe67b;</text> 
				<text class="getverifiycode" :style="{color:verifybuttoncolor}" @click="onsendverifycode">{{verifybuttontext}}</text> 
            </div>
            <div class="input-wrapper">
                <input class="input" type="password" maxlength="20" placeholder="请设置密码" v-model="password"/>
                <text class="iconfont password-icon" >&#xe67f;</text> 
            </div> 
            <div class="input-wrapper">
                <input class="input" type="password" maxlength="20" placeholder="请设置校验密码" v-model="verifypassword"/>
                <text class="iconfont password-icon" >&#xe68e;</text> 
            </div> 
			 <div class="button-wrapper">
				 <am-button width="550px" :disabled="registerbutton" :text="registertxt" type="theme" @click="onregisterclick"></am-button>
			 </div> 
            <div class="agree-wrapper"> 
                <text class="agree-txt" onclick="register">用户注册代表同意《服务条款》和《隐私政策》</text>
            </div> 
        </div>  
    </div>
</template>
 
<script>
	import button from '../components/button.vue'  
	
	import {number_format,gettimestamp,random} from '../../../rest/common.js'  
	import {send}  from  '../../../rest/sendmobile.js'  
	import {get_mq_info} from '../../../rest/api.js' 
	import {get_mobile_profile_info,register,login} from '../../../rest/profile.js' 
	
export default {
	    components: {   
			 'am-button':button,  
	    }, 
        data:{ 
			mobile:'', 
			password:'',  
			verifypassword:'',    
			verifycode:'',
			sendmobile:'',
			looptime:0,
		    lockmobile:false, 
		    verifybuttoncolor:'#ccc', 
		    verifybuttontext:'发送验证码',
		    verifybutton:false,
		    registerbutton:true,
			registertxt:'注册', 
		    sendcode:'',
			profileid:'',
			registerkey:0,
			loopregistertime:0,
        },
		mounted() {   
			this.registerkey = random(123456,999999);
	    },
	    watch: {
		      mobile (val) { 
			    var that = this; 
			  	if (this.mobile.length == 11)
				{
					 get_mobile_profile_info(this.mobile).then(profile_info => {  
							 that.$notice.toast({ message: this.mobile+'已经注册,请更换手机号码'}); 
		 					 that.verifybuttoncolor = '#ccc';
		 					 that.verifybutton = false; 
					 },
					 function(error) {
						 that.verifybuttoncolor = '#333';
						 that.verifybutton = true;  
					}); 
				}
				else
				{
					this.verifybuttoncolor = '#ccc';
					this.verifybutton = false;  
					this.registerbutton = true;
				} 
				this.verifycode = ''; 
		      }, 
		      verifycode (val) { 
					if (this.verifycode.length == 6 && this.mobile.length == 11)
					{
						this.registerbutton = false;
					}
					else
					{
						this.registerbutton = true;
					}
		      },
	    },
        methods:{ 
            oncloseclick(){
			    const Navigator = weex.requireModule('navigator');
		        Navigator.pop({}, e => { });
            },
            onregisterclick() {
 				var that = this; 
				if (this.registerbutton)
				{
					return;
				}
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
				if (this.password.length == 0)
				{ 
					this.$notice.toast({ message: '密码必填!' }); 
					return;
				}
				if (this.password.length < 6)
				{ 
					this.$notice.toast({ message: '密码必须大于等于6位!' }); 
					return;
				}
				if (this.verifypassword.length == 0)
				{ 
					this.$notice.toast({ message: '校验密码必填!' }); 
					return;
				}
				if (this.verifypassword.length < 6)
				{ 
					this.$notice.toast({ message: '校验密码必须大于等于6位!' }); 
					return;
				}
				if (this.verifypassword != this.password)
				{ 
					this.$notice.toast({ message: '两次输入的密码有误!' }); 
					return;
				}
				
				if (this.verifycode == this.sendcode && this.verifypassword == this.password)
				{
					this.registerbutton = true;
   					var info = {};
   					info.mobile = this.mobile;
   					info.password = this.password; 
				    var nowtimestamp = Math.floor(gettimestamp()/10);    
					info.key = nowtimestamp; 
					info.record = String(this.registerkey);
					this.registertxt = '正在提交注册信息';  
				    register(info).then(res => { 
				    	 console.log('___________register________' + JSON.stringify(res));  
						 that.loopregistertime = 0;
						 that.registertxt = '等待返回注册信息,请稍候！';
						 that.load_register_info(res.id);
					},
					function(error) {
						 console.log('________error_________' + JSON.stringify(error));  
						 that.registertxt = '注册';
						 that.registerbutton = false;
					}); 
				}
				else
				{
					that.$notice.toast({ message: '验证码输入错误！' }); 
				} 
            },  
			load_register_info(mqid)
			{
				var that = this;  
				get_mq_info(mqid,'register').then(res => {  
				    console.log('____________register_________' + JSON.stringify(res));  
					if (res.my.ack == 1)
					{
						that.registertxt = '注册成功';
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
						that.registerbutton = false;
						that.registertxt = '注册';
					}
					else
					{
					   that.loopregistertime = that.loopregistertime + 1;
					   that.registertxt = '等待返回注册信息,请稍候('+ that.loopregistertime +')';
				       setTimeout(() => {
				          that.load_register_info(mqid);
				        }, 1000);
					} 
				},
				function(error) {  
					that.$notice.toast({ message: error}); 
					that.registerbutton = false;
					that.registertxt = '注册';
				});
			},
 		    onsendverifycode()
			{ 
				var that = this;				 
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
 					     console.log('____________send_________' + JSON.stringify(res)); 						
 						 that.load_mq_info(res.id);
 					 },
 					 function(error) { 
 					  	 console.log('________error_____'+error+'____');
						 that.$notice.toast({ message: error});  
 						 that.lockmobile = false;
 						 that.verifybutton = true;
						 that.verifybuttontext = '发送验证码';
 					 }); 
 				} 
		
				
			},
			load_mq_info(mqid)
			{
				var that = this;  
				get_mq_info(mqid,'sendmobile').then(res => {  
				    console.log('____________send_________' + JSON.stringify(res));  
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
					that.$notice.toast({error}); 
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
	.register-title
	{
	    font-size: 38px;
	    color: #847b76;
	    font-weight: 700;
		text-align:center;
		padding-bottom:20px;
	}
    .register{
        margin-top: 240px;
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
    .mobileinput {
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
	.limitmobile
	{
	    position: absolute;
	    top: 24px;
		font-size: 30px; 
		color: #847b76;
	    left: 90px;
	    width: 60px;
	    height: 60px;
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
		margin-top: 30px;
	    align-items: center;
	    justify-content: center;
    }
	.agree-wrapper
	{
	    width: 550px;
	    margin-left: 100px;
	    margin-right: 100px; 
		margin-top: 20px; 
		flex-direction: row;
		justify-content: center; 
		padding-top:20px;
	} 
	.agree-txt
	{
	    font-size: 25px;
	    color: #847b76; 
		text-align:center; 
	}
	 
</style>