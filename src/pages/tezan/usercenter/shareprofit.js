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

export const get_shareprofits = (page) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_shareprofits________________');
			get_profileid().then(profileid => {  
					rest.XN_Query.create('YearContent').tag("mall_billwaters_"+profileid)
						.filter("type","eic","mall_billwaters")  
					    .filter("my.supplierid","=",supplierid)  
						.filter("my.profileid","=",profileid) 
						.filter("my.billwatertype","=",'share')   
						.filter("my.deleted","=",0)  
						.order("published","DESC")
					    .begin(page*12)
						.end((page+1)*12)
						.execute().then(res => {    
							if (res.size > 0)
							{ 
									var billwaters = []; 
									for (var i in res.entry)
									{
										var billwater_info = res.entry[i];  
										billwaters.push({
											    id: billwater_info.id, 
											    sharedate: billwater_info.my.sharedate,  
												amount: '¥'+number_format(Math.abs(billwater_info.my.amount), 2, ".", ","),  
												money: '¥'+billwater_info.my.money,  
												shareid: billwater_info.my.shareid,   
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
		   });
	});   
};
   