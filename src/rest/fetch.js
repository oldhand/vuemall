import { baseUrl } from './env'
import base64 from './base64' 

export default async(url = '',headers,data = {}, type = 'GET') => {
	type = type.toUpperCase();   
	console.log("url : /xn/rest/1.0" + url);
	url = baseUrl + "/base64/" + base64.encode("/xn/rest/1.0" + url);
	// console.log("url :" + url); 
	if (type == 'PUT' || type == 'POST')
	{
		headers['Content-Type'] = 'application/json; charset=utf-8';
	} 
	//console.log('headers : ' + JSON.stringify(headers)); 
	//console.log('___'+type+'____data : ' + JSON.stringify(data));
    return new Promise((resolve, reject) => { 
		let stream = weex.requireModule('stream');
		stream.fetch({
		       method: type,
		       url: url,
		       type:'json',
		       headers:  headers,
			   body: JSON.stringify(data)
		}, function(resData) {
		//console.log('resData: ' + JSON.stringify(resData));  
		if (resData.status == 200 && resData.data) {  
			resolve(resData.data);
		} else { 
			reject(resData)
		} 
		},function(response){
		      //console.log('response: ' + JSON.stringify(response)); 
		});  
    }); 
}  
