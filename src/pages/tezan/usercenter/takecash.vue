<template> 
    <div class="wrapper">  
    <waiting :show="showwaiting" :msg="waittext" width="60" height="60"></waiting>
    <am-tabs
        v-model="selected"
		@tabchange="ontabchange"
        :tabs="['提现申请', '提现历史记录']"
      />
	 <scroller class="main-list" offset-accuracy="300px">  
    	 <div class="payement-info">  
	           <mycell :cellStyle="{height:'100px'}" > 
			        <text slot="label" class="cell-label">当前余额:</text> 
					<text slot="title" class="cell-text price">¥ {{money | number_format}}</text>
	           </mycell> 
	           <mycell :cellStyle="{height:'100px'}" > 
			        <text slot="label" class="cell-label">可提现金额:</text> 
					<text slot="title" class="cell-text price">¥ {{maxtakecash | number_format}}</text>
	           </mycell> 
	           <mycell :cellStyle="{height:'100px'}" v-if="takecashlimit > 0"> 
			        <text slot="label" class="cell-label">最小提现金额:</text> 
					<text slot="title" class="cell-text price">¥ {{takecashlimit | number_format}}</text>
	           </mycell>
			   <div class="box-border"></div>
	  		   <div class="message" v-if="message != ''"> 
	  			     <div class="message-container" >
	  			         <text class="message-icon iconfont">&#xe68d;</text> 
	  			     </div>  
	  	   	         <text class="message-text">{{message}}</text>  
	  		   </div>
	  		   <am-list v-if="message == ''">  
	  				   <am-list-input v-model="mobile" :disabled=true type="number" :max-length=11 title="    手机号码:" :title-number="6" placeholder=""></am-list-input>  
					   <am-list-item  title="    银行卡号:" :title-number="6" @click.native="ongotoclick('selectbank')"> 
					   			<div slot="extra" class="account-wrapper">
							   		<text class="account">{{account}}</text> 
							   		<text class="iconfont">&#xe672;</text> 
								</div>
					   </am-list-item> 
	  				   <am-list-input v-model="bank" :disabled=true type="text" :max-length=6 title="           银行:" :title-number="6" placeholder=""></am-list-input>  
					   <am-list-input v-model="realname" :disabled=true type="text" :max-length=20  title="收款人姓名:" :title-number="6" placeholder=""></am-list-input>
	  				   <am-list-input v-model="amount" type="number" :max-length=10 title="    提现金额:" :title-number="6" placeholder="代扣银行手续费"></am-list-input>
	  		   </am-list>
	  		   <div class="button-wrapper" v-if="message == ''">
	  			 	  <am-button :width=550 :disabled="savebutton" text="确定" type="warning" @click.native="onsubmitclicked"></am-button>
	  		   </div>
		 </div>
	</scroller>   
  </div>
</template>

<script>
  import Vue from 'vue'
  import amtabs from '../components/tabs.vue'; 
  import waiting from '../common/waiting.vue'; 
  import mycell from '../common/mycell.vue';    
  import list from '../components/list.vue'  
  import listitem from '../components/listitem.vue'   
  import input from '../components/input.vue'
  import button from '../components/button.vue' 
  import {get_profile_info} from '../../../rest/profile' 
  import {get_supplier_info} from '../../../rest/api'
  import {number_format} from '../../../rest/common' 
  import { getbank_info,getdefaultbank_info } from '../bank/config'  
  import { takecash_submit,getlasttakecash_info,getlasttradetakecash_info } from './takecash.js'  
  
  

  Vue.filter('number_format', function(value) {
      return number_format(value, 2, ".", ",");
  })
 
  export default {
    components: { 
		'am-tabs':amtabs,  
	 	'am-list':list,
		'am-list-item':listitem,
	 	'am-list-input':input,
		'am-button':button, 
		waiting, 
		mycell,    
	},
    data () {
      return {
          selected: 0,
		  tabkey:0,
		  showwaiting:true,
		  waittext:'正在进行统计，请稍候!',  
		  money:0,
		  maxtakecash:0,  
		  takecashlimit:0,
		  savebutton:true,
		  mobile:'',
		  account:'请选择银行卡号',
		  bank:'',
		  realname:'',
		  amount:'',
		  message:'',
		  supplier_info:{},
		  selectbankid:'',
      }
    },
    watch: {
      amount (val) {
		    this.verify();
      },  
    },
	mounted() { 
	         var that = this;   
    	     get_supplier_info().then(res => {  
 	   				 this.supplier_info = res; 
		 			 get_profile_info().then( res => {  
		 			 	console.log('___________get_accountbook_info_________' + JSON.stringify(res));  
		 				that.waittext = '';
		 				that.showwaiting = false;  
		 				that.money =  res.money;  
		 				that.maxtakecash =  res.maxtakecash;  
		 				that.mobile =  res.mobile; 
		 				that.maxtakecash = 2000;  
		 				if (that.supplier_info.allowtakecash == 0)
		 				{
		 					that.message = "提现功能已经被禁用!";
							that.maxtakecash = 0;
		 				} 
		 				else if (that.mobile == '')
		 				{
		 					that.message = "请先绑定手机号码，才能进行提现操作!";
		 				}
		 				else if (that.maxtakecash <= 0)
		 				{
		 					that.message = "有了收益后，才可以进行提现哦，亲!";
		 				}
						
						getlasttakecash_info().then( res => {  
						     if (res == '')
							 {
							 		getlasttradetakecash_info().then( next_res => {  
			   						     if (next_res == '')
			   							 {
			 			 						that.takecashlimit = that.supplier_info.takecashlimit;					    
			 			 						if (that.$route.query.selectbankid && that.$route.query.selectbankid != '' )
			 			 						{
			 			 							that.selectbankid = that.$route.query.selectbankid;
			 			 							getbank_info(that.selectbankid).then(res => {   
			 			 								console.log('___________getbank_info_________' + JSON.stringify(res)); 
			 			 							    this.realname = res.realname;
			 			 								this.account = res.account;
			 			 							    this.bank = res.bank; 
			 			 							});
			 			 						}
			 			 						else
			 			 						{
			 			 							getdefaultbank_info().then(res => { 
			 			 							    console.log('___________getdefaultbank_info_________' + JSON.stringify(res));   
			 			 							    that.realname = res.realname;
			 			 								that.account = res.account;
			 			 							    that.bank = res.bank; 
			 			 								that.selectbankid = res.id;
			 			 							});
			 			 						}
										 }
										 else
										 {
											   that.message = next_res;
										 }
									}); 
							 }
							 else
							 {
								   that.message = res;
							 }
						});
						
						
		 			},
		 			function(error) {			
		 				that.waittext = '';
		 				that.showwaiting = false;
		 			});
 	   	     });
			 
	},
    methods: {
		   verify () {  
	 		    var that = this;
	 			if (this.amount == '')
	 			{
	 				that.savebutton = true;
	 				return false;
	 			}
	 			if (String(this.amount).indexOf(".") > -1)
	 			{
	 				this.amount = Math.floor(Number(this.amount));
					return false;
	 			}
	 		  	if (Number(this.amount) > Number(this.maxtakecash))
	 			{  
	  				that.savebutton = true; 
					return false;
	 			}
	 			else if (Number(this.amount)  <= 0)
	 			{
	 				that.savebutton = true;
					return false;
	 			}
	 			else if (Number(that.takecashlimit) > 0 && Number(this.amount) < Number(that.takecashlimit))
	 			{
	 				that.savebutton = true;
					return false;
	 			}			
	 			else
	 			{ 
	 				that.savebutton = false;
					return true;
	 			}
		   },
	       ontabchange (index, value) {
			   	var tabs = {
				    0:{router:'takecash',name:'提现申请'},
					1:{router:'takecashlog',name:'提现历史记录'}, 
				};  
				if (this.selected != this.tabkey)
				{ 
					var router = tabs[this.selected].router;
					var name = tabs[this.selected].name;  
		 		    this.$router.replace('/'+router); 
				} 
	       }, 
	  	   ongotoclick (router) {  
		  	 	this.$router.push('/'+router); 
	  	   },
		   onsubmitclicked()
		   {
		    	if (!this.verify()) return;
				var that = this;
				that.savebutton = false; 
			    var info = {
					    selectbankid: this.selectbankid,
					    realname: this.realname, 
					    bank: this.bank,
					    account: this.account, 
						amount: this.amount,   
				  		money: String(this.money),   
				  		maxtakecash: String(this.maxtakecash),     
				  		takecashlimit: String(this.takecashlimit),   
				  		mobile: this.mobile,   
					};
				console.log('___________info_________' + JSON.stringify(info));   
				takecash_submit(info).then( res => {  
				 	 console.log('___________takecash_submit_________' + JSON.stringify(res));    
				 	 that.$router.replace('/index/usercenter'); 
				},
				function(error) {
					that.$notice.toast({ message: error });
				});
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
	.main-list { 
	    position: fixed;
	    top: 90px; 
	    bottom: 0px;
	    left: 0;
	    right: 0;
	}   
	.iconfont {
	    font-family: iconfont;
	}
    .payement-info{ 
		width:750px;   
    }
	.cell-label { 
		font-size: 30px;  
		width:190px;
		text-align:right;
		color:#888888;
		font-weight: 600;
	}
	.cell-text {
	   font-size: 30px;
	   padding-left:15px;
	}
	 
	.price {
	    color: #b4282d
	}
	.box-border
	{
		width:750px;
		height:15px;
		background-color: #cccccc; 
	}
    .button-wrapper{
		margin-top: 40px;
	    align-items: center;
	    justify-content: center;
		margin-bottom: 40px;
    }
	
	.message-container
	{ 
		width: 60px;
		height: 60px; 
	    justify-content: center;
		align-items: center;   
		line-height: 120px; 
	} 
	.message-icon { 
		text-align: center;
		color: #b4272d;
		font-size: 60px; 
	}  
	.message {
	    padding-bottom: 20px;
		margin-top: 20px; 
		align-items: center;  
	}
	.message-text { 
		margin-top: 10px;
	    text-align: center;
	    font-size: 30px;
		font-weight: 700;
	    width: 650px;
	    color: #b4272d;;
	}
	.account-wrapper
	{ 
		width:500px;
		flex-direction:row;
	    justify-content: space-between;
		align-items: center;
	}
	
	
</style> 

