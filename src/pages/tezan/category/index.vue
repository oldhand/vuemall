<template>
    <div class="wrapper"> 
        <class-header></class-header>
        <div class="class-list">
            <scroller show-scrollbar="false">
                <div class="j-uline" ref="jcLine"></div>
                <text class="class-txt" v-for="(i,index) in categorys" :class="[actIndex === index ? 'c-act' : '']" @click="choosecategory(index,i.categoryid)" :ref="'class_' + index">{{i.categoryname}}</text>
            </scroller>
        </div>
        <scroller class="main-category-list" append="tree" paging-enabled="true" @scroll="onscroll" show-scrollbar="false" ref="scroll" id="scroll"> 
			<category-products :products="products"></category-products>
			<text v-if="touchend" class="txt-empty">没有更多了</text>	
            <loading class="loading" @loading="onloading" :display="showLoading"> 
            </loading>
        </scroller>
    </div>
</template>
<script> 
import header from './header';
import Products from './Products';
import {getcategorys,getpagecategoryproducts } from './config'
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation')

export default {
    components: { 
         'class-header': header,
		 'category-products': Products
    },
    created() {
        this.init()
    },
    mounted() {
		var that = this;
	    getcategorys().then(res => { 
		  that.categorys = res;
		  if (res.length > 0 )
		  {
		  		var category_info = res[0];
				that.categoryid = category_info.categoryid;
				that.products = [];  
				that.activeIndex = 0;
				that.touchend = false; 
				getpagecategoryproducts(that.categoryid,0).then(res => {   
	 				if (res.length == 12)
	 				{
	 					this.products = res;
	 				}
	 				else if (res.length > 0)
	 				{
	 					this.products = res;
	 					this.touchend = true;
	 				}
	 				else
	 				{  
	 					this.touchend = true;
	 				}
				});
		  }
		  
		});
        this.$nextTick(() => {
            dom.getComponentRect(this.$refs.scroll, (data) => {
                this.scrollHeight = data.size.height
            })
        })
    },
    data() {
        return {
		    categorys:[],
			categoryid:'',
			products: [],    
            showLoading: 'hide',
			touchend : false,
            activeIndex: 0,
            actIndex: 0,
            scrollHeight: 0
        }
    },
    methods: { 
        init() { 
			this.activeIndex = 0; 
			this.touchend = false; 
        },
        onloading() {  
			this.activeIndex = this.activeIndex + 1;
            this.$notice.loading.show()
            this.showLoading = 'show';
			getpagecategoryproducts(this.categoryid,this.activeIndex).then(res => { 
				this.$notice.loading.hide(); 
				this.showLoading = 'hide';  
				if (res.length == 12)
				{
					this.products.push(...res);
				}
				else if (res.length > 0)
				{
					this.products.push(...res);
					this.touchend = true;
				}
				else
				{  
					this.activeIndex = this.activeIndex - 1;
					this.touchend = true;
				}				 
			});
        },
        
        onscroll(e) {
            let formatOffset = Math.abs(e.contentOffset.y)
            // console.log(formatOffset);
            // console.log(this.scrollHeight);
            // if (formatOffset % this.scrollHeight === 0) {
            //     debugger
            //     this.activeIndex = formatOffset / this.scrollHeight
            // }
            // this.actIndex = parseInt(formatOffset / this.scrollHeight)

        },
        choosecategory(index,categoryid) {
		    console.log('_______________'+index+'_______'+categoryid+'______________');  
            this.actIndex = index
            animation.transition(this.$refs.jcLine, {
                styles: {
                    transform: 'translateY(' + (92 * index) + 'px)',
                },
                duration: 200,
                timingFunction: 'ease',
                delay: 0
            }, function() { });
			
			this.products = [];
            this.$notice.loading.show()
            this.showLoading = 'show'; 
			this.activeIndex = 0;
			this.touchend = false;
			this.categoryid = categoryid;
			getpagecategoryproducts(categoryid,0).then(res => {  
				this.$notice.loading.hide();
				this.products.push(...res);
				this.showLoading = 'hide';
			});
			
        },
        appear(index) {
            //console.log(index);
            this.chooseClass(index)            
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

.class-list {
    width: 162px;
    margin-top: 84px;
    margin-bottom: 90px; 
    border-right-width: 1px;
    border-right-color: #d9d9d9;
    background-color: #ffffff;
}

.class-txt {
    font-size: 28px;
    height: 92px;
    padding-top: 42px;
    padding-bottom: 22px; 
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    color: #333333;
}

.main-category-list { 
    flex: 1;
	width: 588px; 
	position: fixed;
	left:162px;
	right:0; 
    top: 84px;
    bottom: 90px;
    background-color: #ffffff;
}

.ad-img {
    width: 532px;
    height: 194px;
    border-radius: 6px;
    margin: 28px;
}

.sub-tlt {
    text-align: center;
    font-size: 24px;
    color: #333333;
    margin-top: 10px;
    margin-bottom: 30px;
}

.sub-box {
    padding-left: 26px;
    
    flex-direction: row;
    flex-wrap: wrap;
}

.sub-i {
    width: 178px;
    height: 200px;
}

.i-img {
    width: 150px;
    margin-left: 14px;
    margin-right: 14px;
    height: 150px;
}

.i-name {
    font-size: 22px;
    text-align: center;
}

.j-uline {
    position: absolute;
    top: 39px;
    left: 1px;
    width: 5px;
    height: 36px;
    background-color: #b4282d;
}

.c-act {
    color: #b4282d;
}

.txt-empty { 
	background-color: #f4f4f4;
    text-align: center;
    font-size: 30px; 
    width: 590px;  
    color: #999999;
	line-height: 80px;  
    height:80px;
    border-top-color: #cccccc;
    border-top-width: 1px;
}
</style>