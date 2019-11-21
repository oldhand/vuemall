<template>
  <div class="wrapper">
      <div class="image-container">
          <image class="image" resize="cover" src="/images/failure.png"></image> 
      </div> 
	  <text class="info">与服务器连接失败,请稍后尝试!</text>
	  <div class="link"> 
			<div class="back" @click="onbackclick">
				<text class="text iconfont">&#xe758;</text>
		    	<text class="text back-txt">刷新试试</text>
			</div>
			<div class="mainpage" @click="onmainpageclick">
				<text class="text iconfont">&#xe629;</text>
		    	<text class="text mainpage-txt">返回首页</text>
			</div>
	  </div>	
  </div>
</template>

<script> 
  export default {  
    methods: {
	        onbackclick () {
		  	    this.$router.back(-1);
	        },
	        onmainpageclick () {
	  	        this.$router.push('/index');
	        },
     }
  }
</script>
<style scoped> 
.iconfont {
    font-family: iconfont;
}

.wrapper { 
	padding-top:250px;
    align-items: center;
    justify-content: center;
	width:750px; 
} 

.image-container {  
	padding-bottom:50px;
}

.image { 
    width: 154px;
	height: 139px;
}
.info { 
     font-size: 36px;
     color: #b4272d;
     font-weight: 700; 
} 

.link {  
     padding-top:80px;
	 flex-direction: row;
}

.mainpage {    
	 width:200px;
	 height:50px; 	
	 margin-left: 50px;  
	 flex-direction: row;
	 border-radius: 10px; 
}
.text {  
	 font-size: 32px;  
	 color:#333333; 
	 line-height: 50px;
}

.mainpage-txt { 
   padding-left:5px;
}

 
.back {    
	 width:200px;
	 height:50px; 	  
	 flex-direction: row;
	 border-radius: 10px; 
}
.text {  
	 font-size: 32px;  
	 color:#333333; 
	 line-height: 50px;
}

.back-txt { 
   padding-left:5px;
}

</style> 

