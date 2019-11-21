<template>
    <div class="wrapper"> 
        <home-header @searchreload="onsearchreload"></home-header>
		<myfilter class="myfilter" :show="showfilter" :items="filters" @onfilterclicked="onfilterclicked"></myfilter>
        <scroller class="main-list" offset-accuracy="300px">  
			<waiting :show="showwaiting" :msg="waittext" :width=60 :height=60></waiting>
            <div class="cell-button">
                <home-products :products="products"></home-products>
            </div>
			<text v-if="touchend" class="txt-empty">没有更多了</text>	
			<go-top @goTop="goTopHandler" :show="showGoTop"></go-top>
            <loading class="loading" @loading="onloading" :display="showLoading"> 
            </loading>
        </scroller>  
    </div>
</template>
<script>
import Vue from 'vue'
import header from './head'; 
import goTop from '../common/goTop.vue'; 
import waiting from '../common/waiting.vue';  
import myfilter from '../common/filter.vue';  
import Products from './Products';
import { search_products,get_keywords,load_products} from './search'
 
const SCROLL_FULL_WIDTH = 750
const dom = weex.requireModule('dom');

export default {
    components: {
        'home-header': header,  
        'home-products': Products,
		goTop,
		waiting, 
		myfilter
    }, 
    data() {
        return {
			showwaiting:true,
			waittext:'正在获取商品信息，请稍候!', 
			products: [],  
            showLoading: 'hide',
			touchend : false, 
			showGoTop: false,
			keyword:'',
			keywords:'',
			page:0,
			showfilter:true, 
			filters:[{key:'default',title:'默认',order:'',selected:true},
					 {key:'sequence',title:'推荐',order:'',selected:false},
					 {key:'shop_price',title:'价格',order:'asc',selected:false},
					 {key:'salevolume',title:'销量',order:'asc',selected:false},],
			filter:{key:'default',order:'desc'}, 
        }
    },
	mounted(){   
	    console.log('____________mounted_________'); 
 	    if (this.$route.query)
 		{
 		   var params = this.$route.query;
 		   this.keyword = params.keyword;
		}
		this.search();
    },
    methods: { 
		search(){
	 		var that = this;   
			that.products = [];
	 		Vue.prototype.$storage.get('filter').then(filter => { 
	 			    this.filter = filter;
	 	 			for (var i in this.filters)
	 	 			{
	 	 				if (this.filters[i].key == this.filter.key)
	 	 				{ 
	 						this.filters[i].selected =  true;
	 						this.filters[i].order =  this.filter.order;  
	 	 				}
	 	 				else
	 	 				{
	 	 					this.filters[i].selected = false; 
	 	 				}
	 	 			}
	 		});
	 	    if (that.keyword != "")
	 		{ 
	 		   get_keywords(that.keyword).then(res => {  
	 				    console.log('____________get_keywords_________' + JSON.stringify(res)); 
	 					that.keywords = res.split(",");
	 					search_products(that.keywords,that.page,that.filter).then(res => {  
	 					 	console.log('____________search_products_________' + JSON.stringify(res));  
	 						if (res.length == 0)
	 						{
	 							that.showwaiting = false;
	 							that.products = [];
	 							that.touchend = true;
	 						}
	 						else
	 						{
	 							var productids = [];
	 							for (var i in res)
	 							{
	 								var product_info = res[i]; 
	 								productids.push(product_info.my.productid);
	 							}
	 							load_products(productids).then(res => {  
	 								that.showwaiting = false;
	 								that.products = res;
	 								console.log('____________load_products_________' + JSON.stringify(res)); 
	 								that.touchend = true;
	 							}); 
	 						}
						
	 					});
	 		   });
	 		   that.touchend = false;
	 		}
		},
		onsearchreload(keyword){
		 	this.keyword = keyword;
			console.log('___________onsearchreload_________');
			this.search();
		},
        onloading() {
		    var that = this;   
            this.$notice.loading.show()
            this.showLoading = 'show'; 
			this.page = this.page + 1;
			search_products(that.keywords,that.page,that.filter).then(res => {  
				this.$notice.loading.hide();
				if (res.length == 12)
				{
					var productids = [];
					for (var i in res)
					{
						var product_info = res[i]; 
						productids.push(product_info.my.productid);
					}
					load_products(productids).then(res => {   
						that.products.push(...res); 
					});
					that.products.push(...res);
				}
				else if (res.length > 0)
				{
					var productids = [];
					for (var i in res)
					{
						var product_info = res[i]; 
						productids.push(product_info.my.productid);
					}
					load_products(productids).then(res => {   
						that.products.push(...res); 
					});
					that.touchend = true;
				}
				else
				{ 
				    that.page = this.page - 1;
					that.touchend = true;
				}			
				that.showLoading = 'hide';
			});
        },   
		onfilterclicked()
		{
			var that = this;
			console.log('______________' + JSON.stringify(this.filters));
 			for (var i in this.filters)
 			{
 				if (this.filters[i].selected )
 				{ 
					this.filter.key =  this.filters[i].key; 
					this.filter.order =  this.filters[i].order; 
 				} 
 			}
			console.log('______________' + JSON.stringify(this.filter));
			Vue.prototype.$storage.setSync('filter',this.filter);
			that.page = 0;
			that.touchend = false;
			search_products(that.keywords,that.page,that.filter).then(res => {  
			 	console.log('____________search_products_________' + JSON.stringify(res));  
				if (res.length == 0)
				{
					that.products = [];
					that.touchend = true;
				}
				else
				{
					var productids = [];
					for (var i in res)
					{
						var product_info = res[i]; 
						productids.push(product_info.my.productid);
					}
					load_products(productids).then(res => {   
						that.products = res;
						console.log('____________load_products_________' + JSON.stringify(res)); 
						that.touchend = true;
					}); 
				}
				
			});
			
		},
        scroll (e) { 
            const referenceValue = 1200
            const offsetY = Math.abs(Number(e.contentOffset.y))
            if (!this.showGoTop && offsetY > referenceValue) {
                this.showGoTop = true
            }
            if (this.showGoTop && offsetY < referenceValue) {
                this.showGoTop = false
            } 
        }, 
        goTopHandler () { 
            dom.scrollToElement(this.$refs.banner, { offset: 0 });
			this.showGoTop = false;
        }, 
    }
}

</script>
<style scoped> 
.wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
	background-color: #fafafa;
}
 
.iconfont {
    font-family: iconfont;
} 

.main-list {
    position: fixed;
    top: 165px; 
    bottom: 0px;
    left: 0;
    right: 0; 
	background-color: #ffffff;
} 
.myfilter
{
	margin-top: 93px;
}
.txt-empty { 
    text-align: center;
    font-size: 30px;
    width: 750px; 
	height: 50px;
    color: #999999;
	line-height: 80px;  
    height:80px;
    border-top-color: #cccccc;
    border-top-width: 1px;
}  
</style>
