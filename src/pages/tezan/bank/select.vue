<template>
      <div class="wrapper"> 
		 <scroller class="main-list" offset-accuracy="300px">   
             <div v-for="(i,index) in items" :key="index" class="address-info"> 
  	            <mycell :title="'收款人: '+i.realname+' '+[i.selected ? ' (默认) ' : '']" :desc="i.bank + ' ' + i.account" :cellStyle="{height:'120px'}" @click.native="onbankclick(i.id)"> 
  						<text slot="label" class="iconfont address-icon">&#xe692;</text>
  				 		<text slot="action" class="iconfont selected-icon" v-if="i.id == selected" >&#xe671;</text>  
  	            </mycell>
				<image class="address-border" resize="cover" src="/images/address-border.jpg"></image>
             </div>   
		</scroller> 
		<topbar :top=50 title="管理银行卡" @topbarclicked="topbarclicked"></topbar>
    </div>
</template> 

<script>
	import Vue from 'vue'
	import mycell from '../common/mycell.vue';  
	import topbar from '../common/topbar.vue'  
	import { getprofilebankcards } from './config'  
	
    export default {
	    components: {
	         mycell,   
			 topbar,  
	    },  
	    data() {
	        return {
	            items: [],  
				selected: 0, 
				params:{},  
	        }
	    }, 
		mounted() {   
		     var params = this.$route.query; 
	   		 this.params = params;
			 if (this.params.selectbankid)
			 {
			 	this.selected = this.params.selectbankid;
			 }   
			 getprofilebankcards().then(res => {  
				 this.items = res; 
			 }); 
	    },
        methods: {
			topbarclicked()
			{
			   this.params.selectbankid = '';
	 		   this.$router.push({path:'/bank',query:this.params}); 
			},
            onbankclick(id)
			{
				this.selected = id; 
				this.params.selectbankid = this.selected;
				this.$router.push({path:'/takecash',query:this.params}); 
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
	.selected-icon
	{
	    font-size: 40px;  
		width:36px;
		color: #b4272d;
	}
	.main-list { 
	    margin-bottom: 100px;
	}  
</style>