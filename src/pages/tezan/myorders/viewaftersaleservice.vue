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
			   <am-list>   
					   <am-list-input v-model="servicetype" :disabled=true :max-length=12  title="售后类型:" :title-number="5" placeholder=""></am-list-input>
					   <am-list-textarea v-model="reason" :disabled=true title="售后原因:" :rows="3" :title-number="5" placeholder=""></am-list-textarea> 
			  </am-list> 
			 <div class="products">
			    <products :items="orders_products"></products>
			 </div>  
		     <upload :items="uploads" :disabled=true></upload>
			 <div class="reply"> 
				  <am-list-textarea v-model="reply" title="回复:" :rows="2" :title-number="3" placeholder="在此您可以继续回复信息给客服。"></am-list-textarea>  
			 </div>
			 <flow :items="items" :customStyles="customStyles"></flow> 
		</scroller> 
		<topbar :top=50 :show="showtopbar" @topbarclicked="topbarclicked"></topbar>
    </div>
</template> 

<script> 
    import Vue from 'vue' 
	import listitem from '../components/listitem.vue'   
	import list from '../components/list.vue'  
	import input from '../components/input.vue'  
	import textarea from '../components/textarea.vue'  
	import upload from '../common/upload.vue'
	import mycell from '../common/mycell.vue';
	import products from './viewaftersaleservice_products';
	import topbar from '../common/topbar.vue'
	import flow from '../common/flow.vue';  
	
	import {get_order_info,get_aftersaleservice,save_aftersaleservice_reply} from './config'
	import {number_format,date_format,todatetime} from '../../../rest/common' 
	
    export default {
	    components: {  
		 'am-list-item':listitem,
		 'am-list':list,
		 'am-list-input':input, 
		 'am-list-textarea':textarea,
		 mycell,  
		 upload,
		 products,  
		 topbar,
		 flow,
	    },  
	    data() {
	        return {
				params:{},    
				orders_products: [],	
				uploads: [], 
				servicetype:'', 
				reason: '', 
				reply:'',  
				items:[],  
				uploads:[],  
				orderid:0,  
				applyid:'',
				order_info:{},
				showtopbar:true,
 	            customStyles: {
 	               'highlightTitleColor': '#EE9900',
 	               'highlightPointInnerColor': '#EE9900',
 	               'highlightPointBorderColor': '#FFE78D'
 	           },
	        }
	    },  
		mounted() {      
					var that = this;
				    if (this.$route.query)
					{   
				   		 this.params = this.$route.query;
						 this.orderid = this.params.orderid; 
						 get_order_info(this.orderid).then(res => {  
						 	console.log('___________get_order_info_______'+this.orderid+'_________' + JSON.stringify(res));    
						 	this.order_info = res; 
							var orders_products = res.products; 
							get_aftersaleservice(this.orderid).then(aftersaleservice_info => {  
						 		    console.log('____________get_aftersaleservice________' + JSON.stringify(aftersaleservice_info)); 
								    this.servicetype = aftersaleservice_info.servicetype;
								    this.reason = aftersaleservice_info.reason; 
									this.uploads = aftersaleservice_info.images;
									this.applyid = aftersaleservice_info.id;
									for (var j in orders_products)
									{  
										for (var i in aftersaleservice_info.products)
										{											     
											if (orders_products[j].id == aftersaleservice_info.products[i].orders_products_id)
											{   
												orders_products[j].returnedgoodsquantity = aftersaleservice_info.products[i].returnedgoodsquantity; 
											} 
										}
									}
									this.orders_products = orders_products;
									console.log('____________orders_products________' + JSON.stringify(orders_products)); 
									var start = { desc: date_format(todatetime(aftersaleservice_info.published),"YYYY-MM-DD HH:mm")+' 创建',title:'创建售后申请','highlight': true,};  
									that.items.push(start);
									
									for (var i in aftersaleservice_info.details)
									{											     
										 var step_info = aftersaleservice_info.details[i];
										 var published = date_format(todatetime(step_info.published),"YYYY-MM-DD HH:mm");
	 									 var step = { desc: published + ' ' + step_info.givenname +  '回复：' + step_info.content,title:step_info.step};  
	 									 that.items.push(step);
									}
									if (this.order_info.returnedgoodsstatus == "yes")
									{										 
										 var published = date_format(todatetime(this.order_info.submitreturnedgoodsdatetime),"YYYY-MM-DD HH:mm");
	 									 var step = { desc: published + " 结束售后。",title:"结束",'highlight': true};  
	 									 that.items.push(step);
									}
							});
		   				});
					} 
		 			 
	    },
        methods: { 
	  			topbarclicked()
	  			{ 
	 				var that = this;
	  				this.showtopbar = false;
	 				if (this.reply.length == 0)
	 				{
	 					this.$notice.toast({ message: '回复内容不能为空!' });
	 			        setTimeout(() => {
	 			          that.showtopbar = true;
	 			        }, 500);
	 					return;
	 				} 			
					console.log('____________'+this.orderid+'_____'+this.applyid+'___'+this.reply+'______'); 	
					save_aftersaleservice_reply(this.orderid,this.applyid,this.reply).then(res => {  
						 console.log('____________save_aftersaleservice_reply________' + JSON.stringify(res)); 	
						 var published = date_format(todatetime(res.published),"YYYY-MM-DD HH:mm");
						 var step = { desc: published + ' 回复：' + res.my.content,title:res.my.step};  
						 this.items.push(step);
					}); 
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
	.reply
	{
	    border-top-width: 10px;
	    border-top-color: #dddddd;
		margin-top: 25px;
	}
   
</style>