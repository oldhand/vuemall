<template>
    <div class="header-wrapper"> 
       <div class="scan" @click="onscanqrcodeclicked">
            <text class="ic iconfont">&#xe623;</text>
            <text class="txt">扫一扫</text>
        </div>
		<div class="search" >
	    	<wxc-searchbar :placeholder="placeholder" :items="items" :historys="historys" :width=538 @wxcsearchbarinputonblur="wxcSearchbarInputOnBlur"></wxc-searchbar>  
		</div>
       <div class="notice" @click="onmessageclicked">
            <text class="ic iconfont">&#xe673;</text>
			<text class="notice-dot" v-if="messagecount"></text>
            <text class="txt">消息</text>
        </div>
    </div>
</template>
<script>
import {get_products_count} from '../../../rest/api'
import statusbar from '../common/statusbar'; 
import WxcSearchbar from './searchbar'; 
import { get_message_count} from './message'
import { get_profileid} from '../../../rest/profile'  
import { get_searchs,get_historys,search} from './search'
import weixin from '../../../rest/weixin'

export default {
    components: { 'wxc-searchbar': WxcSearchbar,statusbar },
    data() {
        return {  
			placeholder : '',
			messagecount: false,
			logined:false, 
			historys : [],
			items : [],
        }
    },
	mounted(){   
	    var that = this;
    	get_products_count().then(res => {  
		  this.placeholder = "共"+res+"款商品可供您搜索!";
		}); 
		get_profileid().then(profileid => {   
			this.logined = true;  
			get_historys().then(res => {   
			    this.historys = res;  
			}, 
			function(error) {
	           that.$router.push('/connectfailed');
			 });
		},
		function(error) {	
			that.logined = false;	 
		}); 
		get_searchs().then(res => {   
		 	this.items = res;  
		}, 
		function(error) {
           that.$router.push('/connectfailed');
		 });
    	get_message_count().then(res => {  
			 if (res > 0)
			 {
			 	this.messagecount = true;
			 }
			 else
			 {
			 	this.messagecount = false;
			 } 
		});
		
    },
    methods: { 
    	wxcSearchbarInputOnBlur (e) { 
		   console.log('______wxcSearchbarInputOnBlur_______'+e.value+'_____________');
		   var that = this;  
		   search(e.value).then(res => { 
		  	 	that.$router.push({path:'/search',query:{from:'home',keyword:e.value}});
		   });
         },
		 onscanqrcodeclicked()
		 {
		    weixin.scan();  
		 },
		 onmessageclicked()
		 {
		   if (this.logined)
		   {
		   		this.$router.push('/message');  
		   } 
		 }
    }
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}

 
.header-wrapper {
    position: fixed;
    top: 0; 
    left: 0;
    right: 0;
    height: 84px;
	margin-top: 0px;
    padding-top: 0px;
    
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    z-index: 101;
    background-color: #fafafa;
    opacity: .99;
    border-bottom-width: 1px;
    border-bottom-color: #d9d9d9;
}

.scan,
.notice {
    height: 84px;
	padding-top: 15px;
    width: 96px
}

.ic,
.txt,
.search {
    text-align: center;
    color: #666666; 
    font-weight: 300;
}

.ic {
    font-size: 32px;
}

.txt {
    font-size: 18px;
}

.search {
    flex: 1;
    height: 83px; 
    font-size: 26px;
	margin-top: -1px; 
}

.notice-dot{
        position: absolute;
        top:10px;
        right: 25px;
        height: 15px;
        width: 15px;
        border-radius: 100%;
        background-color: #ff0000;
}
</style>