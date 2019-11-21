import {application,webUrl,appKey,push} from './env'
import rest from './rest';  
import {number_format} from './common'

import Vue from 'vue'
import store from '../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
}

export const get_profileid = () => {
    return new Promise((resolve, reject) => {     
			let profileid = store.state.profileid;
			if (profileid != '')
			{
				rest.init({viewer:profileid});
				resolve(profileid); 
			}
			else
			{
				reject('no logined'); 
			} 
    }); 
};

export const get_profile_info = () => {
    return new Promise((resolve, reject) => {
		get_profileid().then(profileid => {   
			console.log('____get_profile_info___'+profileid+'________'); 
			rest.XN_Query.create('Content').tag("supplier_profile_"+supplierid)
				.filter("type","eic","supplier_profile") 
				.filter("my.supplierid","=",supplierid)  
			    .filter("my.profileid","=",profileid)    
				.filter("my.deleted","=",0)   
			    .end(1)
				.execute().then(res => {  
					if (res.size > 0)
					{   
						var profile_info = {};	
						var supplier_profile_info = res.entry[0];  
				        profile_info.profileid = profileid;
				        profile_info.supplierid = supplierid;
				        profile_info.wxopenid = supplier_profile_info.my.wxopenid;
				        profile_info.record = supplier_profile_info.id;
						profile_info.published = supplier_profile_info.published;
				        profile_info.money = Number(supplier_profile_info.my.money);
				        profile_info.accumulatedmoney = Number(supplier_profile_info.my.accumulatedmoney);
				        profile_info.maxtakecash = Number(supplier_profile_info.my.maxtakecash);
				        profile_info.rank = Number(supplier_profile_info.my.rank);
						profile_info.accumulatedrank = Number(supplier_profile_info.my.accumulatedrank);
				        profile_info.mobile = supplier_profile_info.my.mobile; 
				        profile_info.givenname = supplier_profile_info.my.givenname; 
				        profile_info.ranklevel = supplier_profile_info.my.ranklevel;
				        profile_info.onelevelsourcer = supplier_profile_info.my.onelevelsourcer;
				        profile_info.twolevelsourcer = supplier_profile_info.my.twolevelsourcer;
				        profile_info.threelevelsourcer = supplier_profile_info.my.threelevelsourcer;
				        profile_info.hassourcer = supplier_profile_info.my.hassourcer;
						profile_info.authenticationprofile = supplier_profile_info.my.authenticationprofile;
						profile_info.repurchasestatus = supplier_profile_info.my.repurchasestatus;
						profile_info.purchasedate = supplier_profile_info.my.purchasedate;
						profile_info.orderid = supplier_profile_info.my.orderid; 
						
						profile_info.province = supplier_profile_info.my.province; 
						profile_info.city = supplier_profile_info.my.city; 
						profile_info.birthdate = supplier_profile_info.my.birthdate; 
						profile_info.gender = supplier_profile_info.my.gender; 
						var identifier = supplier_profile_info.my.identifier;
						if (identifier && identifier != "")
						{
							profile_info.identifier  = identifier; 
						}
						else
						{
							profile_info.identifier  = supplier_profile_info.id;
						}
						var link = supplier_profile_info.my.link; 
						profile_info.image = link;
						if (!link || link == "")
						{
							link = '/images/anonymous.jpg';
						} 
						else
						{
							console.log('____transheadimg___'+link+'___'+link.indexOf('/storage/header/')+'_____'); 
							if (link.indexOf('/storage/header/') == 0)
							{ 
								link = webUrl + link;
		 						profile_info.link = link;
		 						resolve(profile_info);
							}
							else
							{
				   				 var url = webUrl + "/transheadimg.php?profileid=" + profileid; 
				   				 console.log('____transheadimg___'+url+'________'); 
				   				 var stream = weex.requireModule('stream');
				   				 stream.fetch({
				   				        method: 'GET',
				   				        url: url,
				   				        type:'json' 
				   				 }, function(resData) {
					   					console.log('resData: ' + JSON.stringify(resData));  
					 	   	 			if (resData.status == 200 && resData.data) {  
					 						profile_info.link = webUrl + resData.data.src;
											console.log('____transheadimg___'+profile_info.link+'________'); 
					 						resolve(profile_info);
					 	   	 			} else {
					 						profile_info.link = link;
					 						resolve(profile_info);
					 	   	 			} 
				   				 },function(response){
				 						profile_info.link = link;
				 						resolve(profile_info);
				   				 }); 
							}
						} 
					} 
					else
					{
						reject('无法获得用户信息');  
					}
			}, 
	 		function(error) {			
	 			reject(error);   
	 		});
		}, 
		function(error) {			
			reject(error);   
		});  
    }); 
}; 

export const get_givenprofile_info = (profileid) => {
    return new Promise((resolve, reject) => {  
			rest.XN_Query.create('Content').tag("supplier_profile_"+supplierid)
				.filter("type","eic","supplier_profile") 
				.filter("my.supplierid","=",supplierid)  
			    .filter("my.profileid","=",profileid)    
				.filter("my.deleted","=",0)   
			    .end(1)
				.execute().then(res => {  
					if (res.size > 0)
					{   
						var profile_info = {};	
						var supplier_profile_info = res.entry[0];  
				        profile_info.profileid = profileid;
				        profile_info.supplierid = supplierid;
				        profile_info.wxopenid = supplier_profile_info.my.wxopenid;
				        profile_info.record = supplier_profile_info.id;
						profile_info.published = supplier_profile_info.published;
				        profile_info.money = Number(supplier_profile_info.my.money);
				        profile_info.accumulatedmoney = Number(supplier_profile_info.my.accumulatedmoney);
				        profile_info.maxtakecash = Number(supplier_profile_info.my.maxtakecash);
				        profile_info.rank = Number(supplier_profile_info.my.rank);
						profile_info.accumulatedrank = Number(supplier_profile_info.my.accumulatedrank);
				        profile_info.mobile = supplier_profile_info.my.mobile; 
				        profile_info.givenname = supplier_profile_info.my.givenname; 
				        profile_info.ranklevel = supplier_profile_info.my.ranklevel;
				        profile_info.onelevelsourcer = supplier_profile_info.my.onelevelsourcer;
				        profile_info.twolevelsourcer = supplier_profile_info.my.twolevelsourcer;
				        profile_info.threelevelsourcer = supplier_profile_info.my.threelevelsourcer;
				        profile_info.hassourcer = supplier_profile_info.my.hassourcer;
						profile_info.authenticationprofile = supplier_profile_info.my.authenticationprofile;
						profile_info.repurchasestatus = supplier_profile_info.my.repurchasestatus;
						profile_info.purchasedate = supplier_profile_info.my.purchasedate;
						profile_info.orderid = supplier_profile_info.my.orderid; 
						
						profile_info.province = supplier_profile_info.my.province; 
						profile_info.city = supplier_profile_info.my.city; 
						profile_info.birthdate = supplier_profile_info.my.birthdate; 
						profile_info.gender = supplier_profile_info.my.gender; 
						var identifier = supplier_profile_info.my.identifier;
						if (identifier && identifier != "")
						{
							profile_info.identifier  = identifier; 
						}
						else
						{
							profile_info.identifier  = supplier_profile_info.id;
						}
						var link = supplier_profile_info.my.link; 
						if (link == "")
						{
							link = '/images/anonymous.jpg';
						} 
						profile_info.link = link;
						resolve(profile_info);  
					} 
					else
					{
						reject('无法获得用户信息');  
					}
			}, 
	 		function(error) {			
	 			reject(error);   
	 		}); 
    }); 
}; 
 
export const update_profile_info = (info) => {
	return new Promise((resolve, reject) => {
		console.log('____________update_profile_info_____'+JSON.stringify(info)+'___________');  
		get_profileid().then(profileid => {      
				rest.XN_Query.create('Content').tag("supplier_profile_"+supplierid)
					.filter("type","eic","supplier_profile") 
					.filter("my.supplierid","=",supplierid)  
				    .filter("my.profileid","=",profileid)    
					.filter("my.deleted","=",0)   
				    .end(1)
					.execute().then(res => {  
						if (res.size > 0)
						{     
							var update = false;	
							var supplier_profile_info = res.entry[0];    
							
							if (info.givenname && info.givenname != "" && info.givenname != supplier_profile_info.my.givenname)
							{
								supplier_profile_info.my.givenname = info.givenname; 
								update = true;	
							}
							if (info.mobile && info.mobile != "" && info.mobile != supplier_profile_info.my.mobile)
							{
								supplier_profile_info.my.mobile = info.mobile; 
								update = true;	
							}
							if (info.gender  && info.gender != supplier_profile_info.my.gender)
							{
								supplier_profile_info.my.gender = info.gender; 
								update = true;	
							}
							if (info.province && info.province != "" && info.province != supplier_profile_info.my.province)
							{
								supplier_profile_info.my.province = info.province; 
								update = true;	
							}
							if (info.city && info.city != "" && info.city != supplier_profile_info.my.city)
							{
								supplier_profile_info.my.city = info.city; 
								update = true;	
							}
							if (info.birthdate && info.birthdate != "" && info.birthdate != supplier_profile_info.my.birthdate)
							{
								supplier_profile_info.my.birthdate = info.birthdate; 
								update = true;	
							}
							if (info.link && info.link != "" && info.link != supplier_profile_info.my.link)
							{
								supplier_profile_info.my.link = info.link; 
								update = true;	
							}
							if (update)
							{
								supplier_profile_info.save('supplier_profile,supplier_profile_'+profileid+',supplier_profile_'+supplierid);		
								resolve("ok"); 						
							}
							else
							{
								reject('您没有任何修改,无需保存!');   
							}
							
						} 
						else
						{
							reject('无法获得用户信息');  
						}
				}, 
		 		function(error) {			
		 			reject(error);   
		 		});
			}, 
			function(error) {			
				reject(error);   
			});  
	});   
};

export const update_profile_link = (src) => {
	return new Promise((resolve, reject) => {
		console.log('____________update_profile_link_____'+src+'___________');  
		get_profileid().then(profileid => {   
					rest.XN_Profile.load(profileid,'id','profile').then(profile_info => { 
							console.log('___________load_________' + JSON.stringify(profile_info));  
						    profile_info.link =  src;
							profile_info.save('profile,profile_'+profileid+',profile_'+supplierid).then(res => { 
									rest.XN_Query.create('Content').tag("supplier_profile")
										.filter("type","eic","supplier_profile") 
										.filter("my.supplierid","=",supplierid)  
									    .filter("my.profileid","=",profileid)    
										.filter("my.deleted","=",0)   
									    .end(1)
										.execute().then(res => {  
											if (res.size > 0)
											{   
												var supplier_profile_info = res.entry[0];   
												supplier_profile_info.my.link = src; 
												supplier_profile_info.save('supplier_profile,supplier_profile_'+profileid+',supplier_profile_'+supplierid).then(res => { 
													resolve("ok");   
												});	 
											} 
											else
											{
												 resolve("ok");    
											}
									}, 
							 		function(error) {			
							 			reject(error);   
							 		}); 
							});  
					});  
			}, 
			function(error) {			
				reject(error);   
			});  
	});   
};

export const get_mobile_profile_info = (mobile) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_mobile_profile_info____'+mobile+'___________');  
			rest.XN_Query.create('Profile').tag("profile") 
				.filter("mobile","=",mobile)  
			    .filter("type","=",'wxuser')    
			    .end(1)
				.execute().then(res => {  
					if (res.size > 0)
					{   
						var profile_info = res.entry[0]; 
						 resolve(profile_info);  
					} 
					else
					{
						reject('请检查手机号码是否输入正确!');  
					}
			}, 
			function(error) {			
				reject(error); 
			}); 
					 
	});   
}; 

export const sign = (mobile,password) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_profileid_____'+mobile+'___________');  
			rest.XN_Query.create('Profile').tag("profile") 
				.filter("mobile","=",mobile)  
			    .filter("type","=",'wxuser')    
			    .end(1)
				.execute().then(res => {  
					if (res.size > 0)
					{   
						var profile_info = res.entry[0]; 
						rest.XN_Profile.sign(profile_info.id,password).then(res => {  
		  				  if (res.ok && res.ok == 'Sign is successful.')
		  				  {
							  res.profileid = profile_info.id;
							  rest.init({viewer:profileid});
							  resolve(res); 
		  				  }	 
		  				  else		
						  {
						  	  reject('密码错误');  
						  } 
						}, 
						function(error) {			
							 reject(error); 
						});
					} 
					else
					{
						reject('请检查手机号码是否输入正确!');  
					}
			}, 
			function(error) {			
				reject(error); 
			}); 
					 
	});   
}; 


 

export const weixin_check_login = (info) => {
    return new Promise((resolve, reject) => {
			rest.init({application:application});  
			console.log('____________weixinlogin_____' + JSON.stringify(info));   
			rest.XN_Query.create('Content')
				.filter("type","eic","wxopenids") 
				.filter("my.wxopenid","=",info.openid)   
			    .end(1)
				.execute().then(res => {  
					if (res.size > 0)
					{    
						var wxopenid_info = res.entry[0];  
						var profileid = wxopenid_info.my.profileid;
						rest.XN_Query.create('Content').tag("supplier_profile_"+supplierid)
							.filter("type","eic","supplier_profile") 
							.filter("my.supplierid","=",supplierid)  
						    .filter("my.profileid","=",profileid)    
							.filter("my.deleted","=",0)   
						    .end(1)
							.execute().then(res => {  
								if (res.size > 0)
								{     
									//resolve(profileid);
									reject('test');
								}
								else
								{
									reject('新用户');									
								}
						}); 
					}
					else
					{
						 reject('新登录');
					}
				}, 
				function(error) {			
					reject(error); 
				});
			/*
			{"unionid":"otPpTswA6DML7CBGqt5_78G4hj7E","openid":"oVS9qw88_W9aitBW4ubFZJbYdrew","name":"老手","country":"中国","province":"湖南","city":"长沙","gender":"男","iconurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/BiacMzAVsc6RY4hsz9YpUnInFcYZM1rLJvC7XRsrhnNc5PQiaDICegLLg6sC1e6ibrkfJG4Qgp2TFfdfArbvZVqibA/132"}
			*/ 
    }); 
};


export const weixinlogin = (info) => {
    return new Promise((resolve, reject) => {
			rest.init({application:application});  
			var newcontent = rest.XN_Content.create('weixinlogin','',false,2);		 
			newcontent.my.profileid = info.record; 
			newcontent.my.supplierid = supplierid;   
			newcontent.my.module = 'weixin';   
			newcontent.my.action = 'login';  
			newcontent.my.record = info.record; 
			newcontent.my.key = info.key;  
			newcontent.my.unionid = info.unionid;
			newcontent.my.openid = info.openid; 
			newcontent.my.name = info.name;
			newcontent.my.country = info.country;
			newcontent.my.province = info.province;
			newcontent.my.city = info.city;
			newcontent.my.gender = info.gender;
			newcontent.my.iconurl = info.iconurl;
			newcontent.my.appkey = appKey;
			newcontent.my.platform = WXEnvironment.platform.toLowerCase();
	        newcontent.my.osversion = WXEnvironment.osVersion || 'unknown';
	        newcontent.my.appname = WXEnvironment.appName || 'unknown';
	        newcontent.my.appversion = WXEnvironment.appVersion || 'unknown';
	        newcontent.my.devicemodel = WXEnvironment.deviceModel || 'unknown';
			newcontent.save("weixinlogin,weixinlogin_"+supplierid).then(res => {     
				  resolve(res);
			},
			function(error) { 
				 if (error == "RepeatSubmit")
				 {
				 	reject('重复提交队列');
				 }
				 else
				 {
				 	reject('创建消息队列出错'); 
				 } 
			}); 
		});
};


export const register = (info) => {
    return new Promise((resolve, reject) => {
			rest.init({application:application});  
			var newcontent = rest.XN_Content.create('register','',false,2);		 
			newcontent.my.profileid = info.record; 
			newcontent.my.supplierid = supplierid;   
			newcontent.my.module = 'users';   
			newcontent.my.action = 'register';  
			newcontent.my.record = info.record; 
			newcontent.my.key = info.key;   
			newcontent.my.mobile = info.mobile;  
			newcontent.my.password = info.password;  
			newcontent.my.appkey = appKey;
			newcontent.my.platform = WXEnvironment.platform.toLowerCase();
	        newcontent.my.osversion = WXEnvironment.osVersion || 'unknown';
	        newcontent.my.appname = WXEnvironment.appName || 'unknown';
	        newcontent.my.appversion = WXEnvironment.appVersion || 'unknown';
	        newcontent.my.devicemodel = WXEnvironment.deviceModel || 'unknown';
			newcontent.save("register,register_"+supplierid).then(res => {     
				  resolve(res);
			},
			function(error) { 
				 if (error == "RepeatSubmit")
				 {
				 	reject('重复提交队列');
				 }
				 else
				 {
				 	reject('创建消息队列出错'); 
				 } 
			}); 
		});
};
 
 
 
export const login = (profileid) => {
    return new Promise((resolve, reject) => { 
			     Vue.prototype.$storage.setSync('profileid',profileid);
				 resolve('ok');  
		});
}; 
 

export const get_push_status = () => {
    return new Promise((resolve, reject) => {     
				get_profileid().then(profileid => {    
			 			 rest.XN_Query.create('Content')
						    .filter("type","eic",'pushmsgbinds') 
							.filter("my.supplierid","=",supplierid) 
						    .filter("my.profileid","=",profileid)     
							.filter("my.deleted","=",0)   
							.filter("my.status","=",'0')
			 			    .end(-1)
			 				.execute().then(res => {  
								if (res.size > 0)
								{
									resolve(true);									
								} 
								else
								{
									resolve(false);
								}
							});	 
			 			 
				});
		});
};  
 
export const update_push_status = (push_status) => {
    return new Promise((resolve, reject) => {     
				get_profileid().then(profileid => {   
						if (push_status) 
						{
				 			 rest.XN_Query.create('Content')
							    .filter("type","eic",'pushmsgbinds') 
								.filter("my.supplierid","=",supplierid) 
							    .filter("my.profileid","=",profileid)     
								.filter("my.deleted","=",0)   
								.filter("my.status","=",'1')
				 			    .end(-1)
				 				.execute().then(res => {  
									for (var i in res.entry)
									{
											var pushmsgbind_info = res.entry[i];  
											pushmsgbind_info.my.status = '0';
											pushmsgbind_info.save("pushmsgbinds,pushmsgbinds_"+supplierid+",pushmsgbinds_"+profileid);										   
									}
								});	 
						}
						else
						{
				 			 rest.XN_Query.create('Content')
							    .filter("type","eic",'pushmsgbinds') 
								.filter("my.supplierid","=",supplierid) 
							    .filter("my.profileid","=",profileid)     
								.filter("my.deleted","=",0)   
								.filter("my.status","=",'0')
				 			    .end(-1)
				 				.execute().then(res => {  
									for (var i in res.entry)
									{
											var pushmsgbind_info = res.entry[i];  
											pushmsgbind_info.my.status = '1';
											pushmsgbind_info.save("pushmsgbinds,pushmsgbinds_"+supplierid+",pushmsgbinds_"+profileid);										   
									}
								});								
						}
			 			 
				});
		});
};  
 