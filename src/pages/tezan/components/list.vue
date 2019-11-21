<template>
  <div class="am-list">
    <slot name="header">
      <text v-if="header" :style="headerStyle" class="am-list-header">{{header}}</text>
    </slot>
    <slot></slot>
    <slot name="footer">
      <text v-if="footer" :style="footerStyle" class="am-list-footer">{{footer}}</text>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'am-list',
  props: {
    header: {
      type: String,
      default: null
    },
    footer: {
      type: String,
      default: null
    },
    headerStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    footerStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      noBorder: this.noBorder
    }
  }
}
</script>

<style scoped lang="less">
@import './variable.less';  
.am-list {
  &-header {
    padding: @v-spacing-lg @h-spacing-lg @v-spacing-md @h-spacing-lg;
    font-size: @font-size-base;
    color: @color-text-caption;
    box-sizing: border-box;
    background-color: #f5f5f9;
  }

  &-footer {
    padding: @v-spacing-md @h-spacing-lg @v-spacing-lg @h-spacing-lg;
    font-size: @font-size-base;
    color: @color-text-caption;
    background-color: #f5f5f9;
  } 
} 
</style>
