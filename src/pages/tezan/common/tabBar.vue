<template>
    <div class="wrapper-tabbar">
        <div v-for="(i,index) in items" :key="index" class="bar-item" @click="tabTo(i.key)" :style="getbarstyle(pIndexKey,i.key,i.style,i.navbarcolor,i.selectnavbarcolor)">
            <text class="bar-ic iconfont" :class="[pIndexKey == i.key ? 'bar-active' : '']" :style="gettxtstyle(pIndexKey,i.key,i.style,i.navbarcolor,i.selectnavbarcolor)">{{i.icon | myFilter}}</text>
            <text class="bar-txt" :class="[pIndexKey == i.key ? 'bar-active' : '']" :style="gettxtstyle(pIndexKey,i.key,i.style,i.navbarcolor,i.selectnavbarcolor)">{{i.name}}</text> 
			<text class="notice-dot" v-if="usercenter && i.key == 'usercenter'"></text>
			<text class="i-notice" v-if="shoppingcart > 0  && i.key == 'shoppingcart'">{{shoppingcart}}</text>
        </div>
    </div>
</template>

<script>
import he from '../utils/he';
import Vue from 'vue'
Vue.filter('myFilter', function(value) {
    return he.decode(value);
})

export default {
    props: {
        items: {
            type: Array
        },
	    shoppingcart: {
	      type: Number,
	      default: 0
	    },
	    usercenter: {
	      type: Boolean,
	      default: true
	    },
		tabkey:
		{
	      type: String,
	      default: 'home'
		}
    },
	mounted(){  
		setTimeout(() => { 
			this.pIndexKey = this.tabkey;
		}, 10);  
	},
    data() {
        return {
            pIndexKey: 'home',
        }
    },	 
    methods: {
        tabTo(_key) { 
            if (this.pIndexKey == _key) return; 
            this.pIndexKey = _key;  
            this.$emit('tabTo', {
                status: 'tabTo',
                data: {
                    key: _key
                }
            })
        },
	    getbarstyle: function (index,key,style,navbarcolor,selectnavbarcolor) {				
				if (style == '1')
				{
				  	if (index == key)
					{
						return  {backgroundColor:selectnavbarcolor};
					}
					else
					{
						return  {};
					}
				}
				else
				{
				   return  {};
				}  
	  	},
	    gettxtstyle: function (index,key,style,navbarcolor,selectnavbarcolor) {				
				if (style == '1')
				{
				  	if (index == key)
					{
						return  {color:'white'};
					}
					else
					{
						return  {color:navbarcolor};
					}
				}
				else
				{
				  	if (index == key)
					{
						return  {color:selectnavbarcolor};
					}
					else
					{
						return  {color:navbarcolor};
					}
				}  
	  	}
    }
}
</script>

<style scoped>
.iconfont {
    font-family: iconfont;
}

.wrapper-tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90px;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    border-top-width: 1px;
    border-top-color: #d9d9d9;
    background-color: #fafafa;
}

.bar-item {
    flex: 1; 
}

.bar-txt,
.bar-ic { 
    text-align: center;
}

.bar-active { 
}

.bar-ic {
    padding-top: 10px;
    font-size: 38px;
}

.bar-txt {
    font-size: 22px;
    padding-top: 2px;
	line-height: 30px;
	height:30px;
}
.i-notice{
        font-size: 24px;
        position: absolute;
        top:5px;
        right: 58px;
        height: 30px;
        width: 30px;
        border-radius: 30px; 
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        background-color: #ff0000;
}
.notice-dot{
        position: absolute;
        top:10px;
        right: 65px;
        height: 15px;
        width: 15px;
        border-radius: 100%;
        background-color: #ff0000;
}
</style>