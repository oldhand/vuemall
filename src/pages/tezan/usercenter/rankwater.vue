<template> 
    <div class="wrapper">  
    <waiting :show="showwaiting" :msg="waittext" width="60" height="60"></waiting>
    <am-tabs 
        v-model="selected"
		@tabchange="ontabchange"
        :tabs="['收益统计', '账单流水', '积分流水']"
      />
	 <scroller ref="scroller" class="main-list" offset-accuracy="300px" @scroll="scroll" >  
	      <div v-if="showempty" class="empty"> 
			 <text class="empty-icon iconfont">&#xe680;</text> 
	         <text class="empty-text">还没有相关的记录!</text> 
	      </div>
		  <div ref="top">
    	  	<bill :items="items"></bill> 
		  </div>
 		  <text v-if="touchend" class="txt-empty">没有更多记录了</text>	
		  <go-top @goTop="goTopHandler" :show="showGoTop"></go-top>
          <loading class="loading" @loading="onloading" :display="showLoading"> 
          </loading>
	</scroller>   
  </div>
</template>

<script>
  import Vue from 'vue'
  import amtabs from '../components/tabs.vue'; 
  import waiting from '../common/waiting.vue'; 
  import goTop from '../common/goTop.vue';
  import bill from './bill.vue';    
  import {types,get_rankwaters} from './rankwater'   
  import {number_format,date_format,todatetime} from '../../../rest/common' 
  
  const dom = weex.requireModule('dom');

  Vue.filter('number_format', function(value) {
      return number_format(value, 2, ".", ",");
  })
 
  export default {
    components: { 
		'am-tabs':amtabs,  
		waiting, 
		bill,    
		goTop,
	},
    data () {
      return {
          selected: 2,
		  tabkey:2,
		  showwaiting:true,
		  waittext:'正在获取积分数据，请稍候!',
		  page:0, 
		  items:[], 
		  touchend : false,
		  showLoading: 'hide',  
		  showempty: false,
		  showGoTop: false,
      }
    },
	mounted() { 
	         var that = this;   
			 get_rankwaters(this.page).then( res => {  
			 	console.log('___________get_rankwaters_________' + JSON.stringify(res));  
				that.waittext = '';
				that.showwaiting = false;  
				this.items = [];
				if (res.length > 0)
				{ 
					 this.showempty = false;
					 that.makebill(res);
				}
				else
				{ 
					this.showempty = true;
					return;
				}  
			},
			function(error) {			
				that.waittext = '';
				that.showwaiting = false;
			});   
	},
    methods: {
	       makebill(res)
		   {
				var index = 0;
				for (var i in res)
				{
					var rankwater_info = res[i];  
				    var rankwatertype = rankwater_info.rankwatertype;  
				    var amount = rankwater_info.amount;
				    var rank =  rankwater_info.rank;  
					var published = rankwater_info.published;
					var date = date_format(todatetime(published),'YYYY-MM-DD'); 
					for (var j in types)
					{
							if (rankwatertype == types[j]['key'])
							{
									var type = types[j]['type'];
									var label = types[j]['label'];
								    console.log('____'+date+'_______'+type+'________' + label);  
									var hasdate = false;
									for (var k in this.items)
									{
										if (this.items[k].date == date)
										{
												if (type == '+')
												{
													this.items[k].list.push({type:type,desc:rank,title:label,amount:Math.abs(amount)});
							
												}
												else
												{
													this.items[k].list.push({type:type,desc:rank,title:label,amount:Math.abs(amount)});
												} 
												hasdate = true;
										}
									}
									if (!hasdate)
									{
										if (type == '+')
										{
											this.items.push({date:date,list:[{type:type,desc:rank,title:label,amount:Math.abs(amount)}]}); 
										}
										else
										{
											this.items.push({date:date,list:[{type:type,desc:rank,title:label,amount:Math.abs(amount)}]});  
										} 
									} 
									break;
							}						
					} 
				} 
				console.log('___________items_________' + JSON.stringify(this.items));
		   },
	       ontabchange (index, value) {
			   	var tabs = {
				    0:{router:'accountbook',name:'收益统计'},
					1:{router:'billwater',name:'账单流水'},
					2:{router:'rankwater',name:'积分流水'}, 
				}; 
				
				if (this.selected != this.tabkey)
				{ 
					var router = tabs[this.selected].router;
					var name = tabs[this.selected].name;  
		 		    this.$router.replace('/'+router); 
				}
	       },
          onloading() {
		           var that = this;
		       	   if (this.showempty) return;			    
	               this.$notice.loading.show()
	               this.showLoading = 'show'; 
	  			   this.page = this.page + 1;
	  			   get_rankwaters(this.page).then( res => {  
				        console.log('___________get_rankwaters___'+that.page+'______' + JSON.stringify(res));  
		   				that.$notice.loading.hide();
		   				if (res.length == 12)
		   				{
		   					 that.makebill(res);
		   				}
		   				else if (res.length > 0)
		   				{
		   					that.makebill(res);
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
              dom.scrollToElement(this.$refs.top, { offset: 0 });
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
	.main-list { 
	    position: fixed;
	    top: 90px; 
	    bottom: 0px;
	    left: 0;
	    right: 0;
	}   
	.iconfont {
	    font-family: iconfont;
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

