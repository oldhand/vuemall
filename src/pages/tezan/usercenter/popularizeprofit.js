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
 

export const get_popularizeprofits = (page) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_popularizeprofits________________');
			get_profileid().then(profileid => {  
					rest.XN_Query.create('YearContent').tag("mall_billwaters_"+profileid)
						.filter("type","eic","mall_billwaters")  
					    .filter("my.supplierid","=",supplierid)  
						.filter("my.profileid","=",profileid) 
						.filter("my.billwatertype","=",'popularize')   
						.filter("my.deleted","=",0)  
						.order("published","DESC")
					    .begin(page*12)
						.end((page+1)*12)
						.execute().then(res => {    
							if (res.size > 0)
							{ 
								var profileids = [];
								for (var i in res.entry)
								{
									var billwater_info = res.entry[i];  
									profileids.push(billwater_info.my.inviteprofileid);
								} 
								rest.XN_Query.create('Content').tag("supplier_profile_"+supplierid)
									.filter("type","eic","supplier_profile") 
									.filter("my.supplierid","=",supplierid)  
								    .filter("my.profileid","in",profileids)    
									.filter("my.deleted","=",0)   
								    .end(-1)
									.execute().then(profile_res => {  
										if (profile_res.size > 0)
										{   
											var givennames = {};
											for (var i in profile_res.entry)
											{
												var profile_info = profile_res.entry[i];  
												givennames[profile_info.my.profileid] = profile_info.my.givenname;
											} 
											var billwaters = []; 
											for (var i in res.entry)
											{
												var billwater_info = res.entry[i];  
												billwaters.push({
													    id: billwater_info.id, 
														inviteprofileid: givennames[billwater_info.my.inviteprofileid],  
														amount: '¥'+number_format(Math.abs(billwater_info.my.amount), 2, ".", ","),  
														money: '¥'+billwater_info.my.money,   
														submitdatetime: billwater_info.my.submitdatetime,   
														published:date_format(todatetime(billwater_info.published), "YYYY-MM-DD HH:mm"),
												});  
											} 
											resolve(billwaters); 
										} 
										else
										{
											resolve([]);
										}
									});
							}
							else
							{
								resolve([]);
							}
						}); 
		   });
	});   
};
   