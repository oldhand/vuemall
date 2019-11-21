<template> 
    <div class="wrapper">  
     <waiting :show="showwaiting" :msg="waittext" width="60" height="60"></waiting> 
	 <dbgrid 
	 		:rows="items" 
			:columns="columns" 
			:touchend="touchend" 
			:top="top"
			:showLoading="showLoading" 
			linkfield="orderid" 
			@onloading="onloading"
			@onclicked="onclicked"></dbgrid>
  </div>
</template>

<script> 
  import waiting from '../common/waiting.vue';  
  import dbgrid from '../common/dbgrid.vue'; 
  import {get_commissions} from './frozenprofit'   
  
  const dom = weex.requireModule('dom'); 
 
  export default {
    components: {  
		waiting,  
		dbgrid,
	},
    data () {
      return { 
		   showwaiting:true,
		   waittext:'正在获取数据，请稍候!',
		   page:0, 
		   top:160, 
		   touchend : false,
		   showLoading: 'hide',
		   items:[],  
           columns: [
              {field: 'consumer', title:'购买人', width: 250, headeralign:'center',columnalign:'center',nowrap:true}, 
			  {field: 'amount', title: '冻结金额', width: 150, headeralign:'center',columnalign:'left',nowrap:true,color:'#b4282d'},  
			  {field: 'published', title: '支付时间',width: 300, headeralign:'center',columnalign:'center',nowrap:true},
			  {field: 'link', title: '', width: 50, headeralign: 'center',columnalign:'center'},
          ]
      }
    },
	mounted() { 
	         var that = this;   
			 get_commissions(this.page).then( res => {  
			 	console.log('___________get_commissions_________' + JSON.stringify(res));   
				this.items = res; 
				that.waittext = '';
				that.showwaiting = false;
				that.top = 0;
			},
			function(error) {			
				that.waittext = '';
				that.showwaiting = false;
				that.top = 0;
			});   
	},
    methods: { 
          onloading() {
		           var that = this; 		    
	               this.$notice.loading.show() 
				   this.showLoading = 'show'; 
	  			   this.page = this.page + 1;
	  			   get_commissions(this.page).then( res => {  
				        console.log('___________get_commissions___'+that.page+'______' + JSON.stringify(res));  
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

