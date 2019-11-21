<template>
      <div class="wrapper"> 
		 <scroller class="main-list" offset-accuracy="300px">   
             <div v-for="(i,index) in items" :key="index" class="address-info"> 
  	            <mycell :title="'收货人: '+i.consignee+' '+i.mobile+[i.selected ? ' (默认) ' : '']" :desc="i.address" :cellStyle="{height:'120px'}" @click.native="onaddressclick(i.id)"> 
  						<text slot="label" class="iconfont address-icon">&#xe65e;</text>
  				 		<text slot="action" class="iconfont selected-icon" v-if="i.id == selected" >&#xe671;</text>  
  	            </mycell>
				<image class="address-border" resize="cover" src="/images/address-border.jpg"></image>
             </div>   
		</scroller> 
		<topbar :top=50 title="管理地址" @topbarclicked="topbarclicked"></topbar>
    </div>
</template> 

<script>
	import Vue from 'vue'
	import mycell from '../common/mycell.vue';  
	import topbar from '../common/topbar.vue'  
	import { getdeliveraddress } from './config'  
	
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
			 if (this.params.selectdeliveraddressid)
			 {
			 	this.selected = this.params.selectdeliveraddressid;
			 }  
			
			 getdeliveraddress().then(res => {  
				this.items = res; 
			 }); 
	    },
        methods: {
			topbarclicked()
			{
			   this.params.selectdeliveraddressid = '';
	 		   this.$router.push({path:'/address',query:this.params}); 
			},
            onaddressclick(id)
			{
				this.selected = id; 
				this.params.selectdeliveraddressid = this.selected;
				this.$router.push({path:'/submitorder',query:this.params}); 
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