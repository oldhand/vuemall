import {application,imgBaseUrl,sms} from './env'
import rest from './rest';    
 
import store from '../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const send = (params) => {
	return new Promise((resolve, reject) => {
    		console.log('____________send_verifycode_____'+JSON.stringify(params)+'___________');  
    
			var mobile = params.mobile;
			var sendcode = params.sendcode; 
			var key = params.key; 
			
			 rest.XN_Query.create('Content').tag("supplier_settings")
						.filter("type","eic","supplier_settings")
						.filter("my.deleted","=",0)
						.filter("my.supplierid","=",supplierid) 
						.end(1) 
						.execute().then(res => {
							    console.log('_________supplier_settings_________: ' + JSON.stringify(res));  
								if (res.size > 0)
								{
									var  supplier_settings_info = res.entry[0]; 
									var  access_key_id = supplier_settings_info.my.access_key_id; 
									var  access_key_secret = supplier_settings_info.my.access_key_secret; 
									var  signname = encodeURI(supplier_settings_info.my.signname); 
									var  codename = 'number'; 
									var  authentication_templatecode = supplier_settings_info.my.templatecode;  
									
									console.log('_______access_key_id____________'+access_key_id+'___________');  
	   							 	console.log('_______access_key_secret____________'+access_key_secret+'___________'); 
									console.log('_______signname____________'+signname+'___________'); 
									console.log('_______templatecode____________'+authentication_templatecode+'___________'); 
	   	 	
									if (mobile && mobile != "" &&
										sendcode && sendcode != "" &&
										key && key != "" &&
										access_key_id && access_key_id != "" &&
										access_key_secret && access_key_secret != "" &&
										signname && signname != "number" &&
										authentication_templatecode && authentication_templatecode != "" )
									{  
											var newcontent = rest.XN_Content.create('sendmobile','',false,2);		 
											newcontent.my.profileid = mobile; 
											newcontent.my.supplierid = supplierid;   
											newcontent.my.module = 'sms';   
											newcontent.my.action = 'sendmobile';  
											newcontent.my.record = mobile;  
											newcontent.my.key = key;  
											newcontent.my.to_mobile = mobile;
											newcontent.my.verifycode = String(sendcode); 
											newcontent.my.access_key_id = access_key_id;
											newcontent.my.access_key_secret = access_key_secret;
											newcontent.my.signname = signname;
											newcontent.my.codename = codename;
											newcontent.my.templatecode = authentication_templatecode;
											newcontent.save("sendmobile,sendmobile_"+supplierid).then(res => {   
												resolve(res);  
											},
											function(error) {
												 console.log('________error_________' + JSON.stringify(error));
												 if (error == "RepeatSubmit")
												 {
												 	reject('重复提交队列');
												 }
												 else
												 {
												 	reject('创建消息队列出错'); 
												 } 
											}); 
									}
									else
									{ 
										reject('短信服务参数配置有误');
									}  
								}
								else
								{
									reject('请在运营设置中配置短信网关参数');
								}
						});

			
	});   
}; 

 