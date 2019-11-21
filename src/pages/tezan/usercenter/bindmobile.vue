<template>
      <div class="wrapper">  
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >   
		   <am-list>  
				   <am-list-input v-model="mobile" :disabled="lockmobile" type="number" :max-length=11 title="手机号码:" :title-number="5" placeholder="请输入手机号">
				   		<text slot="extra" class="label" :style="{color:verifybuttoncolor}" @click="onsendverifycode">{{verifybuttontext}}</text>  
				   </am-list-input>   
		           <am-list-input v-model="verifycode" :disabled="lockverifycode" type="number" :max-length=6  title="    验证码:" :title-number="5" placeholder="请输入验证码"></am-list-input> 
		 </am-list> 
		 <div class="button-wrapper">
			 <am-button :width=550 :disabled="savebutton" text="确定" type="warning" @click.native="onsaveclicked"></am-button>
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
	
	import {number_format,gettimestamp,random} from '../../../rest/common' 
	import {get_mq_info} from '../../../rest/api'
	import {send}  from  '../../../rest/sendmobile.js'
	import {update_profile_info,get_mobile_profile_info,get_profile_info}  from  '../../../rest/profile.js'
		
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
			   sendmobile:'',
			   selfmobile:'',
			   verifycode:'',
			   looptime:0,
			   lockmobile:false,
			   lockverifycode:true,
			   verifybuttoncolor:'#ccc', 
			   verifybuttontext:'发送验证码',
			   verifybutton:false,
			   savebutton:true,
			   showsnackbar:false,
			   snackbar:'',
			   sendcode:'',
	        }
	    }, 
	    watch: {
	      mobile (val) {
		    var that = this;
		  	if (this.mobile.length == 11)
			{ 
				 if (this.selfmobile == this.mobile)
				 {
	 				this.verifybuttoncolor = '#ccc';
	 				this.verifybutton = false;
					this.$notice.toast({ message: '不能绑定原手机号码!'}); 
				 }
				 else
				 { 
	 				 get_mobile_profile_info(this.mobile).then(profile_info => {  
			 				that.verifybuttoncolor = '#ccc';
			 				that.verifybutton = false;
							that.$notice.toast({ message: this.mobile+'已经被绑定,请更换手机号码!'});
	 				 },
	 				 function(error) { 
	   					 that.verifybuttoncolor = '#333';
	   					 that.verifybutton = true;
	 				}); 
				 } 
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
			}
			else
			{ 
				this.savebutton = true;
			} 
	      },
	    },
		mounted() {    
			 this.mobile = '';
 			 get_profile_info().then(res => {  
 			    this.selfmobile = res.mobile;  
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
					 this.lockmobile = false;
					 this.verifybutton = true;
					 this.verifybuttontext = '发送验证码',
					 this.verifybuttoncolor = '#333';
				}
			},
			onsaveclicked()
			{
				var that = this;
				this.snackbar = '';
				this.showsnackbar = false;
				if (this.verifycode == this.sendcode)
				{
						this.savebutton = true;
	   			        var info = {  mobile: that.sendmobile, };  
		   				update_profile_info(info).then(res => {  
		   					that.$notice.toast({ message: '绑定成功,2秒后自动返回上一页!' });  
		   			        setTimeout(() => { 
					 		     that.$router.replace('/index/usercenter'); 
		   			        }, 2000);
		   				}, 
		   		 		function(error) {			
		   		 			that.$notice.toast({ message: error});  
		   		 		});
				}
				else
				{ 
					this.snackbar = '验证码输入错误';
					this.showsnackbar = true;
				}
			},
 		    onsendverifycode()
			{ 
				var that = this;
				if (this.verifybutton)
				{
					 this.lockmobile = true;
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
					 this.sendmobile = this.mobile;
					 send(params).then(res => {  
					     console.log('____________send_verifycode_________' + JSON.stringify(res)); 
						 that.load_mq_info(res.id);
					 },
					 function(error) { 
						 that.snackbar = error;
						 that.showsnackbar = true;  
						 that.lockmobile = false;
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
						that.lockmobile = false;
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
					that.snackbar = error+',请与管理员联系!';
					that.showsnackbar = true; 
					that.lockmobile = false;
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
</style>