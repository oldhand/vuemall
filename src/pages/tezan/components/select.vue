<template>
  <item
    arrow=""
    :title="title"
    :title-number="titleNumber"
    :tap-active="false"
    :thumb="thumb"
    :thumb-style="thumbStyle"
    :title-disabled="disabled"
  >
    <template slot="thumb">
      <slot name="thumb"></slot>
    </template>
    <template slot="extra">
 	  <div v-for="i in items" :style="{'padding-right':space+'px'}">   
			<checkbox :value="i.selected" @checkchange="onchangevalue($event,i.value)" :label="i.key"></checkbox>
	  </div> 
      <slot name="extra">
        <text class="am-list-extra" v-if="extra">{{extra}}</text>
      </slot>
    </template>
  </item>
</template>

<script>
import Item from './listitem.vue'
import checkbox from '../common/checkbox.vue';
import itemMixin from './item-mixin'
import Utils from './utils'

export default {
  name: 'am-list-input',
  mixins: [itemMixin],
  components: {
     Item,
	 checkbox,  
  },
  props: {
    type: {
      type: String,
      default: 'radio' // radio，checkbox
    },
    items: {
      type: Array,
      default: []
    },
    space: {
      type: Number,
      default: 50
    },
    title: {
      type: String,
      default: ''
    },
    titleNumber: {
      type: Number,
      default: 5
    }, 
    thumb: {
      type: String,
      default: ''
    },
    thumbStyle: {
      type: Object,
      default () {
        return {}
      }
    }, 
    extra: {
      type: String,
      default: ''
    }, 
    disabled: {
      type: Boolean,
      default: false
    }, 
  }, 
  methods: {
    	onchangevalue(event,value)
		{ 
			if (this.type == "radio")
			{
				if (event)
				{
					for (var i in this.items)
					{
						if (this.items[i].value == value)
						{
							this.items[i].selected = true; 
						}
						else
						{
							this.items[i].selected = false; 
						} 
					}
				} 
				else
				{
					for (var i in this.items)
					{
						if (this.items[i].value == value)
						{
							this.items[i].selected = false; 
							this.items[i].selected = true; 
						}
						else
						{
							this.items[i].selected = false; 
						} 
					}
				}
			} 
			console.log('___________onchangevalue___'+event+'___'+value+'_____' + JSON.stringify(this.items)); 
		}
  }, 
}
</script>

<style scoped lang="less"> 

.checkbox
{
	padding-right:50px;
}
 

</style>
