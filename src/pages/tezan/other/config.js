import {application} from '../../../rest/env'
import rest from '../../../rest/rest';   

export const getdomain_info = () => { 
	return new Promise((resolve, reject) => {
		rest.XN_Query.create('Content').tag("domains")
			.filter("type","eic","domains") 
			.filter("my.domain","=",application)  
			.end(1) 
			.execute().then(res => { 
					console.log('_____domain__________' + JSON.stringify(res));  
				    var domain = {};
					if (res.size > 0)
					{
						var domain_info = res.entry[0];
						domain.companyname = domain_info.my.companyname; 
						domain.platformname = domain_info.my.platformname; 
						domain.site = domain_info.my.site; 
						domain.trademark = domain_info.my.trademark; 
					} 
					resolve(domain);
		}, function(error) {
			reject(error);
		});
	});
}; 