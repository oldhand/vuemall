/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl;  
let imgBaseUrl;
let webUrl;
let application;
let sms;
let umKey;
let appKey;
let appSecret;
let signature;
let push;
let weixin;


application = 'admin';
//baseUrl = 'http://124.232.147.61:7485';
//baseUrl = 'http://192.168.0.200:8000';
baseUrl = 'http://119.3.7.226:8000';
//baseUrl = 'http://192.168.43.100:8000';
//imgBaseUrl = 'http://192.168.0.200:7070'; 
//imgBaseUrl = 'http://api.tezan.cn';
imgBaseUrl = 'http://api.awangyun.cn';
//webUrl = 'http://web.tezan.cn';
webUrl = 'http://web.awangyun.cn';
//webUrl = 'http://web.tezan.cc';
//supplierid = '3991';
//supplierid = '71352'; //特赞商城
//supplierid = '41461'; //若米家
//supplierid = '736437'; //富可士海淘微商城

/*
sms = {
	access_key_id:'LTAIr4xA5Hnr7gGL',
	access_key_secret:'yFiBMg5gUzQwx1ee0F0wSx6bNQfYqE', 
	signname:'%E4%BA%8B%E5%8A%A1%E5%AE%98',
	authentication_templatecode:'SMS_83420001',
	tixian_templatecode:'SMS_83420001', 
	codename:'number',
};
*/


// weixin = {
//       appid: 'wx7962fafc7ec5b6c6',
//       appsecret: '4c35458e913efbcf86ef621d22387b10',
// };




export {
	baseUrl, 
	imgBaseUrl,
	webUrl,
	application,
	sms,	
}