<template>
      <div class="wrapper"> 
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >   
			 	  <div class="info">
				 	  <text class="title">{{message.message}}</text>  
	                  <mycell :cellStyle="{height:'90px'}">  
	      					<text slot="title" class="cell-text">系统 {{message.published | simpledatetime }} 发送</text>  
	                  </mycell>
	                  <mycell :cellStyle="{height:'90px'}" v-if="message.viewtime != ''" >  
	      					<text slot="title" class="cell-text">阅读时间: {{message.viewtime | simpledatetime }}</text>  
	                  </mycell>
				   </div>
		</scroller> 
    </div>
</template> 

<script>
	import Vue from 'vue'
	import mycell from '../common/mycell.vue'; 
	import { get_messge_info } from './message.js'   
	import {number_format,date_format,todatetime} from '../../../rest/common' 
	
    Vue.filter('simpledatetime', function(value) {
       return date_format(todatetime(value), "YYYY-MM-DD HH:mm");
    })
	
    export default {
	    components: {
	         mycell,   
	    },  
	    data() {
	        return {
	              message: {},   
	        }
	    },
		mounted() {    
	 	    if (this.$route.query)
	 		{  
 		   	   var param = this.$route.query;
			   if (param.messageid && param.messageid != '')
			   {
					get_messge_info(param.messageid).then(res => {   
						    console.log('____________get_messge_info_____' + JSON.stringify(res));    
							this.message = res;  
					});
			   } 
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
		background-color: #ffffff;
    }
  	.iconfont {
  	    font-family: iconfont;
  	}    
	.main-list { 
	 	padding-top: 20px;
	    margin-bottom: 0px;
		background-color: #ffffff;
	}   
	.info
	{
	    width: 700px;   
		align-items: center;
	    justify-content: center;
		
	}
	.title {  
	    width: 700px; 
		text-align:left;
		padding-left:50px; 
	}
	.cell-text
	{  
	   color:#cccccc;
	} 
</style>