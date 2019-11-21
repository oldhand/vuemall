import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';   
import {number_format} from '../../../rest/common'
import {get_givenprofile_info} from '../../../rest/api' 
 
import Vue from 'vue'
import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
}  
  
export const load_product_info = (productid) => {
    return new Promise((resolve, reject) => {
			rest.init({application:application});
			rest.XN_Content.load(productid,"mall_products_"+supplierid).then(mall_product_info => {  
				 var info = {}; 
				 info.supplierid = mall_product_info.my.supplierid;
				 info.productid = mall_product_info.id;
				 info.productname = mall_product_info.my.productname;
				 info.productlogo = imgBaseUrl + mall_product_info.my.productlogo;
				 info.productthumbnail = imgBaseUrl + mall_product_info.my.productthumbnail;
				 info.market_price = Number(mall_product_info.my.market_price);
				 info.shop_price = Number(mall_product_info.my.shop_price);
				 info.weight_unit = mall_product_info.my.weight_unit;
				 info.categorys = mall_product_info.my.categorys;
				 info.salevolume = mall_product_info.my.salevolume;
				 info.praise = mall_product_info.my.praise; 
				 info.simple_desc = mall_product_info.my.simple_desc; 
				 var description = mall_product_info.my.description;  
				 description = description.replace(/src=\"(.+?)\"/g, 'src="'+imgBaseUrl+'$1"'); 
				 info.description = description; 
				 info.product_guige = mall_product_info.my.product_guige;  
				 info.categorys = mall_product_info.my.categorys; 
				 info.memberrate = mall_product_info.my.memberrate;  
				 var property_type = mall_product_info.my.property_type; 
				 property_type = property_type.replace(/^\s+|\s+$/gm,'');
				 
				 if (property_type == "")
				 { 
					info.hasproperty = 0; 
					info.property_type = []; 
					info.optional_property = []; 
				 }
				 else
				 {
					console.log('____property_type_________' +  mall_product_info.my.property_type); 
				    property_type = JSON.parse(mall_product_info.my.property_type);  
					var new_property_type = [];
					for (var propertyname in property_type) {  
						var propertys = property_type[propertyname];
						var newpropertys = [];
						for (var key in propertys) { 
							newpropertys.push({title:propertys[key],key:key});
						} 
						new_property_type.push({key:propertyname,items:newpropertys});
					} 
	  		        info.property_type = new_property_type; 
				    info.optional_property = Object.keys(property_type); 
				    info.hasproperty = 1; 
					console.log('____property_type_________' +  JSON.stringify(new_property_type)); 
				}
				
				 
				if (mall_product_info.my.measurementunit && mall_product_info.my.measurementunit != '')
				{
					info.measurementunit = mall_product_info.my.measurementunit; 
				}
				else
				{
					info.measurementunit = '件'; 
				}		
				if (mall_product_info.my.mergepostage && mall_product_info.my.mergepostage != '')
				{
					info.mergepostage = mall_product_info.my.mergepostage; 
				}
				else
				{
					info.mergepostage = '0'; 
				}
				if (mall_product_info.my.postage && mall_product_info.my.postage != '')
				{
					info.postage = mall_product_info.my.postage;
				}
				else
				{
					info.postage = '0'; 
				}
				if (mall_product_info.my.include_post_count && mall_product_info.my.include_post_count != '')
				{
					info.include_post_count = mall_product_info.my.include_post_count; 
				}
				else
				{
					info.include_post_count = '0'; 
				}		 
				if (info.hasproperty == 0)
				{ 
					 info.propertys = []; 
		 			 rest.XN_Query.create('Content').tag("mall_inventorys_"+supplierid)
		 				.filter("type","eic","mall_inventorys")  
		 			    .filter("my.productid","=",info.productid)    
		 				.filter("my.deleted","=",0)  
		 			    .end(-1)
		 				.execute().then(res => {    
		 					if (res.size > 0)
		 					{ 
		 						 var inventorys = {};
		 						 var inventory_info = res.entry[0]; 
		 						 var inventory = Number(inventory_info.my.inventory);  
		 	   	   				 info.inventory = inventory;  
			   	   				 info.timestamp = Date.parse(new Date()) / 1000; 
			   	   				 Vue.prototype.$storage.setSync('product_info_'+productid,info);
			   	   				 console.log('____rest.XN_Content.load_________' + productid + '_________' +  JSON.stringify(info)); 
			   	   				 resolve(info); 
		 					} 
		 					else
		 					{ 
		 	   	   				 reject('没有获取库存信息!');  
		 					}
		 			 });   
				}
				else
				{
					rest.XN_Query.create('Content').tag("mall_product_property_"+supplierid)
						.filter("type","eic","mall_product_property")  
					    .filter("my.productid","=",info.productid)    
						.filter("my.deleted","=",0) 
						.filter("my.status","=",'0') 
					    .end(-1)
						.execute().then(res => {    
							if (res.size > 0)
							{ 
								//console.log('____mall_product_property_________' +  JSON.stringify(res)); 
								var propertys=[];
								for (var i in res.entry)
								{
									var  property_info = res.entry[i];   
									var  propertyids = property_info.my.propertyids;
									if (Array.isArray(propertyids))
									{
										propertyids = propertyids.sort();
									} 
									var imgurl = '';
									if (property_info.my.imgurl && property_info.my.imgurl != '')
									{
										imgurl = imgBaseUrl + property_info.my.imgurl;
									} 
									propertys.push({
										    id: property_info.id,
										    propertyids: propertyids, 
										    propertydesc: property_info.my.propertydesc, 
											imgurl: imgurl,
			 							    market_price: Number(property_info.my.market),
											shop_price: Number(property_info.my.shop),  
										});
								}
			   					 info.propertys = propertys; 
								 
					 			 rest.XN_Query.create('Content').tag("mall_inventorys_"+supplierid)
					 				.filter("type","eic","mall_inventorys")  
					 			    .filter("my.productid","=",info.productid)    
					 				.filter("my.deleted","=",0)  
					 			    .end(-1)
					 				.execute().then(res => {    
					 					if (res.size > 0)
					 					{ 
					 						 var inventorys = {};
					 						 for (var i in res.entry)
					 						 {
					 							var inventory_info = res.entry[i];   
					 							var propertytypeid = inventory_info.my.propertytypeid;
					 							var inventory = Number(inventory_info.my.inventory); 
					 							inventorys[propertytypeid] = inventory;							 
					 						 } 
					 	   	   				 info.inventorys = inventorys;  
			   			   	   				 info.timestamp = Date.parse(new Date()) / 1000; 
			   			   	   				 Vue.prototype.$storage.setSync('product_info_'+productid,info);
			   			   	   				 console.log('____rest.XN_Content.load_________' + productid + '_________' +  JSON.stringify(info)); 
			   			   	   				 resolve(info); 
					 					} 
					 					else
					 					{ 
					 	   	   				 reject('没有获取库存信息!');  
					 					}
					 			 });  
							} 
							else
							{
			   					reject('商品属性数据异常');
							}
					}); 
					
				}
				
		    }, function(error) {
				 reject(error);
			}); 
	}); 
};
	
	
export const get_product_info = (productid) => {
    return new Promise((resolve, reject) => {  
			var timestamp = Date.parse(new Date()) / 1000; 
			Vue.prototype.$storage.deleteSync('product_info_'+productid); 
			//console.log('____get_product_info_________' +  timestamp + '________'+ productid +'________');  
			Vue.prototype.$storage.get('product_info_'+productid).then(resData => {  
				if (timestamp - resData.timestamp < 120)
				{  
					resolve(resData); 
				}
				else
				{
					load_product_info(productid).then(res => {   
						 resolve(res); 
				    }, function(error) {
						 reject(error);
					}); 
				} 
			}, 
			function(error) { 
					load_product_info(productid).then(res => {   
						 resolve(res); 
				    }, function(error) {
						 reject(error);
					}); 
			}); 
    }); 
};


export const get_inventory_info = (productid) => {
    return new Promise((resolve, reject) => {
			rest.init({application:application}); 
			rest.XN_Query.create('Content').tag("mall_inventorys_"+supplierid)
				.filter("type","eic","mall_inventorys")  
			    .filter("my.productid","=",productid)    
				.filter("my.deleted","=",0)  
			    .end(-1)
				.execute().then(res => {    
					if (res.size > 0)
					{ 
						var inventorys = {};
						for (var i in res.entry)
						{
							var inventory_info = res.entry[i];   
							var propertytypeid = inventory_info.my.propertytypeid;
							var inventory = Number(inventory_info.my.inventory); 
							inventorys[propertytypeid] = inventory;							 
						} 
	   	   				resolve(inventorys);  
					} 
					else
					{ 
	   	   				 reject('没有获取库存信息!');  
					}
			}); 
	}); 
}; 



export const check_product_collection_info = (profileid,productid) => {
    return new Promise((resolve, reject) => {
			 rest.init({application:application}); 
 			 rest.XN_Query.create('Content').tag("mall_mycollections_"+supplierid)
 				.filter("type","eic","mall_mycollections")  
			    .filter("my.supplierid","=",supplierid)  
			    .filter("my.profileid","=",profileid)  
 			    .filter("my.productid","=",productid)  
			    .filter("my.status","=",'0')   
 				.filter("my.deleted","=",0)  
 			    .end(1)
 				.execute().then(res => {    
 					if (res.size > 0)
 					{  
	   	   				 resolve(true); 
 					} 
 					else
 					{ 
 	   	   				  resolve(false); 
 					}
 			 });    
	}); 
};

export const update_product_collection_info = (profileid,productid,collection) => {
    return new Promise((resolve, reject) => {
			 rest.init({application:application}); 
 			 rest.XN_Query.create('Content').tag("mall_mycollections_"+supplierid)
 				.filter("type","eic","mall_mycollections")  
			    .filter("my.supplierid","=",supplierid)  
			    .filter("my.profileid","=",profileid)  
 			    .filter("my.productid","=",productid)    
 				.filter("my.deleted","=",0)  
 			    .end(1)
 				.execute().then(res => {    
 					if (res.size > 0)
 					{  
						var mycollection_info = res.entry[0]; 
						if (collection)
						{
							if (mycollection_info.my.status != '0')
							{ 
								mycollection_info.my.status = '0';  
								rest.XN_Content.load(productid,"mall_products_"+supplierid).then(product_info => {    
									 mycollection_info.my.productname = product_info.my.productname; 
									 mycollection_info.my.productthumbnail = product_info.my.productthumbnail;
									 mycollection_info.my.market_price = number_format(product_info.my.market_price,2, "."); 
									 mycollection_info.my.shop_price = number_format(product_info.my.shop_price,2, "."); 
									 mycollection_info.save("mall_mycollections,mall_mycollections_"+supplierid);
								});   
							}
						}
						else
						{
							if (mycollection_info.my.status != '1')
							{ 
								mycollection_info.my.status = '1';   
								rest.XN_Content.load(productid,"mall_products_"+supplierid).then(product_info => {    
									 mycollection_info.my.productname = product_info.my.productname; 
									 mycollection_info.my.productthumbnail = product_info.my.productthumbnail;
									 mycollection_info.my.market_price = number_format(product_info.my.market_price,2, "."); 
									 mycollection_info.my.shop_price = number_format(product_info.my.shop_price,2, "."); 
									 mycollection_info.save("mall_mycollections,mall_mycollections_"+supplierid);
								});  
							}
						} 
	   	   				resolve('ok'); 
 					} 
 					else
 					{ 
						var newcontent = rest.XN_Content.create('mall_mycollections','',false);					  
						newcontent.my.deleted = '0';  
						newcontent.my.profileid = profileid; 
						newcontent.my.supplierid = supplierid;   
						newcontent.my.productid = productid;   
						if (collection)
						{
							newcontent.my.status = '0';
						}
						else
						{
							newcontent.my.status = '1'; 
						}  
						rest.XN_Content.load(productid,"mall_products_"+supplierid).then(product_info => {    
							 newcontent.my.productname = product_info.my.productname; 
							 newcontent.my.productthumbnail = product_info.my.productthumbnail;
							 newcontent.my.market_price = number_format(product_info.my.market_price,2, "."); 
							 newcontent.my.shop_price = number_format(product_info.my.shop_price,2, "."); 
	 						 newcontent.save("mall_mycollections,mall_mycollections_"+supplierid).then(save_res => {
	 							resolve('ok'); 
	 						 }); 
						});   
 					}
 			 });    
	}); 
};