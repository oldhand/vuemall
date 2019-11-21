import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';    
import {get_profileid} from '../../../rest/profile'


import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const types = [ 
		{key:'addrank',type:'+',label:'增加积分'}, 
		{key:'costrank',type:'-',label:'消费'},
		{key:'decrank',type:'-',label:'扣除积分'}, 
		];

export const get_rankwaters = (page) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_rankwaters________________');
			get_profileid().then(profileid => {   	 
					rest.XN_Query.create('YearContent').tag("mall_rankwaters_"+profileid)
						.filter("type","eic","mall_rankwaters")  
					    .filter("my.supplierid","=",supplierid)  
						.filter("my.profileid","=",profileid)   
						.filter("my.deleted","=",0)  
						.order("published","DESC")
					    .begin(page*12)
						.end((page+1)*12)
						.execute().then(res => {     
							var rankwaters = []; 
							if (res.size > 0)
							{   
								for (var i in res.entry)
								{
										var rankwater_info = res.entry[i];  
										rankwaters.push({
											    id: rankwater_info.id, 
											    rankwatertype: rankwater_info.my.rankwatertype,  
											    orderid: rankwater_info.my.orderid, 
											    amount: Math.floor(rankwater_info.my.amount), 
												rank: Math.floor(rankwater_info.my.rank),  
												published: rankwater_info.published,  
										});  
								} 
							}
							resolve(rankwaters);
						}); 
		   });
	});   
};
  