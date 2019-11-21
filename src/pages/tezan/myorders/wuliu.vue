<template>
      <div class="wrapper"> 
		 <waiting :show="showwaiting" :msg="waittext" width="60" height="60"></waiting>
    	 <div class="payement-info">  
	           <mycell :cellStyle="{height:'70px'}" > 
			        <text slot="label" class="cell-label">物流公司:</text> 
					<text slot="title" class="cell-text">{{invoicename}}</text>
	           </mycell> 
	           <mycell :cellStyle="{height:'70px'}" > 
			        <text slot="label" class="cell-label">物流单号:</text> 
					<text slot="title" class="cell-text price">{{invoicenumber}}</text>
	           </mycell>
		 </div>
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >  
				<div class="box-border" v-if="!showwaiting"></div>  
				<flow :items="items" :customStyles="customStyles" v-if="showflow" ></flow> 
				<text class="errormesg" v-if="showerrormesg">{{errormesg}}</text>
				<div class="box-border"></div>  
			     <div class="logout-wrapper">    
		            <div class="goto" @click="ongotoclick">
		                <text class="goto-txt">返回首页</text>
		            </div>
				</div> 
		</scroller>  
    </div>
</template> 

<script>
    import Vue from 'vue'
	import mycell from '../common/mycell.vue'; 
	import waiting from '../common/waiting.vue';    
	import flow from '../common/flow.vue';    
	import {get_wuliu_info} from './wuliu'
	 
    export default {
	    components: {
	        mycell,    
			waiting, 
			flow,  
	    },  
	    data() {
	        return {    
				invoicename:'',  
				invoicenumber:'',    
				showwaiting:true,
				waittext:'正在获取物流信息，请稍候!', 
				showflow:false,
				items:[],
			    showerrormesg:false,
				errormesg:'',
	            customStyles: {
	               'highlightTitleColor': '#EE9900',
	               'highlightPointInnerColor': '#EE9900',
	               'highlightPointBorderColor': '#FFE78D'
	           },
	        }
	    },
		mounted(){    
			var that = this;
	    	if (this.$route.query)
			{ 
		   		     var params = this.$route.query;  
					 this.invoicenumber = params.invoicenumber; 
					 this.invoicename = params.invoicename;  
					  
					 get_wuliu_info(this.invoicename,this.invoicenumber).then( res => {  
					 	console.log('___________get_wuliu_info_________' + JSON.stringify(res));  
						that.waittext = '';
						that.showwaiting = false; 
						if (res.data && res.data.length == 0)
						{
								that.showflow = false;
								that.errormesg = '找不到相关的物流信息，请稍候再试!';
								that.showerrormesg = true;
						}
						else
						{
							that.showflow = true;
							that.errormesg = '';
							that.showerrormesg = false;
							for(var key in res.data){ 
								var ftime = res.data[key].ftime;
								var location = res.data[key].location;
								var time = res.data[key].time;
								var context = res.data[key].context;
								if (key == 0)
								{
									var wuliu = { desc: context,title:time,'highlight': true,};  
									that.items.push(wuliu);
								}
								else
								{
									var wuliu = { desc: context,title:time}; 
									that.items.push(wuliu);
								} 
							}
						}
						
	   				},
					function(error) {			
						that.waittext = '';
						that.showwaiting = false;
						that.showflow = false;
						that.errormesg = error;
						that.showerrormesg = true;
					});  
			} 
	    },
        methods: { 
             ongotoclick()
			 {
			 	this.$router.push('/index');  
			 }
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
	}
    .payement-info{ 
		width:750px; 
	    border-top-width: 2px;
	    border-top-color: #cccccc;
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
    .goto-wrapper{  
	    align-items: center;
	    justify-content: center;
    }
    .goto {
        height: 100px;
        width: 750px;
        background-color: #ffffff;  
    }
    .goto:active {
      background-color: #eeeeee;
    }
    .goto-txt{
        height: 100px; 
        text-align: center;
        line-height: 100px;
        color: #b4282d;
		font-weight: 700;
        font-size: 35px;
    }
	.errormesg
	{
	    height: 100px; 
	    text-align: center;
	    line-height: 100px;
	    color: #b4282d; 
	    font-size: 32px;
	}
	
	 
</style>