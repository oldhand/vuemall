<template>
  <div class="wrapper">  
            <mycell :title="node.label" :desc="node.desc" :cellStyle="{height:height+'px'}" @click.native="oncellclick">  
			        <text slot="label" class="iconfont icon" v-if="node.expand && node.expand == true">&#xe687;</text>
					<text slot="label" class="iconfont icon" v-else>&#xe7e7;</text>
					<image slot="label" class="image" v-if="node.image && node.image != ''" resize="cover" :src="node.image"></image> 
			 		<text slot="action" class="iconfont" v-if="node.link && node.link == true" @click="onactionclicked" >&#xe672;</text>
            </mycell>  
		    <div v-for="childnode in node.children" :style="{'padding-left':'50px'}" v-if="node.expand  && node.expand == true">  
		   	 		<treenode :node="childnode"  
							  :height="height"
							  @onnodeclicked="onnodeclicked"></treenode> 
			</div>
  </div> 
</template> 
<script>    
import mycell from './mycell.vue'; 
    export default{ 
	    name: 'treenode',
	    components: {
	         mycell,    
	    },
	    props: { 
	        height: {
	            type: Number,
	            default: 100
	        }, 
	        node: {
	            type: Object
	        }, 
	    },
	    
        data() {
            return { 
			    show:false,  
            }
        },
	    methods: { 
			 onnodeclicked(event)
			 {   
				 this.$emit('onnodeclicked', event);
			 },
			 oncellclick()
			 {  
			     if (this.node.expand)
				 {
				    this.node.expand = false; 
				 }
				 else
				 {
				 	this.node.expand = true;  
				 } 
				 this.$emit('onnodeclicked', this.node);
			 },
			 onactionclicked()
			 {  
			      this.$emit('onclicked', this.node);
			 }
		}
    }
</script>

<style scoped>  
	.wrapper
	{  
		background-color: #ffffff;   
	} 
	.iconfont {
	    font-family: iconfont;
	}  
	.icon
	{
		width:50px;
		height:50px;
		font-size: 30px;   
		line-height: 50px;
		color:#555555;
		opacity:0.8;
	}
	.image{
		width:60px;
		height:60px; 
		padding-right:10px;
	}
</style> 

