<?php 

ini_set('memory_limit','256M');
set_time_limit(0);
XN_Application::$CURRENT_URL = "admin";
 
$params = array();
$params['supplierid'] = '41461';
$params['appid'] = 'wx7962fafc7ec5b6c6';
$params['openid'] = '11111'; 
$params['share'] = 'hx5eyjjmlg6'; 
$params['uri'] = '';		
$params['time'] = time(); 
$params['profileid'] = 'd1j1rdzhv9h'; 
$params['profileid'] = 'hx5eyjjmlg6'; 
$str = http_build_query($params, '', '&');
$signature = md5($str."tezan168");
//$params['uri'] = urlencode(base64_encode('/detail?productid=1134440')); //跳转到其他页面
$params['signature'] = $signature;  
header("Location: http://192.168.0.200:8081/#/?".http_build_query($params, '', '&'));  //更换成你的IP
//header("Location: http://mall.tezan.cn/#/?".http_build_query($params, '', '&'));  //更换成你的线上地址IP
die();	 

 ?>