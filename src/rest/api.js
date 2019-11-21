import {application,webUrl,imgBaseUrl} from './env'
import rest from './rest';  
import {get_profileid} from './profile';  
import {number_format} from './common'

import Vue from 'vue'
import store from '../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
}

export const get_supplier_info = () => {
    return new Promise((resolve, reject) => {
			rest.init({application:application});  
			 console.log('____________get_supplier_info_______');  
			 if (Object.keys(store.state.supplier_info).length > 0)
			 {
				 resolve(store.state.supplier_info); 				 
			 }
			 else
			 { 
				    var Info = {};	
					rest.XN_Content.load(supplierid,"suppliers").then(supplier_res => {  
						 Info.supplierid = supplierid;
						 Info.suppliername = supplier_res.my.suppliers_name;		
						 Info.suppliertype = supplier_res.my.suppliertype;	
						 Info.company  = supplier_res.my.company;
						 Info.address = supplier_res.my.companyaddress;	 
						 Info.contact = supplier_res.my.contact;	
						 Info.mobile = supplier_res.my.mobile;	 
						 Info.latitude = supplier_res.my.latitude;	
						 Info.longitude = supplier_res.my.longitude;	  
					     rest.XN_Query.create('Content').tag("supplier_settings")
					 				.filter("type","eic","supplier_settings")
					 				.filter("my.deleted","=",0)
					 				.filter("my.supplierid","=",supplierid) 
					 				.end(1) 
					 				.execute().then(supplier_settings_res => {
										    //console.log('__________________supplier_settings_res: ' + JSON.stringify(supplier_settings_res));  
											if (supplier_settings_res.size > 0)
											{
												var supplier_settings_info = supplier_settings_res.entry[0]; 
												Info.allowtakecash = Number(supplier_settings_info.my.allowtakecash);
												Info.takecashlimit = Number(supplier_settings_info.my.takecashlimit);
											}
											else
											{
												Info.allowtakecash = 0; 
												Info.takecashlimit = 0; 
											}
							     		   rest.XN_Query.create('Content').tag("mall_settings")
								 				.filter("type","eic","mall_settings")
								 				.filter("my.deleted","=",0)
								 				.filter("my.supplierid","=",supplierid) 
								 				.end(1) 
								 				.execute().then(mall_settings_res => { 
														if (mall_settings_res.size > 0)
														{
															var mall_settings_info = mall_settings_res.entry[0]; 
															Info.suppliername = mall_settings_info.my.mallname;
															Info.officialwebsite = mall_settings_info.my.officialwebsite;
															Info.categoryslevel = mall_settings_info.my.categoryslevel;
															Info.description = mall_settings_info.my.description;   
													        Info.indexcolumns = mall_settings_info.my.indexcolumns;
													        Info.themecolor = mall_settings_info.my.themecolor;
													        Info.textcolor = mall_settings_info.my.textcolor;
													        Info.buttoncolor = mall_settings_info.my.buttoncolor;
													        Info.productpricecolor = mall_settings_info.my.productpricecolor;
													        Info.productbackgroundcolor = mall_settings_info.my.productbackgroundcolor;
															Info.navbarcolor = mall_settings_info.my.navbarcolor;
															Info.selectnavbarcolor = mall_settings_info.my.selectnavbarcolor;
													        Info.showcategory = mall_settings_info.my.showcategory;
															Info.showpromotioncenter = mall_settings_info.my.showpromotioncenter;
													        Info.allowreturngoods = mall_settings_info.my.allowreturngoods;
													        Info.allowpayment = mall_settings_info.my.allowpayment;
													        Info.commissionmode = mall_settings_info.my.commissionmode;
													        Info.saletelphone = mall_settings_info.my.saletelphone;
													        Info.autodeliverrechargeablecard = mall_settings_info.my.autodeliverrechargeablecard;
													 	    Info.showvendor = mall_settings_info.my.showvendor;		 
															Info.presalesconsultation = mall_settings_info.my.presalesconsultation;
															Info.productappraises = mall_settings_info.my.productappraises; 
															Info.categoryscolumns = mall_settings_info.my.categoryscolumns;
															Info.mainpageshowobject = mall_settings_info.my.mainpageshowobject; 
															Info.forceactivation = mall_settings_info.my.forceactivation; 
															Info.sourcerrequired = mall_settings_info.my.sourcerrequired; 
															Info.allowshare = mall_settings_info.my.allowshare; 
															Info.showuniquesale = mall_settings_info.my.showuniquesale; 
															Info.showfubisi = mall_settings_info.my.showfubisi;  
															Info.showtradeorderrecord = mall_settings_info.my.showtradeorderrecord;  
															Info.billwatershowmode = mall_settings_info.my.billwatershowmode;  
															Info.totalpricefreeshipping = mall_settings_info.my.totalpricefreeshipping;  
															Info.totalquantityfreeshipping = mall_settings_info.my.totalquantityfreeshipping; 
															Info.allowqrcode = mall_settings_info.my.allowqrcode;  
															Info.allowphysicalstore = mall_settings_info.my.allowphysicalstore; 
															Info.defaultphysicalstorerate = mall_settings_info.my.defaultphysicalstorerate; 
															Info.productqrcode = mall_settings_info.my.productqrcode; 
															Info.productdisplaymode = mall_settings_info.my.productdisplaymode; 
															Info.mainpagetitle = mall_settings_info.my.mainpagetitle; 
															Info.mainpageslider = mall_settings_info.my.mainpageslider; 
															Info.mainpageproductshowmode = mall_settings_info.my.mainpageproductshowmode; 
															Info.reception = mall_settings_info.my.reception;  
															Info.mylogistic = mall_settings_info.my.mylogistic; 
															Info.mylogisticname = mall_settings_info.my.mylogisticname; 
															Info.popularizeqrcode = mall_settings_info.my.popularizeqrcode; 
															Info.topadlogo = mall_settings_info.my.topadlogo; 
															Info.bottomadlogo = mall_settings_info.my.bottomadlogo; 
															Info.rankcost = mall_settings_info.my.rankcost; 
															Info.rankcostrate = mall_settings_info.my.rankcostrate; 
															Info.showheader = mall_settings_info.my.showheader;  
															Info.showleftmenu = mall_settings_info.my.showleftmenu; 
															Info.footerstyle = mall_settings_info.my.footerstyle; 
															Info.footericonstyle = mall_settings_info.my.footericonstyle; 
														}
														else
														{
									        
														}   
														store.commit('supplier_info',Info); 
														resolve(Info);
												}, 
												function(error) {			
													reject(error);   
												}); 
									}, 
									function(error) {			
										reject(error);   
									});
		
				    }, function(error) {
						 reject(error);
					}); 
			}
    }); 
};


export const get_products_count = () => {
    return new Promise((resolve, reject) => { 
		    if (store.state.products_count != -1)
			{ 		
				resolve(store.state.products_count);		
			}
			else
			{
				rest.init({application:application});  
				rest.XN_Query.create('Content_Count').tag("mall_products_"+supplierid)
					.filter("type","eic","mall_products") 
					.filter("my.supplierid","=",supplierid)  
					.filter("my.deleted","=",0)
					.filter("my.hitshelf","=", 'on')   
				    .rollup()
				    .end(-1)
					.execute().then(res => {      
						if (res.size > 0)
						{  
							resolve(res.size); 
							store.commit('products_count',res.size);
						} 
						else
						{
							resolve('0');  
						}
				}); 
			} 
    }); 
};  
 

export const get_shoppingcart_count = () => {
    return new Promise((resolve, reject) => {   
			Vue.prototype.$storage.get('shoppingcart_count').then(resData => { 
				resolve(resData); 
			}, 
			function(error) {	 
				rest.init({application:application}); 
				get_profileid().then(profileid => {   
						rest.XN_Query.create('YearContent_Count').tag("mall_shoppingcarts_"+supplierid)
							.filter("type","eic","mall_shoppingcarts") 
							.filter("my.supplierid","=",supplierid)  
						    .filter("my.profileid","=",profileid)    
							.filter("my.deleted","=",0)  
						    .rollup('my.quantity')
						    .end(-1)
							.execute().then(res => {     
								if (res.size > 0)
								{ 
									var mall_shoppingcart_info = res.entry[0]; 
									var quantity = mall_shoppingcart_info.my.quantity;
									resolve(quantity); 
									Vue.prototype.$storage.setSync('shoppingcart_count',quantity);
								} 
								else
								{
									resolve('0');  
									Vue.prototype.$storage.setSync('shoppingcart_count',0);
								}
						}); 
				}, 
				function(error) {			
					resolve(error);   
				});  
          }); 
	 }); 
}; 


export const addshoppingcart = (productid,propertyid,addquantity) => { 
    return new Promise((resolve, reject) => {
		    console.log('____addshoppingcart________' + productid+ '__' + propertyid+ '____' + addquantity + '___' ); 
			rest.init({application:application});    
			get_profileid().then(profileid => {  
				var query = rest.XN_Query.create('YearContent').tag("mall_shoppingcarts_"+supplierid)
					.filter("type","eic","mall_shoppingcarts") 
					.filter("my.supplierid","=",supplierid)  
				    .filter("my.profileid","=",profileid)   
				    .filter("my.productid","=",productid)   
					.filter("my.deleted","=",0)  
				    .end(1);
				if (propertyid != "")
				{
					query.filter("my.product_property_id","=",propertyid)
				}	
				query.execute().then(res => {    
					if (res.size > 0)
					{
						var mall_shoppingcart_info = res.entry[0];
						var quantity = mall_shoppingcart_info.my.quantity;
						quantity = Number(quantity) + addquantity;
					    var shop_price = mall_shoppingcart_info.my.shop_price;
					    var total_price = quantity * Number(shop_price);
						mall_shoppingcart_info.my.quantity = String(quantity);
						mall_shoppingcart_info.my.total_price = number_format(total_price,2, ".");    
					    mall_shoppingcart_info.save("mall_shoppingcarts,mall_shoppingcarts_"+supplierid); 
						resolve('ok'); 
					} 
					else
					{ 
						rest.XN_Content.load(productid,"mall_products").then(product_info => { 
								if (propertyid != "")
								{
									rest.XN_Content.load(propertyid,"mall_product_property").then(property_info => { 
										var shop_price = Number(property_info.my.shop);
										var market_price = property_info.my.market;
										var propertydesc = property_info.my.propertydesc;
										var newcontent = rest.XN_Content.create('mall_shoppingcarts','',false,7);					  
										newcontent.my.deleted = '0';  
										newcontent.my.profileid = profileid; 
										newcontent.my.supplierid = supplierid;   
										newcontent.my.productid = productid;   
										newcontent.my.product_property_id = propertyid;  
										newcontent.my.quantity = addquantity;  
										newcontent.my.shop_price = number_format(shop_price,2, ".");
										newcontent.my.total_price = number_format(shop_price * addquantity,2, ".");  
					   		            newcontent.my.productname = product_info.my.productname;
										newcontent.my.productthumbnail = product_info.my.productthumbnail;
										newcontent.my.productlogo = product_info.my.productlogo;
										newcontent.my.memberrate = product_info.my.memberrate;
					   		            newcontent.my.market_price = number_format(market_price,2, "."); 
										newcontent.my.categorys = product_info.my.categorys;
										newcontent.my.propertydesc = propertydesc;
										newcontent.my.salesactivityid = '';
										newcontent.my.salesactivitys_product_id = ''; 
										if (product_info.my.measurementunit && product_info.my.measurementunit != '')
										{
											newcontent.my.measurementunit = product_info.my.measurementunit; 
										}
										else
										{
											newcontent.my.measurementunit = '件'; 
										}		
										if (product_info.my.mergepostage && product_info.my.mergepostage != '')
										{
											newcontent.my.mergepostage = product_info.my.mergepostage; 
										}
										else
										{
											newcontent.my.mergepostage = '0'; 
										}
										if (product_info.my.postage && product_info.my.postage != '')
										{
											newcontent.my.postage = product_info.my.postage; 
										}
										else
										{
											newcontent.my.postage = '0'; 
										}
										if (product_info.my.include_post_count && product_info.my.include_post_count != '')
										{
											newcontent.my.include_post_count = product_info.my.include_post_count; 
										}
										else
										{
											newcontent.my.include_post_count = '0'; 
										}		 
										if (product_info.my.vendor_price && product_info.my.vendor_price != '')
										{
											newcontent.my.vendor_price = product_info.my.vendor_price; 
										}
										else
										{
											newcontent.my.vendor_price = '0'; 
										}
										if (product_info.my.vendorid && product_info.my.vendorid != '')
										{
											newcontent.my.vendorid = product_info.my.vendorid; 
										}
										else
										{
											newcontent.my.vendorid = ''; 
										}	
										newcontent.save("mall_shoppingcarts,mall_shoppingcarts_"+supplierid).then(save_res => {
											resolve('ok'); 
										}); 
										
									});
								}
								else
								{
									var shop_price = Number(product_info.my.shop_price);
									var market_price = product_info.my.market_price;
									
									var newcontent = rest.XN_Content.create('mall_shoppingcarts','',false,7);					  
									newcontent.my.deleted = '0';  
									newcontent.my.profileid = profileid; 
									newcontent.my.supplierid = supplierid;   
									newcontent.my.productid = productid;   
									newcontent.my.product_property_id = '';  
									newcontent.my.quantity = addquantity;  
									newcontent.my.shop_price = number_format(shop_price,2, ".");
									newcontent.my.total_price = number_format(shop_price*addquantity,2, ".");  
				   		            newcontent.my.productname = product_info.my.productname;
									newcontent.my.productthumbnail = product_info.my.productthumbnail;
									newcontent.my.productlogo = product_info.my.productlogo;
									newcontent.my.memberrate = product_info.my.memberrate;
				   		            newcontent.my.market_price = product_info.my.market_price; 
									newcontent.my.categorys = product_info.my.categorys;
									newcontent.my.propertydesc = '';
									newcontent.my.salesactivityid = '';
									newcontent.my.salesactivitys_product_id = ''; 
									if (product_info.my.measurementunit && product_info.my.measurementunit != '')
									{
										newcontent.my.measurementunit = product_info.my.measurementunit; 
									}
									else
									{
										newcontent.my.measurementunit = '件'; 
									}		
									if (product_info.my.mergepostage && product_info.my.mergepostage != '')
									{
										newcontent.my.mergepostage = product_info.my.mergepostage; 
									}
									else
									{
										newcontent.my.mergepostage = '0'; 
									}
									if (product_info.my.postage && product_info.my.postage != '')
									{
										newcontent.my.postage = product_info.my.postage; 
									}
									else
									{
										newcontent.my.postage = '0'; 
									}
									if (product_info.my.include_post_count && product_info.my.include_post_count != '')
									{
										newcontent.my.include_post_count = product_info.my.include_post_count; 
									}
									else
									{
										newcontent.my.include_post_count = '0'; 
									}
									if (product_info.my.vendor_price && product_info.my.vendor_price != '')
									{
										newcontent.my.vendor_price = product_info.my.vendor_price; 
									}
									else
									{
										newcontent.my.vendor_price = '0'; 
									}
									if (product_info.my.vendorid && product_info.my.vendorid != '')
									{
										newcontent.my.vendorid = product_info.my.vendorid; 
									}
									else
									{
										newcontent.my.vendorid = ''; 
									}		 
									newcontent.save("mall_shoppingcarts,mall_shoppingcarts_"+supplierid).then(save_res => {
										resolve('ok'); 
									}); 
							
								}
								
						});
					}
				});
			}, 
			function(error) {			
				reject('请先登录!'); 
			}); 
    }); 
};



export const analysis_shoppingcarts = (shoppingcarts) => {
	var result =  { postage:0,total_price:0,total_quantity:0,amount:0,totalquantityfreeshipping:0,totalpricefreeshipping:0};	

	 
	return new Promise((resolve, reject) => {
	    get_supplier_info().then(res => {  
			result.totalquantityfreeshipping = Number(res.totalquantityfreeshipping);
			result.totalpricefreeshipping = Number(res.totalpricefreeshipping);
	 
			var total_price = 0;
			var total_quantity = 0;
			var total_postage = 0;  
			for (var i in shoppingcarts)
			{
				var mall_shoppingcart_info = shoppingcarts[i]; 
				if (mall_shoppingcart_info.selected == 1)
				{
					var mergepostage =  Number(mall_shoppingcart_info.mergepostage); 
					var postage =  Number(mall_shoppingcart_info.postage);
					var include_post_count =  Number(mall_shoppingcart_info.include_post_count);
					var quantity = Number(mall_shoppingcart_info.quantity);
					var shop_price = Number(mall_shoppingcart_info.shop_price);
					console.log('_____'+total_quantity+'_____'+total_price+'____'+total_postage+'___[____'+shop_price+'___'+quantity+'____'+postage+'__'+mergepostage+'_______'+include_post_count+'______________]_'); 
				
					total_quantity += quantity;
					total_price += shop_price * quantity;
					if (postage > 0)
					{
						if (include_post_count != 0 )
						{
							if (include_post_count > quantity)
							{
								if (mergepostage == 0)
								{
									total_postage += postage * quantity;
								}
								else
								{
									total_postage += postage;
								} 
							} 
						}
						else
						{
							if (mergepostage == 0)
							{
								total_postage += postage * quantity;
							}
							else
							{
								total_postage += postage;
							}  
						}
					}  
				} 
			}
			
			result.total_quantity = total_quantity;
			result.total_price = total_price;
			if (total_quantity >= result.totalquantityfreeshipping)
			{ 
				total_postage = 0;
				result.amount = result.total_price;
			}
			else if (result.total_price >= result.totalpricefreeshipping)
			{
				total_postage = 0;
				result.amount = result.total_price;
			}
			else
			{ 
				result.postage = total_postage;
				result.amount = result.total_price + total_postage; 
			}
			
			resolve(result);
		},
		function(error) {
			 reject(error);
		});
	});
};



export const get_mq_info = (mqid) => {
    return new Promise((resolve, reject) => {   
		rest.XN_Content.load(mqid,"",2).then(res => {  
			resolve(res);	
		 },
		function(error) {
			reject("消息队列获取失败");
		}); 
    }); 
};



export const get_share_config = () => {
	 return new Promise((resolve, reject) => {	  
		 if (Object.keys(store.state.share_config).length == 0)
		 {
				rest.XN_Query.create('Content').tag("mall_sharedatas")
						.filter("type","eic","mall_sharedatas")
						.filter("my.deleted","=",0)
				 		.filter("my.enablestatus","=",'0') 
						.filter("my.supplierid","=",supplierid) 
						.end(1) 
						.execute().then(res => {
						    var info = {};
							if (res.size > 0)
							{
								var sharedata_info = res.entry[0]; 
								info.share_title = sharedata_info.my.share_title;
								info.share_description = sharedata_info.my.share_description;
								info.share_logo = imgBaseUrl + sharedata_info.my.sharelogo;
							}
							else
							{
								var mallname = store.state.mallname;
								info.share_title = mallname + '欢迎你!';
								info.share_description = mallname + '欢迎你!';
								info.share_logo = imgBaseUrl + '/imges/share.jpg';
							}
							store.commit('share_config',info); 
			 			    resolve(info);
						}); 
		 }
		 else
		 { 
				resolve(store.state.share_config);
		 }		
	 }); 	
};

/*
	     	array (0 => '纯白色',1 => '1',2 => '#fff',),
			array (0 => '象牙白',1 => '2',2 => '#fafff0',),
			array (0 => '雪白色',1 => '3',2 => '#fffffa',),
			array (0 => '淘宝红',1 => '4',2 => '#fe4401',),
			array (0 => '橘子红',1 => '5',2 => '#ff6600',),
			array (0 => '酒红色',1 => '6',2 => '#820f02',),
			array (0 => '中国红',1 => '7',2 => '#d72533',),
			array (0 => '西瓜红',1 => '8',2 => '#fe6966',),
			array (0 => '淡红色',1 => '9',2 => '#ea5559',),
			array (0 => '深粉红',1 => '10',2 => '#bd1067',),
			array (0 => '玫瑰红',1 => '11',2 => '#db0a76',),
			array (0 => '金黄色',1 => '20',2 => '#ffd700',),
			array (0 => '橙黄色',1 => '21',2 => '#ff7409',),
			array (0 => '中黄色',1 => '22',2 => '#ffd102',),
			array (0 => '紫罗兰',1 => '23',2 => '#7e00ff',),
			array (0 => '天空蓝',1 => '24',2 => '#87ceeb',),
			array (0 => '深蓝色',1 => '25',2 => '#191970',),
			array (0 => '孔雀蓝',1 => '26',2 => '#33a1c9',),
			array (0 => '环保绿',1 => '27',2 => '#299e00',),
			array (0 => '草绿色',1 => '28',2 => '#6b8e23',),
			array (0 => '嫩绿色',1 => '29',2 => '#00ff7f',),
			array (0 => '粉绿色',1 => '40',2 => '#4bc085',),
			array (0 => '深青绿',1 => '41',2 => '#258998',),
			array (0 => '水绿色',1 => '42',2 => '#90f3eb',),
			array (0 => '土豪金',1 => '43',2 => '#dfbd84',),
			array (0 => '纯金色',1 => '44',2 => '#ffd441',),
			array (0 => '古典棕',1 => '45',2 => '#81553b',),
			array (0 => '巧克力色',1 => '46',2 => '#d2691e',),
			array (0 => '经典黑',1 => '47',2 => '#000',),
			array (0 => '象牙黑',1 => '48',2 => '#292421',),
			array (0 => '暗灰色',1 => '49',2 => '#3e3e40',),
			array (0 => '深灰色',1 => '50',2 => '#555',),
			array (0 => '石板灰',1 => '51',2 => '#708069',),
			array (0 => '冷灰色',1 => '52',2 => '#808a87',),
			array (0 => '暖灰色',1 => '53',2 => '#808069',),
			array (0 => '浅灰色',1 => '54',2 => '#c0c0c0',),
	
*/