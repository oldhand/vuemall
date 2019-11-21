<template>
      <div class="wrapper"> 
		 <scroller class="main-list" offset-accuracy="300px">   
             <div v-for="(i,index) in items" :key="index" class="address-info"> 
	            <mycell :title="'收款人: '+i.realname+' ('+i.bankstatus+')'" :desc="i.bank + ' ' + i.account" :cellStyle="{height:'120px'}" v-if="i.authenticationstatus == '2'"> 
						<text slot="label" class="iconfont address-icon">&#xe692;</text> 
	            </mycell>
  	            <mycell :title="'收款人: '+i.realname+' ('+i.bankstatus+')'" :desc="i.bank + ' ' + i.account" :cellStyle="{height:'120px'}" @click.native="onbankclick(i.id)" v-else> 
  						<text slot="label" class="iconfont address-icon">&#xe692;</text>
  				 		<text slot="action" class="iconfont">&#xe672;</text> 
  	            </mycell>
				<image class="address-border" resize="cover" src="/images/address-border.jpg"></image>
             </div>  
			 <div class="button-wrapper" >
				 <am-button :width=350  text="返回" type="warning" @click.native="ontakecashclicked"></am-button>
			 </div>
		</scroller> 
		<topbar :top=50 title="新增银行卡" @topbarclicked="topbarclicked"></topbar>
    </div>
</template> 

<script>
    import Vue from 'vue'
	import mycell from '../common/mycell.vue'; 
	import topbar from '../common/topbar.vue' 
	import button from '../components/button.vue'  
	import { getallprofilebankcards } from './config'  
    export default {
	    components: {
		 	 'am-button':button,  
	         mycell,   
			 topbar, 
	    },  
	    data() {
	        return {
	            items: [],  
				params:{},
	        }
	    },
		mounted() {   
		    this.params = this.$route.query;
			getallprofilebankcards().then(res => {  
				this.items = res; 
			}); 
	    },
        methods: {
			topbarclicked()
			{
			   this.params.selectbankid = ''; 
	 		   this.$router.push({path:'/editbank',query:this.params}); 
			},
			ontakecashclicked()
			{
			 		this.$router.push('/selectbank'); 
			},
            onbankclick(id)
			{
			   console.log('_____onaddressclick____________'+id+'_______________'); 
			   this.params.selectbankid = id; 
			   this.$router.push({path:'/editbank',query:this.params}); 
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
	    margin-bottom: 100px;
	}  
    .button-wrapper{
		margin-top: 40px;
	    align-items: center;
	    justify-content: center;
    }
</style>