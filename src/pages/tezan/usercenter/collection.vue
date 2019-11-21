<template>
      <div class="collection-wrapper"> 
		 <scroller class="collection-main-list" offset-accuracy="300px">   
		     <div v-if="showempty" class="empty"> 
				 <text class="empty-icon iconfont">&#xe615;</text> 
		         <text class="empty-text">您还没有添加收藏商品!</text> 
		     </div>
             <div v-for="(i,index) in items" :key="index" class="collection-info" v-if="i.show"> 
  	            <mycell :cellStyle="{height:'200px'}" @click.native="oncollectionclick(i.productid)">  
						<image slot="label" class="image" resize="cover" :src="i.productthumbnail"></image> 
						<text slot="title" class="title">{{i.productname}}</text>  
						<div slot="title" class="cell-action">  
							<text class="title">销售价</text> 
 				 			<text class="title price"> ¥ {{i.shop_price | number_format}}</text> 
						</div>  
						<text slot="title" class="title through">市场价: ¥ {{i.shop_price | number_format}}</text> 
  				 		<text slot="action" class="iconfont">&#xe672;</text>  
  	            </mycell> 
                <mycell :cellStyle="{height:'90px'}">  
    					<text slot="title" class="cell-text">收藏日期: {{i.published | simpledatetime }} </text> 
   					    <text slot="action" class="cell-text iconfont" @click="ondeletclicked(i.id)">&#xe616; 删除</text> 
                </mycell>
             </div>   
			 <text v-if="touchend" class="txt-empty">没有更多收藏商品了</text>	
	         <loading class="loading" @loading="onloading" :display="showLoading">  
	         </loading>
		</scroller> 
    </div>
</template> 

<script>
    import Vue from 'vue'
	import mycell from '../common/mycell.vue'; 
	import { get_collections,delete_collection } from './collection.js'  
	
	import {number_format,date_format,todatetime} from '../../../rest/common'  
	
    Vue.filter('simpledatetime', function(value) {
       return date_format(todatetime(value), "YYYY-MM-DD HH:mm");
    })
    Vue.filter('number_format', function(value) {
        return number_format(value, 2, ".", ",");
    })
	
    export default {
	    components: {
	         mycell,   
	    },  
	    data() {
	        return {
	              items: [],  
				  page:0,
		  		  touchend : false,
		  		  showLoading: 'hide',  
		  		  showempty: false,
	        }
	    },
		mounted() {    
			get_collections(this.page).then(res => {   
				console.log('____________get_collections_____' + JSON.stringify(res));   
				if (res.length > 0)
				{
					this.items = res; 
					this.showempty = false;
				}
				else
				{
					this.items = []; 
					this.showempty = true;
				}
			}); 
	    },
        methods: {
	   	    oncollectionclick(productid) {  
				this.$router.push({path:'/detail',query:{from:'shoppingcart',productid: productid}});
	   	    },
            onloading() {
 		           if (this.showempty) return;	
				   return;		    
                   this.$notice.loading.show()
                   this.showLoading = 'show'; 
    			   this.page = this.page + 1;
    			   get_collections('sendout',this.page).then(res => {  
	 	   				this.$notice.loading.hide();
	 	   				if (res.length == 8)
	 	   				{
	 	   					this.items.push(...res);
	 	   				}
	 	   				else if (res.length > 0)
	 	   				{
	 	   					this.items.push(...res);
	 	   					this.touchend = true;
	 	   				}
	 	   				else
	 	   				{ 
	 	   				    this.page = this.page - 1;
	 	   					this.touchend = true;
	 	   				}			
	 	   				this.showLoading = 'hide';
    			  });
            },
			ondeletclicked(collectionid)
			{
				var that = this;
		        this.$notice.confirm({
		            title: '警告',
		            message: '确定需要删除当前收藏吗?', 
		            okCallback () { 
	                    delete_collection(collectionid).then(res =>{
							for (var i in that.items)
							{ 
									if (that.items[i].id == collectionid)
									{
										that.items[i].show = false;
									} 
							} 
	 				   });
		            }
		        })
			}
        }
    }
</script>
<style scoped>
    .collection-wrapper {
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
    .collection-info{
        margin-top: 2px;
		width:750px;  
		padding-top:20px;
    } 
    .collection-icon { 
	    font-size: 60px;  
		width:80px;
    }
	.collection-main-list { 
	    margin-bottom: 0px;
	    position: fixed;
	    top: 0px; 
	    bottom: 0px;
	    left: 0;
	    right: 0;
	}  
	.image
	{
		width:150px;
		height:150px;
		margin-right: 20px;
	}
	.title {
	    height: 45px;
	}
	.cell-action
	{
		flex-direction: row;
	    align-items: center;
	    justify-content: flex-start;
	}
	.price {
	    color: #b4282d
	}
	.through {
	    text-decoration:line-through;
	}
	.txt-empty { 
	    text-align: center;
	    font-size: 30px;
	    width: 750px; 
		height: 50px;
	    color: #999999;
		line-height: 80px;  
	    height:80px;
	}

	.empty {
	    height: 350px;
		margin-top: 150px;
	}

	.empty-icon {
	    position: absolute;
	    width: 750px;
	    height: 230px;
	    top: 0px;
	    left: 0px;
		text-align: center;
		color: #cccccc;
		font-size: 200px;
	}

	.empty-text {
	    position: absolute;
	    text-align: center;
	    font-size: 30px;
	    width: 750px;
	    top: 250px;
	    color: #999999;
	}
</style>