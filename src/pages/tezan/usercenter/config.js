import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';   
import {date_format} from '../../../rest/common'


import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 


export const services = [
{
    name: '个人资料',
    icon: '&#xe681;',
    color: 'yellow',
	router: 'userdetail',
},
{
    name: '我的账薄',
    icon: '&#xe7e6;',
    color: 'yellow',
	router: 'accountbook',
},
{
    name: '卡券',
    icon: '&#xe641;',
    color: 'yellow',
	router: 'vipcard',
}, 
{
    name: '提现申请',
    icon: '&#xe685;',
    color: 'yellow',
	router: 'takecash',
}, 
{
    name: '分销',
    icon: '&#xe630;',
    color: 'blue',
	router: 'threeleveldistribution',
}, 
{
    name: '地址管理',
    icon: '&#xe65e;',
    color: 'blue',
	router: 'address',
},  
{
    name: '我的收藏',
    icon: '&#xe618;',
    color: 'blue',
	router: 'collection',
},  
{
    name: '设置',
    icon: '&#xe64a;',
    color: 'blue',
	router: 'setup',
}]


export const get_orders_count = (profileid,type) => {
	return new Promise((resolve, reject) => {
			    console.log('____________get_orders_count_____'+profileid+'_____'+type+'______');	 
				var query = rest.XN_Query.create('YearContent_Count').tag("mall_orders_"+profileid)
					.filter("type","eic","mall_orders")  
				    .filter("my.supplierid","=",supplierid)  
					.filter("my.profileid","=",profileid)   
					.filter("my.deleted","=",0)  
					.order("published","DESC")
				    .rollup()
					.end(-1); 
				if (type == "pendingpayment")
				{
					var date = new Date(new Date().getTime() - 1 * 60 * 60 * 1000);
					query.filter('my.tradestatus','=','notrade')
					     .filter('my.cancel','<>','1')
						 .filter('my.published','>',date_format(date));
				}
				else if (type == "sendout")
				{
					query.filter('my.tradestatus','=','trade')
						 .filter('my.deliverystatus','=','nosend')
						 .filter('my.aftersaleservicestatus','!=','yes');
				}
				else if (type == "receipt")
				{
					query.filter('my.tradestatus','=','trade')
						 .filter('my.deliverystatus','=','sendout')
						 .filter('my.confirmreceipt','!=','receipt')
						 .filter('my.aftersaleservicestatus','!=','yes');
				} 
				else if (type == "appraise")
				{
					query.filter('my.tradestatus','=','trade')
						 .filter('my.confirmreceipt','=','receipt')
						 .filter('my.appraisestatus','=','no')
						 .filter('my.aftersaleservicestatus','!=','yes');
				} 
				else if (type == "aftersaleservice")
				{
					query.filter('my.tradestatus','=','trade')
						 .filter('my.aftersaleservicestatus','=','yes');
				} 				
				else
				{
					resolve([]);  
					return;
				}
				query.execute().then(res => {  
					resolve(res.size);
				},
				function(error) {			
					reject(0);   
				}); 
	});				
};					
					
					
					