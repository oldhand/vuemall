<template> 
    <div class="wrapper">  
     <waiting :show="showwaiting" :msg="waittext" width="60" height="60"></waiting> 
     <am-tabs
         v-model="selected"
 		@tabchange="ontabchange"
         :tabs="['提成收益', '推广收益', '分享收益']"
       />
	 <dbgrid 
	 		:rows="items" 
			:columns="columns" 
			:touchend="touchend" 
			:showLoading="showLoading" 
			:top="top"
			linkfield="orderid" 
			@onloading="onloading"
			@onclicked="onclicked"></dbgrid>
  </div>
</template>

<script> 
  import amtabs from '../components/tabs.vue'; 
  import waiting from '../common/waiting.vue';  
  import dbgrid from '../common/dbgrid.vue'; 
  import {get_popularizeprofits} from './popularizeprofit'   
  
  const dom = weex.requireModule('dom'); 
 
  export default {
    components: {  
		'am-tabs':amtabs, 
		waiting,  
		dbgrid,
	},
    data () {
      return { 
	       selected: 1,
		   tabkey:1,
		   showwaiting:true,
		   waittext:'正在获取数据，请稍候!',
		   page:0, 
		   top:260,
		   touchend : false,
		   showLoading: 'hide',
		   items:[],  
           columns: [
              {field: 'inviteprofileid', title:'推广人', width: 250, headeralign:'center',columnalign:'center',nowrap:true}, 
			  {field: 'amount', title: '提成金额', width: 200, headeralign:'center',columnalign:'center',nowrap:true,color:'#b4282d'},  
			  {field: 'published', title: '推广时间',width: 300, headeralign:'center',columnalign:'center',nowrap:true}, 
          ]
      }
    },
	mounted() { 
	         var that = this;   
			 get_popularizeprofits(this.page).then( res => {  
			 	console.log('___________get_popularizeprofits_________' + JSON.stringify(res));  
				this.items = res; 
				that.waittext = '';
				that.showwaiting = false;
				that.top = 90;
			},
			function(error) {			
				that.waittext = '';
				that.showwaiting = false;
				that.top = 90;
			});   
	},
    methods: { 
          onloading() {
		           var that = this; 		    
	               this.$notice.loading.show() 
				   this.showLoading = 'show'; 
	  			   this.page = this.page + 1;
	  			   get_popularizeprofits(this.page).then( res => {  
				        console.log('___________get_popularizeprofits___'+that.page+'______' + JSON.stringify(res));  
		   				that.$notice.loading.hide(); 
		   				if (res.length == 12)
		   				{
		   					that.items.push(...res); 
		   				}
		   				else if (res.length > 0)
		   				{
		   					that.items.push(...res); 
		   					that.touchend = true;
		   				}
		   				else
		   				{ 
		   				    that.page = that.page - 1;
		   					that.touchend = true;
		   				}		
						that.showLoading = 'hide'; 	 
	  			});
          },
		  onclicked(event)
		  {
		 	   var params = {};
		   	   params.orderid = event.value; 
			   this.$router.push({path:'/orderdetail',query:params});
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
          ontabchange (index, value) {
		   	var tabs = {
			    0:{router:'commissionprofit',name:'提成收益'},
				1:{router:'popularizeprofit',name:'推广收益'},
				2:{router:'shareprofit',name:'分享收益'}, 
			};  
			if (this.selected != this.tabkey)
			{ 
				var router = tabs[this.selected].router;
				var name = tabs[this.selected].name;  
	 		    this.$router.replace('/'+router); 
			}
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
	    margin-bottom: 0px; 
	    border-top-width: 2px;
	    border-top-color: #cccccc;
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

