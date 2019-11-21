import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';  
import {number_format} from '../../../rest/common'
import {get_profileid} from '../../../rest/profile'
import base64 from '../../../rest/base64'

import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
}
    
export const get_searchs = () => {
	return new Promise((resolve, reject) => {
		console.log('____________get_searchs_______________');  
		rest.XN_Query.create('Content_Count').tag("mall_productkeywords_"+supplierid)
					.filter("type","eic","mall_productkeywords")  
				    .filter("my.supplierid","=",supplierid)   
					.filter("my.deleted","=",0)  
					.order("my.count","DESC")
				    .rollup()
					.group("my.keyword")
					.end(10)
				    .execute().then(res => {   
						var productkeywords = [];
						if (res.size > 0)
						{
							for (var i in res.entry)
							{
								var productkeyword_info = res.entry[i]; 
								productkeywords.push({
									    key: productkeyword_info.my.keyword,
									    title: productkeyword_info.my.keyword,
									});
							} 
						} 
						resolve(productkeywords);
					},
					function(error) {			
						reject([]);   
					});  
	}); 
};

export const get_historys = () => {
	return new Promise((resolve, reject) => {
		console.log('____________get_historys_______________');  
		get_profileid().then(profileid => {   
				rest.XN_Query.create('YearContent').tag("mall_searchlog_"+supplierid) 
					.filter("type","eic","mall_searchlog")
				    .filter("my.supplierid","=",supplierid)
					.filter("my.profileid","=",profileid)
					.filter("my.deleted","=",0) 
					.order("published","DESC")
				    .begin(0)
					.end(10)
					.execute().then(res => {
						var historys = [];
						if (res.size > 0)
						{
							for (var i in res.entry)
							{
									var history_info = res.entry[i];
									historys.push({ 
									    key: history_info.my.keyword,
									    title: history_info.my.keyword,
									});
							}
						}
						resolve(historys);
					}, 
					function(error) {
						reject(error);
					});
					
	      });
	}); 
};
export const search = (keyword) => {
	return new Promise((resolve, reject) => {
			console.log('___________search______'+keyword+'_________'); 
			get_profileid().then(profileid => {   
					rest.XN_Query.create('YearContent').tag("mall_searchlog_"+supplierid) 
						.filter("type","eic","mall_searchlog")
					    .filter("my.supplierid","=",supplierid)
						.filter("my.profileid","=",profileid)
						.filter("my.keyword","=",keyword)
						.filter("my.deleted","=",0)  
					    .begin(0)
						.end(1)
						.execute().then(res => { 
							if (res.size == 0)
							{
								var newcontent = rest.XN_Content.create('mall_searchlog','',false,7);					  
								newcontent.my.deleted = '0';  
								newcontent.my.profileid = profileid; 
								newcontent.my.supplierid = supplierid;   
								newcontent.my.keyword = keyword;   
								newcontent.save("mall_searchlog,mall_searchlog_"+supplierid).then(save_res => {
									resolve('ok'); 
								}); 
							} 
							else
							{
								resolve('ok');  
							}
						});
		   },function(error) {
				 resolve('ok'); 
		  });
	});   
};    

export const search_products = (keywords,page,filter) => {
	return new Promise((resolve, reject) => {
			console.log('___________search_products______'+keywords+'_________');  			
			var groupselectsql = "select productid,count(productid) as count from admin.main_mall_productkeywords";
			var keysql = "";
			for (var i in keywords)
			{
				if (keysql == "")
				{
					keysql =  "keyword like '%" + keywords[i] + "%'"; 
				}
				else
				{
					keysql = keysql + " or keyword like '%" + keywords[i] + "%'"; 
				} 
			}
			var supplieridsql = " deleted = '0' and hitshelf = 'on' and supplierid = '"+supplierid+"'";
			var fromtosql = "limit 12 offset " + page * 12;   
			var orderby = filter.key;
			var order = filter.order; 
			var sql = "";
			if (orderby == "default")
			{
				sql = groupselectsql + " where " + supplieridsql + " and (" + keysql + ") group by productid order by count desc " + fromtosql; 
			}
			else
			{ 
				var selectsql = "select DISTINCT productid,deleted,supplierid,tezan_to_number(convert_from(sequence,'UTF8')) as sequence,praise,tezan_to_number(convert_from(shop_price,'UTF8')) as shop_price,categorys,tezan_to_number(convert_from(salevolume,'UTF8')) as  salevolume,hitshelf from admin.main_mall_productkeywords ";
		        if (order == "")
				{
					order = "asc";
				}
				//orderby = "tezan_to_number(convert_from("",'UTF8'))";
				var ordersql = "order by " + orderby + " " + order;  
				sql = selectsql + " where " + supplieridsql + " and (" + keysql + ") " + ordersql + " " + fromtosql; 
			}			
			console.log('___________sql______'+sql+'_________'); 
			var newcontent = rest.XN_Content.create('sql','',false,5);					  
			newcontent.my.sql = base64.encode(sql);
			newcontent.my.method = "get"; //get 查询数据进行标签保存   post 进行标签清理
			newcontent.my.type = "mall_products";   //sql中无法指明查询表的类型, 使用这个字段指明 
			newcontent.my.transaction = "false";   //transaction 事务开关 'true'时,开启事务模式,其他值时关闭
			newcontent.save("mall_products").then(res => {
				  console.log('___________search_products__res___' + JSON.stringify(res));  
				  resolve(res); 
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


export const get_keywords = (keyword) => {
	return new Promise((resolve, reject) => { 
	        console.log('____________get_keywords_________' + keyword);
			var newcontent = rest.XN_Content.create('get_keywords','',false,2);	 
			newcontent.my.profileid = ''; 
			newcontent.my.supplierid = supplierid;   
			newcontent.my.module = 'mall_products';   
			newcontent.my.action = 'get_keywords';  
			newcontent.my.record = '';  
			newcontent.my.keyword = keyword;   
			newcontent.save("").then(res => {   
				//resolve(res); 	
				var mqid = res.id; 
				var count = 1;
				var load_mq_info = function() {
					rest.XN_Content.load(mqid,"",2).then(res => {  
						if (res.my.ack == 1)
						{
						    resolve(res.my.result);  
						}
						else if (res.my.ack == 2)
						{     
							reject(res.my.result);
						}
						else
						{
						   count = count + 1;	
						   if (count <= 20)
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
	});   
};



export const load_products = (productids) => { 
	return new Promise((resolve, reject) => {  
				console.log('____________load_products____'+JSON.stringify(productids)+'_________');  
				rest.XN_Content.loadMany(productids,"mall_products_"+supplierid).then(res => {  
						    var list = []; 
							for (var i in res)
							{
								var mall_product_info = res[i]; 
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
							console.log('load_products : ' + JSON.stringify(list));   
					        resolve(list);
				}, 
				function(error) {
						reject(error);
				});  
		});  
};
 