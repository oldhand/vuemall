<template>   
  <div class="bill-wrapper" >
	 	 <div v-for="(i,index) in items" > 
	 			 <div class="container-date">
	 					<text class="line">----------------------</text>
	 					<text class="billdate">{{i.date}}</text>
	 					<text class="line">----------------------</text>
	             </div> 
			 	 <div v-for="bill in i.list" > 
			 			 <div class="container">  
		   			 			 <div class="container-left"> 
								 	 	<div class="container-title-left" v-if="bill.type=='+'"> 
		   			 						<text class="title">{{bill.title}}</text> 
											<text class="amount price">{{bill.amount}}</text> 
										</div>
										<text class="desc" v-if="bill.type=='+'">{{bill.desc}}</text> 
		   			             </div>
		   			 			 <div class="container-middle"> 
									    <div class="container-icon income" v-if="bill.type=='+'"> 
										    <text class="iconfont icon">&#xe684;</text>    
									    </div>
									    <div class="container-icon cost" v-else>  
											<text class="iconfont icon">&#xe686;</text>   
									    </div>
		   			             </div>
		   			 			 <div class="container-right"> 
								 	 	<div class="container-title-right" v-if="bill.type=='-'"> 
		   			 						<text class="title">{{bill.title}}</text> 
											<text class="amount price">{{bill.amount}}</text> 
										</div>
										<text class="desc" v-if="bill.type=='-'">{{bill.desc}}</text> 
		   			             </div>
			             </div> 
				 </div>
		 </div> 
		 
  </div>
</template>

<script> 
  import mycell from '../common/mycell.vue';   
  
  
  export default {
	  props: { 
	    items: {
	      type: Array,
	      default: []
	    },
	}, 
    components: {  
		 mycell, 
	},
    data () {
      return {  
	     allowpayment : false,
		 countdown: 0,
		 show: true, 
      }
    },  
	mounted() {  
	 
	}, 
    methods: {
 	 
		
     }
  }
</script>
<style scoped>  
	.bill-wrapper
	{
		width:750px;
	    padding-top: 5px;  
		background-color: #ffffff; 
		justify-content: center;
	} 
	.iconfont {
	    font-family: iconfont;
	}
	
	.container-date
	{
	    width: 650px;
	    margin-left: 50px;
	    margin-right: 50px; 
		flex-direction: row;
		align-items: center; 
		justify-content: center;
		padding-top:20px;
		padding-bottom:20px;
	}
	.billdate
	{
	    font-size: 30px;
	    color: #847b76;
	    font-weight: 500;
		text-align:center; 
		padding-left:8px;
		padding-right:8px;
	}
	.line
	{
	    font-size: 38px;
	    color: #cccccc; 
		text-align:center;   
	}
	
	.container
	{
	    width: 750px;  
		flex-direction: row; 
		justify-content: center;  
	}
	.container-left
	{
	    width: 330px; 
		height: 90x;
		align-items: flex-end; 
		justify-content: center;   
	}
	.container-right
	{
	    width: 330px; 
		height: 90x;
		align-items: flex-start; 
		justify-content: center;  
	}
	.container-middle
	{
	    width: 90px;  
		height: 90x; 
		align-items: center; 
		justify-content: center;
	} 
	.container-title-left
	{
		flex-direction: row; 
		align-items: flex-end; 
		justify-content: center;
	}
	.container-title-right
	{
		flex-direction: row; 
		align-items: center; 
		justify-content: flex-start; 
	}
	
    .title {
        color: #333333;
        font-size: 30px;
        line-height: 40px;
		lines: 1;
	    overflow: hidden; 
	    
	    text-overflow: ellipsis;
    }
	
    .amount {
        color: #b4282d;
        font-size: 30px;
        line-height: 40px;
		lines: 1;
	    overflow: hidden; 
	    
	    text-overflow: ellipsis;
		padding-left:5px;
    }

    .desc {
        color: #999999;
        font-size: 21px;
        line-height: 21px;
        margin-top: 4px;
		lines: 1;
	    overflow: hidden; 
	    
	    text-overflow: ellipsis;
    }
	.container-icon
	{
	    width: 60px;  
		height: 60x; 
		align-items: center; 
		justify-content: center;
		border-radius: 30px;
	}
	.income
	{
		background-color: green;  
	}
	.cost
	{
		background-color: #daa500;  
	} 
	.icon
	{
	 	color: #ffffff;
        font-size: 60px;
        line-height: 60px;
	}
</style> 

