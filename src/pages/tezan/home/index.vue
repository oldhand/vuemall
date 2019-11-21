<template>
    <div class="wrapper"> 
        <home-header></home-header>		
        <scroller class="main-list" loadmoreoffset=100 offset-accuracy=300 @scroll="scroll" show-scrollbar=false>
             <div ref="banner">
                <home-slider :imageList="Banners"></home-slider> 
            </div> 
            
            <home-products :products="Products" :indexcolumns="indexcolumns" :productlength="productlength" :columnlength="columnlength" :productcount="productcount" ></home-products>
           
			<text v-if="touchend" class="txt-empty">没有更多了</text>	
			
            <loading class="loading" @loading="onloading" :display="showLoading">
                <text class="indicator">加载中...</text>
            </loading>
			<div class="touchspace"><text class="indicator">&nbsp;</text></div>
        </scroller>  
		<go-top @goTop="goTopHandler" :show="showGoTop"></go-top>
    </div>
</template>
<script>
import header from './header';
import refresher from '../common/refresh'; 
import goTop from '../common/goTop.vue';
import Slider from './Slider';
import Products from './Products';
import {getbanners,getproducts,getpageproducts,getindexcolumns} from './config'
 
const SCROLL_FULL_WIDTH = 750
const dom = weex.requireModule('dom');

export default {
    components: {
        'home-header': header,
        'home-refresher': refresher, 
        'home-slider': Slider, 
        'home-products': Products,
		goTop,
    },
 	mounted(){
        this.init();   
    }, 
    data() {
        return {
            Banners: [], 
			Products: [],  
            showLoading: 'hide',
			touchend : false,
            activeIndex: 0,
			showGoTop: false,
			indexcolumns:2,
			productcount:0,
			productlength:0,
			columnlength:0,
			pagesize:12,
        }
    },
	
    methods: {  
        onloading() {
		    console.log('____________onloading________________');   
			if (this.touchend) return;
            this.$notice.loading.show()
            this.showLoading = 'show'; 
			this.activeIndex = this.activeIndex + 1;
			var that = this;
			getpageproducts(this.activeIndex,this.pagesize).then(res => {  
				that.$notice.loading.hide(); 
				if (res.length == this.pagesize)
				{
					that.Products.push(...res);
					that.calculate();
				}
				else if (res.length > 0)
				{
					that.Products.push(...res);
					that.calculate();
					that.touchend = true;
				}
				else
				{ 
				    that.activeIndex = this.activeIndex - 1;
					that.touchend = true;
				}			
				that.showLoading = 'hide';
			});
        },
        loadingDown() {
            this.Products = [];		
			this.activeIndex = 0;	
			this.touchend = false;
			getpageproducts(this.activeIndex).then(res => { 
				this.Products = res;
			}); 
        },
		calculate() {
		    this.productcount = this.Products.length;
		    if (this.indexcolumns == 6)
			{
				this.productlength = Math.ceil(this.Products.length / 5);
				this.columnlength = 5;
			}
			else
			{
				this.productlength = Math.ceil(this.Products.length / this.indexcolumns);
				this.columnlength = this.indexcolumns;
			}
			console.log('______******__columnlength___'+this.columnlength+'____');  
			console.log('______******__productlength___'+this.productlength+'____');  
			console.log('______******__pagesize___'+this.pagesize+'____');  
		},
        init() {
			var that = this;
            getbanners().then(res => {  
			  this.Banners = res;
			}, 
			function(error) {
	           that.$router.push('/connectfailed');
			 });
			 
			 
			 /* '单排' => '1','双排' =>'2','混排(1212)' =>'3','混排(112112) =>'4','混排(221221)' => '5','混排(11121112)' => '6','混排(22212221)'  => '7',*/
			if (Object.keys(this.$store.state.supplier_info).length == 0)
			{ 
				getindexcolumns().then(indexcolumns => {  
					this.indexcolumns = Number(indexcolumns);
					if (this.indexcolumns == 5 || this.indexcolumns == 6)  
					{
					    this.pagesize = 10;
					}
					else if (this.indexcolumns == 7)  
					{
					    this.pagesize = 14;
					}
					else
					{
						this.pagesize = 12;
					} 
	  				getproducts(this.pagesize).then(res => {   
					   if (res.length < 7 && this.indexcolumns > 2)
					   { 
					  	 // this.indexcolumns = 2;
					   }  
	  				   this.Products = res;					  
					   this.calculate();
	  				},
	  				function(error) {
	  		           that.$router.push('/connectfailed');
	  				});
				},
				function(error) {
		           that.$router.push('/connectfailed');
				});
			}
			else
			{ 
				this.indexcolumns = Number(this.$store.state.supplier_info.indexcolumns);
				if (this.indexcolumns == 5 || this.indexcolumns == 6)  
				{
				    this.pagesize = 10;
				}
				else if (this.indexcolumns == 7)  
				{
				    this.pagesize = 14;
				}
				else
				{
					this.pagesize = 12;
				}
				console.log('______******__indexcolumns___'+this.indexcolumns+'____'); 
				getproducts(this.pagesize).then(res => {  
				   if (res.length < 7 && this.indexcolumns > 2)
				   {
				  	  //this.indexcolumns = 2;
				   }
				  this.Products = res;
				  this.calculate();
				},
				function(error) {
		           that.$router.push('/connectfailed');
				});
			}  
			this.activeIndex = 0; 
			this.touchend = false;
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
    top: 84px; 
    bottom: 90px;
    left: 0;
    right: 0; 
	width:750px;
}
 

.indicator {
    position: absolute;
    left: 310px;
    color: #888888;
    font-size: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
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
.touchspace
{
    width: 750px; 
	height: 50px;
	background-color: #f4f4f4; 
}
</style>
