<template>
    <div class="products-wrapper">  
            <div class="gb-box" v-for="i in items">  
					<div class="gd-img-container"> 
	               	 	<image class="gd-img" resize="cover" :src="i.productthumbnail" placeholder="/images/placeholder.jpg" @click="showdetail(i.productid)"></image>
					</div> 
					<div class="gd-info"> 
	               	   <text class="gd-txt">{{i.productname}}</text>
					   <text class="gd-txt" v-if="i.propertydesc != ''">{{i.propertydesc}}</text>
					   <div class="horizontalrow" >
					  	 	<text class="gd-txt">单价: </text>
							<text class="gd-txt price">¥ {{i.shop_price}}</text>
					   </div> 
					   <text class="gd-txt">数量: × {{i.quantity}} {{i.measurementunit}}</text>  
					   <div class="horizontalrow" >
					  	 	<text class="gd-txt">退货数量: </text>
							<text class="gd-txt price">{{i.returnedgoodsquantity}}</text>
					   </div>
					</div>  
            </div> 
		</div>
    </div>
</template>
<script> 
   
 
export default {
    props: ["items"], 
    components: {   
    },
    data() {
        return {   
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

.products-wrapper {
    background-color: #e5e5e5;   
    width: 750px; 
}
 
 
.gb-box {
    width: 750px;
	height: 250px;
    padding-top: 15px; 
	padding-bottom: 15px;  
    flex-direction: row;
    flex-wrap: wrap;
	background-color: #ffffff;
    justify-content: space-between; 
    border-bottom-width: 1px;
    border-bottom-color: #dddddd;
} 
.horizontalrow
{
	flex-direction: row;
}
.gd-img-container
{  
    width:235px;
	padding-left: 30px; 
    padding-top: 10px;  
}
.gd-img {
    width: 200px;
    height: 200px;  
    border-width: 1px;
    border-color: #cccccc;
	//box-shadow:1px 2px 2px #666666;
}

.gd-info {
    width: 500px;
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