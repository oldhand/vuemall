import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';   
import {number_format} from '../../../rest/common'
import {get_profile_info} from '../../../rest/profile'

import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const get_accountbook_info = () => {
	return new Promise((resolve, reject) => {
			console.log('____________get_accountbook_info________________');	 
			 var accountbook_info = {};
			  get_profile_info().then(profile_info => {  
					accountbook_info.rank =  profile_info.rank; 
					accountbook_info.accumulatedrank =  profile_info.accumulatedrank; 
					accountbook_info.accumulatedmoney =  profile_info.accumulatedmoney; 
					accountbook_info.money =  profile_info.money; 
					var profileid = profile_info.profileid; 
					
					rest.XN_Query.create('YearContent_Count').tag("mall_commissions_"+profileid)
						.filter("type","eic","mall_commissions")  
					    .filter("my.supplierid","=",supplierid)  
						.filter("my.profileid","=",profileid) 
						.filter("my.commissiontype","=",'0')   
						.filter("my.deleted","=",0)  
					    .rollup("my.amount")
						.end(-1)
						.execute().then(res => {  
							if (res.size > 0)
							{
								accountbook_info.frozenprofit = Number(res.entry[0].my.amount);
							}
							else
							{
								accountbook_info.frozenprofit = 0;
							}
							rest.XN_Query.create('YearContent_Count').tag("mall_commissions_"+profileid)
								.filter("type","eic","mall_commissions")  
							    .filter("my.supplierid","=",supplierid)  
								.filter("my.profileid","=",profileid) 
								.filter("my.commissiontype","=",'1')   
								.filter("my.deleted","=",0)  
							    .rollup("my.amount")
								.end(-1)
								.execute().then(res => {  
									if (res.size > 0)
									{
										accountbook_info.commissionprofit = Number(res.entry[0].my.amount);
									}
									else
									{
										accountbook_info.commissionprofit = 0;
									} 
									rest.XN_Query.create('YearContent_Count').tag("mall_billwaters_"+profileid)
										.filter("type","eic","mall_billwaters")  
									    .filter("my.supplierid","=",supplierid)  
										.filter("my.profileid","=",profileid) 
										.filter("my.billwatertype","=",'share')   
										.filter("my.deleted","=",0)  
									    .rollup("my.amount")
										.end(-1)
										.execute().then(res => {  
											if (res.size > 0)
											{
												accountbook_info.shareprofit = Number(res.entry[0].my.amount);
											}
											else
											{
												accountbook_info.shareprofit = 0;
											} 
											rest.XN_Query.create('YearContent_Count').tag("mall_billwaters_"+profileid)
												.filter("type","eic","mall_billwaters")  
											    .filter("my.supplierid","=",supplierid)  
												.filter("my.profileid","=",profileid) 
												.filter("my.billwatertype","=",'popularize')   
												.filter("my.deleted","=",0)  
											    .rollup("my.amount")
												.end(-1)
												.execute().then(res => {  
													if (res.size > 0)
													{
														accountbook_info.popularizeprofit = Number(res.entry[0].my.amount);
													}
													else
													{
														accountbook_info.popularizeprofit = 0;
													} 
													resolve(accountbook_info);
												}); 
										});   
								});   
						});  
			  },
		  	  function(error) {			
		  			reject(error);   
		  	  }); 
			 //resolve("");
		});   
};
 
 