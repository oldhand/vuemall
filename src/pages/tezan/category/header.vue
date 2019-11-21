<template>
    <div class="wrapper"> 
		<div class="search" >
	    	<wxc-searchbar :placeholder="placeholder" :value="keyword" :width=730 :items="items" :historys="historys" @wxcsearchbarinputonblur="wxcSearchbarInputOnBlur"></wxc-searchbar>  
		</div> 
    </div>
</template>
<script>
import {get_products_count} from '../../../rest/api'
import {get_profileid} from '../../../rest/profile'
import statusbar from '../common/statusbar'; 
import WxcSearchbar from '../home/searchbar';   
import { get_searchs,get_historys,search} from '../home/search'

export default {
    components: { 'wxc-searchbar': WxcSearchbar,statusbar },
    data() {
        return {  
			placeholder : '', 
			keyword : '',
			logined:false, 
			historys : [],
			items : [],
        }
    }, 
	mounted(){   
		var that = this;
    	get_products_count().then(res => {  
		  that.placeholder = "共"+res+"款商品可供您搜索!";
		}); 
		get_profileid().then(profileid => {   
			that.logined = true;  
			get_historys().then(res => {   
			    that.historys = res;  
			});
		},
		function(error) {	
			that.logined = false;	 
		}); 
		get_searchs().then(res => {   
		 	that.items = res;  
		});  
		 
    },
    methods: { 
    	wxcSearchbarInputOnBlur (e) { 
		   console.log('______wxcSearchbarInputOnBlur_______'+e.value+'_____________');  
		   search(e.value);
		   this.$router.push({path:'/search',query:{from:'category',keyword:e.value}});
         },
		 onbackclicked()
		 {
	   	   	this.$router.push('/index');  
		 }
    }
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
} 
.wrapper {
    position: fixed;
    top: 0;
    /*margin-top: 40;*/
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
.search {
    flex: 1;
    height: 83px; 
    font-size: 26px;
	margin-top: -1px; 
} 
 
</style>