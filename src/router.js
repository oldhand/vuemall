import Router from 'vue-router'


const viewerrormsg = r => require.ensure([], () => r(require('@/pages/tezan/system/viewerrormsg.vue')), 'main')
const oauth2 = r => require.ensure([], () => r(require('@/pages/tezan/oauth2.vue')), 'main')
const main = r => require.ensure([], () => r(require('@/pages/tezan/index.vue')), 'main')

const home = r => require.ensure([], () => r(require('@/pages/tezan/home/index.vue')), 'mainpage')
const shoppingcart = r => require.ensure([], () => r(require('@/pages/tezan/shoppingcart/index.vue')), 'mainpage')
const usercenter = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/index.vue')), 'mainpage')
const category = r => require.ensure([], () => r(require('@/pages/tezan/category/index.vue')), 'mainpage')

const search = r => require.ensure([], () => r(require('@/pages/tezan/home/search.vue')), 'message') 
const message = r => require.ensure([], () => r(require('@/pages/tezan/home/message.vue')), 'message')
const viewmessage = r => require.ensure([], () => r(require('@/pages/tezan/home/viewmessage.vue')), 'message') 

const login = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/login.vue')), 'usercenter')
const register = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/register.vue')), 'usercenter')
const setup = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/setup.vue')), 'usercenter')
const accountbook = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/accountbook.vue')), 'usercenter')
const billwater = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/billwater.vue')), 'usercenter')
const rankwater = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/rankwater.vue')), 'usercenter')
const frozenprofit = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/frozenprofit.vue')), 'usercenter')
const shareprofit = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/shareprofit.vue')), 'usercenter')
const commissionprofit = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/commissionprofit.vue')), 'usercenter')
const popularizeprofit = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/popularizeprofit.vue')), 'usercenter')
const threeleveldistribution = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/threeleveldistribution.vue')), 'usercenter')
const userdetail = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/userdetail.vue')), 'usercenter')
const user = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/user.vue')), 'usercenter')
const bindmobile = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/bindmobile.vue')), 'usercenter')
const changepwd = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/changepwd.vue')), 'usercenter')
const myqrcode = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/myqrcode.vue')), 'usercenter')
const takecash = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/takecash.vue')), 'usercenter')
const takecashlog = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/takecashlog.vue')), 'usercenter')
const vipcard = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/vipcard.vue')), 'usercenter')
const collection = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/collection.vue')), 'usercenter')
const changehead = r => require.ensure([], () => r(require('@/pages/tezan/usercenter/changehead.vue')), 'usercenter')  
const editbank = r => require.ensure([], () => r(require('@/pages/tezan/bank/edit.vue')), 'usercenter')
const selectbank = r => require.ensure([], () => r(require('@/pages/tezan/bank/select.vue')), 'usercenter')
const bank = r => require.ensure([], () => r(require('@/pages/tezan/bank/index.vue')), 'usercenter') 

const detail = r => require.ensure([], () => r(require('@/pages/tezan/detail/index.vue')), 'detail')
const address = r => require.ensure([], () => r(require('@/pages/tezan/address/index.vue')), 'address')
const editaddress = r => require.ensure([], () => r(require('@/pages/tezan/address/edit.vue')), 'address')
const selectaddress = r => require.ensure([], () => r(require('@/pages/tezan/address/select.vue')), 'address')

const allorders = r => require.ensure([], () => r(require('@/pages/tezan/myorders/all.vue')), 'myorders')
const submitorder = r => require.ensure([], () => r(require('@/pages/tezan/myorders/submitorder.vue')), 'myorders')
const pendingpayment = r => require.ensure([], () => r(require('@/pages/tezan/myorders/pendingpayment.vue')), 'myorders')
const sendout = r => require.ensure([], () => r(require('@/pages/tezan/myorders/sendout.vue')), 'myorders')
const receipt = r => require.ensure([], () => r(require('@/pages/tezan/myorders/receipt.vue')), 'myorders')
const appraise = r => require.ensure([], () => r(require('@/pages/tezan/myorders/appraise.vue')), 'myorders')
const aftersaleservice = r => require.ensure([], () => r(require('@/pages/tezan/myorders/aftersaleservice.vue')), 'myorders')
const orderdetail = r => require.ensure([], () => r(require('@/pages/tezan/myorders/orderdetail.vue')), 'myorders')
const wuliu = r => require.ensure([], () => r(require('@/pages/tezan/myorders/wuliu.vue')), 'myorders')
const needservice = r => require.ensure([], () => r(require('@/pages/tezan/myorders/needservice.vue')), 'myorders')
const submitappraise = r => require.ensure([], () => r(require('@/pages/tezan/myorders/submitappraise.vue')), 'myorders') 
const viewappraise = r => require.ensure([], () => r(require('@/pages/tezan/myorders/viewappraise.vue')), 'myorders')
const viewaftersaleservice = r => require.ensure([], () => r(require('@/pages/tezan/myorders/viewaftersaleservice.vue')), 'myorders')

const connectfailed = r => require.ensure([], () => r(require('@/pages/tezan/system/connectfailed.vue')), 'main')

const confirmpayment = r => require.ensure([], () => r(require('@/pages/tezan/payment/confirmpayment.vue')), 'payment')
const paymentsuccess = r => require.ensure([], () => r(require('@/pages/tezan/payment/paymentsuccess.vue')), 'payment')

const about = r => require.ensure([], () => r(require('@/pages/tezan/other/about.vue')), 'other')
const feedback = r => require.ensure([], () => r(require('@/pages/tezan/other/feedback.vue')), 'other')
const help = r => require.ensure([], () => r(require('@/pages/tezan/other/help.vue')), 'other')
const customservice = r => require.ensure([], () => r(require('@/pages/tezan/other/customservice.vue')), 'other')
const contactus = r => require.ensure([], () => r(require('@/pages/tezan/other/contactus.vue')), 'other')
const license = r => require.ensure([], () => r(require('@/pages/tezan/other/license.vue')), 'other')


 
// import main from '@/pages/tezan/index'
// import home from '@/pages/tezan/home/index'
// import usercenter from '@/pages/tezan/usercenter/index'
// import detail from '@/pages/tezan/detail/index' 


Vue.use(Router) 


module.exports = new Router({
  mode: 'hash',
  base: __dirname,
  routes: [
       { path: '/', meta: { title: '装载中...' }, redirect: '/index' },
	   { path: '/index', meta: { title: '装载中...' }, redirect: '/index/home' },
	   { path: '/index',  
	     component: main, 
	     children: [ 
			   { path: '/index/home', meta: { title: '首页' }, component: home },
			   { path: '/index/category', meta: { title: '分类' }, component: category },
			   { path: '/index/shoppingcart', meta: { title: '购物车' }, component: shoppingcart },
			   { path: '/index/usercenter', meta: { title: '我的' }, component: usercenter },
         ]},
	   { path: '/oauth2', meta: { title: '微信认证' }, component: oauth2 }, 
	   { path: '/viewerrormsg', meta: { title: '错误' }, component: viewerrormsg }, 
	   { path: '/search', meta: { title: '搜索' }, component: search }, 
	   { path: '/message', meta: { title: '消息中心' }, component: message },		 
	   { path: '/viewmessage', meta: { title: '查看消息' }, component: viewmessage }, 
	   { path: '/login', meta: { title: '登录' }, component: login },
	   { path: '/register', meta: { title: '注册' }, component: register },
	   { path: '/setup', meta: { title: '设置' }, component: setup },
	   { path: '/accountbook', meta: { title: '我的账薄' }, component: accountbook },
	   { path: '/billwater', meta: { title: '账单流水' }, component: billwater },
	   { path: '/rankwater', meta: { title: '积分流水' }, component: rankwater },
	   { path: '/frozenprofit', meta: { title: '冻结资金' }, component: frozenprofit },
	   { path: '/shareprofit', meta: { title: '分享收益' }, component: shareprofit },
	   { path: '/commissionprofit', meta: { title: '提成收益' }, component: commissionprofit },
	   { path: '/popularizeprofit', meta: { title: '推广收益' }, component: popularizeprofit },
	   { path: '/threeleveldistribution', meta: { title: '分销' }, component: threeleveldistribution },
	   { path: '/userdetail', meta: { title: '个人资料' }, component: userdetail },
	   { path: '/user', meta: { title: '个人中心'}, component: user },
	   { path: '/bindmobile', meta: { title: '绑定手机' }, component: bindmobile },
	   { path: '/changepwd', meta: { title: '修改密码' }, component: changepwd },
	   { path: '/myqrcode', meta: { title: '我的二维码' }, component: myqrcode },
	   { path: '/takecash', meta: { title: '提现' }, component: takecash },
	   { path: '/takecashlog', meta: { title: '提现历史记录' }, component: takecashlog },
	   { path: '/selectbank', meta: { title: '选择提现银行卡' }, component: selectbank },
	   { path: '/editbank', meta: { title: '编辑提现银行卡' }, component: editbank },
	   { path: '/bank', meta: { title: '提现银行卡' }, component: bank },			 	 
	   { path: '/vipcard', meta: { title: '卡券' }, component: vipcard },
	   { path: '/collection', meta: { title: '我的收藏' }, component: collection },
	   { path: '/changehead', meta: { title: '修改头像' }, component: changehead }, 		 
	   { path: '/detail', meta: { title: '商品详情' }, component: detail },
	   { path: '/address', meta: { title: '收货地址' }, component: address },
	   { path: '/editaddress', meta: { title: '编辑收货地址' }, component: editaddress },
	   { path: '/selectaddress', meta: { title: '选择收货地址' }, component: selectaddress },		 
	   { path: '/allorders', meta: { title: '全部已付款订单' }, component: allorders },
	   { path: '/submitorder', meta: { title: '提交订单' }, component: submitorder },
	   { path: '/pendingpayment', meta: { title: '待付款' }, component: pendingpayment },
	   { path: '/sendout', meta: { title: '待发货' }, component: sendout },
	   { path: '/receipt', meta: { title: '已发货' }, component: receipt },
	   { path: '/appraise', meta: { title: '待评价' }, component: appraise },
	   { path: '/viewappraise', meta: { title: '查看评价' }, component: viewappraise },
	   { path: '/aftersaleservice', meta: { title: '退换/售后' }, component: aftersaleservice },
	   { path: '/viewaftersaleservice', meta: { title: '查看退换/售后' }, component: viewaftersaleservice },
	   { path: '/orderdetail', meta: { title: '订单详情' }, component: orderdetail },
	   { path: '/wuliu', meta: { title: '物流信息' }, component: wuliu },
	   { path: '/needservice', meta: { title: '提交售后' }, component: needservice },
	   { path: '/submitappraise', meta: { title: '提交评价' }, component: submitappraise },
	   { path: '/confirmpayment', meta: { title: '支付',redirect:'/pendingpayment',to:'/submitorder' }, component: confirmpayment },
	   { path: '/paymentsuccess', meta: { title: '支付成功',redirect:'/sendout',to:'/confirmpayment'}, component: paymentsuccess },
	   { path: '/connectfailed', meta: { title: '网络异常' }, component: connectfailed },
	   { path: '/about', meta: { title: '关于' }, component: about },
	   { path: '/feedback', meta: { title: '意见反馈' }, component: feedback },
	   { path: '/help', meta: { title: '帮助' }, component: help },
	   { path: '/customservice', meta: { title: '客服中心' }, component: customservice },
	   { path: '/contactus', meta: { title: '联系我们' }, component: contactus },
	   { path: '/license', meta: { title: '软件许可及服务协议' }, component: license },
  ]
})
 