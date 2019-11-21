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
		  		<div v-for="i in appraise"> 
			 			<viewappraiseproduct :info="i" ></viewappraiseproduct>  
				</div>
		</scroller>  
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
	import viewappraiseproduct from './viewappraiseproduct.vue'; 
	
	import {get_order_info,save_appraise,get_appraises} from './config'
	
    export default {
	    components: { 
		 'am-picker':picker,
		 'am-list-item':listitem,
		 'am-list':list,
		 'am-list-input':input, 
		 'am-list-textarea':textarea,
		 mycell,   
		 viewappraiseproduct,   
	    },  
	    data() {
	        return {
				params:{},    	 
				orderid:'',  
				appraise:[],
				order_info:{}, 
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
							var appraise = this.order_info.products;
							this.appraisestatus = this.order_info.appraisestatus;
							if (this.appraisestatus == 'yes')
							{
								  get_appraises(this.orderid).then( res => {   
										for (var j in appraise)
										{  
											for (var i in res)
											{											     
												if (appraise[j].id == res[i].orders_products_id)
												{   
													appraise[j].praise = res[i].praise;
													appraise[j].remark = res[i].remark;
													appraise[j].uploads = res[i].uploads; 
												} 
											}
										}
										this.appraise = appraise;
										console.log('__________this.appraise_________' + JSON.stringify(appraise)); 
								  });
							} 
		   				});
					} 
		 			 
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