<template>
      <div class="wrapper">  
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >   
		   <am-list v-if="loading && mobile != ''">  
				   <am-list-input v-model="mobile" :disabled=true type="number" :max-length=11 title="手机号码:" :title-number="5">
				   		<text slot="extra" class="label" :style="{color:verifybuttoncolor}" @click="onsendverifycode">{{verifybuttontext}}</text>  
				   </am-list-input>   
		           <am-list-input v-model="verifycode" :disabled="lockverifycode" type="number" :max-length=6  title="    验证码:" :title-number="5" placeholder="请输入验证码"></am-list-input> 
				    <am-list-input v-model="newpassword" :disabled="lockpassword" type="text" :max-length=20  title="    新密码:" :title-number="5" placeholder="请输入新密码"></am-list-input> 
					<am-list-input v-model="verifypassword" :disabled="lockpassword" type="text" :max-length=20  title="校验密码:" :title-number="5" placeholder="请输入校验密码"></am-list-input>
		 </am-list> 
		 <div class="button-wrapper" v-if="loading && mobile != ''">
			 <am-button :width=550 :disabled="savebutton" text="确定" type="warning" @click.native="onsaveclicked"></am-button>
		 </div>  
	     <div class="message" v-if="loading && mobile == ''"> 
			 <text class="message-icon iconfont">&#xe68b;</text> 
	         <text class="message-text">您还没有绑定手机!</text> 
	     </div>
		</scroller>   
		<snackbar :show="showsnackbar" 
				  :stay-time="4000" 
				  :bottom="130" 
				  close-text="关闭"
				  :closeIcon=true 
				  :title="snackbar"></snackbar>
    </div>
</template> 

<script> 
     
	import list from '../components/list.vue'  
	import input from '../components/input.vue'   
	import button from '../components/button.vue'  
	import snackbar from '../common/snackbar.vue'; 
	
	import {number_format,gettimestamp,random} from '../../../rest/common.js'	
	import {send}  from  '../../../rest/sendmobile.js'
	import {get_profileid,get_profile_info,update_profile_info}  from  '../../../rest/profile.js'	
	import {get_mq_info} from '../../../rest/api.js'  
		
    export default {
	    components: {  
			 'am-list':list,
			 'am-list-input':input,  
			 'am-button':button,  
			 snackbar, 
	    },  
	    data() {
	        return {
	           mobile:'',
			   verifycode:'',
			   newpassword:'',
			   verifypassword:'',
			   looptime:0, 
			   lockverifycode:true,
			   verifybuttoncolor:'#ccc', 
			   verifybuttontext:'发送验证码',
			   verifybutton:false,
			   savebutton:true, 
			   sendcode:'',
			   showsnackbar:false,
			   snackbar:'',
			   lockpassword:true,
			   loading:false, 
	        }
	    }, 
	    watch: {
		      mobile (val) {
			 	    this.loading = true;
				  	if (this.mobile.length == 11)
					{
						this.verifybuttoncolor = '#333';
						this.verifybutton = true;
					}
					else
					{
						this.verifybuttoncolor = '#ccc';
						this.verifybutton = false;
					}
					this.lockverifycode = true;
			        console.log('___bindmobile___'+val+'__'+this.mobile+'__'); 
		      }, 
		      verifycode (val) {
				  	if (this.verifycode.length == 6)
					{ 
						this.savebutton = false;
						this.lockpassword = false;
					}
					else
					{ 
						this.savebutton = true;
						this.lockpassword = false;
					} 
		      },
	    },
		mounted() {     
			var that = this; 
			get_profileid().then(profileid => {  
				get_profile_info().then(res => {    
					this.loading = true; 
					this.mobile = res.mobile;   
				});  
			});  
	    }, 
        methods: { 
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
					 this.verifybutton = true;
					 this.verifybuttontext = '发送验证码',
					 this.verifybuttoncolor = '#333';
				}
			},
			onsaveclicked()
			{
				var that = this; 
				if (this.verifycode != this.sendcode)
				{
					that.$notice.toast({ message: '验证码输入错误!' });   
					return;
				}
				if (this.newpassword == '')
				{ 
					that.$notice.toast({ message: '请输入新密码!' });   
					return;
				}
				if (this.newpassword.length < 6)
				{
					that.$notice.toast({ message: '新密码必须6位以上!' });    
					return;
				}
				if (this.verifypassword == '')
				{
					that.$notice.toast({ message: '请输入校验密码!' });    
					return;
				}
				if (this.verifypassword != this.newpassword)
				{
					that.$notice.toast({ message: '校验密码与新密码必须一样!' });    
					return;
				}
				 
		        var info = {  password: this.newpassword, };  
   				update_profile_info(info).then(res => {  
   					that.$notice.toast({ message: '修改成功,2秒后自动返回上一页!' });  
   			        setTimeout(() => { 
			 		    that.$router.replace('/index/usercenter'); 
   			        }, 2000);
   				}, 
   		 		function(error) {			
   		 			that.$notice.toast({ message: error});  
   		 		}); 
			},
 		    onsendverifycode()
			{ 
				var that = this;
				if (this.verifybutton)
				{ 
					 this.verifybutton = false;  
					 var nowtimestamp = gettimestamp();  
					 this.snackbar = '';
					 this.showsnackbar = false;  
					 this.sendcode = random(123456,999999);
					 var key =  Math.floor(nowtimestamp / 2);
					 var params = {};
					 params.mobile = this.mobile;
					 params.sendcode = this.sendcode; 
					 params.key = key; 
					 send(params).then(res => {  
					     console.log('____________send_________' + JSON.stringify(res)); 
						 that.load_mq_info(res.id);
					 },
					 function(error) { 
						 that.snackbar = error;
						 that.showsnackbar = true;   
						 that.verifybutton = true;
					 }); 
				} 
			},
			load_mq_info(mqid)
			{
				var that = this;  
				get_mq_info(mqid,'sendmobile').then(res => {  
				    console.log('____________send_verifycode_________' + JSON.stringify(res));  
					if (res.my.ack == 1)
					{
					     that.snackbar = '';
  						 that.showsnackbar = false;
	   					 that.verifybuttontext = '发送成功',
	   					 that.verifybuttoncolor = '#ccc';
	   					 that.looptime = 120;
	   					 that.lockverifycode = false;
	   			         setTimeout(() => { that.loopverifycode(); }, 1000);
    		  	 	   
					}
					else if (res.my.ack == 2)
					{     
						that.snackbar = res.my.result;
   						that.showsnackbar = true; 
					 	that.verifybutton = true;
					}
					else
					{
				       setTimeout(() => {
				          that.load_mq_info(mqid);
				        }, 1000);
					}
			         
				},
				function(error) { 
					that.snackbar = error;
					that.showsnackbar = true;  
				 	that.verifybutton = true;
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
		background-color: #fafafa;
    }
  	.iconfont {
  	    font-family: iconfont;
  	}  
    .header{
         margin-top: 30px;
    } 
 	.label
 	{  
 		width:180px;
 		height:60px;
		color:#cccccc;
		line-height: 60px;
	    border-width: 1px;
	    border-color: #cccccc;
		text-align:center;
 	} 
 	 
	.main-list { 
	    margin-bottom: 0px;
	}  
	 
    .button-wrapper{
		margin-top: 40px;
	    align-items: center;
	    justify-content: center;
    }
	

	.message {
	    height: 350px;
		margin-top: 100px;
	}

	.message-icon {
	    position: absolute;
	    width: 750px;
	    height: 230px;
	    top: 0px;
	    left: 0px;
		text-align: center;
		color: #ff2600;
		font-size: 150px;
	}

	.message-text {
	    position: absolute;
	    text-align: center;
	    font-size: 30px;
	    width: 750px;
	    top: 180px;
	    color: #666666;
	}
	
</style>