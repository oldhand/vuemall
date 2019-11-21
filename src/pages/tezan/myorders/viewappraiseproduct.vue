<template>
    <div class="products-wrapper">  
            <div class="gb-box">  
					<div class="gd-img-container"> 
	               	 	<image class="gd-img" resize="cover" :src="info.productthumbnail" placeholder="/images/placeholder.jpg"></image>
					</div> 
					<div class="gd-info"> 
	               	    <text class="gd-txt">商品名称：{{info.productname}}</text>
					    <text class="gd-txt" v-if="info.propertydesc != ''">商品属性：{{info.propertydesc}}</text>  
						<div class="horizontalrow" >
					  	 	<text class="gd-txt">单价: </text>
							<text class="gd-txt price">¥ {{info.shop_price}}</text>
					    </div> 
					    <text class="gd-txt">数量: × {{info.quantity}} {{info.measurementunit}}</text>  
					    <div class="horizontalrow" >
					  	 	<text class="gd-txt">小计: </text>
							<text class="gd-txt price">¥ {{info.total_price}}</text>
					    </div>
					</div> 
            </div>  
			<div class="appraise-box">
				<div class="praise">
					<propselect title="评价:" :disabled=true :items="appraiseitems"  /> 
				</div> 
				<div class="appraise-textarea">
					<am-list-textarea v-model="info.remark" title="评价内容:" :disabled=true :rows="2" :title-number="5" placeholder="请输入您的评价内容" ></am-list-textarea> 
				</div>
				<div class="uploads"> 
		  		    <upload :items="info.uploads" :disabled=true></upload> 
				</div>
			</div>
    </div>
</template>
<script> 
import upload from '../common/upload.vue'
import propselect from '../components/propselect.vue'
import textarea from '../components/textarea.vue'  
  
export default {
    props: ["info"], 
    components: {   
	 upload,
	 propselect, 
	 'am-list-textarea':textarea,
    },
    data() {
        return {   
		    appraiseitems:[{"title":"好评","key":"1","selected":true},{"title":"中评","key":"2"},{"title":"差评","key":"3"}],
        }
    },
	mounted(){    
			 console.log('__________mounted_________' + JSON.stringify(this.info)); 
			 for (var i in this.appraiseitems)
			 {											     
				if (this.appraiseitems[i].key == this.info.praise)
				{   
					this.appraiseitems[i].selected = true; 
				} 
				else
				{
					this.appraiseitems[i].selected = false; 
				}
			}
	}, 
    methods: {   
		 
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
	background-color: #ffffff;
} 
.appraise-box {
    width: 750px;
	height: 430px; 
	padding-bottom: 15px;  
    flex-direction: row;
    flex-wrap: wrap;
	background-color: #ffffff;
    justify-content: space-between; 
    border-bottom-width: 10px;
    border-bottom-color: #dddddd;
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
	border-bottom-style:dotted;
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
.praise
{
	padding-left:30px;
}
.uploads
{
	padding-top:10px;
	padding-left:30px;
}
.appraise-textarea
{
 	width: 740px;
}

</style>