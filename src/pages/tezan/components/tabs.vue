
<template>
  <div :class="['am-tabs-wrap', `am-tabs-wrap-${tabDirection}`]">
    <component
      :is="itemStyle.flex === 1 ? 'div' : 'scroller'"
      :class="['am-tabs', `am-tabs-${tabDirection}`, `am-tabs-${tabBarPosition}`]"
      :scroll-direction="tabDirection"
    >
      <div
        v-for="(title, index) in tabs"
        :key="index"
        :class="['am-tabs-item', `am-tabs-item-${tabDirection}`]"
        :style="itemStyle"
        @click="handleClick(index, title)"
      >
        <text
          :class="['am-tabs-item-text', selected === index ? 'am-tabs-item-text-selected' : '']"
        >{{title}}</text>
        <div
          v-if="selected === index"
          :class="['am-tabs-item-underline', `am-tabs-item-underline-${tabBarPosition}`]"
          :style="underlineStyle"
        ></div>
      </div>
    </component>
  </div>
</template>

<script>
import Utils from './utils'

export default {
  name: 'am-tabs',
  model: {
    prop: 'selected',
    event: 'tabchange'
  },
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Number,
      default: 0
    },
    tabBarPosition: {
      type: String,
      default: 'top' // top, bottom, left, right
    },
    // tabDirection: {
    //   type: String,
    //   default: 'horizontal' // 'horizontal' | 'vertical'
    // },
    tabWidth: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isWeb: Utils.isWeb()
    }
  },
  computed: {
    tabDirection () {
      return this.tabBarPosition === 'top' || this.tabBarPosition === 'bottom' ? 'horizontal' : 'vertical'
    },
    underlineStyle () {
      const style = {}
      if (this.tabBarPosition === 'top' || this.tabBarPosition === 'bottom') {

      }
      return style
    },
    itemStyle () {
      const style = {}
      if (this.tabWidth) {
        style.width = this.tabWidth + 'px'
      } else if (this.tabDirection === 'horizontal') {
        style.flex = 1
      }
      return style
    }
  },
  methods: {
    handleClick (index, value) {
      if (this.disabled) return
      this.$emit('tabchange', index, value)
    } 
  } 
}
</script>

<style scoped lang="less">
@import './variable.less';

.am-tabs {
  background-color: @fill-base;
  border-color: @border-color-base;
  display: flex;   
  &-wrap {
    &-horizontal {
      height: @tabs-height + 1;
      overflow-y: hidden;
      overflow-x: scroll;
    }
    &-vertical {
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
  &-top {
    border-bottom-width: @border-width-sm;
  }
  &-bottom {
    border-top-width: @border-width-sm;
  }
  &-left {
    border-right-width: @border-width-sm;
  }
  &-right {
    border-left-width: @border-width-sm;
  }
  &-horizontal {
    flex-direction: row;
  }
  &-item {
    justify-content: center;
    align-items: center;
    height: @tabs-height;
    &-text  {
      font-size: @tabs-font-size-heading;
      &-selected {
        color: @tabs-color;
      }
    }
    &-underline {
      position: absolute;
      border-color: @tabs-color;
      border-width: 1px;
      &-top, &-bottom {
        bottom: 0;
        left: 0;
        right: 0;
      }
      &-left {
        top: 0;
        right: 0;
        bottom: 0;
      }
      &-right {
        top: 0;
        left: 0;
        bottom: 0;
      }
    }
  }
}
</style>
