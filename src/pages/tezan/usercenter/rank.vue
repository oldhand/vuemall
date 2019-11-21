<template>   
  <div class="wrapper" >
        <div class="container">  
	   	 	 <div v-for="i in items" >    
				    <div class="container-icon">  
						<text class="iconfont icon">{{i | myFilter}}</text>   
				    </div>
	   		 </div>
        </div>
		 
  </div>
</template> 
<script>   
import he from '../utils/he';  
import { get_profileranks } from './rank'  

import Vue from 'vue'

Vue.filter('myFilter', function(value) {
    return he.decode(value);
})

  export default {
	  props: { 
	    value: {
	      type: Number,
	      default: 0
	    },
	}, 
    components: {   
	
	},
    data () {
      return {  
	     items : [],  
		 ranks : [],  
		 icon:'&#xe604;',
      }
    },  
    created() {  
	    
    },
    watch: {
      value () {
	       var that = this;
           setTimeout(() => { that.profilerank(); }, 50);
      }, 
    },
	mounted() {  
	     var that = this;   
		 get_profileranks().then( res => {  
		    this.ranks = res;
		 	console.log('____'+this.value+'_______get_profileranks_________' + JSON.stringify(res));   
			that.profilerank();
		},
		function(error) {	
			that.value = 0;
		});
	}, 
    methods: {
 	     profilerank()
		 {
			 	var that = this;
	  	 		that.items = [];  
				for (var i in that.ranks)
				{
					var rank_info = that.ranks[i]; 
					if (that.value >= rank_info.minrank)  
					{ 
						if (rank_info.minrank == 1)
						{
		                    if (that.value < 100)
		                    { 
								that.items.push(rank_info.icon);
		                    }
		                    else
		                    {
							    var floor = Math.floor(that.value / 100); 
								that.items = new Array(floor).fill(rank_info.icon);
		                        if (that.value % 100 != 0)
		                        {
		                           that.items.push(rank_info.halficon);
		                        }
		                    }  
						}
						else
						{
		                    if (that.value == 0)
		                    {
		                        that.items.push(rank_info.icon);
		                    }
		                    else
		                    {
							    var floor = Math.floor(that.value / rank_info.minrank);  
								if (floor > 5)
								{
									floor = 5;
								}
								that.items = new Array(floor).fill(rank_info.icon);
		                        if (that.value % rank_info.minrank != 0)
		                        {
		                           that.items.push(rank_info.halficon);
		                        }
		                    }
						}
						break;					
					}
				}   
				console.log('____items__'+that.value+'_______' + JSON.stringify(that.items));
		 }		
     }
  }
</script>
<style scoped>  
	.wrapper
	{
		width:750px; 
		position: absolute;
		top: 90px;
		left: 190px;
		height: 36px; 
		background-color: transparent;
	} 
	.iconfont {
	    font-family: iconfont;
	} 
	
	.container
	{ 
		flex-direction: row; 
		align-items: center; 
		justify-content: flex-start; 
		
	}
	.container-icon
	{
	    width: 36px;  
		height: 36px; 
		align-items: center; 
		justify-content: center;
		border-radius: 30px;
		background-color: #daa500;  
		margin-right:5px; 
		box-shadow:1px 1px 1px #888888;
	} 
	.icon
	{
	 	color: #ffffff;
        font-size: 20px;
        line-height: 20px;
	}
</style> 

