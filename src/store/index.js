import Vue from 'vue'
import Vuex from 'vuex' 

Vue.use(Vuex)

const state = {
	supplierid : '', //若米家 
	appid : '', //微信公众号ID 
	appconfig : {}, //微信公众号配置
	openid : '', //微信用户ID 
	profileid : '', //用户ID 
	mqid : '', //认证消息队列ID 
	share : '', //分享人用户ID 
	loginstatus: 0,
	uri: '', 
	errormsg:'',
	jsapi_ticket:{},
	mallname:'',
	supplier_info:{},
	profile_info:{},
	share_config:{},
	products_count:-1,
}
 
export const mutations =  { 
	supplierid(state,value) {
		state.supplierid = value; 
	},
	appid(state,value) {
		state.appid = value; 
	},
	openid(state,value) {
		state.openid = value; 
	},
	profileid(state,value) {
		state.profileid = value; 
	},
	mqid(state,value) {
		state.mqid = value; 
	},
	share(state,value) {
		state.share = value; 
	},
	appconfig(state,value) {
		state.appconfig = value; 
	}, 
	loginstatus(state,value) {
		state.loginstatus = value; 
	},
	uri(state,value) {
		state.uri = value; 
	}, 
	errormsg(state,value) {
		state.errormsg = value; 
	},
	jsapi_ticket(state,value) {
		state.jsapi_ticket = value; 
	},
	mallname(state,value) {
		state.mallname = value; 
	},
	share_config(state,value) {
		state.share_config = value; 
	},
	supplier_info(state,value) {
		state.supplier_info = value; 
	},
	profile_info(state,value) {
		state.profile_info = value; 
	},
	products_count(state,value) {
		state.products_count = value; 
	},
	
}	

export default new Vuex.Store({
	state, 
	mutations,
})

/*
import store from '../../../store/index'
console.log('________store______5555________'+store.state.supplierid); 
this.$store.commit('supplierid','123123123');
console.log('________store_______222_________'+this.$store.state.supplierid);
*/