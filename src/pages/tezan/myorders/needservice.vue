<template>
      <div class="wrapper">  
	      <div class="payement-info">  
	         <mycell :cellStyle="{height:'70px'}" > 
			        <text slot="label" class="cell-label">订单号:</text> 
					<text slot="title" class="cell-text">{{order_info.mall_orders_no}}</text>
	         </mycell>
	         <mycell :cellStyle="{height:'70px'}" > 
			        <text slot="label" class="cell-label">总计:</text> 
					<text slot="title" class="cell-text price">¥ {{order_info.sumorderstotal | number_format}}</text>
	         </mycell>  
	         <mycell :cellStyle="{height:'70px'}" > 
			        <text slot="label" class="cell-label">订单状态:</text> 
					<text slot="title" class="cell-text price">{{order_info.order_status}}</text>
	         </mycell>
	         <div class="box-border"></div> 
		 </div>
		 <scroller class="needservice-main-list" offset-accuracy="300px" @scroll="scroll" >   
			   <am-list>  
			           <am-picker title="请选择" :data="services" v-model="servicetype" >
			           		<am-list-item  slot-scope="{ extra, show }" title="售后类型:" :extra="extra" :title-number="5" :extra-style="{width:'520px'}" @click.native="show"></am-list-item> 
				       </am-picker> 
					   <am-list-textarea v-model="reason" title="售后原因:" :rows="3" :title-number="5" placeholder="请一定要详细具明退换/售后的理由，谢谢！"></am-list-textarea>
				  
			 </am-list> 
			 <div class="products">
			    <products :items="order_info.products" @steppervaluechanged="steppervaluechanged"></products>
			 </div> 
		    <text class="upload-label">上传图片(最多四张)</text> 
		    <upload :items="items" @uploaded="uploaded"></upload>
		</scroller> 
		<topbar :top=50 :show="showtopbar" @topbarclicked="topbarclicked"></topbar>
    </div>
</template> 

<script> 
    import Vue from 'vue'
	import picker from '../components/picker.vue'   
	import listitem from '../components/listitem.vue'   
	import list from '../components/list.vue'  
	import input from '../components/input.vue'  
	import textarea from '../components/textarea.vue'  
	import upload from '../common/upload.vue'
	import mycell from '../common/mycell.vue';
	import products from './needservice_products';
	import topbar from '../common/topbar.vue'
	
	import {get_order_info,aftersaleservice_submit} from './config'
	import weixin from '../../../rest/weixin'
	
    export default {
	    components: { 
		 'am-picker':picker,
		 'am-list-item':listitem,
		 'am-list':list,
		 'am-list-input':input, 
		 'am-list-textarea':textarea,
		 mycell,  
		 upload,
		 products,  
		 topbar,
	    },  
	    data() {
	        return {
				params:{},   
	            servicetype: [],
				orders_products: [],	
				uploads: [],  
				reason: '',   
			    services:[{value: '换货',label: '换货'},{value: '退货',label: '退货'},{value: '维修',label: '维修'},{value: '咨询',label: '咨询'},
						   {value: '物流',label: '物流'},{value: '其他',label: '其他'}], 
				items:[],  
				orderid:0,  
				order_info:{},
				showtopbar:true,
	        }
	    },  
		mounted() {      
					var that = this;
				    if (this.$route.query)
					{   
				   		 this.params = this.$route.query;
						 this.orderid = this.params.orderid; 
						 get_order_info(this.orderid).then( res => {  
						 	console.log('___________get_order_info_______'+this.orderid+'_________' + JSON.stringify(res));    
						 	this.order_info = res;  
							for (var i in this.order_info.products)
							{
								 this.orders_products.push({id:this.order_info.products[i].id,value:0}); 
							}
		   				});
					} 
	    },
        methods: { 
				uploaded(images)
				{ 
					this.uploads = images;
				},
	  			topbarclicked()
				{
	 				var that = this;
	  				this.showtopbar = false;
	 				if (this.servicetype.length == 0)
	 				{
	 					this.$notice.toast({ message: '售后类型必填!' });
	 			        setTimeout(() => {
	 			          that.showtopbar = true;
	 			        }, 500);
	 					return;
	 				} 
			 	    var found = false;
					for (var i in this.orders_products)
					{
						if (this.orders_products[i].value > 0)
						{ 
							found = true;
						}
					}
					if (!found)
					{
	 					this.$notice.toast({ message: '退货商品必须确定!' });
	 			        setTimeout(() => {
	 			          that.showtopbar = true;
	 			        }, 500);
	 					return;
					}
					if (this.uploads.length == 0)
					{
						this.saveaftersaleservice([]);
					}
					weixin.getLocalImgData(this.uploads).then( res => {  
						 console.log('___________getLocalImgData_________' + JSON.stringify(res));   
						 weixin.upload(res).then( uploads => {  
						     console.log('___________upload_________' + JSON.stringify(uploads));  
							 var images = [];
		 					 for (var i in uploads)
		 					 {
							 	images.push(uploads[i].value); 
		 					 }
						  	 this.saveaftersaleservice(images); 
						 });  
		   			});
				},
	  			saveaftersaleservice(uploads)	  			
	  			{
	 				var that = this;
	  				this.showtopbar = false;  
					aftersaleservice_submit(this.orderid,this.orders_products,uploads,this.servicetype,this.reason).then( res => {  
					 	 console.log('___________aftersaleservice_submit_________' + JSON.stringify(res));    
					 	 this.$router.push('/aftersaleservice');
	   				},
					function(error) {
 	 					that.$notice.toast({ message: error });
 	 			        setTimeout(() => {
 	 			          that.showtopbar = true;
 	 			        }, 500); 
					}); 
	          },
			  steppervaluechanged(event)
			  {    
			 	    var found = false;
					for (var i in this.orders_products)
					{
						if (this.orders_products[i].id == event.id)
						{
							this.orders_products[i].value = event.value;
							found = true;
						}
					}
					if (!found)
					{
						this.orders_products.push(event);
					}
			  		console.log('___________steppervaluechanged_________' + JSON.stringify(event));    
					console.log('___________orders_products_________' + JSON.stringify(this.orders_products));    
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
	.needservice-main-list { 
	    position: fixed;
	    top: 230px; 
	    bottom: 0px;
	    left: 0;
	    right: 0;
	}  
	.upload-label
	{
	   padding-left:30px;
	   padding-top:30px;
	}
    .payement-info{
        margin-top: 10px;
		width:750px; 
    }
	.cell-label { 
		font-size: 30px;  
		width:130px;
		text-align:right;
		color:#888888;
		font-weight: 600;
	}
	.cell-text {
	   font-size: 30px;
	   padding-left:15px;
	}
	.box-border
	{
		width:750px;
		height:15px;
		background-color: #cccccc; 
	}
   
</style>