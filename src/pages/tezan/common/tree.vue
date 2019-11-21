<template>
  <div class="wrapper">    
		    <div v-for="node in nodes"> 
		   	 		<treenode :node="node"  
							  :height="nodeheight"
							  @onnodeclicked="onnodeclicked"></treenode> 
			</div>  
  </div> 
</template> 
<script>   
import treenode from './treenode.vue'; 
export default {
	    components: {   
			treenode,   
		}, 
	    props: { 
	        nodeheight: {
	            type: Number,
	            default: 100
	        },
	        expand: {
	             type: Boolean,
	             default: false
	        }, 
	        nodes: {
	            type: Array
	        }, 
	    },
        data() {
            return {  
		  		  
            }
        },
	    methods: { 
			 onnodeclicked(event)
			 {   
				 this.$emit('onnodeclicked', event);
			 },
		}
    }
</script>

<style scoped>  
	.wrapper
	{
		width:750px;  
		background-color: #ffffff;   
	} 
	.iconfont {
	    font-family: iconfont;
	}  

	
</style> 

