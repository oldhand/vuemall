  
export const number_format = (number, decimals, dec_point, thousands_sep,roundtag) => {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
    * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    roundtag = roundtag || "ceil"; //"ceil","floor","round"
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? '' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) { 
        var k = Math.pow(10, prec);   
        return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec*2))).toFixed(prec*2)) / k;
    };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (sep != '')
	{
	    var re = /(-?\d+)(\d{3})/;
	    while (re.test(s[0])) {
	        s[0] = s[0].replace(re, "$1" + sep + "$2");
	    } 
	} 
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};  

export const todatetime = (value) => {
	if (value && value != "")
	{
		return new Date(value.replace(/-/g,"/")+'+0800'); 
	}
	return null;	
};
 
export const date_format = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
	if (date)
	{
	    const MAP = {
	      'Y+': date.getFullYear(),
	      'M+': date.getMonth() + 1,
	      'D+': date.getDate(),
	      'H+': date.getHours(),
	      'm+': date.getMinutes(),
		  's+': date.getSeconds()
	    }
	    Object.keys(MAP).forEach(key => {
	      if (new RegExp(`(${key})`).test(fmt)) {
	        fmt = fmt.replace(RegExp.$1, `0${MAP[key]}`.substr(-Math.max(MAP[key].toString().length, 2)))
	      }
	    })
	    return fmt; 
	}
	return "";    
};

export const gettimestamp = () => {
	var timestamp = Date.parse(new Date());
	return timestamp / 1000;
};  

export const getdaystamp = () => {
	var now = new Date();
	var year = now.getFullYear(); //得到年份
	var month = now.getMonth();//得到月份
	var date = now.getDate();//得到日期
	var timestamp = Date.parse(new Date(year,month,date));
	return timestamp / 1000;
};  



Date("2018/12/01 12:00:00+0800"); 
var key = parseInt(new Date().getTime() / 1000) + '';
  
//获取指定区间范围随机数，包括lowerValue和upperValue
export const random = (lowerValue,upperValue) => {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
};