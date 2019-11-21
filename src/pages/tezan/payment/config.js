import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';     
import {get_profileid} from '../../../rest/profile'

import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const get_order_info = (orderid) => {
    return new Promise((resolve, reject) => {
			rest.init({application:application});  
			rest.XN_Content.load(orderid,"mall_orders_"+supplierid,7).then(order_info => {  
				 var info = {}; 
				 info.supplierid = order_info.my.supplierid; 
				 info.productname = order_info.my.ordername; 
				 info.mall_orders_no = order_info.my.mall_orders_no;
				 info.orderstotal = Number(order_info.my.orderstotal);
				 info.postage = Number(order_info.my.postage); 
				 info.sumorderstotal = Number(order_info.my.sumorderstotal); 
				 info.amountpayable = Number(order_info.my.amountpayable); 
				 info.rankmoney = Number(order_info.my.rankmoney); 
				 info.usemoney = Number(order_info.my.usemoney);
	   	   		 resolve(info);   
			},
			function(error) {
				 reject(error);
			});
	}); 
}; 

export const saveorder = (params) => {
	return new Promise((resolve, reject) => {
		console.log('____________saveorder________________'); 
		get_profileid().then(profileid => {   
			        console.log('____________params_________' + JSON.stringify(params));
					var newcontent = rest.XN_Content.create('saveorder','',false,2);					  
					newcontent.my.deleted = '0';  
					newcontent.my.profileid = profileid; 
					newcontent.my.supplierid = supplierid;   
					newcontent.my.module = 'mall_orders';   
					newcontent.my.action = 'saveorder';  
					newcontent.my.record = params.orderid;  
					newcontent.my.key = params.key;  
					newcontent.my.orderid = params.orderid;
					newcontent.my.userank = String(params.userank);
	 				newcontent.my.rank = String(params.rank);
					newcontent.my.usemoney = String(params.usemoney);
					newcontent.my.money = String(params.money);
					newcontent.my.amount = String(params.amount);
					newcontent.my.payment = String(params.payment);
					newcontent.save("saveorder,saveorder_"+supplierid).then(res => {   
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
		},
		function(error) {
			reject('没有登录');
		});  
	});   
};