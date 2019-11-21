<template>
    <div class="wrapper">
        <div class="usercenter-header" v-if="logined">
            <image class="usercenter-header-bg" resize="cover" src="/images/header-bg.jpg"></image>
			<div class="i-photo" @click="onopenclick('user','个人中心')">
           	 	<image class="i-image" resize="cover" :src="profile_info.link"></image>
			</div> 
            <text class="i-givename">{{profile_info.givenname}}</text>
            <rank :value="profile_info.accumulatedrank" ></rank>
            <div class="b-tlt"> 
                <text class="i-tag tag-v8 iconfont" v-if="profile_info.ranklevel == '1'" >&#xe688;</text> 
                <!--<text class="txt-tag">Vip1</text>-->
            </div>
            <text class="b-qrcode iconfont" @click="onopenclick('myqrcode','二维码名片')">&#xe62c;</text> 
        </div>
        <div class="usercenter-header" v-else>
            <image class="usercenter-header-bg" resize="cover" src="/images/header-bg.jpg"></image>
			<div class="i-photo" v-if="loading">
           	 	<image class="i-image" resize="cover" src="/images/anonymous.jpg"></image>
			</div> 
			<am-button class="i-login" v-if="loading" :height=80 text="点击登录" type="ghost" @click.native="onloginclick"></am-button>
            <!--
			<div class="i-login" @click="onloginclick" >  
                 <text class="login-txt">点击登录</text>
            </div>-->
        </div>
        <div class="s-box cell-button">
            <div class="box-tlt border-bottom" >
                <text class="box-txt" @click="onopenclick('allorders','我的订单')">我的订单</text>
                <text class="i-box-in iconfont" @click="onopenclick('allorders','我的订单')">&#xe672;</text>
            </div>
            <div class="box-line">
                <div class="i-box-l" @click="onopenclick('pendingpayment','待付款')">
                    <text class="i-box-icon iconfont">&#xe625;</text>
                    <text class="i-box-tlt">待付款</text>
					<text class="i-notice" v-if="pendingpayment > 0">{{pendingpayment}}</text>
                </div>
                <div class="i-box-l" @click="onopenclick('sendout','待发货')">
                    <text class="i-box-icon iconfont">&#xe626;</text>
                    <text class="i-box-tlt">待发货</text>
					<text class="i-notice" v-if="sendout > 0">{{sendout}}</text>
                </div>
                <div class="i-box-l" @click="onopenclick('receipt','已发货')">
                    <text class="i-box-icon iconfont">&#xe634;</text>
                    <text class="i-box-tlt">已发货</text>
					<text class="i-notice" v-if="receipt > 0">{{receipt}}</text>
                </div>
                <div class="i-box-l" @click="onopenclick('appraise','待评价')">
                    <text class="i-box-icon iconfont">&#xe640;</text>
                    <text class="i-box-tlt">待评价</text>
					<text class="i-notice" v-if="appraise > 0">{{appraise}}</text>
                </div>
                <div class="i-box-l" @click="onopenclick('aftersaleservice','退换/售后')">
                    <text class="i-box-icon iconfont">&#xe62e;</text>
                    <text class="i-box-tlt">退换/售后</text>
					<text class="i-notice" v-if="aftersaleservice > 0">{{aftersaleservice}}</text>
                </div>
            </div>
        </div>
        <div class="s-box">
            <div class="box-tlt border-bottom">
                <text class="box-txt">我的服务</text>
            </div>
            <div class="box-line line-serve" :class="[index < (serviceLength - 1) ? 'border-bottom' : '']" v-for="(item,index) in serviceLength">
                <div class="i-box-l" @click="onserviceclick(services[index*4 + 0].router,services[index*4 + 0].name)" >
                    <text class="i-box-icon iconfont" :class="['i-c-'+services[index*4 + 0].color]">{{services[index*4 + 0].icon | myFilter}}</text>
                    <text class="i-box-tlt">{{services[index*4 + 0].name}}</text>
                </div>
                <div class="i-box-l" @click="onserviceclick(services[index*4 + 1].router,services[index*4 + 1].name)">
                    <text class="i-box-icon iconfont" :class="['i-c-'+services[index*4 + 1].color]">{{services[index*4 + 1].icon | myFilter}}</text>
                    <text class="i-box-tlt">{{services[index*4 + 1].name}}</text>
                </div>
                <div class="i-box-l" @click="onserviceclick(services[index*4 + 2].router,services[index*4 + 2].name)">
                    <text class="i-box-icon iconfont" :class="['i-c-'+services[index*4 + 2].color]">{{services[index*4 + 2].icon | myFilter}}</text>
                    <text class="i-box-tlt">{{services[index*4 + 2].name}}</text>
                </div>
                <div class="i-box-l" @click="onserviceclick(services[index*4 + 3].router,services[index*4 + 3].name)">
                    <text class="i-box-icon iconfont" :class="['i-c-'+services[index*4 + 3].color]">{{services[index*4 + 3].icon | myFilter}}</text>
                    <text class="i-box-tlt">{{services[index*4 + 3].name}}</text>
                </div>
            </div>
        </div>
	      
		
    </div>
</template>
<script>
import he from '../utils/he';
import { services,get_orders_count } from './config'
import {get_profileid,get_profile_info} from '../../../rest/profile'  
import rank from './rank.vue';
import button from '../components/button.vue' 
import Vue from 'vue'

Vue.filter('myFilter', function(value) {
    return he.decode(value);
})

export default {
	components: {
	    rank,
		'am-button':button, 
	},  
	mounted() {   
		this.getService();
		var that = this; 
		
		get_profileid().then(profileid => { 
			console.log('____get_profile_info___'+profileid+'________');  
			get_profile_info().then(res => {  
			    that.profile_info = res; 
				that.logined = true; 
				that.loading = true;   
				if (that.profile_info.mobile != '')
				{
					Vue.prototype.$storage.setSync('mobile',that.profile_info.mobile);
				} 
			}); 
			get_orders_count(profileid,'pendingpayment').then(res => { that.pendingpayment = res });
			get_orders_count(profileid,'sendout').then(res => { that.sendout = res });
			get_orders_count(profileid,'receipt').then(res => { that.receipt = res });
			get_orders_count(profileid,'appraise').then(res => { that.appraise = res });
			get_orders_count(profileid,'aftersaleservice').then(res => { that.aftersaleservice = res });
		},
		function(error) {	
			that.logined = false;	 
			that.loading = true;
		});
    },  
    data() {
        return {
            services: [],
            serviceLength: 0,
			logined:false, 
			loading:false,
			profile_info:{}, 
			pendingpayment:0,
			sendout:0,
			receipt:0,
			appraise:0,
			aftersaleservice:0,
        }
    },
    methods: {  
	    onopenclick(router,name) { 
		  var that = this;
		  if (this.logined)
		  {
		      this.$router.push('/'+router); 
		  } 
	    },
	    onserviceclick (router,name) { 
		  var that = this;
		  if (this.logined)
		  {
		      this.$router.push('/'+router); 
		  } 
	    },
        onloginclick () {
            this.$router.push('/login');
        },
        getService() {  
	         this.services = services
	         this.getLength()
        },
        getLength() {
            this.serviceLength = Math.ceil(this.services.length / 4)
        }
    }
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}

.wrapper {
    background-color: #fafafa;
}

.cell-button {
    margin-bottom: 18px;
}

.usercenter-header {
    height: 220px;
}

.usercenter-header-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 220px;
}

.i-photo {
    position: absolute;
    top: 40px;
    left: 30px;
    height: 130px;
    width: 130px; 
}
.i-image { 
    height: 130px;
    width: 130px; 
    border-radius: 70px;  
    border-width: 1px;
    border-style: solid;
    border-color: #dddddd;
}

.i-login{
	position: absolute;
	top: 55px;
	left: 190px; 
    align-items: center;  
    justify-content: center;    
	background-color:transparent;
}
.login-txt{ 
	font-size: 38px;
	color: #ffffff;
    font-weight: 600;
	background-color:transparent;
}
.i-givename {
    position: absolute;
    top: 40px;
    left: 190px;
    height: 50px;
    width: 300px;
    font-size: 38px;
    color: #ffffff; 
}

.b-tlt {
    position: absolute;
    top: 130px;
    left: 190px;
    height: 40px;
    width: 350px;
    
    flex-direction: row;
    flex-wrap: nowrap;
}

.i-tag {
    width: 30px;
    height: 30px;
    font-size: 24px;
    padding-top: 2px;
    margin-right: 6px;
    border-radius: 4px;
}

.tag-e {
    width: 32px;
    height: 32px;
}

.tag-v8 {
    color: #dfbd84; 
    text-align: center;
}

.txt-tag {
    color: #dfbd84;
    flex: 1;
    height: 40px;
    font-size: 28px;
    overflow: hidden;
    lines: 1;
    text-overflow: ellipsis;
}

.b-qrcode {
    position: absolute;
    top: 70px;
    right: 40px;
    height: 80px;
    width: 80px;
    border-radius: 70px;
    text-align: center;
	line-height: 80px;
    font-size: 40px; 
    color: #333333;
    background-color: #f4f4f4;
}

.s-box {
    padding-left: 26px;
    background-color: #ffffff;
}

.box-tlt {
    height: 94px;
	justify-content: center;
}

.box-txt {
    font-size: 26px;
    padding-top: 16px;
    color: #333333;
}

.i-box-in {
    position: absolute;
    top: 34px;
    right: 30px;
    color: #333333;
}

.box-line {
    height: 132px;
    
    padding-right: 30px;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
}

.i-box-l {
    width: 130px;
    height: 132px;
    align-items: center;
    justify-content: center; 
}

.i-box-icon {
    font-size: 50px;
    text-align: center; 
    height: 55px; 
    color: #666666;
}

.i-box-tlt {
    font-size: 26px;
    text-align: center;
    color: #666666;
	height: 55px; 
}
.i-notice{
        font-size: 20px;
        position: absolute;
        top:10px;
        right: 20px;
        height: 30px;
        width: 30px;
        border-radius: 100%; 
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        background-color: #ff0000;
}
.line-serve {
    padding-top: 20px;
    height: 150px;
}

.border-bottom {
    border-bottom-width: 1px;
    border-bottom-color: #dddddd;
}

.i-c-orange {
    color: #ff744d;
}

.i-c-yellow {
    color: #f6a121;
}

.i-c-blue {
    color: #689de5;
}
</style>