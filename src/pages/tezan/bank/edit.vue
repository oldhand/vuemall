<template>
      <div class="wrapper">  
		 <scroller class="main-list" offset-accuracy="300px">  
		   <am-list> 
		           <am-list-input v-model="realname" :max-length=12  title="    收款人:" :title-number="5" placeholder="请输入收款人姓名"></am-list-input>
		           <am-picker title="请选择收款银行" :data="banks" v-model="bank">
		           		<am-list-item  slot-scope="{ extra, show }" title="        银行:" :extra="extra" :title-number="5" :extra-style="{width:'520px'}" @click.native="show"></am-list-item> 
			       </am-picker>
				   <am-list-input v-model="account" type="text" :max-length=19 title="银行卡号:" :title-number="5" placeholder="请输入银行卡号"></am-list-input>
 
		 </am-list>
 	     <div class="delete-wrapper" v-if="selectbankid != 0">    
             <div class="delete" @click="ondeleteclick">
                 <text class="delete-txt">删除银行卡</text>
             </div>
 		</div> 
		<topbar :top=50 :show="showtopbar" @topbarclicked="topbarclicked"></topbar>
		</scroller> 
    </div>
</template> 

<script> 
    import Vue from 'vue'
	import picker from '../components/picker.vue'   
	import listitem from '../components/listitem.vue'   
	import list from '../components/list.vue'  
	import input from '../components/input.vue' 
	import myswitch from '../components/switch.vue'  
	
	import topbar from '../common/topbar.vue' 
	 
	import { getbank_info,savebank_info,deletebank_info} from './config'  
	
    export default {
	    components: { 
		 'am-picker':picker,
		 'am-list-item':listitem,
		 'am-list':list,
		 'am-list-input':input,
		 'am-switch':myswitch, 
		 topbar,
	    },  
	    data() {
	        return {
			    banks:[{value: '微信',label: '微信'},
					   {value: '支付宝',label: '支付宝'},
					   {value: '中国建设银行',label: '中国建设银行'},
					   {value: '中国工商银行',label: '中国工商银行'},
					   {value: '中国农业银行',label: '中国农业银行'},
					   {value: '中国银行',label: '中国银行'},
					   {value: '交通银行',label: '交通银行'},
					   {value: '中国邮政储蓄银行',label: '中国邮政储蓄银行'},
					   {value: '兴业银行',label: '兴业银行'},
					   {value: '长沙银行',label: '长沙银行'},
					   {value: '农村商业银行',label: '农村商业银行'}],
	            realname: '',   
				bank: [],   
				account: '',   
				selected: false,  
				selectbankid:0,
				params:{},  
				showtopbar:true,
	        }
	    },  
		mounted() {     
		    this.params = this.$route.query; 
	   		this.selectbankid = this.params.selectbankid;
			if (this.selectbankid != '' && this.selectbankid != 0)
			{
		   	    getbank_info(this.selectbankid).then(res => {   
				    this.realname = res.realname;
					this.account = res.account;
				    this.bank = [res.bank];
					this.selected = res.selected;  
				});
			}   
	    },
        methods: { 
			topbarclicked()
			{  
			    var that = this;
				this.showtopbar = false;
				if (this.realname.length == 0)
				{
					this.$notice.toast({ message: '收款人必填!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}
				if (this.bank.length == 0)
				{
					this.$notice.toast({ message: '银行必填!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				} 
				if (this.account.length == 0)
				{
					this.$notice.toast({ message: '银行卡号必填!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}  
			    var info = {
					    id: this.selectbankid,
					    realname: this.realname, 
					    bank: this.bank,
					    account: this.account, 
						selected: this.selected,   
					};
				savebank_info(info).then(res => {  
					   this.params.selectbankid = res.id;
					   this.$router.replace({path:'/bank',query:this.params});  
					 
				});
			}, 
		   ondeleteclick () { 
				deletebank_info(this.selectbankid).then(res => { 
					   this.params.selectbankid = '';
					   this.$router.replace({path:'/bank',query:this.params});   
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
  	.iconfont {
  	    font-family: iconfont;
  	}  
	.address-border
	{
		width:750px;
		height:4px;
	}
    .address-info{
        margin-top: 2px;
		width:750px;  
		padding-top:10px;
    } 
    .address-icon { 
	    font-size: 60px;  
		width:80px;
    }
	.main-list { 
	    margin-bottom: 0px;
	}  
    .delete-wrapper{ 
        margin-top: 40px;
	    align-items: center;
	    justify-content: center;
    }
    .delete {
        height: 100px;
        width: 750px;
        background-color: #ffffff;  
    }
    .delete:active {
      background-color: #eeeeee;
    }
    .delete-txt{
        height: 100px; 
        text-align: center;
        line-height: 100px;
        color: #b4272d;
        font-size: 35px;
    }
</style>