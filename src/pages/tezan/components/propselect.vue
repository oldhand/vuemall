<template>
  <div class="wall-wrap">
    <div class="title-wrap" v-if="title != ''">
      <slot name="left">
        <text class="title-text" :style="{ color: titleColor }">{{ title }}</text>
      </slot> 
    </div>
    <div :class="[title != '' ? 'tags-wrap' : 'tags-full-wrap']">
      <item v-for="(item, index) in myitems"
            v-bind="Object.assign({}, customStyles, item)"
            :key="index"
            :index="index"
            @select="onSelect(index)" />
    </div>
  </div>
</template>

<style scoped>
  .wall-wrap {
    width: 750px;
	padding-top: 10px;
	padding-left: 0px;
	flex-direction: row;
  }

  .title-wrap {
  	width:80px;
	padding-top: 15px;
    flex-direction: row; 
    justify-content: space-between; 
  }

  .title-text {
    font-family: sans-serif-medium;
    font-weight: 500;
    font-size: 32px;
    line-height: 32px;
  } 

  .tags-wrap {
    width:630px;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 10px 0 10px; 
  }
  .tags-full-wrap {
    width:750px;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 10px 0 10px; 
  }
</style>

<script>
import Item from './propitem.vue'; 

export default {
  name: 'propselect', 
  components: { Item },
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default () {
        return '';
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    titleColor: {
      type: String,
      default: '#333'
    },
    rightText: {
      type: String,
      default: ''
    },
    rightColor: {
      type: String,
      default: '#198DED'
    },
    customStyles: {
      type: Object,
      default: () => ({})
    }
  }, 
  data () {
    return {
        myitems: []
    }
  },
  mounted () {
      this.myitems = this.items; 
  },
  watch: {
    items (val) { 
         this.myitems = this.items; 
    }, 
  },
  methods: { 
	  //点击筛选操作
	  onSelect(index){
	      if (this.disabled) return;
	      if (this.myitems[index].disabled) return;
		  if (!this.myitems[index].selected)
		  {
		  	  this.myitems[index].selected = true;  
		      this.myitems = this.myitems.map((item, i) => {
		          if (item.selected && index != i)
				  {
				  	  item.selected = false;
				  }
		          return item;
		      });
	          this.$emit('select', {
	              index: index,
				  key: this.myitems[index].key, 
	              title: this.myitems[index].title, 
	          }); 
		  } 
	  }, 
  }
};
</script>
