import {application,webUrl,imgBaseUrl} from './env'
import rest from './rest';   
import base64 from './base64';   
import sha1 from './sha1';  
import wx from './jweixin-1.3.2.js'
import Vue from 'vue'
import store from '../store/index' 
import _isFunction from 'lodash/isFunction' 
 



export default class Weixin { 
    static getappconfig(supplierid,appid) 
	{
		return new Promise((resolve, reject) => { 
				console.log('______getappconfig____________'+appid);
				rest.XN_Query.create('Content').tag("supplier_wxsettings")
						.filter("type","eic","supplier_wxsettings")
						.filter("my.deleted","=",0)
						.filter("my.supplierid","=",supplierid) 
						.filter("my.appid","=",appid) 
						.end(1) 
						.execute().then(res => {
							    console.log('___res____:' + JSON.stringify(res));  
								if (res.size > 0)
								{
									var info = {};	
									var wxsetting_info = res.entry[0];  
							        info.wxid = wxsetting_info.id;
							        info.wxname = wxsetting_info.my.wxname;
							        info.appid = wxsetting_info.my.appid;
							        info.supplierid = wxsetting_info.my.supplierid;
							        info.secret = wxsetting_info.my.secret;
							        info.token = wxsetting_info.my.token;
							        info.wxtype = wxsetting_info.my.wxtype;
							        info.welcometitle = wxsetting_info.my.welcometitle;
							        info.image = wxsetting_info.my.image;
							        info.originalid = wxsetting_info.my.originalid;
							        info.description = wxsetting_info.my.description;
							        info.defaultreply = wxsetting_info.my.defaultreply;
							        info.welcomewords = wxsetting_info.my.welcomewords;
							        info.weixintype = wxsetting_info.my.weixintype;
							        info.weixinpay = wxsetting_info.my.weixinpay;
							        info.mchid = wxsetting_info.my.mchid;
							        info.mchkey = wxsetting_info.my.mchkey;
							        info.sslcert = wxsetting_info.my.sslcert;
							        info.sslkey = wxsetting_info.my.sslkey;
									resolve(info);
								}
								else
								{
									reject("找不到公众号的配置!");							
								}
					});
			});
    }
	static checkmq(mqid)
	{
		return new Promise((resolve, reject) => {  
			var count = 1;
			console.log('____checkmq__'+mqid+'______'+count+'_____');
			var load_mq_info = function() {
				rest.XN_Content.load(mqid,"",2).then(res => {  
					if (res.my.ack == 1)
					{
					    resolve(res.my.result);  
					}
					else if (res.my.ack == 2)
					{     
						reject(res.my.result);
					}
					else
					{
					   count = count + 1;	
					   if (count <= 20)
					   {
					   		setTimeout(() => { load_mq_info(); }, 500); 
					   }
					   else
					   {
					   		reject('队列响应超时!');
					   } 
					}	
				 });
			}; 
	        setTimeout(() => { load_mq_info(); }, 500);					 	
		}); 
	}
	static createnoncestr() 
	{
	  	return Math.random().toString(36).substr(2, 15);
	};
	static createtimestamp()
	{
	  	return parseInt(new Date().getTime() / 1000) + '';
	};
    static getjsapiticket()
	{
		return new Promise((resolve, reject) => { 
		        console.log('____________getjsapiticket_________');				
				var jsapi_ticket = store.state.jsapi_ticket;
				var timestamp = parseInt(new Date().getTime() / 1000) + '';
				if (jsapi_ticket.timestamp && timestamp - jsapi_ticket.timestamp < 6000)
				{
					resolve(jsapi_ticket.ticket);
				}
				else
				{ 
					var profileid = store.state.profileid;
					var supplierid = store.state.supplierid;
					var appid = store.state.appid; 
					var newcontent = rest.XN_Content.create('weixin_getjsapiticket','',false,2);	 
					newcontent.my.profileid = profileid; 
					newcontent.my.supplierid = supplierid;
					newcontent.my.appid = appid;     
					newcontent.my.module = 'weixin';   
					newcontent.my.action = 'getjsapiticket';  
					newcontent.my.record = profileid;    
					newcontent.save("").then(res => { 
						var mqid = res.id; 
						var count = 1;
						var load_mq_info = function() {
							rest.XN_Content.load(mqid,"",2).then(res => {   
								if (res.my.ack == 1)
								{  
									var result = JSON.parse(base64.decode(res.my.result)); 
									timestamp = parseInt(new Date().getTime() / 1000); 
									console.log('_____'+result.timestamp+'_____'+result.current_timestamp+'________________'+timestamp+'_____________');   
									var jsapi_ticket = {};
									jsapi_ticket.ticket = result.ticket; 
									jsapi_ticket.timestamp = result.timestamp + (timestamp - result.current_timestamp);
									store.commit('jsapi_ticket',jsapi_ticket); 
									console.log('____________weixin_getjsapiticket____________' + JSON.stringify(jsapi_ticket)); 
									resolve(jsapi_ticket.ticket); 
								}
								else if (res.my.ack == 2)
								{     
									reject(res.my.result);
								}
								else
								{ 
								   count = count + 1;	
								   if (count <= 5)
								   {
								   		setTimeout(() => { load_mq_info(); }, 500); 
								   }
								   else
								   {
								   		reject('提交队列响应超时!');
								   } 
								}	
							 });
						}; 
				        setTimeout(() => { load_mq_info(); }, 500);	
					},
					function(error) {
						 reject(error); 
					});  
				} 
		});  
    }	
	static getsignpackage(url)
	{
		return new Promise((resolve, reject) => { 
			var appid = store.state.appid;
	        this.getjsapiticket(appid).then(jsapiticket => {    
		        var timestamp = this.createtimestamp();
		        var nonceStr = this.createnoncestr();
        
		        var string = "jsapi_ticket="+jsapiticket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+url;
		        var signature = sha1(string);
				console.log('___________string____________' + string); 
		        var signpackage = {
		          "appId"     : appid,
		          "nonceStr"  : nonceStr,
		          "timestamp" : timestamp,
		          "url"       : url,
		          "signature" : signature,
		          "rawString" : string,
				};
				console.log('____________signpackage____________' + JSON.stringify(signpackage)); 
		        resolve(signpackage);
			}, 
	 		function(error) {			
	 			reject(error);   
	 		});	  	  
		});
	}
	static share(info,callback)
	{
			var share_title = '';
			var share_description = '';
			var share_logo = imgBaseUrl + '/imges/share.jpg';
			var share_link = '';
			if (info.share_title && info.share_title != "")
			{
				share_title = info.share_title;
			}
			if (info.share_description && info.share_description != "")
			{
				share_description = info.share_description;
			}
			if (info.share_logo && info.share_logo != "")
			{
				share_logo = info.share_logo;
			}
			if (info.share_link && info.share_link != "")
			{
				share_link = info.share_link;
			}		   
			
		  console.log('____________share____________' + JSON.stringify(info));
		  var url = window.location.href.split('#')[0];
		  if (share_link == "")
		  {
			  share_link = url;			
		  }			  
		  this.getsignpackage(url).then(res => {
			  var config = {};
			  config.debug = false; //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			  config.appId = res.appId; // 必填，公众号的唯一标识
			  config.nonceStr = res.nonceStr; // 必填，生成签名的随机串
			  config.timestamp = res.timestamp; // 必填，生成签名的时间戳
			  config.signature = res.signature; // 必填，签名，见附录1
			  config.jsApiList = ['hideMenuItems', 'showMenuItems','onMenuShareTimeline', 'onMenuShareAppMessage','scanQRCode']; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			  wx.config(config); 
		      wx.ready(()=>{
		          console.log('____________wx.ready___________');
			      wx.showOptionMenu(); 
				  wx.hideMenuItems({
				                  menuList: ["menuItem:copyUrl","menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
				                  });
				  wx.showMenuItems({
				                  menuList: ["menuItem:profile", "menuItem:share:appMessage", "menuItem:share:timeline"] // 要显示的菜单项
				                  });			 
				  wx.onMenuShareTimeline( 
				    {
					    title: share_title, // 分享标题
					    link: share_link, // 分享链接
					    imgUrl: share_logo, // 分享图标
					    success: function ()  
						{
					        // 用户确认分享后执行的回调函数 	
		                    if (_isFunction(callback)) {
		                        callback.call()
		                    }					 
					    },
					    cancel: function () 
						{
					        // 用户取消分享后执行的回调函数
					    }
				  });

				  wx.onMenuShareAppMessage( 
				      {
					    desc: share_description, // 分享描述
				  	    title: share_title, // 分享标题
  					    link: share_link, // 分享链接
  					    imgUrl: share_logo, // 分享图标
				  	    success: function ()  
				  		{
				  	        // 用户确认分享后执行的回调函数	
				  	        if (_isFunction(callback)) {
		                        callback.call()
		                    }					    
				    	},
				  	    cancel: function () 
				  		{
				  	        // 用户取消分享后执行的回调函数
				  	    }
				    });  
		      });
			  wx.error(function(res)
			  {
				  console.log('____________wx.error____________' + JSON.stringify(res));
			      wx.hideOptionMenu(); 
			  }); 
		  }); 		
	}
	static scan()
	{
	  	   console.log('____________scan____________');
		   wx.scanQRCode({
			   needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			   scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			   success: function (res) {
			   		var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果 
			   }
		   });
	}
	static hideallmenu()
	{
		  console.log('____________hideallmenu____________');  
		  var url = window.location.href.split('#')[0];
		  this.getsignpackage(url).then(res => {
			  var config = {};
			  config.debug = false; //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			  config.appId = res.appId; // 必填，公众号的唯一标识
			  config.nonceStr = res.nonceStr; // 必填，生成签名的随机串
			  config.timestamp = res.timestamp; // 必填，生成签名的时间戳
			  config.signature = res.signature; // 必填，签名，见附录1
			  config.jsApiList = ['hideOptionMenu','hideMenuItems']; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			  wx.config(config); 
		      wx.ready(()=>{
		          console.log('____________wx.ready___________');
				   wx.hideOptionMenu(); 
				   
		      });
			  wx.error(function(res)
			  {
			      wx.hideOptionMenu(); 
			  }); 
		  }); 		
	}	
	static chooseImage(count,callback)
	{ 
		  console.log('___________chooseImage___________' );
		  var url = window.location.href.split('#')[0]; 
		  this.getsignpackage(url).then(res => {
			  var config = {};
			  config.debug = false; //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			  config.appId = res.appId; // 必填，公众号的唯一标识
			  config.nonceStr = res.nonceStr; // 必填，生成签名的随机串
			  config.timestamp = res.timestamp; // 必填，生成签名的时间戳
			  config.signature = res.signature; // 必填，签名，见附录1
			  config.jsApiList = ['chooseImage','uploadImage','getLocalImgData']; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			  wx.config(config); 
		      wx.ready(()=>{
		          console.log('____________wx.ready___________');
			      wx.showOptionMenu();   
   			   	  wx.chooseImage({
   			   	     count: count, // 默认9
   			   	     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
   			   	     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
   			   	     success: function (res) { 
 			  	        if (_isFunction(callback)) {
 	                        callback.call(this,res);
 	                    } 
   			   	     }
   			   	 });
		      });
			  wx.error(function(res)
			  {
				  console.log('____________wx.error____________' + JSON.stringify(res));
			      wx.hideOptionMenu(); 
			  }); 
		  }); 		
	}
	static getlocalimage(localid)
	{
		return new Promise((resolve, reject) => { 
	              wx.getLocalImgData({  //循环调用  getLocalImgData 
	                  localId:localid, // 图片的localID
	                  success: function (res) {
	                      var localData = res.localData;
	                      if (localData.indexOf('data:image') != 0) {
	                          //判断是否有这样的头部
	                          localData = 'data:image/jpeg;base64,' +  localData
	                      }
	                      localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg')
						  //第一个替换的是换行符，第二个替换的是图片类型，因为在IOS机上测试时看到它的图片类型时jgp，
						  //这不知道时什么格式的图片，为了兼容其他设备就把它转为jpeg 
	                      resolve({key:localid,value:localData}); 
					  }
				  }); 
		});	
	} 
	
	static getLocalImgData(images)
	{
		return new Promise((resolve, reject) => {
				let lists = []; 
			    for(var i=0;i<images.length;i++)
				{  
					  this.getlocalimage(images[i]).then( res => {  
	                      lists.push(res);
						  if (lists.length == images.length)
						  {
							  resolve(lists); 
						  }
					  }); 
				}
		});	
	} 
	static upload(images)
	{
		return new Promise((resolve, reject) => {
				 let supplierid = store.state.supplierid; 
				 var url = webUrl + "/weixinupload.php?supplierid=" + supplierid; 
				 console.log('____weixinupload___'+url+'________'); 
				 var stream = weex.requireModule('stream');
				 var headers = {};
				 headers['Content-Type'] = 'application/json; charset=utf-8';
				 stream.fetch({
				        method: 'POST',
				        url: url,
				        type:'json',
				        headers:  headers,
					    body: JSON.stringify(images)
				 }, function(resData) {
						console.log('resData: ' + JSON.stringify(resData));  
			  	 			if (resData.status == 200 && resData.data) {   
								console.log('____weixinupload___'+JSON.stringify(resData)+'________'); 
								resolve(resData.data.src);
			  	 			} 
							else 
							{
								reject([]);
			  	 			} 
				 },
				 function(response){ 
				 }); 
		});	
	}
	static uploadhead(image)
	{
		return new Promise((resolve, reject) => {
				 let profileid = store.state.profileid; 
				 var url = webUrl + "/weixinuploadhead.php?profileid=" + profileid; 
				 console.log('____weixinuploadhead___'+url+'________'); 
				 var stream = weex.requireModule('stream');
				 var headers = {}; 
				 headers['Content-Type'] = 'text/plain; charset=utf-8';
				 stream.fetch({
				        method: 'POST',
				        url: url,
				        type:'json',
				        headers:  headers,
					    body: image
				 }, function(resData) {
						console.log('resData: ' + JSON.stringify(resData));  
			  	 			if (resData.status == 200 && resData.data) {   
								console.log('_____weixinuploadhead___'+JSON.stringify(resData)+'________');  
								resolve(resData.data.src);
			  	 			} 
							else 
							{
								reject([]);
			  	 			} 
				 },
				 function(response){ 
				 }); 
		});	
	}
}