<template>
      <div class="wrapper">
           <div class="main"> 
               <div class="content">
                   <vuecropper ref="cropper" :img-src="imgSrc" @finished="finished">
                   </vuecropper>
               </div>
           </div>
		   <topbar :top=50 :show="showtopbar" title="使用" @topbarclicked="topbarclicked"></topbar>
    </div>
</template> 
			 
<script> 
    import Vue from 'vue'
	import vuecropper from './cropper.vue'; 
	import topbar from '../common/topbar.vue'
	import weixin from '../../../rest/weixin'
	import {update_profile_link} from '../../../rest/profile'  
	
    export default {
	    components: { 
			vuecropper,
			topbar,
	    },  
	    data() {
	        return { 				  
				imgSrc:'', 
				showtopbar:true,
	        }
	    },
		mounted(){ 
				console.log('_____changehead_______' + JSON.stringify(this.$route.query)); 
			    if (this.$route.query)
				{  
					   var param = this.$route.query; 
					   if (param.image && param.image != '')
					   {
						     var that = this;
			  				 weixin.getLocalImgData([param.image]).then( res => {  
			  				     console.log('___________res_________' + res);  
			  					 that.imgSrc = res[0].value;
								 that.$refs.cropper.init();
			  				 });
					   }
			    }
		   
				
		},
        methods: {
		    finished(base64,data){ 
			     console.log(base64);  
				 weixin.uploadhead(base64).then( link => {  
				     console.log('___________upload_________' + link);  
					 update_profile_link(link).then( res => {  
					 		this.$router.replace('/index/usercenter'); 
					 });
				 });
		    },
			topbarclicked()
			{
				  // 确定使用
			      this.$nextTick(() => {
			        this.$refs.cropper.confirm();
			      })
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
		background-color: #fafafa;
    }
  	.iconfont {
  	    font-family: iconfont;
  	}    
    .main {
        height:100%;
        box-sizing: border-box;
        padding-top: 0px;
    }

    .content {
        height: 100%;
    }  
	 
</style>