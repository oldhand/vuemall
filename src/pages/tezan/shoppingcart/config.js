import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';    
import {get_profileid} from '../../../rest/profile'
import {number_format} from '../../../rest/common' 


import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const getshoppingcarts = () => {
	return new Promise((resolve, reject) => {
		console.log('____________getshoppingcarts________________');
		var shoppingcarts = [];
		get_profileid().then(profileid => {   
				rest.XN_Query.create('YearContent').tag("mall_shoppingcarts_"+supplierid)
					.filter("type","eic","mall_shoppingcarts") 
					.filter("my.supplierid","=",supplierid)  
				    .filter("my.profileid","=",profileid)    
					.filter("my.deleted","=",0)  
					.order("published","DESC")
				    .end(-1)
					.execute().then(res => {      
						if (res.size > 0)
						{  
							for (var i in res.entry)
							{
								var mall_shoppingcart_info = res.entry[i];   
								shoppingcarts.push({
									    id: mall_shoppingcart_info.id,
									    productid: mall_shoppingcart_info.my.productid, 
									    productname: mall_shoppingcart_info.my.productname,
									    productlogo: imgBaseUrl + mall_shoppingcart_info.my.productlogo,
										productthumbnail:imgBaseUrl + mall_shoppingcart_info.my.productthumbnail,
										market_price: Number(mall_shoppingcart_info.my.market_price),
										shop_price: Number(mall_shoppingcart_info.my.shop_price),
									    vendor_price: Number(mall_shoppingcart_info.my.vendor_price),
									    quantity: Number(mall_shoppingcart_info.my.quantity),
									    total_price: Number(mall_shoppingcart_info.my.total_price), 
		 								categorys: mall_shoppingcart_info.my.categorys,
		 								product_property_id: mall_shoppingcart_info.my.product_property_id,
									    propertydesc: mall_shoppingcart_info.my.propertydesc, 
		 								salesactivityid: mall_shoppingcart_info.my.salesactivityid,  
										salesactivitys_product_id: mall_shoppingcart_info.my.salesactivitys_product_id,  
										measurementunit: mall_shoppingcart_info.my.measurementunit, 
										mergepostage: mall_shoppingcart_info.my.mergepostage, 
										postage: Number(mall_shoppingcart_info.my.postage), 
										include_post_count: mall_shoppingcart_info.my.include_post_count,  
									    selected: true,  
									});
							}
						}   
						resolve(shoppingcarts); 
				}); 
		},
		function(error) {
			resolve([]);
		});  
	});   
};


export const updateshoppingcart = (shoppingcartid,value) => {
	return new Promise((resolve, reject) => {
		console.log('____________updateshoppingcart________________'); 
		rest.XN_Content.load(shoppingcartid,"mall_shoppingcarts",7).then(mall_shoppingcart_info => {  
			var shop_price = mall_shoppingcart_info.my.shop_price;
			var total_price = Number(shop_price) * Number(value);
			mall_shoppingcart_info.my.quantity = String(value);
			mall_shoppingcart_info.my.total_price = number_format(total_price,2, ".");  
		    mall_shoppingcart_info.save("mall_shoppingcarts,mall_shoppingcarts_"+supplierid); 
			resolve('ok'); 
		}); 
	});   
	
};
 
 
 
export const deleteshoppingcart = (ids) => {
	return new Promise((resolve, reject) => {
		 console.log('____________deleteshoppingcart______' + JSON.stringify(ids) + '_____________'); 
		 rest.XN_Content.delete(ids,"mall_shoppingcarts,mall_shoppingcarts_"+supplierid,7).then(res => { 
			 resolve('ok');
		 });
			  
	});   
	
};
 