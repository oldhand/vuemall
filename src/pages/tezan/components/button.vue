<template> 
    <text
      :class="btnClass" 
      :style="_style"
      @touchstart="_touchstart"
      @touchend="_touchend"
      @touchcancel="_touchend"
      @click="handleClick"
    ><slot>{{text}}</slot></text> 
</template>

<script>
export default {
  name: 'am-button',
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: '确认'
    },
    size: {
      type: String,
      default: 'large'
    },
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#fff'
    },
    backgroundcolor: {
      type: String,
      default: '#299e00'
    },
    bordercolor: {
      type: String,
      default: '#299e00'
    },
    btnStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      active: false,
    }
  }, 
  computed: {
    btnClass () {
      const classMap = {
        'am-button': true
      } 
      classMap[`am-button-${this.type}`] = true
	  classMap[`am-button-${this.type}-normal`] = !this.disabled 
      classMap[`am-button-${this.type}-active`] = !this.disabled && this.active
	  classMap[`am-button-${this.type}-disabled`] = this.disabled; 
      classMap['am-button-small'] = this.size === 'small' 
      return Object.keys(classMap).filter(val => classMap[val])
	  
    },
    _style () {
      const _style = this.btnStyle
      if (this.width != 0) {
        _style.width = this.width +'px';
      }
      if (this.height != 0) {
        _style.height = this.height + 'px';
		_style['line-height'] = this.height+'px';
      }
	  if (this.type == 'theme')
	  { 
			_style.backgroundColor = this.backgroundcolor;
			_style.borderColor = this.bordercolor;
			if (this.disabled)
			{
				 _style.color = '#ccc';
			}
			else if (this.active)
			{
				_style.color = this.color; 
				_style.backgroundColor =  '#ddd';
				_style.borderColor =  '#ddd';
			}
			else 
			{
				_style.color = this.color;
			}
	  }
      return _style
    }
  },
  methods: {
    _touchstart () {
      this.active = true
    },
    _touchend () {
      this.active = false
    },
    handleClick (event) { 
      if (!this.disabled) { 
        this.$emit("click", event);
      }
    }
  }
}
</script>

<style scoped lang="less">
@import './variable.less';
@color-text-base: #333333;  
@theme_color:  ;

.am-button {
  // width: @button-width;
  height: @button-height;
  line-height: @button-height;
  text-align: center;
  border-width: @border-width-sm;
  border-style: solid;
  border-radius: @radius-md;
  font-size: @button-font-size;
  lines: 1;
  color: @color-text-base-inverse;
  padding-left: @h-spacing-lg;
  padding-right: @h-spacing-lg;
  align-items: center;  
  justify-content: center;
  
  &-theme { 
    &-normal {
      opacity: .99; 
    }
    &-active {
      opacity: .6;
    }
    &-disabled {
      opacity: .3; 
    }
  }
  
  &-default {
    color: @color-text-base;
    background-color: @fill-base;
    border-color: @border-color-base;
    &-normal {
      opacity: .99;
      color: fade(@color-text-base, 100%);
    }
    &-active {
      background-color: @fill-tap;
    }
    &-disabled {
      opacity: .6;
      color: fade(@color-text-base, 30%);
    }
  }

  &-primary {
    background-color: @primary-button-fill;
    border-color: @primary-button-fill; 
    &-normal {
      opacity: .99;
      color: fade(@color-text-base-inverse, 100%);
    }
    &-active {
      background-color: @brand-primary-tap;
      border-color: @brand-primary-tap;
      color: fade(@color-text-base-inverse, 30%);
    }
    &-disabled {
      opacity: .4;
      color: fade(@color-text-base-inverse, 60%);
    }
  }
  &-warning {
    background-color: @warning-button-fill;
    border-color: @warning-button-fill;
    &-normal {
      opacity: .99;
      color: fade(@color-text-base-inverse, 100%);
    }
    &-active {
      background-color: @warning-button-fill-tap;
      border-color: @warning-button-fill-tap;
      color: fade(@color-text-base-inverse, 30%);
    }
    &-disabled {
      opacity: .6;
      color: fade(@color-text-base-inverse, 60%);
    }
  }

  &-ghost {
    background-color: transparent;
    border-color: #ffffff;
    color: #ffffff;
    &-normal {
      color: fade(#fff, 100%);
      border-color: fade(#fff, 100%);
    }
    &-active {
       opacity: .6; 
    }
    &-disabled {
      color: fade(#fff, 10%);
      border-color: fade(#fff, 10%);
    }
  }

  &-small {
    font-size: @button-font-size-sm;
    height: @button-height-sm;
    line-height: @button-height-sm;
  }

   
}
</style>
