<template>
  <div class="tab-wrapper"> 
    <am-tabs
        v-model="selected"
		@tabchange="ontabchange"
        :tabs="['待付款', '待发货', '已发货','待评价','退换/售后']"
      />
  	 <scroller class="main-list" offset-accuracy="300px"> 
  	     <div v-if="showempty" class="empty"> 
  			 <text class="empty-icon iconfont">&#xe680;</text> 
  	         <text class="empty-text">还没有相关的订单!</text> 
  	     </div>  
  	 	 <div v-for="(i,index) in items" > 
           	<aftersaleserviceorders :info="i"></aftersaleserviceorders> 
  		 </div> 
  		 <text v-if="touchend" class="txt-empty">没有更多订单了</text>	 
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
  import {getorders} from './config'
  import aftersaleserviceorders from './aftersaleserviceorders';
  
  export default {
    components: { 
		'am-tabs':amtabs, 
		 aftersaleserviceorders, 
		},
    data () {
      return {
          selected: 4,
		  tabkey:4,
		  page:0,
		  items: [],
		  touchend : false,
		  showLoading: 'hide',  
		  showempty: false,
      }
    },
	mounted() {    
		this.items = []; 
		getorders('aftersaleservice',this.page).then(res => { 
		    console.log('____________getorders_____'+JSON.stringify(res)+'___________'); 
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
				    0:{router:'pendingpayment',name:'待付款'},
					1:{router:'sendout',name:'待发货'},
					2:{router:'receipt',name:'已发货'},
					3:{router:'appraise',name:'待评价'},
					4:{router:'aftersaleservice',name:'退换/售后'},
				}; 
				
				if (this.selected != this.tabkey)
				{ 
					var router = tabs[this.selected].router;
					var name = tabs[this.selected].name;  
		 		    this.$router.replace('/'+router); 
				}
	       },
           onloading() {
		       if (this.showempty) return;
			   if (this.touchend) return;			    
               this.$notice.loading.show()
               this.showLoading = 'show'; 
   			   this.page = this.page + 1;
   			   getorders('aftersaleservice',this.page).then(res => {  
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
</style> 

