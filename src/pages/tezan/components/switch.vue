<template> 
  <switch v-if="isIOS&&!color" :checked="checked" :disabled="disabled"  @change="handleClick"></switch>
  <div v-else @click="handleClick" class="am-switch" :class="switchClass" :style="switchStyle">
    <div class="am-switch-animate" ref="animate" :class="switchAnimateClass"></div>
    <div class="am-switch-inner" :class="switchInnerClass"></div> 
  </div>
</template>

<script>
import Utils from './utils'
const animation = weex.requireModule('animation')

export default {
  name: 'am-switch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    native: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isIOS: Utils.isIOS(),
      checked: this.value
    }
  },
  computed: {
    showNative () {
      return this.native || (this.isIOS && !this.color)
    },
    switchClass () {
      return Utils.makeClassList({
        'am-switch-checked': this.checked,
        'am-switch-disabled': this.disabled
      })
    },
    switchInnerClass () {
      return Utils.makeClassList({
        'am-switch-inner-checked': this.checked
      })
    },
    switchAnimateClass () {
      return Utils.makeClassList({
        'am-switch-animate-checked': this.checked
      })
    },
    switchStyle () {
      const style = {}
      if (this.color) {
        style.backgroundColor = this.checked ? this.color : '#e5e5e5'
      }
      return style
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.checked = !this.checked
        this.$emit('input', this.checked)
        this.$emit('change', this.checked)
      }
    }
  },
  watch: {
    value (newVal) {
      this.checked = newVal
    },
    checked (val) { 
      if (this.isIOS && this.color) {
        animation.transition(this.$refs.animate, {
          styles: {
            transform: `scale(${val ? '0' : '1'})`
          },
          duration: 300, // ms
          timingFunction: 'ease',
          needLayout: false,
          delay: 0 // ms
        })
      } 
    }
  }
}
</script>

<style  scoped lang="less">
@import "./variable.less";

.am-switch {
  width: 51 * @hd;
  height: 31 * @hd;
  border-radius: 31 * @hd;
  box-sizing: border-box;
  background-color: #e5e5e5;
  position: relative;
  overflow: hidden;
  &-checked {
    background-color: @switch-fill;
  }
  &-disabled {
    opacity: @opacity-disabled;
  } 
  &-inner {
    height: 28 * @hd;
    width: 28 * @hd;
    border-radius: 28 * @hd;
    background-color: @fill-base;
    position: absolute;
    z-index: 2;
    left: 1.5 * @hd;
    top: 1.5 * @hd; 
    transition-property: left;
    transition-duration: 0.2s; 
    box-shadow: 2 * @hd 2 * @hd 4 * @hd rgba(0, 0, 0, 0.21);
    &-checked { 
      left: 21.5 * @hd 
    }
  }
  &-animate {
    position: absolute;
    left: 1.5 * @hd;
    top: 1.5 * @hd;
    width: 48 * @hd;
    height: 28 * @hd;
    border-radius: 28 * @hd;
    box-sizing: border-box;
    background-color: @fill-base;
    z-index: 1;
    transition-property: transform;
    transition-duration: 0.2s;
    transform: scale(1);
    &-checked {
      transform: scale(0);
    }
  }
}
</style>
