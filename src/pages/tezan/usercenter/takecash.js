import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';    
import {get_profileid} from '../../../rest/profile'
import {number_format,date_format,todatetime,gettimestamp} from '../../../rest/common' 
 
 
import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 
 
 
 
 
export const takecash_submit = (info) => {
	return new Promise((resolve, reject) => { 
	            console.log('____________takecash_submit_________');	 
				var profileid = store.state.profileid;
				var supplierid = store.state.supplierid;
				var appid = store.state.appid; 
				var newcontent = rest.XN_Content.create('takecash_submit','',false,2);	 
				newcontent.my.profileid = profileid; 
				newcontent.my.supplierid = supplierid;
				newcontent.my.selectbankid = info.selectbankid;   
				newcontent.my.realname = info.realname; 
				newcontent.my.bank = info.bank,
				newcontent.my.account = info.account,  
				newcontent.my.amount = info.amount,    
				newcontent.my.money = info.money,   
				newcontent.my.maxtakecash = info.maxtakecash,   
				newcontent.my.takecashlimit = info.takecashlimit,   
				newcontent.my.mobile = info.mobile,  
				newcontent.my.module = 'takecash';   
				newcontent.my.action = 'submit';  
				newcontent.my.record = info.selectbankid;  
				
				var nowtimestamp = gettimestamp();   
				var key =  Math.floor(nowtimestamp / 10);
				newcontent.my.key = key;  
				
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


export const getlasttakecash_info = () => {
	return new Promise((resolve, reject) => {
		console.log('____________getlasttakecash_info________________');
		var profilebankcards = [];
		get_profileid().then(profileid => {   
				rest.XN_Query.create('YearContent').tag("supplier_takecashs_"+profileid)
					.filter("type","eic","supplier_takecashs")  
				    .filter("my.supplierid","=",supplierid)    
					.filter("my.profileid","=",profileid) 
					.filter("my.tradestatus","=","no") 
					.filter("my.deleted","=",0)  
					.order("published","DESC")
				    .end(-1)
					.execute().then(res => {     
						 console.log('________getlasttakecash_info________________' + JSON.stringify(res)); 
						var message = ''; 
						if (res.size > 0)
						{  
							 var takecash_info = res.entry[0];   
							 var published = date_format(todatetime(takecash_info.published),"YYYY-MM-DD HH:mm");
							 var amount = takecash_info.my.amount;
							 message = '您在'+published+'成功提交提现申请￥'+amount+',请等待财务人员完成转账操作！';
						}  
						resolve(message); 
				}); 
		},
		function(error) {
			resolve('');
		});  
	});   
};

Date.prototype.add = function (part, value) {
    value *= 1;
    if (isNaN(value)) {
        value = 0;
    }
    switch (part) {
        case "y":
            this.setFullYear(this.getFullYear() + value);
            break;
        case "m":
            this.setMonth(this.getMonth() + value);
            break;
        case "d":
            this.setDate(this.getDate() + value);
            break;
        case "h":
            this.setHours(this.getHours() + value);
            break;
        case "n":
            this.setMinutes(this.getMinutes() + value);
            break;
        case "s":
            this.setSeconds(this.getSeconds() + value);
            break;
        default:
 
    }
}

export const getlasttradetakecash_info = () => {
	return new Promise((resolve, reject) => {
		console.log('____________getlasttradetakecash_info________________');
		var profilebankcards = [];
		get_profileid().then(profileid => {   
				rest.XN_Query.create('YearContent').tag("supplier_takecashs_"+profileid)
					.filter("type","eic","supplier_takecashs")  
				    .filter("my.supplierid","=",supplierid)    
					.filter("my.profileid","=",profileid) 
					.filter("my.tradestatus","=","trade") 
					.filter("my.deleted","=",0)  
					.order("published","DESC")
				    .end(1)
					.execute().then(res => {     
						 console.log('________getlasttradetakecash_info_______________' + JSON.stringify(res)); 
						var message = ''; 
						if (res.size > 0)
						{  
							 var takecash_info = res.entry[0];   
							 var published = todatetime(takecash_info.published); 
							 var format_published = date_format(published,"YYYY-MM-DD HH:mm"); 
							 published.add("d", +10);
							 var next_published = date_format(published,"YYYY-MM-DD"); 
							 var next_time = Date.parse(published) / 1000;
							 var timestamp = Date.parse(new Date()) / 1000;
							 if (next_time > timestamp)
							 {
							 	message = '您在'+format_published+'提交的提现申请已完成,请查收!下次允许提现日期为'+next_published+'之后.';  
							 } 
						}  
						resolve(message); 
				}); 
		},
		function(error) {
			resolve('');
		});  
	});   
}; 

export const gettakecashs = (page) => {
	return new Promise((resolve, reject) => {
		console.log('____________gettakecashs________________');		
		get_profileid().then(profileid => {   
				var query = rest.XN_Query.create('YearContent').tag("supplier_takecashs_"+profileid)
					.filter("type","eic","supplier_takecashs")  
				    .filter("my.supplierid","=",supplierid)  
					.filter("my.profileid","=",profileid)   
					.filter("my.deleted","=",0)  
					.order("published","DESC")
				    .begin(page*5)
					.end((page+1)*5);  
				query.execute().then(res => {      
						if (res.size > 0)
						{ 
							var takecashs = [];  
							for (var i in res.entry)
							{
								var takecash_info = res.entry[i];  
								var takecash = {
									    id: takecash_info.id,
										published: takecash_info.published, 
									    bank: takecash_info.my.bank, 
									    account: takecash_info.my.account,
										realname: takecash_info.my.realname,
										amount: takecash_info.my.amount,
									    executedatetime: takecash_info.my.executedatetime,
										tradestatus: takecash_info.my.tradestatus,
										supplier_takecashsstatus: takecash_info.my.supplier_takecashsstatus,
									    examinedatetime: takecash_info.my.examinedatetime,
										transferfailurereason: takecash_info.my.transferfailurereason, 
									    
									};  
								takecashs.push(takecash);
							}
							resolve(takecashs);  
						}
						else
						{
							resolve([]);  
						}    
				}); 
		},
		function(error) {
			reject(error);
		});  
	});   
};