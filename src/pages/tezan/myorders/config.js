import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';   
import {number_format,date_format} from '../../../rest/common'
import {get_profileid} from '../../../rest/profile'
  
import store from '../../../store/index'  
import base64 from '../../../rest/base64';   

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const getdefault_deliveraddress = (selectid) => {
	return new Promise((resolve, reject) => {
		console.log('____________getdefault_deliveraddress________________'); 
		get_profileid().then(profileid => {   
				rest.XN_Query.create('Content').tag("deliveraddress_"+profileid)
					.filter("type","eic","deliveraddress")  
				    .filter("my.profileid","=",profileid)    
					.filter("my.deleted","=",0)  
					.order("published","DESC")
				    .end(-1)
					.execute().then(res => {      
						if (res.size > 0)
						{   
							var select = false;
							var deliveraddress = {};
							for (var i in res.entry)
							{
								var deliveraddress_info = res.entry[i];    
								if (selectid != '' && selectid != '0')
								{
									if (deliveraddress_info.id == selectid)
									{
										 deliveraddress = {
											    id: deliveraddress_info.id,
											    consignee: deliveraddress_info.my.consignee, 
											    mobile: deliveraddress_info.my.mobile,
											    province: deliveraddress_info.my.province,
												city:deliveraddress_info.my.city, 
											    district: deliveraddress_info.my.district,  
				 								shortaddress: deliveraddress_info.my.shortaddress,
				 								zipcode: deliveraddress_info.my.zipcode,
											    address: deliveraddress_info.my.address,  
											};   
											break;
									} 
								}
								else
								{ 
									if (deliveraddress_info.my.selected == '1')
									{
									    deliveraddress = {
										    id: deliveraddress_info.id,
										    consignee: deliveraddress_info.my.consignee, 
										    mobile: deliveraddress_info.my.mobile,
										    province: deliveraddress_info.my.province,
											city:deliveraddress_info.my.city, 
										    district: deliveraddress_info.my.district,  
			 								shortaddress: deliveraddress_info.my.shortaddress,
			 								zipcode: deliveraddress_info.my.zipcode,
										    address: deliveraddress_info.my.address,  
										};   
										break; 
									}
									else
									{
										if (!select)
										{
										    deliveraddress = {
											    id: deliveraddress_info.id,
											    consignee: deliveraddress_info.my.consignee, 
											    mobile: deliveraddress_info.my.mobile,
											    province: deliveraddress_info.my.province,
												city:deliveraddress_info.my.city, 
											    district: deliveraddress_info.my.district,  
				 								shortaddress: deliveraddress_info.my.shortaddress,
				 								zipcode: deliveraddress_info.my.zipcode,
											    address: deliveraddress_info.my.address,  
											};
											select = true;  
										} 
									} 
								} 
							} 
							resolve(deliveraddress); 
						}   
						else
						{
							reject('没有收货地址');
						}
						
				}); 
		},
		function(error) {
			reject('没有登录');
		});  
	});   
};


export const getshoppingcarts = (params) => {
	return new Promise((resolve, reject) => {
		console.log('____________getshoppingcarts________________'); 
		get_profileid().then(profileid => {  
		        if (params.from == 'shoppingcart')
				{
	  		   	    var ids = params.ids;
					if (!Array.isArray(ids))
					{
						ids = [ids];
					}
  					rest.XN_Content.loadMany(ids,"mall_shoppingcarts_"+supplierid,7).then(res => {   
						var shoppingcarts = [];
						for (var i in res)
						{
							var mall_shoppingcart_info = res[i];   
							shoppingcarts.push({
								    id: mall_shoppingcart_info.id,
								    productid: mall_shoppingcart_info.my.productid, 
								    productname: mall_shoppingcart_info.my.productname,
								    productlogo: imgBaseUrl + mall_shoppingcart_info.my.productlogo,
									productthumbnail:imgBaseUrl + mall_shoppingcart_info.my.productthumbnail,
	 							    market_price: number_format(mall_shoppingcart_info.my.market_price, 2, ".", ","),
									shop_price: number_format(mall_shoppingcart_info.my.shop_price, 2, ".", ","), 
								    vendor_price: number_format(mall_shoppingcart_info.my.vendor_price, 2, ".", ","), 
								    quantity: mall_shoppingcart_info.my.quantity, 
								    total_price: number_format(mall_shoppingcart_info.my.total_price, 2, ".", ","), 
	 								categorys: mall_shoppingcart_info.my.categorys,
	 								product_property_id: mall_shoppingcart_info.my.product_property_id,
								    propertydesc: mall_shoppingcart_info.my.propertydesc, 
	 								salesactivityid: mall_shoppingcart_info.my.salesactivityid,  
									salesactivitys_product_id: mall_shoppingcart_info.my.salesactivitys_product_id,  
									measurementunit: mall_shoppingcart_info.my.measurementunit, 
									mergepostage: mall_shoppingcart_info.my.mergepostage, 
									postage: mall_shoppingcart_info.my.postage, 
									include_post_count: mall_shoppingcart_info.my.include_post_count,  
									selected:1,
								});
						}  
  						 resolve(shoppingcarts); 
  				    }, function(error) {
  						 reject(error);
  					}); 
				}
				else if (params.from == 'detail')
				{
				    var productid = params.productid;
					var quantity = params.quantity;
					var propertyid = params.propertyid;
					rest.XN_Content.load(productid,"mall_products_"+supplierid).then(mall_product_info => {  
						     var info = {};  
							 info.productid = mall_product_info.id;
							 info.productname = mall_product_info.my.productname;
							 info.productlogo = imgBaseUrl + mall_product_info.my.productlogo;
							 info.productthumbnail = imgBaseUrl + mall_product_info.my.productthumbnail; 
							 
							 info.measurementunit = mall_product_info.my.measurementunit;  
							 info.product_guige = mall_product_info.my.product_guige; 
							 info.property_type = mall_product_info.my.property_type;  
							 info.mergepostage = mall_product_info.my.mergepostage; 
							 info.postage = mall_product_info.my.postage; 
							 info.include_post_count = mall_product_info.my.include_post_count; 
							 info.quantity = quantity;  
							 info.selected = 1;
							 if (propertyid != "")
							 {
	 							rest.XN_Content.load(propertyid,"mall_product_property").then(property_info => { 
	 								 var shop_price = Number(property_info.my.shop);
	 								 var market_price = property_info.my.market;
	 								 var propertydesc = property_info.my.propertydesc;  
	   		 					     var total_price = Number(quantity) * Number(shop_price); 
	   								 info.shop_price = number_format(shop_price, 2, ".", ",");   
	   								 info.total_price = number_format(total_price, 2, ".", ",");  
									 info.propertydesc = propertydesc;  
									 info.propertyid = propertyid;  
	   								 resolve([info]);  
								});
								
							 }
							 else
							 {
		 					     var shop_price = mall_product_info.my.shop_price;
		 					     var total_price = Number(quantity) * Number(shop_price); 
								 info.shop_price = number_format(shop_price, 2, ".", ",");   
								 info.total_price = number_format(total_price, 2, ".", ","); 
								 info.propertydesc = '';  
								 info.propertyid = ''; 
								 resolve([info]);  
							 } 
				    }, function(error) {
						 reject(error);
					}); 
				} 
				 
		},
		function(error) {
			reject('没有登录');
		});  
	});   
};



export const submitorder = (params) => {
	return new Promise((resolve, reject) => {
		console.log('____________submitorder________________'); 
		get_profileid().then(profileid => {   
					var newcontent = rest.XN_Content.create('submitorder','',false,2);					  
					newcontent.my.deleted = '0';  
					newcontent.my.profileid = profileid; 
					newcontent.my.supplierid = supplierid;   
					newcontent.my.module = 'mall_orders';   
					newcontent.my.action = 'submitorder';  
					newcontent.my.record = params.record; 
					newcontent.my.key = params.key;
					newcontent.my.from = params.from;
					newcontent.my.deliveraddressid = params.deliveraddressid;
			        if (params.from == 'shoppingcart')
					{
		  		   	    var ids = params.ids; 
						if (!Array.isArray(ids))
						{
							ids = [ids];
						}
						newcontent.my.ids = ids.join(',');
					}
					else if (params.from == 'detail')
					{
						newcontent.my.productid = params.productid;
						newcontent.my.quantity = String(params.quantity);
						newcontent.my.propertyid = params.propertyid; 
					} 
					newcontent.my.total_quantity = String(params.total_quantity);
					newcontent.my.total_price = params.total_price;
					newcontent.my.total_postage = params.total_postage;
					newcontent.my.amount = params.amount; 
				    if (typeof WXEnvironment === 'object') { 
						newcontent.my.platform = WXEnvironment.platform || '';
						newcontent.my.appname = WXEnvironment.appName || '';
						newcontent.my.appversion = WXEnvironment.appVersion || '';
						newcontent.my.devicemodel = WXEnvironment.deviceModel || '';
					}
					newcontent.save("submitorder,submitorder_"+supplierid).then(res => {   
						resolve(res); 				
					},
					function(error) {
						reject('创建消息队列出错');
					}); 
		},
		function(error) {
			reject('没有登录');
		});  
	});   
};



export const getorders = (type,page) => {
	return new Promise((resolve, reject) => {
		console.log('____________getorders________________');		
		get_profileid().then(profileid => {   
				var query = rest.XN_Query.create('YearContent').tag("mall_orders_"+profileid)
					.filter("type","eic","mall_orders")  
				    .filter("my.supplierid","=",supplierid)  
					.filter("my.profileid","=",profileid)   
					.filter("my.deleted","=",0)  
					.order("published","DESC")
				    .begin(page*5)
					.end((page+1)*5); 
				if (type == "pendingpayment")
				{
					query.filter('my.tradestatus','=','notrade');
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
				else if (type == "all")
				{
					query.filter('my.tradestatus','=','trade');
				} 	
				else
				{
					resolve([]);  
					return;
				}
				query.execute().then(res => {      
						if (res.size > 0)
						{ 
							var orderids = [];
							for (var i in res.entry)
							{
								var order_info = res.entry[i];  
								orderids.push(order_info.id);
							} 
							rest.XN_Query.create('YearContent').tag("mall_orders_products_"+profileid)
								.filter("type","eic","mall_orders_products")  
							    .filter("my.supplierid","=",supplierid)  
								.filter("my.orderid","in",orderids)   
								.filter("my.deleted","=",0)  
							    .end(-1)
								.execute().then(orders_products => { 
									    var orders = [];   
										for (var i in res.entry)
										{
											var order_info = res.entry[i];  
											var orderid  = order_info.id;
											var products = [];
											for (var j in orders_products.entry)
											{
												var orders_product_info = orders_products.entry[j]; 
												if (orders_product_info.my.orderid == orderid)
												{ 
													products.push({
														    productid: orders_product_info.my.productid, 
														    productname: orders_product_info.my.productname,
														    productlogo: imgBaseUrl + orders_product_info.my.productlogo,
															productthumbnail:imgBaseUrl + orders_product_info.my.productthumbnail,
							 							    market_price: number_format(orders_product_info.my.market_price, 2, ".", ","),
															shop_price: number_format(orders_product_info.my.shop_price, 2, ".", ","),  
														    quantity: orders_product_info.my.quantity, 
														    total_price: number_format(orders_product_info.my.total_price, 2, ".", ","),  
							 								product_property_id: orders_product_info.my.product_property_id,
														    propertydesc: orders_product_info.my.propertydesc,  
															measurementunit: orders_product_info.my.measurementunit,  
														}); 
												} 
											} 
											var order = {
												    id: order_info.id,
													published: order_info.published, 
												    consignee: order_info.my.consignee, 
												    mobile: order_info.my.mobile,
												    province: order_info.my.province,
													city:order_info.my.city, 
												    district: order_info.my.district,  
					 								shortaddress: order_info.my.shortaddress,
					 								zipcode: order_info.my.zipcode,
												    address: order_info.my.address, 
												    ordername: order_info.my.ordername, 
													mall_orders_no: order_info.my.mall_orders_no,
													order_status:order_info.my.order_status,
													orderstotal: order_info.my.orderstotal,
												    postage: order_info.my.postage, 
												    sumorderstotal: order_info.my.sumorderstotal, 
													amountpayable: order_info.my.amountpayable,
												    appraisestatus: order_info.my.appraisestatus,
												    returnedgoodsstatus: order_info.my.returnedgoodsstatus,
													rankmoney: order_info.my.rankmoney,
												    usemoney: order_info.my.usemoney, 
												    cancel: order_info.my.cancel,  
													deliverytime:order_info.my.deliverytime,
												    products:products,  
												};  
											orders.push(order);
										}
										resolve(orders); 
							});
						}
						else
						{
							resolve([]);  
						}    
				}); 
		},
		function(error) {
			resolve(error);
		});  
	});   
};

export const get_order_info = (orderid) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_order_info________________');		
			rest.XN_Content.load(orderid,"mall_orders_"+supplierid,7).then(order_info => {  
						rest.XN_Query.create('YearContent').tag("mall_orders_products_"+supplierid)
							.filter("type","eic","mall_orders_products")  
						    .filter("my.supplierid","=",supplierid)  
							.filter("my.orderid","in",orderid)   
							.filter("my.deleted","=",0)  
						    .end(-1)
							.execute().then(orders_products => { 
								        var products = [];    
										for (var i in orders_products.entry)
										{
											var orders_product_info = orders_products.entry[i];  
											products.push({
												    id: orders_product_info.id, 
												    productid: orders_product_info.my.productid, 
												    productname: orders_product_info.my.productname,
												    productlogo: imgBaseUrl + orders_product_info.my.productlogo,
													productthumbnail:imgBaseUrl + orders_product_info.my.productthumbnail,
					 							    market_price: number_format(orders_product_info.my.market_price, 2, ".", ","),
													shop_price: number_format(orders_product_info.my.shop_price, 2, ".", ","),  
												    quantity: orders_product_info.my.quantity, 
												    total_price: number_format(orders_product_info.my.total_price, 2, ".", ","),  
					 								product_property_id: orders_product_info.my.product_property_id,
												    propertydesc: orders_product_info.my.propertydesc,  
													measurementunit: orders_product_info.my.measurementunit,  
												});  
										} 
										var order = {
											    id: order_info.id,
												published: order_info.published, 
											    consignee: order_info.my.consignee, 
											    mobile: order_info.my.mobile,
											    province: order_info.my.province,
												city:order_info.my.city, 
											    district: order_info.my.district,  
				 								shortaddress: order_info.my.shortaddress,
				 								zipcode: order_info.my.zipcode,
											    address: order_info.my.address, 
											    ordername: order_info.my.ordername, 
												mall_orders_no: order_info.my.mall_orders_no,
												orderstotal: order_info.my.orderstotal,
											    postage: order_info.my.postage, 
											    sumorderstotal: order_info.my.sumorderstotal, 
												amountpayable: order_info.my.amountpayable,
											    productcount: order_info.my.productcount,
												rankmoney: order_info.my.rankmoney,
											    usemoney: order_info.my.usemoney, 
												paymenttime:order_info.my.paymenttime,
												tradestatus:order_info.my.tradestatus,
												payment:order_info.my.payment,
												discount:order_info.my.discount,
												vipdeductionmoney:order_info.my.vipdeductionmoney,
												rankmoney:order_info.my.rankmoney,
												usemoney:order_info.my.usemoney,
												paymentamount:order_info.my.paymentamount,
												order_status:order_info.my.order_status,
												deliverystatus:order_info.my.deliverystatus,
												appraisestatus:order_info.my.appraisestatus,
												returnedgoodsstatus:order_info.my.returnedgoodsstatus,
											    submitreturnedgoodsdatetime:order_info.my.submitreturnedgoodsdatetime,
												deliverytime:order_info.my.deliverytime,
												confirmreceipt_time:order_info.my.confirmreceipt_time,
												invoicenumber:order_info.my.invoicenumber,
												invoicename:order_info.my.invoicename,
												delivery:order_info.my.delivery,
											    cancel: order_info.my.cancel,  
											    products:products,  
										};   
									    resolve(order); 
						});  
			});  
	});   
};
 

export const updateorder = (orderid,json) => {
	return new Promise((resolve, reject) => {
		get_profileid().then(profileid => {   
		    console.log('____________updateorder___'+orderid+'____'+JSON.stringify(json)+'________');   
			rest.XN_Content.load(orderid,"mall_orders_"+profileid,7).then(order_info => {   
				for(var key in json){
					order_info.my[key] = json[key]; 
				}
				order_info.save("mall_orders,mall_orders_"+profileid+",mall_orders_"+supplierid).then(res => {   
					resolve(res); 				
				});			 
			}); 
		},
		function(error) {
			reject('没有登录');
		});
	});    
};


export const aftersaleservice_submit = (orderid,orders_products,uploads,servicetype,reason) => {
	return new Promise((resolve, reject) => { 
	            console.log('____________aftersaleservice_submit_________');	 
				var profileid = store.state.profileid;
				var supplierid = store.state.supplierid;
				var appid = store.state.appid; 
				var newcontent = rest.XN_Content.create('aftersaleservice_submit','',false,2);	 
				newcontent.my.profileid = profileid; 
				newcontent.my.supplierid = supplierid;
				newcontent.my.appid = appid;   
				newcontent.my.orderid = orderid;    
				newcontent.my.orders_products = base64.encode(JSON.stringify(orders_products));  
				newcontent.my.uploads = base64.encode(JSON.stringify(uploads));  
				newcontent.my.servicetype = servicetype; 
				newcontent.my.reason = reason;   
				newcontent.my.module = 'aftersaleservice';   
				newcontent.my.action = 'submit';  
				newcontent.my.record = orderid;    
				newcontent.save("").then(res => { 
					var mqid = res.id; 
					var count = 1;
					var load_mq_info = function() {
						rest.XN_Content.load(mqid,"",2).then(res => {   
							if (res.my.ack == 1)
							{    
								console.log('________________________' + JSON.stringify(res.my.result)); 
								resolve(res.my.result); 
							}
							else if (res.my.ack == 2)
							{     
								reject(res.my.result);
							}
							else
							{ 
							   count = count + 1;	
							   if (count <= 5)
							   {
							   		setTimeout(() => { load_mq_info(); }, 500); 
							   }
							   else
							   {
							   		reject('提交队列响应超时!');
							   } 
							}	
						 });
					}; 
			        setTimeout(() => { load_mq_info(); }, 500);	
				},
				function(error) {
					 reject(error); 
				});  
	});  
}



export const confirmreceipt_submit = (orderid) => {
	return new Promise((resolve, reject) => { 
	            console.log('____________confirmreceipt_submit_________');	 
				var profileid = store.state.profileid;
				var supplierid = store.state.supplierid; 
				var newcontent = rest.XN_Content.create('orders_confirmreceipt','',false,2);	 
				newcontent.my.profileid = profileid; 
				newcontent.my.supplierid = supplierid; 
				newcontent.my.orderid = orderid;     
				newcontent.my.module = 'orders';   
				newcontent.my.action = 'confirmreceipt';  
				newcontent.my.record = orderid;    
				newcontent.save("").then(res => { 
					var mqid = res.id; 
					var count = 1;
					var load_mq_info = function() {
						rest.XN_Content.load(mqid,"",2).then(res => {   
							if (res.my.ack == 1)
							{  
								console.log('________________________' + JSON.stringify(res.my.result)); 
								resolve(res.my.result); 
							}
							else if (res.my.ack == 2)
							{     
								reject(res.my.result);
							}
							else
							{ 
							   count = count + 1;	
							   if (count <= 5)
							   {
							   		setTimeout(() => { load_mq_info(); }, 500); 
							   }
							   else
							   {
							   		reject('提交队列响应超时!');
							   } 
							}	
						 });
					}; 
			        setTimeout(() => { load_mq_info(); }, 500);	
				},
				function(error) {
					 reject(error); 
				});  
	});  
}


export const save_appraise = (orderid,appraises) => {
	return new Promise((resolve, reject) => { 
	            console.log('____________save_appraise_________');	 
				var profileid = store.state.profileid;
				var supplierid = store.state.supplierid; 
				rest.XN_Content.load(orderid,"mall_orders_"+supplierid,7).then(order_info => {  
					for (var i in appraises)
					{
						var appraise_info = appraises[i];
						var newcontent = rest.XN_Content.create('mall_appraises','',false,7);					  
						newcontent.my.deleted = '0';  
						newcontent.my.profileid = profileid; 
						newcontent.my.supplierid = supplierid;   
						newcontent.my.orderid = orderid;  
						newcontent.my.productid = appraise_info.productid; 
						newcontent.my.orders_products_id = appraise_info.orders_products_id; 
						newcontent.my.praise = appraise_info.praise; 
						newcontent.my.remark = appraise_info.remark; 
						newcontent.my.hasimages = appraise_info.uploads.length; 
						newcontent.my.images = appraise_info.uploads; 
						newcontent.my.mall_appraisesstatus = 'JustCreated';  
						newcontent.save("mall_appraises,mall_appraises_"+profileid+",mall_appraises_"+supplierid).then(res => {	
							console.log('_________res_______________' + JSON.stringify(res)); 					
							rest.XN_Content.load(appraise_info.orders_products_id,"mall_orders_products_"+supplierid,7).then(orders_products_info => { 
								orders_products_info.my.praiseid = res.id;
								orders_products_info.save("mall_orders_products,mall_orders_products_"+profileid+",mall_orders_products_"+supplierid).then(res => { });  
							});
						 });   
					}  
					order_info.my.appraisestatus = 'yes';
					order_info.my.appraisetime = date_format(new Date());
					order_info.save("mall_orders,mall_orders_"+profileid+",mall_orders_"+supplierid).then(res => { 
						resolve("ok"); 
					});   
				});
	});  
}

export const get_appraises = (orderid) => {
	return new Promise((resolve, reject) => { 
	            console.log('____________get_appraises_________');	 
				var profileid = store.state.profileid;
				var supplierid = store.state.supplierid; 
				rest.XN_Query.create('YearContent').tag("mall_appraises_"+profileid)
					.filter("type","eic","mall_appraises")  
				    .filter("my.supplierid","=",supplierid)  
					.filter("my.orderid","=",orderid)   
					.filter("my.deleted","=",0)  
				    .end(-1)
					.execute().then(res => { 
						    var appraises = [];   
							for (var i in res.entry)
							{
								var appraise_info = res.entry[i];  
								var images = appraise_info.my.images;
								if (appraise_info.my.hasimages == "0")
								{
									images = [];
								}
								else
								{
									var images = [];
									for (var i in appraise_info.my.images)
									{
									  	images.push(imgBaseUrl+appraise_info.my.images[i]);
									} 
								}
								appraises.push( {
									    id: appraise_info.id,
										published: appraise_info.published,  
									    productid: appraise_info.my.productid,
									    orders_products_id: appraise_info.my.orders_products_id,
										praise:appraise_info.my.praise, 
									    hasimages: appraise_info.my.hasimages,  
		 								remark:appraise_info.my.remark, 
									    uploads:images, 
									});   
							}
							resolve(appraises);
					});
	});  
}


export const get_aftersaleservice = (orderid) => {
	return new Promise((resolve, reject) => { 
	            console.log('____________get_aftersaleservice_________');	 
				var profileid = store.state.profileid;
				var supplierid = store.state.supplierid; 
				
				rest.XN_Query.create('YearContent').tag("mall_returnedgoodsapplys_"+profileid)
					.filter("type","eic","mall_returnedgoodsapplys")  
				    .filter("my.supplierid","=",supplierid)  
					.filter("my.orderid","=",orderid)   
					.filter("my.deleted","=",0)  
				    .end(-1)
					.execute().then(res => { 
						    var returnedgoodsapply = {};  
							if  (res.entry.length > 0)
							{
								var returnedgoodsapply_info = res.entry[0];  
								returnedgoodsapply.id = returnedgoodsapply_info.id;
								returnedgoodsapply.published = returnedgoodsapply_info.published;
								returnedgoodsapply.reason = returnedgoodsapply_info.my.reason;
								returnedgoodsapply.servicetype = returnedgoodsapply_info.my.servicetype;
								returnedgoodsapply.hasimages = returnedgoodsapply_info.my.hasimages;
								var images = [];
								for (var i in returnedgoodsapply_info.my.images)
								{
								  	images.push(imgBaseUrl+returnedgoodsapply_info.my.images[i]);
								} 
								returnedgoodsapply.images = images;
								returnedgoodsapply.returnedgoodsquantity = returnedgoodsapply_info.my.returnedgoodsquantity;
								returnedgoodsapply.returnedgoodsamount = returnedgoodsapply_info.my.returnedgoodsamount;
								returnedgoodsapply.operator = returnedgoodsapply_info.my.operator; 		
								rest.XN_Query.create('YearContent').tag("mall_returnedgoodsapplys_products_"+profileid)
									.filter("type","eic","mall_returnedgoodsapplys_products")  
								    .filter("my.supplierid","=",supplierid)  
									.filter("my.orderid","=",orderid)  
									.filter("my.returnedgoodsapplyid","=",returnedgoodsapply_info.id)   
									.filter("my.deleted","=",0)  
								    .end(-1)
									.execute().then(res => { 
										var returnedgoods = []; 
										for (var i in res.entry)
										{
											var mall_returnedgoodsapplys_product_info = res.entry[i];   
											returnedgoods.push( {
												    id: mall_returnedgoodsapplys_product_info.id, 
												    productid: mall_returnedgoodsapplys_product_info.my.productid,
												    orders_products_id: mall_returnedgoodsapplys_product_info.my.orders_productid,
													returnedgoodsquantity:mall_returnedgoodsapplys_product_info.my.returnedgoodsquantity,  
												});   
										}
										returnedgoodsapply.products = returnedgoods;
										
										rest.XN_Query.create('YearContent').tag("mall_returnedgoodsapplys_details_"+profileid)
											.filter("type","eic","mall_returnedgoodsapplys_details")  
										    .filter("my.supplierid","=",supplierid)  
											.filter("my.orderid","=",orderid)  
											.filter("my.applyid","=",returnedgoodsapply_info.id)   
											.filter("my.deleted","=",0)  
										    .order("published","ASC")
										    .end(-1)
											.execute().then(res => { 
												if (res.size == 0)
												{
													returnedgoodsapply.details = [];
													resolve(returnedgoodsapply);
												}
												else
												{
													var details = []; 
													var profileids = [];
													var givennames = {};
													for (var i in res.entry)
													{
														var detail_info = res.entry[i];   
														if (profileids.indexOf(detail_info.my.profileid) == -1)
														{ 
															profileids.push(detail_info.my.profileid);   
														} 
													}  
													rest.XN_Profile.loadMany(profileids,'id','profile').then(profiles => { 
														console.log('___________loadMany_________' + JSON.stringify(profiles)); 
														for (var i in profiles)
														{
															var profile_info = profiles[i];    
															givennames[profile_info.id] = profile_info.givenname;  
														}  
														console.log('___________givennames________' + JSON.stringify(givennames)); 
														for (var i in res.entry)
														{
															var detail_info = res.entry[i];   
															details.push( {
																    id: detail_info.id,  
																    published: detail_info.published,
																    profileid: detail_info.my.profileid,
																    givenname: givennames[detail_info.my.profileid],
																	content:detail_info.my.content,  
																	step:detail_info.my.step,
																});   
														}  
														console.log('___________details_________' + JSON.stringify(details)); 
														returnedgoodsapply.details = details;
														resolve(returnedgoodsapply);
													}); 
												} 
											}); 
									});					
							} 
					});
	});  
}


export const save_aftersaleservice_reply = (orderid,applyid,reply) => {
	return new Promise((resolve, reject) => { 
	            console.log('____________save_appraise_________');	 
				var profileid = store.state.profileid;
				var supplierid = store.state.supplierid; 
				 
				var newcontent = rest.XN_Content.create('mall_returnedgoodsapplys_details','',false,7);					  
				newcontent.my.deleted = '0';  
				newcontent.my.profileid = profileid; 
				newcontent.my.supplierid = supplierid;   
				newcontent.my.orderid = orderid;   
				newcontent.my.applyid = applyid; 
				newcontent.my.content = reply; 
				newcontent.my.step = '用户回复';  
				newcontent.save("mall_returnedgoodsapplys_details,mall_returnedgoodsapplys_details_"+profileid+",mall_returnedgoodsapplys_details_"+supplierid).then(res => {	
					resolve(res);
				 });   
	});  
} 