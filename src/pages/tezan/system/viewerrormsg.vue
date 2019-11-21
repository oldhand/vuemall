<template>
  <div class="wrapper">
      <div class="image-container">
          <image class="image" resize="cover" src="/images/failure.png"></image> 
      </div> 
	  <text class="info">{{errormsg}}</text> 
  </div>
</template>

<script> 
  export default {  
	  data () {
	  	  return { 
	  		errormsg : '', 
	  	  }
	  }, 
	  mounted(){ 
			this.errormsg = this.$store.state.errormsg; 
      },
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
	 width:680px;  
	 text-align:center;
} 
 

</style> 

