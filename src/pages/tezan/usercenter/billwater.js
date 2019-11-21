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
		{key:'share',type:'+',label:'分享'}, 
		{key:'commission',type:'+',label:'提成'}, 
		{key:'consumption',type:'-',label:'消费'},
		{key:'popularize',type:'+',label:'推广'},
		{key:'profile',type:'+',label:'会员管理'},
		{key:'reimburse',type:'+',label:'余额退款'},
		{key:'deductpercentage',type:'-',label:'退货减提成'},
		{key:'deductpopularize',type:'-',label:'扣除推广收益'},
		{key:'addprofile',type:'+',label:'会员充值'},
		{key:'decprofile',type:'-',label:'会员反充值'},
		{key:'takecash',type:'-',label:'提现'}, 
		{key:'rejecttakecash',type:'+',label:'驳回提现'},  
		];

export const get_billwaters = (page) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_billwaters________________');
			get_profileid().then(profileid => {   	 
					rest.XN_Query.create('YearContent').tag("mall_billwaters_"+profileid)
						.filter("type","eic","mall_billwaters")  
					    .filter("my.supplierid","=",supplierid)  
						.filter("my.profileid","=",profileid)   
						.filter("my.deleted","=",0)  
						.order("published","DESC")
					    .begin(page*12)
						.end((page+1)*12)
						.execute().then(res => {     
							var billwaters = []; 
							if (res.size > 0)
							{   
								for (var i in res.entry)
								{
										var billwater_info = res.entry[i];  
										billwaters.push({
											    id: billwater_info.id, 
											    billwatertype: billwater_info.my.billwatertype, 
											 	sharedate: billwater_info.my.sharedate, 
											    orderid: billwater_info.my.orderid, 
											    amount: billwater_info.my.amount, 
											    money: billwater_info.my.money,  
												published: billwater_info.published,  
										});  
								} 
							}
							resolve(billwaters);
						}); 
		   });
	});   
};
  