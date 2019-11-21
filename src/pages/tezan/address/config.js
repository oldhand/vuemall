import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';    
import {get_profileid} from '../../../rest/profile'
  
import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const getdeliveraddress = () => {
	return new Promise((resolve, reject) => {
		console.log('____________deliveraddress________________');
		var deliveraddress = [];
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
							for (var i in res.entry)
							{
								var deliveraddress_info = res.entry[i];   
								var selected = false;
								if (deliveraddress_info.my.selected == '1')
								{
									 selected = true;
								}
								deliveraddress.push({
									    id: deliveraddress_info.id,
									    consignee: deliveraddress_info.my.consignee, 
									    mobile: deliveraddress_info.my.mobile,
									    province: deliveraddress_info.my.province,
										city:deliveraddress_info.my.city, 
									    district: deliveraddress_info.my.district,  
		 								shortaddress: deliveraddress_info.my.shortaddress,
		 								zipcode: deliveraddress_info.my.zipcode,
									    address: deliveraddress_info.my.address, 
		 								selected: selected,   
									});
							}
						}   
						resolve(deliveraddress); 
				}); 
		},
		function(error) {
			resolve([]);
		});  
	});   
};

export const getdeliveraddress_info = (deliveraddressid) => {
	return new Promise((resolve, reject) => {
		console.log('____________getdeliveraddress_info________________'); 
		get_profileid().then(profileid => {   
			rest.XN_Content.load(deliveraddressid,"deliveraddress_"+profileid).then(deliveraddress_info => {   
				var selected = false;
				if (deliveraddress_info.my.selected == '1')
				{
					 selected = true;
				}
				resolve({
					    id: deliveraddress_info.id,
					    consignee: deliveraddress_info.my.consignee, 
					    mobile: deliveraddress_info.my.mobile,
					    province: deliveraddress_info.my.province,
						city:deliveraddress_info.my.city, 
					    district: deliveraddress_info.my.district,  
						shortaddress: deliveraddress_info.my.shortaddress,
						zipcode: deliveraddress_info.my.zipcode,
					    address: deliveraddress_info.my.address, 
						selected: selected,   
					});  
			});
		},
		function(error) {
			reject('');
		});  
	});   
};


export const setdefault_deliveraddress = (profileid,deliveraddressid) => {
	return new Promise((resolve, reject) => {
		console.log('____________setdefault_deliveraddress________________');  
		rest.XN_Query.create('Content').tag("deliveraddress_"+profileid)
			.filter("type","eic","deliveraddress")  
		    .filter("my.profileid","=",profileid)  
			.filter("id","!=",deliveraddressid)    
			.filter("my.deleted","=",0)  
		    .end(-1)
			.execute().then(res => {      
				if (res.size > 0)
				{  
					for (var i in res.entry)
					{
						var deliveraddress_info = res.entry[i];   
						if (deliveraddress_info.my.selected == '1')
						{
							deliveraddress_info.my.selected = '0'; 
							deliveraddress_info.save("deliveraddress,deliveraddress_"+profileid); 
						} 
					}
				}   
				resolve("ok"); 
		});  
	});   
	
};
	
export const savedeliveraddress_info = (info) => {
	return new Promise((resolve, reject) => {
		console.log('____________savedeliveraddress_info________________'); 
		console.log('_____info : ' + JSON.stringify(info));
		get_profileid().then(profileid => {   
			if (info.id == '' || info.id == '0')
			{
				var newcontent = rest.XN_Content.create('deliveraddress','',false);					  
				newcontent.my.deleted = '0';  
				newcontent.my.profileid = profileid;
				newcontent.my.consignee = info.consignee;
				newcontent.my.mobile = info.mobile;
				newcontent.my.province = info.province;
				newcontent.my.city = info.city;
				newcontent.my.district = info.district;
				newcontent.my.shortaddress = info.shortaddress;
				newcontent.my.zipcode = info.zipcode;
				newcontent.my.address = info.address;
				if (info.selected)
				{
					newcontent.my.selected = '1';
				}
				else
				{
					newcontent.my.selected = '0';
				}
				newcontent.save("deliveraddress,deliveraddress_"+profileid).then( res =>
				{
					if (info.selected)
					{
						setdefault_deliveraddress(profileid,newcontent.id);
					}
					resolve("ok");
				}); 
			}
			else
			{
				rest.XN_Content.load(info.id,"deliveraddress_"+profileid).then(deliveraddress_info => {   
					deliveraddress_info.my.consignee = info.consignee;
					deliveraddress_info.my.mobile = info.mobile;
					deliveraddress_info.my.province = info.province;
					deliveraddress_info.my.city = info.city;
					deliveraddress_info.my.district = info.district;
					deliveraddress_info.my.shortaddress = info.shortaddress;
					deliveraddress_info.my.zipcode = info.zipcode;
					deliveraddress_info.my.address = info.address;
					if (info.selected)
					{
						deliveraddress_info.my.selected = '1';
					}
					else
					{
						deliveraddress_info.my.selected = '0';
					}
					deliveraddress_info.save("deliveraddress,deliveraddress_"+profileid).then( res =>
					{
						if (info.selected)
						{
							setdefault_deliveraddress(profileid,info.id);
						}
						resolve("ok"); 
					}); 
				}); 
			}
			
			
			 
		},
		function(error) {
			reject('');
		});  
	});   
};

export const deletedeliveraddress_info = (deliveraddressid) => {
	return new Promise((resolve, reject) => {
		console.log('____________deletedeliveraddress_info________________'); 
		get_profileid().then(profileid => {   
	   		 rest.XN_Content.delete(deliveraddressid,"deliveraddress,deliveraddress_"+profileid).then(res => { 
	   			 resolve('ok');
	   		 });
		},
		function(error) {
			reject('');
		});  
	});   
};

/*
export const address = [
{
    consignee: '王真明',
    mobile: '15974160308',
    province: '湖南省',
	city: '长沙市',
    district: '天心区',
    shortaddress: '竹塘西路280号南国嘉苑1栋1104房',
    zipcode: '410000',
	address: '湖南省长沙市天心区竹塘西路280号南国嘉苑1栋1104房',
	selected:1,
},
{
    consignee: '李志英',
    mobile: '15974160318',
    province: '湖南省',
	city: '长沙市',
    district: '天心区',
    shortaddress: '竹塘西路280号南国嘉苑1栋1104房',
    zipcode: '410000',
	address: '湖南省长沙市天心区竹塘西路280号南国嘉苑1栋1104房',
	selected:0,
}, 
];*/


 