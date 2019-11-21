<template>
      <div class="wrapper"> 
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >   
             <div v-for="(i,index) in items" :key="index" class="address-info"> 
  	            <mycell :title="'收货人: '+i.consignee+' '+i.mobile+[i.selected ? ' (默认) ' : '']" :desc="i.address" :cellStyle="{height:'120px'}" @click.native="onaddressclick(i.id)"> 
  						<!--<text slot="label" class="iconfont address-icon">&#xe65e;</text>-->
  				 		<text slot="action" class="iconfont">&#xe672;</text> 
  	            </mycell>
				<image class="address-border" resize="cover" src="/images/address-border.jpg"></image>
             </div>  
		</scroller> 
		<topbar :top=50 title="新增地址" @topbarclicked="topbarclicked"></topbar>
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
				params:{},
	        }
	    },
		mounted() {   
		    this.params = this.$route.query;
			getdeliveraddress().then(res => {  
				this.items = res; 
			}); 
	    },
        methods: {
			topbarclicked()
			{
			   this.params.openid = ''; 
	 		   this.$router.push({path:'/editaddress',query:this.params}); 
			},
            onaddressclick(id)
			{
			   console.log('_____onaddressclick____________'+id+'_______________'); 
			   this.params.openid = id; 
			   this.$router.push({path:'/editaddress',query:this.params}); 
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
</style>