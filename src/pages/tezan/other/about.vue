<template>
      <div class="wrapper"> 
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >   
		     <div class="logo"> 
				 <text class="logo-icon iconfont">&#xe600;</text> 
		         <text class="logo-text">{{platformname}}</text> 
				 <text class="version-text">Version 5.0</text> 
		     </div>  
		    <myfooter :height=200 :bottom=150 background-color="#fafafa" :border="false">  
				<div class="about-footer" >
					<text class="license" @click="onopenclick('license','软件许可及服务协议')">软件许可及服务协议</text> 
					<text class="saimingwei">{{companyname}} 版权所有</text> 
			  	    <text class="copyright">Copyright © 2010-2018 {{site}} All Rights Reserved.</text> 
			    </div>
		    </myfooter>
		</scroller> 
    </div>
</template> 

<script> 
import footer from '../common/footer.vue';
import {getdomain_info} from './config'

    export default {
	    components: { 
		'myfooter':footer
	    },  
	    data() {
	        return {
	             platformname:'',
				 osversion:'',
				 appname:'',
				 appversion:'',
				 companyname:'',
				 site:'',
	        }
	    },
		mounted() {    
		    this.platform = WXEnvironment.platform.toLowerCase();
        	this.osversion = WXEnvironment.osVersion || 'unknown';
        	this.appname = WXEnvironment.appName || 'unknown';
       	 	this.appversion = WXEnvironment.appVersion || 'unknown';
			getdomain_info().then(res => { 
				  this.companyname = res.companyname;
				  this.platformname = res.platformname;
				  this.site = res.site;
			});
	    },
        methods: { 
		    onopenclick(router,name) { 
			    this.$router.push('/'+router);  
		    },
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
		background-color: #fafafa;
    }
    .main-list {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
		background-color: #fafafa;
    }
  	.iconfont {
  	    font-family: iconfont;
  	}   
	.logo {
	    height: 350px;
		margin-top: 150px;
	} 
	.logo-icon {
	    position: absolute;
	    width: 750px;
	    height: 230px;
	    top: 0px;
	    left: 0px;
		text-align: center;
		color: #2bc114;
		font-size: 200px; 
	} 
	.logo-text {
	    position: absolute;
	    text-align: center;
	    font-size: 30px;
	    width: 750px;
	    top: 250px;
	    color: #333333;
	}
	.version-text {
	    position: absolute;
	    text-align: center;
	    font-size: 30px;
	    width: 750px;
	    top: 300px;
	    color: #333333;
	}
	.about-footer
	{
	    align-items: center;
	    justify-content: center;  
		width:750px;
		height: 200px; 
		flex-direction: column;
	}
	.license
	{ 
		width:750px;
	    height: 100px; 
		line-height: 100px;
		color:#30609e;
		font-size:36px;
		font-weight: 700;
		text-decoration: underline; 
		text-align:center;
	} 
	.saimingwei
	{ 
		width:750px;
	    height: 50px; 
		line-height: 50px;
		color:#333333;
		font-size:32px;
		text-align:center;
	}
	.copyright
	{ 
		width:750px;
	    height: 50px; 
		line-height: 50px;
		color:#999999;
		font-size:26px;
		text-align:center;
	}
	
</style>