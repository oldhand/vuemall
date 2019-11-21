<template>
  <div class="upload-wrapper">
  	   <div class="container"> 
		   <div v-for="i in images" class="item" @click="ondeleteclick(i)"> 
		   		<image class="upload-image" resize="cover" :src="i" ></image> 
		   </div>
		   <div class="upload" @click="onuploadclick" v-if="!disabled">
		  	 	<text class="upload-icon iconfont">&#xe690;</text> 
		   </div>
	   </div>
  </div>  
</template>

<script> 

import weixin from '../../../rest/weixin'

export default {
    props: {
      items: {
        type: Array,
        default: []
      }, 
      maxcount: {
        type: Number,
        default: 4
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },  
    data() {
        return { 
			images:[],   
        }
    },
	mounted() {   
		this.images = this.items;
	},
    watch: {
      items () {
           this.images = this.items;
      },
	},
    methods: {
        onuploadclick()
		{
		    if (this.disabled) return;
			var that = this; 
			weixin.chooseImage(this.maxcount,function(res) { 
				 console.log('____________chooseImage____________' + JSON.stringify(res)); 
				 that.images = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片  
				 that.$emit('uploaded', that.images); 
			});		  
		}, 
        ondeleteclick(key)
		{ 
			 if (this.disabled) return;
		     var newitem = [];
			 for (var i in this.items)
			 {
				 if (this.items[i] != key)
				 {
				 	newitem.push(this.items[i]);
				 }
			 }
			 this.items = newitem;
		},
    }
  };
</script>
<style scoped> 
    .upload-wrapper {
        width:750px;  
    }   
  	.iconfont {
  	    font-family: iconfont;
  	}   
	.container
	{ 
		padding:0px;
	    flex-direction: row;
	    flex-wrap: wrap; 
	}
	.upload {
	    width: 100px; 
		height: 100px;  
	    align-items: center;
	    justify-content: center;
	    border-width: 2px;
	    border-color: #cccccc;
		border-style: dashed;
		margin-left: 13px;  
		margin-top: 13px;  
	} 
	.item
	{
	    width: 100px; 
		height: 100px;  
	    align-items: center;
	    justify-content: center;
		margin-left: 13px;  
		margin-top: 13px;
	}
	.upload-icon { 
		color: #cccccc;
		font-size: 50px;
	}
	.upload-image
	{
	    width: 100px; 
		height: 100px;
	    border-width: 1px;
	    border-color: #cccccc; 
	}
</style>	
	