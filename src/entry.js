/* global Vue */

/* weex initialized here, please do not move this line */
const router = require('./router') 
const App = require('@/index.vue') 

import * as filters from '@/filters'
import mixins from '@/mixins'  

import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
 

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)
  
 
import  '@/widget'  
import store from '@/store'
import weixin from '@/rest/weixin'
import base64 from '@/rest/base64'
import md5 from '@/rest/md5'

router.beforeEach((to, from, next) => { 	 
	  if (to.query.supplierid && to.query.supplierid != "" && 
		  to.query.appid && to.query.appid != "" && 
		  to.query.openid  && to.query.openid != "" &&  
	  	  to.query.signature && to.query.signature != "" &&
          from.path != "/oauth2" && from.path != "/viewerrormsg") 
	  {  
		   let supplierid = to.query.supplierid;
		   let appid = to.query.appid;
		   let openid = to.query.openid;
		   let signature = to.query.signature;
		   let share = to.query.share;
		   let uri = to.query.uri;
		   let time = to.query.time;
		   let str = "supplierid="+supplierid+"&appid="+appid+"&openid="+openid+"&share="+share+"&uri="+uri+"&time="+time; 
		   //console.log(to);  
		   if (to.query.profileid  && to.query.profileid != "")
		   {
			    let profileid = to.query.profileid; 
			    str = str + "&profileid="+profileid
				if (signature == md5(str+'tezan168'))
				{
					//console.log('____supplierid_____'+supplierid+'__________');  
	     		    store.commit('supplierid',supplierid);
		   			store.commit('profileid',profileid); 
		   			store.commit('openid',openid); 
		   			store.commit('appid',appid); 
		   			store.commit('share',share); 
		   			store.commit('uri',uri);   
	     	   		store.commit('loginstatus',2);  
	     			next();
				}
				else
				{
					  store.commit('loginstatus',1);  
	   			  	  store.commit('errormsg',"微信认证验证失败!");
	     			  next({path:'/viewerrormsg'}); 
				}
     		   
		   }
		   else if (to.query.mqid  && to.query.mqid != "")
		   {
			    let mqid = to.query.mqid; 
			    str = str + "&mqid="+mqid
				if (signature == md5(str+'tezan168'))
				{
	     		    store.commit('supplierid',supplierid);
		   			store.commit('mqid',mqid); 
		   			store.commit('openid',openid); 
		   			store.commit('appid',appid); 
		   			store.commit('share',share); 
		   			store.commit('uri',uri);   
					store.commit('errormsg',"");
	     	   		store.commit('loginstatus',1);  
	     			next();
				}
				else
				{
					  store.commit('loginstatus',1);  
	   			  	  store.commit('errormsg',"微信认证验证失败!");
	     			  next({path:'/viewerrormsg'}); 
				}
		   }
		   else
		   {
			  store.commit('loginstatus',1);  
 			  store.commit('errormsg',"微信认证参数错误!");
   			  next({path:'/viewerrormsg'});
		   }
  		    
  	  }     
	  else if (store.state.loginstatus == 0) 
	  {	 
		  if (to.path == '/viewerrormsg')
		  {
			    if (to.meta.title) { 
			    	document.title = to.meta.title 
			    }  
		  		next();
		  }		 
		  else
		  {		  	 
			  store.commit('errormsg',"请从公众号菜单,或分享链接进入本系统!");
  			  next({path:'/viewerrormsg'});
		  }  
	  }  
  	  else if (store.state.loginstatus == 1)
  	  {  
		  if (to.path == '/oauth2' || to.path == '/viewerrormsg')
		  {
			    if (to.meta.title) { 
			    	document.title = to.meta.title 
			    }  
		  		next();
		  }
		  else
		  {
			    if (store.state.errormsg != "")
				{
					next({path:'/viewerrormsg'});
				}
				else
				{
					next({path:'/oauth2'});
				} 
		  } 
  	  } 
	  else
	  {
		  if (to.meta.title) {
		    	/* 路由发生变化修改页面title */  
		    	document.title = to.meta.title 
		  }  
		  if (from.meta.redirect && from.meta.to)
		  {
			  	 if (from.meta.to == to.path)
				 {
					 next({path:from.meta.redirect});
				 }
				 else
				 {
				 	 next();
				 }	
		  }
		  else
		  {
			  	 next();
		  } 
	  } 
});
 


/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root',router,store}, App))
router.push('/')
