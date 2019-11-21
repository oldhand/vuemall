import {webUrl} from '../../../rest/env'
import base64 from '../../../rest/base64'
 
const expressname = [
		{name:"申通",value:"shentong"},
        {name:"安信达",value:"anxindakuaixi"},
        {name:"百世汇通",value:"huitongkuaidi"},
        {name:"百福东方",value:"baifudongfang"},
        {name:"包裹/平邮/挂号信",value:"youzhengguonei"},
        {name:"邦送物流",value:"bangsongwuliu"},
        {name:"希伊艾斯",value:"cces"},
        {name:"中国东方",value:"coe"},
        {name:"传喜物流",value:"chuanxiwuliu"},
        {name:"大田物流",value:"datianwuliu"},
        {name:"德邦物流",value:"debangwuliu"},
        {name:"德邦",value:"debangwuliu"},
        {name:"DPEX",value:"dpex"},
        {name:"DHL",value:"dhl"},
        {name:"D速快递",value:"dsukuaidi"},
        {name:"递四方",value:"disifang"},
        {name:"EMS",value:"ems"},
        {name:"E邮宝",value:"ems"},
        {name:"Fedex",value:"edex"},
        {name:"飞康达物流",value:"feikangda"},
        {name:"飞快达",value:"feikuaida"},
        {name:"凡客如风达",value:"rufengda"},
        {name:"风行天下",value:"fengxingtianxia"},
        {name:"飞豹快递",value:"feibaokuaidi"},
        {name:"港中能达",value:"ganzhongnengda"},
        {name:"国通快递",value:"guotongkuaidi"},
        {name:"广东邮政",value:"guangdongyouzhengwuliu"},
        {name:"挂号信",value:"youzhengguonei"},
        {name:"国内邮件",value:"youzhengguonei"},
        {name:"国际邮件",value:"youzhengguoji"},
        {name:"GLS",value:"gls"},
        {name:"共速达",value:"gongsuda"},
        {name:"汇通快运",value:"huitongkuaidi"},
        {name:"汇通",value:"huitongkuaidi"},
        {name:"汇强快递",value:"huiqiangkuaidi"},
        {name:"华宇物流",value:"tiandihuayu"},
        {name:"恒路物流",value:"hengluwuliu"},
        {name:"华夏龙",value:"huaxialongwuliu"},
        {name:"海航天天",value:"tiantian"},
        {name:"海外环球",value:"haiwaihuanqiu"},
        {name:"河北建华",value:"hebeijianhua"},
        {name:"海盟速递",value:"haimengsudi"},
        {name:"华企快运",value:"huaqikuaiyun"},
        {name:"山东海红",value:"haihongwangsong"},
        {name:"佳吉物流",value:"jiajiwuliu"},
        {name:"佳怡物流",value:"jiayiwuliu"},
        {name:"加运美",value:"jiayunmeiwuliu"},
        {name:"京广速递",value:"jinguangsudikuaijian"},
        {name:"急先达",value:"jixianda"},
        {name:"晋越快递",value:"jinyuekuaidi"},
        {name:"捷特快递",value:"jietekuaidi"},
        {name:"金大物流",value:"jindawuliu"},
        {name:"嘉里大通",value:"jialidatong"},
        {name:"快捷速递",value:"kuaijiesudi"},
        {name:"康力物流",value:"kangliwuliu"},
        {name:"跨越物流",value:"kuayue"},
        {name:"联昊通",value:"lianhaowuliu"},
        {name:"龙邦物流",value:"longbanwuliu"},
        {name:"龙邦速递",value:"longbanwuliu"},
        {name:"蓝镖快递",value:"lanbiaokuaidi"},
        {name:"乐捷递",value:"lejiedi"},
        {name:"联邦快递",value:"lianbangkuaidien"},
        {name:"立即送",value:"lijisong"},
        {name:"隆浪快递",value:"longlangkuaidi"},
        {name:"门对门",value:"menduimen"},
        {name:"美国快递",value:"meiguokuaidi"},
        {name:"明亮物流",value:"mingliangwuliu"},
        {name:"OCS",value:"ocs"},
        {name:"onTrac",value:"ontrac"},
        {name:"全晨快递",value:"quanchenkuaidi"},
        {name:"全际通",value:"quanjitong"},
        {name:"全日通",value:"quanritongkuaidi"},
        {name:"全一快递",value:"quanyikuaidi"},
        {name:"全峰快递",value:"quanfengkuaidi"},
        {name:"全峰",value:"quanfengkuaidi"},
        {name:"七天连锁",value:"sevendays"},
        {name:"如风达快递",value:"rufengda"},
        {name:"如风达",value:"rufengda"},
        {name:"伸通",value:"shentong"},
        {name:"顺丰速递",value:"shunfeng"},
        {name:"顺丰",value:"shunfeng"},
        {name:"三态速递",value:"santaisudi"},
        {name:"盛辉物流",value:"shenghuiwuliu"},
        {name:"速尔物流",value:"suer"},
        {name:"盛丰物流",value:"shengfengwuliu"},
        {name:"上大物流",value:"shangda"},
        {name:"赛澳递",value:"saiaodi"},
        {name:"山西红马甲",value:"sxhongmajia"},
        {name:"圣安物流",value:"shenganwuliu"},
        {name:"穗佳物流",value:"suijiawuliu"},
        {name:"天地华宇",value:"tiandihuayu"},
        {name:"天天快递",value:"tiantian"},
        {name:"天天",value:"tiantian"},
        {name:"TNT",value:"tnt"},
        {name:"通和天下",value:"tonghetianxia"},
        {name:"UPS",value:"ups"},
        {name:"优速物流",value:"youshuwuliu"},
        {name:"优速快递",value:"youshuwuliu"},
        {name:"优速",value:"youshuwuliu"},
        {name:"万家物流",value:"wanjiawuliu"},
        {name:"万象物流",value:"wanxiangwuliu"},
        {name:"微特派",value:"weitepai"},
        {name:"新邦物流",value:"xinbangwuliu"},
        {name:"信丰物流",value:"xinfengwuliu"},
        {name:"星晨急便",value:"xingchengjibian"},
        {name:"鑫飞鸿",value:"xinhongyukuaidi"},
        {name:"新蛋奥硕物流",value:"neweggozzo"},
        {name:"香港邮政",value:"hkpost"},
        {name:"圆通速递",value:"yuantong"},
        {name:"圆通",value:"yuantong"},
        {name:"韵达快运",value:"yunda"},
		{name:"韵达快递",value:"yunda"},
        {name:"韵达",value:"yunda"},
        {name:"运通快递",value:"yuntongkuaidi"},
        {name:"邮政小包",value:"youzhengguonei"},
        {name:"邮政包裹",value:"youzhengguonei"},
        {name:"国际邮政小包",value:"youzhengguoji"},
        {name:"国际邮政包裹",value:"youzhengguoji"},
        {name:"远成物流",value:"yuanchengwuliu"},
        {name:"亚风速递",value:"yafengsudi"},
        {name:"一邦速递",value:"yibangwuliu"},
        {name:"源伟丰快递",value:"yuanweifeng"},
        {name:"元智捷诚",value:"yuanzhijiecheng"},
        {name:"越丰物流",value:"yuefengwuliu"},
        {name:"源安达",value:"yuananda"},
        {name:"原飞航",value:"yuanfeihangwuliu"},
        {name:"忠信达快递",value:"zhongxinda"},
        {name:"芝麻开门",value:"zhimakaimen"},
        {name:"银捷速递",value:"yinjiesudi"},
        {name:"一统飞鸿",value:"yitongfeihong"},
        {name:"中通速递",value:"zhongtong"},
        {name:"中通",value:"zhongtong"},
        {name:"宅急送",value:"zhaijisong"},
        {name:"中邮物流",value:"zhongyouwuliu"},
        {name:"忠信达",value:"zhongxinda"},
        {name:"中速快件",value:"zhongsukuaidi"},
        {name:"郑州建华",value:"zhengzhoujianhua"},
        {name:"中天万运",value:"zhongtianwanyun"},
]; 

export const get_wuliu_info = (invoicename,invoicenumber) => {
	return new Promise((resolve, reject) => {  
			var invoicecode = "";
			for(var key in expressname){
				if (invoicename == expressname[key]['name'])
				{
					invoicecode = expressname[key]['value'];   
				} 
			}
			if (invoicecode != "")
			{   
	   			 var timestamp = new Date().getTime();
	   			 var url = 'http://m.kuaidi100.com/query?type='+invoicecode+'&postid='+invoicenumber+'&id=1&valicode=&temp=0.'+timestamp;
	   			 console.log('____________get_wuliu_info___'+url+'________');  
				 url = base64.encode(url);
				 console.log('____________get_wuliu_info___'+url+'________');  
				 url = webUrl + "/proxy.php?url=" + url;
				 var headers = {};
				 headers['Content-Type'] = 'application/json; charset=utf-8'; 
				 console.log('____________get_wuliu_info___'+url+'________'); 
				 var stream = weex.requireModule('stream');
				 stream.fetch({
				        method: 'GET',
				        url: url,
				        type:'json',
					 	headers:  headers,
				 }, function(resData) {
					console.log('resData: ' + JSON.stringify(resData));  
 	   	 			if (resData.status == 200) {  
 	   	 				resolve(resData.data);
 	   	 			} else {
 	   	 				resolve({data:[]});
 	   	 			} 
				 },function(response){
				       console.log('response: ' + JSON.stringify(response)); 
				 });   
			}
			else
			{
				reject('物流公司名称错误');  
			} 
	});    
};