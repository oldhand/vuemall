<template>
    <div class="wrapper">  
            <div class="gb-box" v-for="i in items"> 
				    <checkbox class="gd-checkbox" :value="i.selected" @checkchange="changevalue($event,i.id)" label=""></checkbox>
	                <image class="gd-img" resize="cover" :src="i.productthumbnail" placeholder="/images/placeholder.jpg" @click="showdetail(i.productid)"></image>
					<div class="gd-info"> 
	               	   <text class="gd-txt">{{i.productname}}</text>
					   <text class="gd-txt" v-if="i.propertydesc != ''">{{i.propertydesc}}</text>
					   <text class="gd-txt price">¥ {{i.shop_price | number_format}}</text>
					   
   					   <stepper class="number-text" :default-value="i.quantity"
   					                   step="1"
   					                   max="100"
   					                   min="1"
   									   :read-only=true
   					                   @steppervaluechanged="steppervaluechanged($event,i.id)"></stepper>
					   
					   <text class="gd-txt price">¥ {{i.total_price | number_format}}</text>
					</div>  
            </div> 
		</div>
    </div>
</template>
<script> 
import Vue from 'vue'
import checkbox from '../common/checkbox.vue';
import stepper  from '../common/stepper.vue';
import {number_format} from '../../../rest/common' 
 
Vue.filter('number_format', function(value) {
    return number_format(value, 2, ".", ",");
}) 
 
export default {
    props: ["items"], 
    components: {  
		 checkbox, 
		 stepper,
    },
    data() {
        return { 
		     selected:false,  
        }
    },
    methods: {
	    showdetail(productid) {  
			this.$router.push({path:'/detail',query:{from:'shoppingcart',productid: productid}});
	    },
		steppervaluechanged(event,id)
		{ 
			 this.$emit('steppervaluechanged', { value: event.value,id: id}); 
		},
		changevalue(event,id)
		{  
			 this.$emit('checkboxchanged', { value: event,id: id}); 
		},
    }
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}

.wrapper {
    background-color: #e5e5e5; 
    padding-left: 15px; 
	padding-right: 15px; 
	padding-top : 20px; 
	padding-bottom : 115px; 
    width: 750px; 
}
 
 
.gb-box {
    width: 720px;
	height: 250px;
    padding-top: 15px; 
	padding-bottom: 15px; 
    padding-left: 15px; 
	padding-right: 15px;
    flex-direction: row;
    flex-wrap: wrap;
	background-color: #ffffff;
    justify-content: space-between; 
    border-bottom-width: 1px;
    border-bottom-color: #dddddd;
}

.gd-checkbox
{
    padding-top: 60px;
}

.gd-img {
    width: 200px;
    height: 200px;  
	margin-top: 10px; 
	margin-left: 10px; 
    border-width: 1px;
    border-color: #cccccc;
	//box-shadow:1px 2px 2px #666666;
}

.gd-info {
    width: 400px;
    align-items: flex-start;
	padding-left: 15px; 
    justify-content: space-between;    
}
 

.gd-txt { 
   font-size: 28px;
   color: #333333;  
   overflow: hidden;
   text-align:left;
   lines: 1;
   
   text-overflow: ellipsis;
}
 
.price {
    color: #b4282d
} 

</style>