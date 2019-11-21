<template>
      <div class="wrapper"> 
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >   
	         <mycell :cellStyle="{height:'70px'}">  
					<text slot="title" class="cell-text"> {{supplier_info.company}}</text>
	         </mycell>
            <mycell :cellStyle="{height:'70px'}"> 
			        <text slot="label" class="cell-label">地址:</text> 
					<text slot="title" class="cell-text"> {{supplier_info.address}}</text>
            </mycell> 
            <mycell :cellStyle="{height:'70px'}"> 
			        <text slot="label" class="cell-label">联系人:</text> 
					<text slot="title" class="cell-text"> {{supplier_info.contact}}</text>
            </mycell>
            <mycell :cellStyle="{height:'70px'}"> 
			        <text slot="label" class="cell-label">电话:</text> 
					<text slot="title" class="cell-text"> {{supplier_info.mobile}}</text>
            </mycell>
			<div class="baidu">
				<image class="map" resize="cover" :src="src" v-if="src != ''" placeholder="/images/placeholder.jpg"></image> 
			</div>
		</scroller> 
    </div>
</template> 

<script> 
import mycell from '../common/mycell.vue';
import {get_supplier_info} from '../../../rest/api'
    export default {
	    components: { 
		  mycell,
	    },  
	    data() {
	        return {
	             supplier_info:{}, 
				 src:'', 
			 }
	    },
		mounted() {    
   	    	get_supplier_info().then(res => {  
	   			this.supplier_info = res; 
				var latitude = res.latitude;
				var longitude = res.longitude;
				if (latitude != '' && longitude != '')
				{
				  	this.src = 'http://api.map.baidu.com/staticimage?center='+longitude+','+latitude+'&zoom=17&width=750&height=750&markers='+longitude+','+latitude;
					console.log('________' + this.src + '________'); 
				} 
	   	    });
	    },
        methods: { 
		    
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
	.cell-label { 
		font-size: 30px;  
		width:130px;
		text-align:right;
		color:#888888; 
	}
	.cell-text {
	   font-size: 30px;
	   padding-left:15px;
	   color:#888888;
       overflow: hidden;
       lines: 1;
       
       text-overflow: ellipsis;
	}
	.baidu
	{
	    align-items: center;
	    justify-content: center;
	}
	.map
	{
		width:730px;
		height:730px;
	
	}
	
</style>