<template>
    <div class="app-wrapper"> 
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<tab-bar @tabTo="onTabTo" :items="items" :shoppingcart="shoppingcart" :usercenter="usercenter" :tabkey="index"></tab-bar>
    </div>
</template>
<style scoped>
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
<script> 
	import Vue from 'vue'
    import util from './utils/util';
    import tabBar from './common/tabBar.vue'; 
	import {get_profileid} from '../../rest/profile.js' 
	import {addshoppingcart,get_shoppingcart_count,get_share_config} from '../../rest/api.js' 
	import {supplier_info} from './config.js'
	import weixin from '../../rest/weixin'
	import rest from '../../rest/rest';  
	import {getdaystamp} from '../../rest/common.js'
	
    export default { 
        data () {
            return {
	            items: [], 
				shoppingcart : 0,
				usercenter : true, 
				index : 'home', 
			}
        },
        components: {
            'tab-bar': tabBar
        }, 
	    created() {   
			//this.$store.commit('profileid','f1mrhnxbq7w'); 
	        util.initIconFont();   
			var that = this;
			var globalEvent = weex.requireModule('globalEvent');
			globalEvent.addEventListener("shoppingcart", function(e) {
				  console.log('__________shoppingcart__________' + JSON.stringify(e) + '_____'+that.shoppingcart+'__________');  
				  that.shoppingcart = that.shoppingcart + 1;  
			});
			globalEvent.addEventListener("shoppingcartchanged", function(e) {
				  console.log('__________shoppingcartchanged_______________________');  
				  Vue.prototype.$storage.deleteSync('shoppingcart_count');  
		          setTimeout(() => {
	  			      get_shoppingcart_count().then(res => {   
	  					  that.shoppingcart = Number(res); 
	  			      });
		          }, 500);
			});  
			if (this.$store.state.uri != '')
			{
			      var uri = decodeURIComponent(this.$store.state.uri);
				  this.$store.commit('uri','');
				  uri = atob(uri);
				  console.log('____goto_________'+uri+'__________'); 
				  var split = uri.split('?');
				  var router = split[0];
				  if (split.length == 1)
				  {
				  	   console.log('____goto_________'+router+'_____________'); 
					   this.$router.push(router);
				  }
				  else
				  {
					  var params = split[1];
					  var seg = params.split('&');
					  var len = seg.length;
					  var ret = {};
					  for(var i=0;i<len;i++)
					  {
					     if (!seg[i])
						 {
						 	continue;
						 }
						 var s = seg[i].split('=');
						 ret[s[0]] = s[1];
					  }
					  console.log('____goto_________'+router+'______'+JSON.stringify(ret)+'________');  
					  this.$router.push({path:router,query:ret});
				  } 
			} 
	        supplier_info(this.index).then(res => {  
	   			this.items = res; 
	   	    }, 
			function(error) { 
	            that.$router.push('/connectfailed');
			});
	    },
		mounted(){
			if (this.$store.state.uri == '')
			{
			    var that = this;  
		   	    get_shoppingcart_count().then(res => {  
		   			this.shoppingcart = Number(res);  
		   	    }, 
				function(error) {
		           that.$router.push('/connectfailed');
				 });	  
		        
				this.share(); 
			}
	    },
        methods: {
		    share(){ 
			    var that = this;		  	  
			    get_share_config().then(res => {
					var link = window.location.href.split('#')[0]; 
					link = link + "oauth2.php?a=" + that.$store.state.appid + "&p=" + that.$store.state.profileid; 
					res.share_link = link;
					weixin.share(res,function() {
						console.log('__________share___________okokokokok____________');   
						var newcontent = rest.XN_Content.create('share','',false,2);					  
						newcontent.my.deleted = '0';  
						newcontent.my.profileid = that.$store.state.profileid; 
						newcontent.my.supplierid = that.$store.state.supplierid;   
						newcontent.my.module = 'profile';   
						newcontent.my.action = 'share';  
						newcontent.my.record = 'index';  
						newcontent.my.key = getdaystamp();   
						newcontent.save("").then(res => {  
						},
						function(error) {
							 console.log('________share_________' + JSON.stringify(error));							  
						}); 
					});
				});
			},
            onTabTo(_result){
                let _key = _result.data.key || '';
                this.$router && this.$router.push('/index/'+_key)
				if (_key == 'home')
				{
				   	this.share();			
				}
				else
				{
					weixin.hideallmenu();
				}
            }
        }
    }
</script>