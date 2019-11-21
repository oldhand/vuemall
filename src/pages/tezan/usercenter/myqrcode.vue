<template>
      <div class="wrapper">
	  	  <div class="bg"></div>
		  <image ref="qrcode" class="qrcode" resize="cover" :src="link"  @load="load"></image>
      </div>
</template> 

<script> 
	import {get_profileid,get_profile_info} from '../../../rest/profile'  
	import {application,webUrl} from '../../../rest/env' 
	import {gettimestamp} from '../../../rest/common' 
	
    export default {
	    components: { 
	    },  
	    data() {
	        return { 
				link:'/images/placeholder.jpg', 
	        }
	    },
		mounted() {    
			var that = this;
			get_profileid().then(profileid => {  
				get_profile_info().then(res => {    
					var link =  webUrl + '/qrcode.php?';
					var param = '';
					param += 'application=' + application;
					param += '&supplierid=' + this.$store.state.supplierid;
					param += '&profileid=' + res.profileid;
					param += '&image=' + res.image;
					param += '&givenname=' +  btoa(encodeURIComponent(res.givenname));
					param += '&province=' + btoa(encodeURIComponent(res.province));
					param += '&city=' + btoa(encodeURIComponent(res.city));
					param += '&gender=' + btoa(encodeURIComponent(res.gender));
					console.log('______param___'+param+'_____');
					link += 'p=' + btoa(param);
					var t = gettimestamp();
					link += '&t=' + t;
					that.link = link;  
					console.log('______qrcode___'+link+'_____');  
				});  
			});  
	    },
        methods: {
		    load ($event) {
			      if ($event.success) {
			 			 
			      }
		    }
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
		background-color: #cccccc;
    }
  	.iconfont {
  	    font-family: iconfont;
  	}  
	.bg {
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0; 
		bottom: 0;
		background-color: #fafafa;
	    border-top-width: 1px;
	    border-top-style: solid;
	    border-top-color: #cccccc;
	}
	.qrcode
	{
	    position: absolute;
	    top: 90px;
	    left: 50px;
	    height: 890px;
	    width: 650px; 
	    border-width: 1px;
	    border-style: solid;
	    border-color: #ffffff;
	} 
	 
</style>