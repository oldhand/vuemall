import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';    
import {get_profileid} from '../../../rest/profile'
  
import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 
export const getprofilebankcards = () => {
	return new Promise((resolve, reject) => {
		console.log('____________getprofilebankcards________________');
		var profilebankcards = [];
		get_profileid().then(profileid => {   
				rest.XN_Query.create('Content').tag("supplier_profilebankcards_"+profileid)
					.filter("type","eic","supplier_profilebankcards")  
				    .filter("my.supplierid","=",supplierid)    
					.filter("my.profileid","=",profileid)
					.filter("my.authenticationstatus","=",'2')    
					.filter("my.deleted","=",0)  
					.order("published","DESC")
				    .end(-1)
					.execute().then(res => {      
						if (res.size > 0)
						{  
							for (var i in res.entry)
							{
								var profilebankcard_info = res.entry[i];   
								var selected = false;
								if (profilebankcard_info.my.selected == '1')
								{
									 selected = true;
								}
								var bankstatus = '';
								if (profilebankcard_info.my.authenticationstatus == '1')
								{
									bankstatus = '已拒绝';
								}
								else if (profilebankcard_info.my.authenticationstatus == '2')
								{
									bankstatus = '已认证';
								}
								else
								{
									bankstatus = '待认证';
								}
								profilebankcards.push({
									    id: profilebankcard_info.id,
									    bank: profilebankcard_info.my.bank, 
									    account: profilebankcard_info.my.account,
									    realname: profilebankcard_info.my.realname,
										authenticationstatus:profilebankcard_info.my.authenticationstatus,
										bankstatus:bankstatus,  
		 								selected: selected,   
									}); 
							}
						}   
						resolve(profilebankcards); 
				}); 
		},
		function(error) {
			resolve([]);
		});  
	});   
};
export const getallprofilebankcards = () => {
	return new Promise((resolve, reject) => {
		console.log('____________getprofilebankcards________________');
		var profilebankcards = [];
		get_profileid().then(profileid => {   
				rest.XN_Query.create('Content').tag("supplier_profilebankcards_"+profileid)
					.filter("type","eic","supplier_profilebankcards")  
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
								var profilebankcard_info = res.entry[i];   
								var selected = false;
								if (profilebankcard_info.my.selected == '1')
								{
									 selected = true;
								}
								var bankstatus = '';
								if (profilebankcard_info.my.authenticationstatus == '1')
								{
									bankstatus = '已拒绝';
								}
								else if (profilebankcard_info.my.authenticationstatus == '2')
								{
									bankstatus = '已认证';
								}
								else
								{
									bankstatus = '待认证';
								}
								profilebankcards.push({
									    id: profilebankcard_info.id,
									    bank: profilebankcard_info.my.bank, 
									    account: profilebankcard_info.my.account,
									    realname: profilebankcard_info.my.realname,
										authenticationstatus:profilebankcard_info.my.authenticationstatus,
										bankstatus:bankstatus,  
		 								selected: selected,   
									}); 
							}
						}   
						resolve(profilebankcards); 
				}); 
		},
		function(error) {
			resolve([]);
		});  
	});   
};
export const getdefaultbank_info = () => {
	return new Promise((resolve, reject) => {
		console.log('____________getdefaultbank_info________________'); 
		get_profileid().then(profileid => {   
				rest.XN_Query.create('Content').tag("supplier_profilebankcards_"+profileid)
					.filter("type","eic","supplier_profilebankcards")  
				    .filter("my.supplierid","=",supplierid)    
					.filter("my.profileid","=",profileid)  
					.filter("my.authenticationstatus","=",'2') 
					.filter("my.selected","=",'1') 
					.filter("my.deleted","=",0)   
				    .end(1)
					.execute().then(res => {      
						if (res.size > 0)
						{   
								var bank_info = res.entry[0];   
								resolve({
									    id: bank_info.id,
									    bank: bank_info.my.bank, 
									    account: bank_info.my.account,
									    realname: bank_info.my.realname,
										authenticationstatus:bank_info.my.authenticationstatus,   
									});  
							 
						} 
						else
						{
							reject('');
						} 
				}); 
		},
		function(error) {
			reject(error);
		});  
	});   
};
export const getbank_info = (bankid) => {
	return new Promise((resolve, reject) => {
		console.log('____________getbank_info________________'); 
		get_profileid().then(profileid => {   
			rest.XN_Content.load(bankid,"supplier_profilebankcards_"+profileid).then(bank_info => {   
				var selected = false;
				if (bank_info.my.selected == '1')
				{
					 selected = true;
				}
				resolve({
					    id: bank_info.id,
					    bank: bank_info.my.bank, 
					    account: bank_info.my.account,
					    realname: bank_info.my.realname,
						authenticationstatus:bank_info.my.authenticationstatus,  
						selected: selected,   
					});  
			});
		},
		function(error) {
			reject('');
		});  
	});   
};


export const setdefault_bank = (profileid,bankid) => {
	return new Promise((resolve, reject) => {
		console.log('____________setdefault_bank________________');  
		rest.XN_Query.create('Content').tag("supplier_profilebankcards_"+profileid)
			.filter("type","eic","supplier_profilebankcards")  
		    .filter("my.profileid","=",profileid)  
			.filter("id","!=",bankid)    
			.filter("my.deleted","=",0)  
		    .end(-1)
			.execute().then(res => {      
				if (res.size > 0)
				{  
					for (var i in res.entry)
					{
						var bank_info = res.entry[i];   
						if (bank_info.my.selected == '1')
						{
							bank_info.my.selected = '0'; 
							bank_info.save("supplier_profilebankcards,supplier_profilebankcards_"+profileid+",supplier_profilebankcards_"+supplierid); 
						} 
					}
				}   
				resolve("ok"); 
		});  
	});    
};
									   
export const savebank_info = (info) => {
	return new Promise((resolve, reject) => {
		console.log('____________savebank_info________________'); 
		console.log('_____info : ' + JSON.stringify(info));
		get_profileid().then(profileid => {   
			rest.init({viewer:profileid}); 
			if (info.id == '' || info.id == '0')
			{
				var newcontent = rest.XN_Content.create('supplier_profilebankcards','',false);					  
				newcontent.my.deleted = '0';  
				newcontent.my.supplierid = supplierid;
				newcontent.my.profileid = profileid;
				newcontent.my.bank = info.bank[0];
				newcontent.my.account = info.account;
				newcontent.my.realname = info.realname;
				newcontent.my.authenticationstatus = '0';
			    newcontent.my.supplier_profilebankcardsstatus = 'JustCreated';
				newcontent.my.approvalstatus = '0';
				if (info.selected)
				{
					newcontent.my.selected = '1';
				}
				else
				{
					newcontent.my.selected = '0';
				}
				newcontent.save("supplier_profilebankcards,supplier_profilebankcards_"+profileid+",supplier_profilebankcards_"+supplierid).then( res =>
				{
					if (info.selected)
					{
						setdefault_bank(profileid,newcontent.id);
					}
					resolve("ok");
				}); 
			}
			else
			{
				rest.XN_Content.load(info.id,"supplier_profilebankcards_"+profileid).then(bank_info => {  
					bank_info.my.bank = info.bank[0];
					bank_info.my.account = info.account;
					bank_info.my.realname = info.realname;
					bank_info.my.authenticationstatus = '0';
					if (info.selected)
					{
						bank_info.my.selected = '1';
					}
					else
					{
						bank_info.my.selected = '0';
					}
					bank_info.save("supplier_profilebankcards,supplier_profilebankcards_"+profileid+",supplier_profilebankcards_"+supplierid).then( res =>
					{
						if (info.selected)
						{
							setdefault_bank(profileid,info.id);
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

export const deletebank_info = (bankid) => {
	return new Promise((resolve, reject) => {
		console.log('____________deletebank_info________________'); 
		get_profileid().then(profileid => {   
	   		 rest.XN_Content.delete(bankid,"supplier_profilebankcards,supplier_profilebankcards_"+profileid+",supplier_profilebankcards_"+supplierid).then(res => { 
	   			 resolve('ok');
	   		 });
		},
		function(error) {
			reject('');
		});  
	});   
};
 

 