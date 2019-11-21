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
 

export const get_commissions = (page) => {
	return new Promise((resolve, reject) => {
			console.log('____________mall_commissions________________');
			get_profileid().then(profileid => {  
					rest.XN_Query.create('YearContent').tag("mall_commissions_"+profileid)
						.filter("type","eic","mall_commissions")  
					    .filter("my.supplierid","=",supplierid)  
						.filter("my.profileid","=",profileid)   
						.filter("my.deleted","=",0)  
						.filter("my.commissiontype","=",'0')
						.order("published","DESC")
					    .begin(page*12)
						.end((page+1)*12)
						.execute().then(res => {    
							if (res.size > 0)
							{
								var profileids = [];
								for (var i in res.entry)
								{
									var commission_info = res.entry[i];  
									if (commission_info.my.consumer && commission_info.my.consumer != '')
									{
										profileids.push(commission_info.my.consumer);										
									} 
								} 
								console.log('___________profileids________' + JSON.stringify(profileids));   
								if (profileids.length > 0)
								{
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
												var commissions = []; 
												for (var i in res.entry)
												{
													var commission_info = res.entry[i];  
													commissions.push({
														    id: commission_info.id, 
														    orderid: commission_info.my.orderid, 
														 	middleman: commission_info.my.middleman, 
															consumer: givennames[commission_info.my.consumer], 
														    propertyid: commission_info.my.propertyid, 
														    amount: '¥'+commission_info.my.amount,  
															quantity: commission_info.my.quantity,  
															totalprice: '¥'+commission_info.my.totalprice,  
															commissiontype: commission_info.my.commissiontype,  
															royaltyrate: commission_info.my.royaltyrate,  
															orders_productid: commission_info.my.orders_productid,  
															productid: commission_info.my.productid,  
															commissionsource: commission_info.my.commissionsource,  
															subordinate: commission_info.my.subordinate,   
															published:date_format(todatetime(commission_info.published), "YYYY-MM-DD HH:mm"),
													});  
												} 
												resolve(commissions);
											}
									}); 
								}
								else
								{
									resolve([]);
								} 
							}
							else
							{
								resolve([]);
							}
						}); 
		   });
	});   
};
   