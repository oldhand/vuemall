<template>
  <div class="filter-wrapper" v-if="show">
       <div class="filter" v-for="(i,index) in items" @click="onfilterclicked(i.key)"> 
			  <text class="title selected" v-if="i.selected">{{i.title}}</text> 
			  <text class="title" v-else>{{i.title}}</text> 
			  <div v-if="i.selected">
			 	  <text class="icon selected iconfont" v-if="i.order == 'desc'">&#xe675;</text> 
				  <text class="icon selected iconfont" v-if="i.order == 'asc'" >&#xe68f;</text> 
			  </div>
       </div> 
  </div>  
</template>

<script> 

export default {
    props: {
      show: {
        type: Boolean,
        default: true
      },
      items: {
        type: Array,
        default: []
      },  
    }, 
     methods: {  
   		onfilterclicked(selected)
   		{ 
			for (var i in this.items)
			{
				if (this.items[i].key == selected)
				{
					if (this.items[i].selected == true)
					{ 
						if (this.items[i].order == 'desc')
						{
							this.items[i].order = 'asc';
						}
						else if (this.items[i].order == 'asc')
						{
							this.items[i].order = 'desc';
						}
					}
					else
					{
						this.items[i].selected =  true
					} 
				}
				else
				{
					this.items[i].selected = false; 
				}
			}
   			this.$emit('onfilterclicked'); 
   		},
     }
  };
</script>
<style scoped> 
    .filter-wrapper {
        width:750px; 
		height:70px;
	    border-bottom-width: 1px;
	    border-bottom-color: #cccccc;
	    align-items: center;
	    justify-content: space-between; 
		display:flex;
		flex-direction: row;
    }  
	.filter
	{
	    align-items: center;
	    justify-content: center;
		display:flex;
		flex-direction: row;
		flex: 1;
		height:70px;
	} 
    .iconfont {
  		font-family: iconfont;
    } 
	.title
	{
		line-height: 70px;
		color:#cccccc;
	}
	.icon
	{
		line-height: 30px;
		padding-left:10px;
		color:#cccccc;
		font-size:25px;
	}
	.selected
	{ 
		color:#b4272d; 
	}
	
</style>	
	