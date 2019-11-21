<template>
  <div class="prop-item" :style="wrapStyle" @click="onClick">
    <text class="text-title" :style="titleStyle">{{ title }}</text> 
	<image class="selected" v-if="selected && !disabled" resize="cover" src="/images/selected.png"></image>
  </div>
</template>

<script>
export default {
  props: { 
	selected: {
	   type: Boolean,
	   default: false
	}, 
	disabled: {
	   type: Boolean,
	   default: false
	},
    index: {
      type: Number,
      default: -1
    }, 
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 62
    },
    padding: {
      type: Number,
      default: 15
    },
    borderRadius: {
      type: Number,
      default: 6
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    fontSize: {
      type: Number,
      default: 32
    }, 
    lineSpacing: {
      type: Number,
      default: 15
    },
    itemSpacing: {
      type: Number,
      default: 15
    }
  },
  computed: {
    wrapStyle () {
      const { borderRadius, height, padding, borderWidth, itemSpacing, lineSpacing } = this; 
	  if (this.disabled)
	  {
	      return {
	        justifyContent: 'center',
	        borderRadius: borderRadius + 'px',
	        height: height + 'px',
	        paddingLeft: padding + 'px',
	        paddingRight: padding + 'px',
	        borderWidth: borderWidth + 'px', 
	        borderColor: '#ccc',
	        marginRight: itemSpacing + 'px',
	        marginBottom: lineSpacing + 'px'
	      };
	  }
	  else if (this.selected)
	  {
	      return {
	        justifyContent: 'center',
	        borderRadius: borderRadius + 'px',
	        height: height + 'px',
	        paddingLeft: padding + 'px',
	        paddingRight: padding + 'px',
	        borderWidth: borderWidth + 'px', 
	        borderColor: '#FC5B23',
			backgroundColor: '#fff9f9',
	        marginRight: itemSpacing + 'px',
	        marginBottom: lineSpacing + 'px'
	      }; 
	  }
	  else
	  {
	      return {
	        justifyContent: 'center',
	        borderRadius: borderRadius + 'px',
	        height: height + 'px',
	        paddingLeft: padding + 'px',
	        paddingRight: padding + 'px',
	        borderWidth: borderWidth + 'px', 
	        borderColor: '#f5f5f5',
			backgroundColor: '#f5f5f5',
	        marginRight: itemSpacing + 'px',
	        marginBottom: lineSpacing + 'px'
	      };
	  }
	  
      
    },
    titleStyle () {
      const { fontSize, color, originTitleColor } = this; 
	  if (this.disabled)
	  {
	      return {
	        fontSize: fontSize + 'px',
	        color: '#ccc'
	      };
	  }
	  else if (this.selected)
	  {
	      return {
	        fontSize: fontSize + 'px',
	        color: '#FC5B23'
	      };
	  }
	  else
	  {
	      return {
	        fontSize: fontSize + 'px',
	        color: '#333'
	      };
	  }
    }
  },
  methods: {
    onClick () {
		if (!this.disabled) { 
	      this.$emit('select', this.index);
	  }
    }
  }
};
</script>

<style scoped>
.prop-item { 
  } 
.prop-item:active {
   background-color: #eeeeee;
   color: #ffffff; 
 } 
 .selected {  
    position: absolute;
    right: 1px;
    bottom: 1px;
	width:20px;
	height:20px;
 }
</style>
