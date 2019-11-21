import {get_supplier_info} from '../../rest/api'
import {application,imgBaseUrl} from '../../rest/env' 
import store from '../../store/index' 
import rest from '../../rest/rest';  

let supplierid = '';
if (store.state.supplierid != '') 
{
	supplierid = store.state.supplierid;
} 

export const supplier_info = (index) => {  
	return new Promise((resolve, reject) => {
	    get_supplier_info().then(res => { 
			//console.log('supplier_info : ' + JSON.stringify(res));  
			console.log('index : ' + index + ',  footericonstyle : ' + res.footericonstyle); 
			let navbarcolor;
			let selectnavbarcolor; 
			let tabstyle = res.footerstyle;
			navbarcolor = res.navbarcolor;
			selectnavbarcolor = res.selectnavbarcolor;
			
			store.commit('mallname',res.suppliername);
		
			let visibility;
		    var tabConfig = []; 
			if (res.footericonstyle == '0')
			{
				if (index == 'home')
				{
					visibility = 'visible';
				}
				else
				{
					visibility = 'hidden';
				}
				tabConfig.push({
					    icon: '&#xe629;',
					    name: "首页",
					    key: 'home',
						navbarcolor: navbarcolor,
						selectnavbarcolor: selectnavbarcolor,
						style: tabstyle,
					    src: '/index/home',
					    visibility: visibility,
					});
				if (res.showcategory == '0')
				{
					if (index == 'category')
					{
						visibility = 'visible';
					}
					else
					{
						visibility = 'hidden';
					}
					tabConfig.push({
						    icon: '&#xe779;',
						    name: "分类",
						    key: 'category',
							navbarcolor: navbarcolor,
							selectnavbarcolor: selectnavbarcolor,
							style: tabstyle,
						    src: '/index/category',
						    visibility: visibility,
					});	
				}	
				if (index == 'shoppingcart')
				{
					visibility = 'visible';
				}
				else
				{
					visibility = 'hidden';
				}
				tabConfig.push({
					    icon: '&#xe61f;',
					    name: "购物车",
					    key: 'shoppingcart',
						navbarcolor: navbarcolor,
						selectnavbarcolor: selectnavbarcolor,
						style: tabstyle, 
					    src: '/index/shoppingcart',
					    visibility: visibility,
					});
				if (index == 'usercenter')
				{
					visibility = 'visible';
				}
				else
				{
					visibility = 'hidden';
				}
				tabConfig.push({
				    	icon: '&#xe628;',
					    name: "我的",
					    key: 'usercenter',
						navbarcolor: navbarcolor,
						selectnavbarcolor: selectnavbarcolor,
						style: tabstyle, 
					    src: '/index/usercenter',
					    visibility: visibility,
					});
			}
			else
			{
				if (index == 'home')
				{
					visibility = 'visible';
				}
				else
				{
					visibility = 'hidden';
				}
				tabConfig.push({
					    icon: '&#xe776;',
					    name: "首页",
					    key: 'home',
						navbarcolor: navbarcolor,
						selectnavbarcolor: selectnavbarcolor,
						style: tabstyle,
					    src: '/index/home',
					    visibility: visibility,
					});
				if (res.showcategory == '0')
				{
					if (index == 'category')
					{
						visibility = 'visible';
					}
					else
					{
						visibility = 'hidden';
					}
					tabConfig.push({
						    icon: '&#xe777;',
						    name: "分类",
						    key: 'category',
							navbarcolor: navbarcolor,
							selectnavbarcolor: selectnavbarcolor,
							style: tabstyle,
						    src: '/index/category',
						    visibility: visibility,
					});	
				}		
				if (index == 'shoppingcart')
				{
					visibility = 'visible';
				}
				else
				{
					visibility = 'hidden';
				}	
				tabConfig.push({
					    icon: '&#xe775;',
					    name: "购物车",
					    key: 'shoppingcart',
						navbarcolor: navbarcolor,
						selectnavbarcolor: selectnavbarcolor,
						style: tabstyle, 
					    src: '/index/shoppingcart',
					    visibility: visibility,
					});
				if (index == 'usercenter')
				{
					visibility = 'visible';
				}
				else
				{
					visibility = 'hidden';
				}
				tabConfig.push({
				    	icon: '&#xe774;',
					    name: "我的",
					    key: 'usercenter',
						navbarcolor: navbarcolor,
						selectnavbarcolor: selectnavbarcolor,
						style: tabstyle, 
					    src: '/index/usercenter',
					    visibility: visibility,
					});
			} 
			console.log('tabConfig : ' + JSON.stringify(tabConfig));  
			resolve(tabConfig);
	    }, function(error) {
			reject(error);
		}); 
	}); 
};




 