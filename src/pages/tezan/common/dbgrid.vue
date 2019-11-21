<template>
  <div class="dbgrid-wrapper" :style="{'top':top+'px'}">
      <div class="wrapper-header">
	   	  <div v-for="(header,index) in columns" :style="{'width':header.width+'px','min-height':height+'px'}" class="column" :class="[bottomborder ? 'bottomborder' : '']">  
		 	 <text class="header-label" :style="{'width':header.width+'px','text-align':header.headeralign}">{{header.title}}</text> 
		  </div> 
  	  </div> 
  	 <scroller ref="scroller" class="dbgrid-main-list" offset-accuracy="300px" @scroll="scroll" >  
  	      <div v-if="rows.length == 0" class="empty"> 
  			 <text class="empty-icon iconfont">&#xe680;</text> 
  	         <text class="empty-text">还没有相关的记录!</text> 
  	      </div>
  		  <div ref="top">
	     	  <div v-for="(row,key) in rows"  class="column">  
	     	   	  <div v-for="(column,index) in columns" :style="{'width':column.width+'px','min-height':height+'px'}" class="column" :class="[bottomborder ? 'bottomborder' : '']">   
	     		 	    <text v-if="column.field != 'link'"  class="column-label" :class="[column.nowrap ? 'nowrap' : '']" :style="{'width':column.width+'px','text-align':column.columnalign,'color': (column.color?column.color:'#333')}" >{{row[column.field]}}</text> 
	  				<text v-else class="link iconfont" :style="{'width':column.width+'px'}" @click="onclicked(row[linkfield])" >&#xe672;</text> 
	     		  </div> 
	  	 	  </div> 
  		  </div> 
   		  <text v-if="touchend" class="txt-empty">没有更多记录了</text>	
  		  <go-top @goTop="goTopHandler" :show="showGoTop"></go-top> 
          <loading class="loading" @loading="onloading" :display="showLoading">
             <text class="indicator"></text>
          </loading>
  	</scroller>
   	  
  </div> 
</template> 
<script> 
	import goTop from './goTop.vue';

	const dom = weex.requireModule('dom');
	
    export default{
	    components: {     
			goTop,
		},
	    props: {
	        linkfield: {
	            type: String,
	            default: ''
	        }, 
	        height: {
	            type: Number,
	            default: 50
	        },
	        top: {
	            type: Number,
	            default: 160
	        },
	        bottomborder: {
	            type: Boolean,
	            default: true
	        },  
	        touchend: {
	            type: Boolean,
	            default: false
	        },
	        showLoading: {
	            type: String,
	            default: 'hide',
	        },
	        rows: {
	            type: Array
	        },
	        columns: {
	            type: Array
	        },
	    },
        data() {
            return {  
		  		  showempty: false,
		  		  showGoTop: false,  
            }
        },
	    methods: { 
				onclicked(key)
				{
					console.log('___________onclicked____'+key+'_____' );  
					this.$emit('onclicked', { value: key });
				},		
	            onloading() {   
				 	   console.log('___________onloading_____' );  
					   this.$emit('onloading'); 
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
	.dbgrid-wrapper
	{
		width:750px;  
		background-color: #ffffff;   
        position: absolute;
        top: 160px;
        right: 0;
        bottom: 0;
        left: 0;
	} 
	.iconfont {
	    font-family: iconfont;
	} 
	.dbgrid-main-list { 
	   width:750px;  
	}
	.wrapper-header
	{  
		flex-direction: row;
		align-items: center; 
		justify-content: space-between; 
	} 
	.column
	{
		flex-direction: row;
		align-items: center; 
		justify-content: space-between; 
	}
    .header-label {
        color: #333333;
        font-size: 30px;
        line-height: 40px; 
    }
    .column-label {
        color: #333333;
        font-size: 29px;
        line-height: 40px;  
    }
    .link {
        color: #333333;
        font-size: 30px;
        line-height: 40px;
		text-align:center; 
    }
	.nowrap
	{ 
		lines: 1;
	    overflow: hidden; 
	    
	    text-overflow: ellipsis;
	}
	.bottomborder
	{ 
	 	border-bottom-width: 1px;
	    border-bottom-color: #cccccc; 
	}
	.leftborder
	{
	 	border-left-width: 1px;
	    border-left-color: #cccccc; 
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
		margin-top: 50px;
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

