<template>
      <div class="wrapper">
	     <div class="header">   
            <mycell :cellStyle="{height:'160px'}" @click.native="onchangeheadshow"> 
			    <text slot="label">头像</text>   
				<image slot="action" class="image" resize="cover" :src="profile_info.link"></image> 
				<text slot="action" class="iconfont">&#xe672;</text>
            </mycell>
		</div> 
		
	     <div class="info">  
            <mycell>
			     <text slot="label">昵称</text>  
                 <text slot="action" class="title">{{profile_info.givenname}}</text>  
            </mycell>  
            <mycell>
			     <text slot="label">性别</text>  
                 <text slot="action" class="title">{{profile_info.gender}}</text>  
            </mycell>
            <mycell>
			     <text slot="label">地区</text>  
                 <text slot="action" class="title">{{profile_info.province}}-{{profile_info.city}}</text>  
            </mycell>
            <mycell v-if="onelevelsourcer.givenname && onelevelsourcer.givenname != ''">
			     <text slot="label">您的推荐人</text>  
                 <text slot="action" class="title">{{onelevelsourcer.givenname}}</text>  
            </mycell>
            <mycell @click.native="onopenclick('myqrcode','二维码名片')">
			 	  <text slot="label" :style="{width:'220px'}">二维码名片</text> 
				  <text slot="action" class="iconfont title">&#xe62c;</text> 
                  <text slot="action" class="iconfont">&#xe672;</text> 
            </mycell>
		</div>
		
	     <div class="oper">  
	         <mycell @click.native="onopenclick('bindmobile','绑定手机')">
			 	  <text slot="label" >绑定手机</text>  
				  <text slot="action" class="title" v-if="profile_info.mobile != ''">{{profile_info.mobile}}</text> 
				  <text slot="action" class="title" v-else>待绑定</text> 
	              <text slot="action" class="iconfont">&#xe672;</text> 
	         </mycell>
            <mycell @click.native="onopenclick('changepwd','修改密码')">
				 <text slot="label">修改密码</text> 
                 <text slot="action" class="iconfont">&#xe672;</text> 
            </mycell>
		</div> 
    </div>
</template> 

<script>
    import Vue from 'vue'
	import mycell from '../common/mycell.vue'; 
	import {get_profileid,get_profile_info,get_givenprofile_info} from '../../../rest/profile'  
	import {webUrl} from '../../../rest/env'
	import {update_profile_info} from '../../../rest/profile'  
	
	import weixin from '../../../rest/weixin'
	
    export default {
	    components: {
	        mycell,  
	    },  
		mounted() {    
			var that = this;
			get_profileid().then(profileid => {  
				get_profile_info().then(res => { 
				    that.profile_info = res;  
					that.profileid = res.profileid; 
					if (res.hassourcer == '1' && res.onelevelsourcer != '')
					{
						get_givenprofile_info(res.onelevelsourcer).then(res => { 
						    that.onelevelsourcer = res;   
						});
					} 
				});  
			},
			function(error) {	  
			});
	    },
	    data() {
	        return { 
				profile_info:{},  
				profileid:'', 
				onelevelsourcer:{}, 
	        }
	    },
        methods: {
		    onopenclick(router,name) {   
			   this.$router.push('/'+router);  
		    }, 
			onchangeheadshow()
			{ 
			    var that = this;
				weixin.chooseImage(1,function(res) { 
					 console.log('____________chooseImage____________' + JSON.stringify(res)); 
					 //返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片  
					 that.$router.push({path:'/changehead',query:{image: res.localIds[0]}}); 
				}); 
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
  	.iconfont {
  	    font-family: iconfont;
  	}  
	.login-title
	{
	    font-size: 38px;
	    color: #847b76;
	    font-weight: 700;
		text-align:center;
		padding-bottom:20px;
	}
    .header{
        margin-top: 30px;
    }
    .info{
        margin-top: 10px;
    }
    .oper{
        margin-top: 10px;
    }
	.title
	{
		 color: #aaaaaa;
		 padding-right:5px;
	}
	.image
	{
		width:80px;
		height:80px;
		margin-right:10px;
	}
	
	
    .logout-wrapper{ 
        margin-top: 40px;
	    align-items: center;
	    justify-content: center;
    }
    .logout {
        height: 100px;
        width: 750px;
        background-color: #ffffff;  
    }
    .logout:active {
      background-color: #eeeeee;
    }
    .logout-txt{
        height: 100px; 
        text-align: center;
        line-height: 100px;
        color: #333333;
        font-size: 35px;
    } 
	 
</style>