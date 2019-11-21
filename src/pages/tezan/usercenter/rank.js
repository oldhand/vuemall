import {application,imgBaseUrl} from '../../../rest/env'
import rest from '../../../rest/rest';    
import Vue from 'vue'

import store from '../../../store/index' 

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 
 
export const get_profileranks = () => {
	return new Promise((resolve, reject) => { 
		Vue.prototype.$storage.deleteSync('profilerank'); 
		Vue.prototype.$storage.get('profilerank').then(resData => { 
			resolve(resData); 
		}, 
		function(error) {
			rest.XN_Query.create('Content').tag("profilerank")
				.filter("type","eic","profilerank")   
				.filter("my.deleted","=",0)  
				.order('my.minrank', 'DESC_NUMBER')
			    .begin(0)
				.end(-1)
				.execute().then(res => {      
					var profileranks = []; 
					if (res.size > 0)
					{   
						for (var i in res.entry)
						{
								var profilerank_info = res.entry[i];  
								profileranks.push({ 
									    rankname: profilerank_info.my.rankname, 
										minrank: Number(profilerank_info.my.minrank), 
										icon: profilerank_info.my.icon.replace("&amp;","&"), 
										halficon: profilerank_info.my.halficon.replace("&amp;","&"), 
								});  
						} 
					}
					Vue.prototype.$storage.setSync('profilerank',profileranks);
					resolve(profileranks);
				});
		}); 
	});
}; 
 
 
