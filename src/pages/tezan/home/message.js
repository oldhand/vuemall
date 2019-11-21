import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';    
import {get_profileid} from '../../../rest/profile' 
import {date_format} from '../../../rest/common'

import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
}

export const get_messages = (page) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_messages________________');
			get_profileid().then(profileid => {   
					rest.XN_Query.create('Message').tag("message_"+profileid) 
					    .filter("my.supplierid","=",supplierid)
						.filter("my.profileid","=",profileid)
						.filter("my.deleted","=",0) 
						.order("published","DESC")
					    .begin(page*8)
						.end((page+1)*8)
						.execute().then(res => {
							var messages = [];
							if (res.size > 0)
							{
								for (var i in res.entry)
								{
										var message_info = res.entry[i];
										messages.push({
											    id: message_info.id,
												published: message_info.published,
												profileid: message_info.my.profileid,
											    status: message_info.my.status,
												message: message_info.my.message, 
												viewtime: message_info.my.viewtime,  
												show: true, 
										});
								}
							}
							resolve(messages);
						});
		   });
	});   
};
  
export const delete_messge = (messgeid) => {
	return new Promise((resolve, reject) => {
			console.log('___________delete_messge______'+messgeid+'_________'); 
			get_profileid().then(profileid => {   
				rest.XN_Content.load(messgeid,"message",6).then(message_info => {  
					message_info.my.deleted = '1';
					message_info.save("message,message_"+profileid+",message_"+supplierid).then(res => {  
						resolve("ok");  
					}); 
				});
		   });
	});   
};  

export const get_messge_info = (messgeid) => {
	return new Promise((resolve, reject) => {
			console.log('___________get_messge_info______'+messgeid+'_________'); 
			get_profileid().then(profileid => {   
				rest.XN_Content.load(messgeid,"message",6).then(message_info => {   
					var info = {
						    id: message_info.id,
							published: message_info.published,
							profileid: message_info.my.profileid,
						    status: message_info.my.status,
							message: message_info.my.message,  
							viewtime: message_info.my.viewtime, 
					   }; 
					if (message_info.my.status == '3')
					{
						resolve(info);   
					}
					else
					{ 
						message_info.my.status = '3';
						message_info.my.viewtime = date_format(new Date());
						message_info.save("message,message_"+profileid+",message_"+supplierid).then(res => {  
							resolve(info);  
						});  
					} 
				});
		   });
	});   
};    
  
export const get_message_count = () => {
    return new Promise((resolve, reject) => {  
			get_profileid().then(profileid => {    
				rest.init({application:application});  
				console.log('______get_message_count_____________');  
				rest.XN_Query.create('Message_Count').tag("message_"+supplierid) 
					.filter("my.deleted","=",0)
					.filter("my.supplierid","=",supplierid)
					.filter("my.profileid","=",profileid)
					.filter("my.status","!=", '3')   
				    .rollup()
				    .end(-1)
					.execute().then(res => {      
						if (res.size > 0)
						{  
							resolve(res.size);  
						} 
						else
						{
							resolve(0);  
						}
				});  
			}, 
			function(error) {			
				reject(0);   
			});
    }); 
};  		 
  