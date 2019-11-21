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
		 <scroller class="needservice-main-list" offset-accuracy="300px">  
		  		<div v-for="i in order_info.products"> 
			 			<appraiseproduct :info="i" @onappraisechange="onappraisechange"></appraiseproduct>  
				</div>
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
	import mycell from '../common/mycell.vue';
	import appraiseproduct from './appraiseproduct.vue';
	import topbar from '../common/topbar.vue'
	
	import {get_order_info,save_appraise} from './config'
	import weixin from '../../../rest/weixin'
	
    export default {
	    components: { 
		 'am-picker':picker,
		 'am-list-item':listitem,
		 'am-list':list,
		 'am-list-input':input, 
		 'am-list-textarea':textarea,
		 mycell,   
		 appraiseproduct,  
		 topbar,
	    },  
	    data() {
	        return {
				params:{},     
				orderid:'',  
				appraise:[],
				order_info:{},
				showtopbar:false,
				appraisestatus:'', 
	        }
	    },  
	    provide () {
	      return {
	          noBorder: this.noBorder
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
								var product_info = this.order_info.products[i];  
								this.appraise.push({"orders_products_id":product_info.id,"productid":product_info.productid,"praise":1,"remark":"","uploads":[]});
							}
							this.appraisestatus = this.order_info.appraisestatus;
							if (this.appraisestatus == 'yes')
							{
								this.showtopbar = false;
							}
							else
							{
								this.showtopbar = true;
							}  
		   				});
					} 
		 			 
	    },
        methods: { 
	  			topbarclicked()
	  			{
		 			var that = this;
					this.showtopbar = false;
		 	        this.$notice.confirm({
		 	            title: '警告',
		 	            message: '确定提交评价吗?', 
		 	            okCallback () { 
		 			        that.showtopbar = true;
							console.log('______topbarclicked_____________' + JSON.stringify(that.appraise));   
							var needuploads = [];
							for (var i in that.appraise)
							{
								 for (var j in that.appraise[i].uploads)
								 {
									var image = that.appraise[i].uploads[j]; 
									if (needuploads.indexOf(image) == -1)
									{ 
										needuploads.push(image);   
									} 
								 } 
							} 
							if (needuploads.length > 0)
							{ 
			 					weixin.getLocalImgData(needuploads).then( res => {  
			 						 console.log('___________getLocalImgData_________' + JSON.stringify(res));   
			 						 weixin.upload(res).then( uploads => {  
			 						     console.log('___________upload_________' + JSON.stringify(uploads));   
			 						  	 that.showtopbar = true;  
			 							 for (var i in that.appraise)
			 							 {
										     if (that.appraise[i].uploads.length > 0)
											 {
											     var images = [];
				 								 for (var j in that.appraise[i].uploads)
				 								 {  
			   			 							 for (var k in uploads)
			   			 							 {
													  	  if (uploads[k].key == that.appraise[i].uploads[j])
														  {
														  		images.push(uploads[k].value); 	
														  }
													 }
				 								 }
												 that.appraise[i].uploads = images;
											 } 
			 							 }  
	 									 save_appraise(that.orderid,that.appraise).then(res => {  
	 							 			   that.$router.push({path:'/appraise'});
	 									 });
			 						 });  
			 		   			});
							}
							else
							{
									save_appraise(that.orderid,that.appraise).then(res => {  
							 			   that.$router.push({path:'/appraise'});
									});
							} 
		 	            },
		 	            cancelCallback () { 
		 			       that.showtopbar = true;
		 	            },
		 	        })
	            },  
				onappraisechange(event)
				{
						console.log('______onappraisechange_____________' + JSON.stringify(event));  
						for (var i in this.appraise)
						{
							if (this.appraise[i].orders_products_id == event.id)
							{
								this.appraise[i].praise =  event.key;
								this.appraise[i].remark =  event.remark;
								this.appraise[i].uploads =  event.items;
							}   
						} 
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