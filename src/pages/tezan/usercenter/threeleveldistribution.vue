<template>
    <div class="threeleveldistribution-wrapper"> 
		<waiting :show="showwaiting" :msg="waittext" width="60" height="60"></waiting> 
		<scroller ref="scroller" class="main-list" offset-accuracy="300px" @scroll="scroll" >
		   	     <div v-if="showempty" class="empty"> 
		   			 <text class="empty-icon iconfont">&#xe630;</text> 
		   	         <text class="empty-text">还没有相关的数据!</text> 
		   	     </div>
				<tree :nodes="nodes"
				      @onnodeclicked="onnodeclicked"></tree> 
 		</scroller>
    </div>
</template>
 
<script>
import tree from '../common/tree.vue'; 
import waiting from '../common/waiting.vue';  
import {get_distributions,get_threeleveldistributions} from './threeleveldistribution'   

export default {
	    components: {   
			tree,   
			waiting,  
		},
		mounted() { 
		         var that = this;   
				 get_distributions().then( res => {  
				 	console.log('___________get_distributions_________' + JSON.stringify(res));   
					that.waittext = '';
					that.showwaiting = false;  
					if (res.length > 0)
					{
						that.nodes = res; 
						that.showempty = false;
					}
					else
					{
						this.nodes = []; 
						that.showempty = true;
					} 
				},
				function(error) {			
					that.waittext = '';
					that.showwaiting = false; 
					showempty: false;
				});   
		},
	    data() {
	         return {
	  		   showwaiting:true,
	  		   waittext:'正在获取数据，请稍候!',
			   showempty: false,
	           nodes: [], 
	         };
	       },
        methods:{ 
			onnodeclicked(node)
			{   
				console.log('___________onnodeclicked_________' + JSON.stringify(node));   
				if (!node.load)
				{
					if (node.level == 1 || node.level == 2)
					{
				         var that = this;   
						 that.$notice.loading.show() 
						 get_threeleveldistributions(node.level,node.id).then( res => {    
							node.children = res;
							that.$notice.loading.hide(); 						 
						},
						function(error) {		 
						});
					} 
					node.load = true;
				}
			}
        }
    }
</script>
 
<style scoped>
    .threeleveldistribution-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
  	.iconfont {
  	    font-family: iconfont;
  	} 
	.main-list { 
	    position: fixed;
	    top: 0px; 
	    bottom: 0px;
	    left: 0;
	    right: 0;
	}
	.empty {
	    height: 350px;
		margin-top: 50px;
	}

	.empty-icon {
	    position: absolute;
	    width: 750px;
	    height: 230px;
	    top: 0px;
	    left: 0px;
		text-align: center;
		color: #cccccc;
		font-size: 200px;
	}

	.empty-text {
	    position: absolute;
	    text-align: center;
	    font-size: 30px;
	    width: 750px;
	    top: 250px;
	    color: #999999;
	}
</style>