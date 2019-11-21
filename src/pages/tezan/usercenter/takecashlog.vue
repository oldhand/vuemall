<template> 
    <div class="tab-wrapper"> 
   <am-tabs
       v-model="selected"
	   @tabchange="ontabchange"
       :tabs="['提现申请', '提现历史记录']"
     />
	 <scroller class="main-list" offset-accuracy="300px"> 
	     <div v-if="showempty" class="empty"> 
			 <text class="empty-icon iconfont">&#xe680;</text> 
	         <text class="empty-text">还没有相关的提现申请!</text> 
	     </div> 
	 	 <div class="gd-box" v-for="(i,index) in items" > 
			<div class="gd-info">  
			   <div class="horizontalrow" >
			  	 	<text class="gd-label">收款人: </text>
					<text class="gd-txt">{{i.realname}}</text>
			   </div> 
			   <div class="horizontalrow" >
			  	 	<text class="gd-label">银行: </text>
					<text class="gd-txt">{{i.bank}}</text>
			   </div> 
			   <div class="horizontalrow" >
			  	 	<text class="gd-label">银行卡号: </text>
					<text class="gd-txt price">{{i.account}}</text>
			   </div>
			   <div class="horizontalrow" >
			  	 	<text class="gd-label">提现金额: </text>
					<text class="gd-txt price">{{i.amount}}</text>
			   </div> 
			</div>
            <mycell :cellStyle="{height:'110px'}"> 
			        <text slot="label" class="gd-label">合计:</text> 
					<text slot="title" class="gd-txt price"></text>  
					<text slot="action" class="gd-txt appraise" @click="onappraiseclicked" >去评价</text> 
            </mycell>
		 </div>
		 <text v-if="touchend" class="txt-empty">没有更多提现申请了</text>	
         <loading class="loading" @loading="onloading" :display="showLoading"> 
		 		<text class="indicator">加载中...</text>
         </loading>  
		 <div class="touchspace"><text class="indicator">&nbsp;</text></div>
	</scroller>   
  </div>
</template>

<script>
  import Vue from 'vue'
  import amtabs from '../components/tabs.vue'; 
  import mycell from '../common/mycell.vue'; 
  import {gettakecashs} from './takecash'
 
 
  export default {
    components: { 
		'am-tabs':amtabs, 
		mycell 
	},
    data () {
      return {
          selected: 1,
		  tabkey:1,
		  page:0,
		  items: [],
		  touchend : false,
		  showLoading: 'hide',  
		  showempty: false,
      }
    },
	mounted() {    
		this.items = []; 
		gettakecashs(this.page).then(res => { 
		    console.log('____________gettakecashs_____'+JSON.stringify(res)+'___________'); 
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
	       ontabchange (index, value) {
			   	var tabs = {
				    0:{router:'takecash',name:'提现申请'},
					1:{router:'takecashlog',name:'提现历史记录'}, 
				};  
				if (this.selected != this.tabkey)
				{ 
					var router = tabs[this.selected].router;
					var name = tabs[this.selected].name;  
		 		    this.$router.replace('/'+router); 
				}
	       },
           onloading(e) { 
		       if (this.showempty) return;			    
               this.$notice.loading.show()
               this.showLoading = 'show'; 
   			   this.page = this.page + 1;
   			   gettakecashs(this.page).then(res => {  
			        console.log('____________gettakecashs_____'+JSON.stringify(res)+'___________'); 
	   				this.$notice.loading.hide();
	   				if (res.length == 5)
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
     }
  }
</script>
<style scoped> 
    .tab-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
		background-color: #fafafa;
    } 
	.main-list {  
	    position: fixed;
	    top: 90px; 
	    bottom: 0px;
	    left: 0;
	    right: 0; 
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
	.iconfont {
	    font-family: iconfont;
	}
	.indicator {
	    position: absolute;
	    left: 310px;
	    color: #888888;
	    font-size: 30px;
	    padding-top: 20px;
	    padding-bottom: 20px;
	} 
	.touchspace
	{
	    width: 750px; 
		height: 50px;
		background-color: #f4f4f4; 
	}
	.gd-box {
	    width: 750px;
		height: 250px;
	    padding-top: 15px; 
		padding-bottom: 15px;  
	    flex-direction: row;
	    flex-wrap: wrap;
		background-color: #ffffff;
	    justify-content: space-between; 
	    border-bottom-width: 5px;
	    border-bottom-color: #dddddd;
	}
	.horizontalrow
	{
		flex-direction: row;
	} 
	.gd-info { 
	    width: 750px;
	    align-items: flex-start;
		padding-left: 15px; 
	    justify-content: space-between;    
	} 
	.gd-label{
 	   font-size: 28px;
 	   color: #333333;
	   width: 150px;
	   text-align:right;
	}
	.gd-txt { 
	   font-size: 28px;
	   color: #333333;  
	   overflow: hidden;
	   text-align:left;
	   lines: 1; 
	   text-overflow: ellipsis;
	}
	.price {
	    color: #b4282d
	}
</style> 

