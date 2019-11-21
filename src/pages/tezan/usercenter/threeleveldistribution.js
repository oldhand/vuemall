import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';    
import {get_profileid} from '../../../rest/profile'
import {number_format,date_format,todatetime} from '../../../rest/common' 

 
import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const get_distributions = () => {
	return new Promise((resolve, reject) => {
			console.log('____________get_distributions________________');
			get_profileid().then(profileid => {  
					rest.XN_Query.create('Content').tag("supplier_profile_"+supplierid)
						.filter("type","eic","supplier_profile") 
						.filter("my.supplierid","=",supplierid)  
						.filter("my.onelevelsourcer","=",profileid) 		//.filter(rest.XN_Filter.any(rest.XN_Filter.filter("my.onelevelsourcer","=",profileid),rest.XN_Filter.filter("my.twolevelsourcer","=",profileid),rest.XN_Filter.filter("my.threelevelsourcer","=",profileid)))
						.filter("my.deleted","=",0)   
						.order("published","DESC")   
					    .end(-1) 
						.execute().then(res => {    
							if (res.size > 0)
							{ 
									var profiles = []; 
									for (var i in res.entry)
									{
										var supplier_profile_info = res.entry[i];
										var supplier_profileid = supplier_profile_info.my.profileid;   
										var onelevelsourcer = supplier_profile_info.my.onelevelsourcer; 
										var twolevelsourcer = supplier_profile_info.my.twolevelsourcer; 
										var threelevelsourcer = supplier_profile_info.my.threelevelsourcer; 
										var givenname = supplier_profile_info.my.givenname;   
										var province = supplier_profile_info.my.province; 
										var city = supplier_profile_info.my.city;  
										var link = supplier_profile_info.my.link; 
										var published = supplier_profile_info.published; 
										if (link == "")
										{
											link = '/images/anonymous.jpg';
										} 
										var profile_info = {
											id:supplier_profileid,
											givenname:givenname,
											onelevelsourcer:onelevelsourcer,
											twolevelsourcer:twolevelsourcer,
											threelevelsourcer:threelevelsourcer,
											province:province,
											city:city,
											link:link, 
											published:published, 
										}; 
										profiles.push(profile_info);  
									}    
									var distributions = [];
									for (var i in profiles)
									{  
											var profile_info = {
												id: profiles[i].id,
												label: profiles[i].givenname,
												desc: profiles[i].province+profiles[i].city + '  ('+date_format(todatetime(profiles[i].published), "YYYY-MM-DD HH:mm")+')',
												expand:false,
												load:false,
												level:1,
												image:profiles[i].link,
												children:[],
											};
											distributions.push(profile_info);   
									} 
									resolve(distributions);  
							}
							else
							{
								resolve([]);
							}
						}); 
		   });
	});   
};
   
   
export const get_threeleveldistributions = (level,sourcer) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_threeleveldistributions___'+level+'_______'+sourcer+'______');
			get_profileid().then(profileid => {  
					var query = rest.XN_Query.create('Content').tag("supplier_profile_"+supplierid)
							.filter("type","eic","supplier_profile") 
							.filter("my.supplierid","=",supplierid)   		 
							.filter("my.deleted","=",0)   
							.order("published","DESC")   
							.end(-1);
						if (level == 1)
						{
							query.filter("my.twolevelsourcer","=",profileid) 	
								 .filter("my.onelevelsourcer","=",sourcer); 	
						}
						else if (level == 2)
						{
							query.filter("my.threelevelsourcer","=",profileid) 	
								 .filter("my.onelevelsourcer","=",sourcer); 	
						}
						else
						{
							resolve([]);
							
						}	
						query.execute().then(res => {    
							if (res.size > 0)
							{ 
									var profiles = []; 
									for (var i in res.entry)
									{
										var supplier_profile_info = res.entry[i];
										var supplier_profileid = supplier_profile_info.my.profileid;   
										var onelevelsourcer = supplier_profile_info.my.onelevelsourcer; 
										var twolevelsourcer = supplier_profile_info.my.twolevelsourcer; 
										var threelevelsourcer = supplier_profile_info.my.threelevelsourcer; 
										var givenname = supplier_profile_info.my.givenname;   
										var province = supplier_profile_info.my.province; 
										var city = supplier_profile_info.my.city;  
										var link = supplier_profile_info.my.link; 
										var published = supplier_profile_info.published; 
										if (link == "")
										{
											link = '/images/anonymous.jpg';
										} 
										var profile_info = {
											id:supplier_profileid,
											givenname:givenname,
											onelevelsourcer:onelevelsourcer,
											twolevelsourcer:twolevelsourcer,
											threelevelsourcer:threelevelsourcer,
											province:province,
											city:city,
											link:link, 
											published:published, 
										}; 
										profiles.push(profile_info);  
									}   
									var distributions = [];
									for (var i in profiles)
									{  
											var profile_info = {
												id: profiles[i].id,
												label: profiles[i].givenname,
												desc: profiles[i].province+profiles[i].city + '  ('+date_format(todatetime(profiles[i].published), "YYYY-MM-DD HH:mm")+')',
												expand:false,
												load:false,
												level:level+1,
												image:profiles[i].link,
												children:[],
											};
											distributions.push(profile_info);   
									} 
									resolve(distributions);  
							}
							else
							{
								resolve([]);
							}
						}); 
		   });
	});   
};   