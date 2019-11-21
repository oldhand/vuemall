import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';  
import {number_format} from '../../../rest/common'
import {get_profileid} from '../../../rest/profile'
 
import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const getbanners = () => {
	//console.log('____________getbanners________________');  
	return new Promise((resolve, reject) => {
		rest.XN_Query.create('Content').tag("mall_ads_"+supplierid)
			.filter("type","eic","mall_ads") 
			.filter("my.supplierid","=",supplierid) 
		//->filter(XN_Filter::any(XN_Filter('my.timeset', '=', '0'), XN_Filter::all(XN_Filter('my.starttime', '<=', date("Y-m-d")), XN_Filter('my.endtime', '>=', date("Y-m-d")))))
			.filter("my.deleted","=",0)
			.filter("my.status","=", '0')  
	    	.order("my.sequence", 'DESC_NUMBER')
			.end(-1) 
			.execute().then(mall_ads_res => { 
				    var banners = [];
					if (mall_ads_res.size > 0)
					{
						for (var i in mall_ads_res.entry)
						{
							var mall_ad_info = mall_ads_res.entry[i]; 
							banners.push({
								    title: mall_ad_info.my.adname,
								    src: imgBaseUrl+mall_ad_info.my.image, 
								});
						}
						console.log('banners : ' + JSON.stringify(banners));  
					} 
					resolve(banners);
		}, function(error) {
			reject(error);
		});
	});
};

export const getindexcolumns = () => {
	   console.log('____________getindexcolumns________________');  
	   return new Promise((resolve, reject) => {
			   rest.XN_Query.create('Content').tag("mall_settings")
					.filter("type","eic","mall_settings")
					.filter("my.deleted","=",0)
					.filter("my.supplierid","=",supplierid) 
					.end(1) 
					.execute().then(res => {  
							if (res.size > 0)
							{
								var mall_setting_info = res.entry[0];
								resolve(mall_setting_info.my.indexcolumns); 
							} 
							else
							{
								resolve(2);
							}
					
				}, function(error) {
					reject(error);
				});
		});	
}; 

export const getproducts = (pagesize) => {
	console.log('____________getproducts________________');  
	return new Promise((resolve, reject) => {
			rest.XN_Query.create('Content').tag("mall_products_"+supplierid)
				.filter("type","eic","mall_products") 
				.filter("my.supplierid","=",supplierid)  
				.filter("my.deleted","=",0)
				.filter("my.hitshelf","=", 'on')  
		    	.order("my.sequence", 'ASC_NUMBER')
				.end(pagesize)  
				.execute().then(mall_products_res => { 
					   // console.log('mall_products : ' + JSON.stringify(mall_products_res));
					    var products = [];
						if (mall_products_res.size > 0)
						{
							for (var i in mall_products_res.entry)
							{
								var mall_product_info = mall_products_res.entry[i]; 
								var hasproperty = 1;
								var property_type = mall_product_info.my.property_type; 
								property_type = property_type.replace(/^\s+|\s+$/gm,'');
								if (property_type == "")
								{
									hasproperty = 0;
								} 
								products.push({
									    productid: mall_product_info.id,
									    productname: mall_product_info.my.productname,
									    productlogo: imgBaseUrl + mall_product_info.my.productlogo,
									    productthumbnail:imgBaseUrl + mall_product_info.my.productthumbnail,
		 							    market_price: number_format(mall_product_info.my.market_price, 2, ".", ","),
										shop_price: number_format(mall_product_info.my.shop_price, 2, ".", ","),
		 								weight_unit: mall_product_info.my.weight_unit,
		 								categorys: mall_product_info.my.categorys,
		 								salevolume: mall_product_info.my.salevolume,
		 								praise: mall_product_info.my.praise,
		 								hasproperty: hasproperty,
									});
							}
							console.log('mall_products : ' + JSON.stringify(products));  
						} 
						resolve(products);
			}, 
			function(error) {
				reject(error);
			});
	});
};

export const getpageproducts = (page,pagesize) => {
	return new Promise((resolve, reject) => {
		console.log('____________getpageproducts_______'+page+'_________');  
		rest.XN_Query.create('Content').tag("mall_products_"+supplierid)
			.filter("type","eic","mall_products") 
			.filter("my.supplierid","=",supplierid)  
			.filter("my.deleted","=",0)
			.filter("my.hitshelf","=", 'on')  
	    	.order("my.sequence", 'ASC_NUMBER')
		    .begin(page*pagesize)
			.end((page+1)*pagesize) 
			.execute().then(mall_products_res => { 
				   // console.log('mall_products : ' + JSON.stringify(mall_products_res));
				    var list = [];
					if (mall_products_res.size > 0)
					{
						for (var i in mall_products_res.entry)
						{
							var mall_product_info = mall_products_res.entry[i];  
							var hasproperty = 1;
							if (mall_product_info.my.property_type == "")
							{
								hasproperty = 0;
							}
							list.push({
								    productid: mall_product_info.id,
								    productname: mall_product_info.my.productname,
								    productlogo: imgBaseUrl + mall_product_info.my.productlogo,
									productthumbnail:imgBaseUrl + mall_product_info.my.productthumbnail,
	 							    market_price: mall_product_info.my.market_price,
 							   	 	market_price: number_format(mall_product_info.my.market_price, 2, ".", ","),
									shop_price: number_format(mall_product_info.my.shop_price, 2, ".", ","),
	 								categorys: mall_product_info.my.categorys,
	 								salevolume: mall_product_info.my.salevolume,
	 								praise: mall_product_info.my.praise, 
	 								hasproperty: hasproperty,
								});
						}
						console.log('getpageproducts : ' + JSON.stringify(list));  
					} 
			       resolve(list);
		}, 
		function(error) {
				reject(error);
		});
	}); 
};
    