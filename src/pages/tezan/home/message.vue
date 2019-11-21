<template>
      <div class="wrapper"> 
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >   
		     <div v-if="showempty" class="empty"> 
				 <text class="empty-icon iconfont">&#xe673;</text> 
		         <text class="empty-text">您还没有收到任何消息!</text> 
		     </div>
             <div v-for="(i,index) in items" :key="index" class="message-info"  v-if="i.show"> 
  	            <mycell :cellStyle="{height:'160px'}" @click.native="onmessageclick(i.id)">   
					    <text slot="label" class="iconfont message-icon unread" v-if="i.status == 0" >&#xe673;</text>
					    <text slot="label" class="iconfont message-icon" v-else>&#xe673;</text>
						<text slot="title" class="title">{{i.message}}</text>    
  				 		<text slot="action" class="iconfont">&#xe672;</text> 
  	            </mycell> 
                <mycell :cellStyle="{height:'90px'}">  
    					<text slot="title" class="cell-text">系统 {{i.published | simpledatetime }} 发送</text> 
   					    <text slot="action" class="cell-text iconfont" @click="ondeletclicked(i.id)">&#xe616; 删除</text> 
                </mycell> 
             </div>   
			 <text v-if="touchend" class="txt-empty">没有更多消息了</text>	
	         <loading class="loading" @loading="onloading" :display="showLoading"> 
	         </loading>
		</scroller>  
    </div>
</template> 

<script>
	import Vue from 'vue'
	import mycell from '../common/mycell.vue'; 
	import { get_messages,delete_messge } from './message.js'  
	
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
			get_messages(this.page).then(res => {   
				console.log('____________get_messages_____' + JSON.stringify(res));   
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
	   	    onmessageclick(messageid) {  
				 this.$router.push({path:'/viewmessage',query:{from:'message',messageid:messageid}}); 
	   	    },
            onloading() {
 		           if (this.showempty) return;			    
                   this.$notice.loading.show()
                   this.showLoading = 'show'; 
    			   this.page = this.page + 1;
    			   get_messages(this.page).then(res => {  
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
			ondeletclicked(messageid)
			{
				var that = this;
		        this.$notice.confirm({
		            title: '警告',
		            message: '确定需要删除当前消息吗?', 
		            okCallback () { 
	                    delete_messge(messageid).then(res =>{
							for (var i in that.items)
							{ 
									if (that.items[i].id == messageid)
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
	.message-border
	{
		width:750px;
		height:4px;
	}
    .message-info{
        margin-top: 2px;
		width:750px;  
		padding-top:20px;
    } 
    .message-icon { 
	    font-size: 60px;  
		color: #dddddd;
		width:80px;
    }
	.main-list { 
	    margin-bottom: 0px;
	}  
	.image
	{
		width:150px;
		height:150px;
		margin-right: 20px;
	}
	.title { 
	    overflow: hidden;
	    lines: 3;
	    
	    text-overflow: ellipsis;
	}
	.cell-text
	{
		padding-left:10px;
	}
	.cell-action
	{
		flex-direction: row;
	    align-items: center;
	    justify-content: flex-start;
	}
	.unread {
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