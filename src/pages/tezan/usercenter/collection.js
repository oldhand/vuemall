import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';    
import {get_profileid} from '../../../rest/profile' 


import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const get_collections = (page) => {
	return new Promise((resolve, reject) => {
			console.log('____________get_collections________________');
			get_profileid().then(profileid => {   	 
					rest.XN_Query.create('Content').tag("mall_mycollections_"+supplierid)
						.filter("type","eic","mall_mycollections")  
					    .filter("my.supplierid","=",supplierid)  
						.filter("my.profileid","=",profileid)   
						.filter("my.deleted","=",0)  
						.filter("my.status","=",0)  
						.order("published","DESC")
					    .begin(page*8)
						.end((page+1)*8)
						.execute().then(res => {     
							var mycollections = []; 
							if (res.size > 0)
							{   
								for (var i in res.entry)
								{
										var mycollection_info = res.entry[i];  
										mycollections.push({
											    id: mycollection_info.id,  
												published: mycollection_info.published,   
												productid: mycollection_info.my.productid,
												productname: mycollection_info.my.productname,  
												productthumbnail: imgBaseUrl + mycollection_info.my.productthumbnail,  
												shop_price: Number(mycollection_info.my.shop_price),  
												market_price: Number(mycollection_info.my.market_price), 
												show: true,  
										});  
								} 
							}
							resolve(mycollections);
						}); 
		   });
	});   
};
  
  
  
export const delete_collection = (collectionid) => {
	return new Promise((resolve, reject) => {
			console.log('___________delete_collection_____'+collectionid+'_________'); 
			get_profileid().then(profileid => {   
				rest.XN_Content.delete(collectionid,"mall_mycollections,mall_mycollections_"+profileid+",mall_mycollections_"+supplierid).then(res => {  
					resolve("ok");  
				});
		   });
	});   
};  