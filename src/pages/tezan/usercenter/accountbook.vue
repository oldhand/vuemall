<template> 
    <div class="wrapper">  
    <waiting :show="showwaiting" :msg="waittext" width="60" height="60"></waiting>
    <am-tabs
        v-model="selected"
		@tabchange="ontabchange"
        :tabs="['收益统计', '账单流水', '积分流水']"
      />
	 <scroller class="main-list" offset-accuracy="300px">  
    	 <div class="payement-info">  
	           <mycell :cellStyle="{height:'100px'}" > 
			        <text slot="label" class="cell-label">可用资金:</text> 
					<text slot="title" class="cell-text price">¥ {{money | number_format}}</text>
	           </mycell> 
	           <mycell :cellStyle="{height:'100px'}" > 
			        <text slot="label" class="cell-label">累积收益:</text> 
					<text slot="title" class="cell-text price">¥ {{accumulatedmoney | number_format}}</text>
	           </mycell>
	           <mycell :cellStyle="{height:'100px'}" @click.native="ongotoclick('rankwater','积分流水')"> 
			        <text slot="label" class="cell-label">积分:</text> 
					<text slot="title" class="cell-text price">{{rank}} 分</text>
					<text slot="action" class="cell-action-icon iconfont">&#xe672;</text>  
	           </mycell> 
	           <mycell :cellStyle="{height:'100px'}" > 
			        <text slot="label" class="cell-label">累积积分:</text> 
					<text slot="title" class="cell-text price">{{accumulatedrank}} 分</text>
	           </mycell>
	           <mycell :cellStyle="{height:'100px'}" @click.native="ongotoclick('frozenprofit','冻结资金')" > 
			        <text slot="label" class="cell-label">冻结资金:</text> 
					<text slot="title" class="cell-text price">¥ {{frozenprofit | number_format}}</text>
					<text slot="action" class="cell-action-icon iconfont">&#xe672;</text>  
	           </mycell>
			   <div class="box-border"></div> 
	           <mycell :cellStyle="{height:'100px'}" @click.native="ongotoclick('commissionprofit','提成收益')"> 
			        <text slot="label" class="cell-label">提成收益:</text> 
					<text slot="title" class="cell-text price">¥ {{commissionprofit | number_format}}</text>
					<text slot="action" class="cell-action-icon iconfont">&#xe672;</text>  
	           </mycell>
	           <mycell :cellStyle="{height:'100px'}" @click.native="ongotoclick('popularizeprofit','推广收益')"> 
			        <text slot="label" class="cell-label">推广收益:</text> 
					<text slot="title" class="cell-text price">¥ {{popularizeprofit | number_format}}</text>
					<text slot="action" class="cell-action-icon iconfont">&#xe672;</text>  
	           </mycell>
	           <mycell :cellStyle="{height:'100px'}" @click.native="ongotoclick('shareprofit','分享收益')"> 
			        <text slot="label" class="cell-label">分享收益:</text> 
					<text slot="title" class="cell-text price">¥ {{shareprofit | number_format}}</text>
					<text slot="action" class="cell-action-icon iconfont">&#xe672;</text>  
	           </mycell>
			   <div class="box-border"></div>
	           <mycell :cellStyle="{height:'100px'}" > 
			        <text slot="label" class="cell-label">总收益:</text> 
					<text slot="title" class="cell-text price">¥ {{amount | number_format}}</text>
	           </mycell>
		 </div>
	</scroller>   
  </div>
</template>

<script>
  import Vue from 'vue'
  import amtabs from '../components/tabs.vue'; 
  import waiting from '../common/waiting.vue'; 
  import mycell from '../common/mycell.vue';    
  import {get_accountbook_info} from './accountbook'   
  import {number_format} from '../../../rest/common' 
  

  Vue.filter('number_format', function(value) {
      return number_format(value, 2, ".", ",");
  })
 
  export default {
    components: { 
		'am-tabs':amtabs,  
		waiting, 
		mycell,    
	},
    data () {
      return {
          selected: 0,
		  tabkey:0,
		  showwaiting:true,
		  waittext:'正在进行收益统计，请稍候!', 
		  
		  rank:0,
		  accumulatedrank:0,
		  money:0,
		  accumulatedmoney:0, 
		  frozenprofit:0,
		  commissionprofit:0,
		  shareprofit:0,
		  popularizeprofit:0,
		  amount:0,
      }
    },
	mounted() { 
	         var that = this;   
			 get_accountbook_info().then( res => {  
			 	console.log('___________get_accountbook_info_________' + JSON.stringify(res));  
				that.waittext = '';
				that.showwaiting = false;  
				
				this.rank =  res.rank; 
				this.accumulatedrank =  res.accumulatedrank; 
				this.accumulatedmoney =  res.accumulatedmoney; 
				this.money =  res.money;
				this.frozenprofit =  res.frozenprofit;
				this.commissionprofit =  res.commissionprofit;
				this.shareprofit =  res.shareprofit;
				this.popularizeprofit =  res.popularizeprofit; 
				this.amount =  res.popularizeprofit + res.shareprofit + res.commissionprofit;
			},
			function(error) {			
				that.waittext = '';
				that.showwaiting = false;
			});   
	},
    methods: {
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
	  	   ongotoclick (router,name) {  
		  	 	this.$router.push('/'+router); 
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
    .payement-info{ 
		width:750px;  
	    border-bottom-width: 2px;
	    border-bottom-color: #cccccc;
    }
	.cell-label { 
		font-size: 30px;  
		width:130px;
		text-align:right;
		color:#888888;
		font-weight: 600;
	}
	.cell-text {
	   font-size: 30px;
	   padding-left:15px;
	}
	 
	.price {
	    color: #b4282d
	}
	.box-border
	{
		width:750px;
		height:15px;
		background-color: #cccccc; 
	}
	
</style> 

