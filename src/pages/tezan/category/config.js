import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';   
import {number_format} from '../../../rest/common'

import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
}  

let recursion_categorys = [];

export const recursion_search = (alls,categoryid) => {
	for (var i in alls)
	{ 
		if (alls[i].pid == categoryid)
		{ 
			recursion_categorys.push(alls[i].id);
			recursion_search(alls,alls[i].id);
		} 
	} 
	return;
};	

export const getpagecategoryproducts = (category_id,page) => { 
	return new Promise((resolve, reject) => { 
		rest.XN_Query.create('Content').tag("mall_categorys_"+supplierid)
			.filter("type","eic","mall_categorys") 
			.filter("my.supplierid","=",supplierid) 
		    .filter("my.deleted","=",0)
			.end(-1) 
			.execute().then(mall_categorys_res => { 
					if (mall_categorys_res.size > 0)
					{
						var alls = [];
						for (var i in mall_categorys_res.entry)
						{
							var mall_category_info = mall_categorys_res.entry[i]; 
							alls.push({
								    id: mall_category_info.id,
								 	pid: mall_category_info.my.pid,
								    categoryname: mall_category_info.my.categoryname, 
								});
						}  
						recursion_categorys = [];
						recursion_categorys.push(category_id);
						recursion_search(alls,category_id); 
						console.log('____________getpagecategoryproducts____'+category_id+'___'+page+'_________');  
						rest.XN_Query.create('Content').tag("mall_products_"+supplierid)
							.filter("type","eic","mall_products") 
							.filter("my.supplierid","=",supplierid)  
							.filter("my.categorys","in",recursion_categorys) 
							.filter("my.deleted","=",0)
							.filter("my.hitshelf","=", 'on')  
					    	.order("my.sequence", 'ASC_NUMBER')
						    .begin(page*12)
							.end((page+1)*12) 
							.execute().then(mall_products_res => { 
								   // console.log('mall_products : ' + JSON.stringify(mall_products_res));
								    var list = [];
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
										console.log('getpagecategoryproducts : ' + JSON.stringify(list));  
									} 
							       resolve(list);
						}, 
						function(error) {
								reject(error);
						}); 
					} 
					else
					{ 
						resolve([]);
					}
		}); 
	}); 
};
 

export const getcategorys = () => {
	console.log('____________getcategorys________________');  
	return new Promise((resolve, reject) => { 
		rest.XN_Query.create('Content').tag("mall_categorys_"+supplierid)
			.filter("type","eic","mall_categorys") 
			.filter("my.supplierid","=",supplierid) 
		    .filter("my.deleted","=",0)
			.filter("my.pid","=", '0')  
	    	.order("my.sequence", 'ASC_NUMBER')
			.end(-1) 
			.execute().then(mall_categorys_res => { 
					var categorys = [];
					if (mall_categorys_res.size > 0)
					{
						for (var i in mall_categorys_res.entry)
						{
							var mall_category_info = mall_categorys_res.entry[i]; 
							categorys.push({
								    categoryid: mall_category_info.id,
								    categoryname: mall_category_info.my.categoryname, 
								});
						} 
						console.log('categorys : ' + JSON.stringify(categorys));						 
					} 
					resolve(categorys);
		});
	});
};


  