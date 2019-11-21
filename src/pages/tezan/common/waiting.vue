<template>
  <div class="waiting-wrapper" v-if="show">
	  <div class="loading"> 
	     <image class="loading-image" src="https://gtms02.alicdn.com/tfs/TB1y4QbSXXXXXbgapXXXXXXXXXX-50-50.gif" 
	            :style="loadingStyle"
	            resize="contain"
	            quality="original"></image>
		 <text class="loading-text" >{{msg}}</text>   
	  </div> 
  </div>  
</template>

<script> 

export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      msg: {
        type: String,
        default: '正在获取数据,请稍候!'
      },
      width: {
        type: [Number, String],
        default: 50
      },
      height: {
        type: [Number, String],
        default: 50
      }
    }, 
    computed: {
      loadingStyle () {
        const { height, width } = this;
        return {
          height: `${height}px`,
          width: `${width}px`
        }
      }
    }
  };
</script>
<style scoped> 
    .waiting-wrapper {
        width:750px; 
	    border-top-width: 1px;
	    border-top-color: #cccccc;
    }  
	.loading {
	    padding-bottom: 20px;
		margin-top: 20px; 
		align-items: center;  
	} 
	.loading-image{ 
		width:50px;
		height:50px; 
	}  
	.loading-text { 
		margin-top: 10px;
	    text-align: center;
	    font-size: 30px;
		font-weight: 700;
	    width: 750px; 
	    color: #aaaaaa;
	} 
</style>	
	