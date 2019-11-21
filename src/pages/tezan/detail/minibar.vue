<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A top navigation bar.-->

<template>
  <div class="wxc-minibar" v-if="show">
    <div class="back bar-color" @click="backButtonClicked" :accessible="true">
        <text class="iconfont icon-text" >&#xe677;</text> 
    </div>  
    <div class="index bar-color" @click="indexButtonClicked"> 
	    <text class="iconfont icon-text" >&#xe629;</text>   
    </div>
    <div class="share bar-color" @click="shareButtonClicked"> 
	    <text class="iconfont icon-text" >&#xe678;</text>   
    </div>
  </div>
</template>

<style scoped>
	.iconfont {
	    font-family: iconfont;
	}
  .wxc-minibar {
    width: 750px;
    height: 90px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
    position: fixed;
    right: 0;
    top: 20px;
    left: 0;
	background-color: transparent;
	z-index:101;
  }
  .back:active{
     background-color: #999999;
  } 
  .index:active{
     background-color: #999999;
  } 
  .share:active {
     background-color: #999999;
  }
  .back {
	width: 80px;
	height: 80px;
	font-size: 30px;  
	margin-left: 15px;  
    justify-content: center;
	padding-right: 20px; 
	border-radius: 50px;
	align-items: flex-end;
	opacity:0.8;
  }  
  .index {
	width: 80px;
	height: 80px;
	font-size: 30px;  
	margin-left: 450px;  
    justify-content: center;
	padding-right: 17px; 
	border-radius: 50px;
	align-items: flex-end;
	opacity:0.8;
  }
  .share {
    width: 80px;
	height: 80px;
	font-size: 30px;  
	margin-right: 15px;  
    justify-content: center;
    padding-right: 20px; 
	border-radius: 50px;
    align-items: flex-end;
	opacity:0.8;
  }
  .bar-color {
    background-color: #dddddd;
  }
  .icon-text {
    font-size: 45px;
    color: #ffffff;
  }
</style>

<script>
  
  export default {
    props: { 
      show: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      backButtonClicked () {
	 	   this.$router.back(-1);
      },
      indexButtonClicked () {
	       this.$router.push('/index'); 
      },
      shareButtonClicked () {
            
      }
    }
  };
</script>
