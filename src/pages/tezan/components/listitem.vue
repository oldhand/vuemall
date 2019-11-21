<template>
  <div class="am-list-item" :class="itemClass" @click="handleClick">
    <slot name="thumb">
      <image v-if="thumb" class="am-list-thumb" :src="thumb" :style="thumbStyle" />
    </slot>
    <div class="am-list-line" :class="lineClass">
      <div v-if="!!title" :class="['am-list-content', `am-list-content-text-${titleNumber}`]">
        <text class="am-list-content-text am-list-nowrap" :class="contentTextClass">{{title}}</text>
        <slot name="brief">
          <text class="am-list-content-brief" v-if="brief">{{brief}}</text>
        </slot>
      </div>
      <slot name="extra">
        <text class="am-list-extra am-list-nowrap" v-if="extra" :style="extraStyle">{{extra}}</text>
      </slot> 
    </div>
  </div>
</template>

<script>
import Utils from './utils'
import props from './item-props'
import itemMixin from './item-mixin' 
export default {
  name: 'am-list-item',
  components: {},
  mixins: [itemMixin],
  props: props(),
  data () {
    return {  }
  },
  inject: ['noBorder'],
  computed: {
    showArrow () {
      return this.arrow && this.arrow !== 'empty'
    },
    itemClass () {
      return Utils.makeClassList({
        'am-list-item-tap': this.tapActive,
        'am-list-item-first': !this.noBorder && this._isFirstChild,
        'am-list-item-last': !this.noBorder && this._isLastChild
      })
    },
    lineClass () {
      return Utils.makeClassList({
        'am-list-line-border': !this.noBorder,
        'am-list-line-align-top': this.align === 'top',
        'am-list-line-align-middle': this.align === 'middle',
        'am-list-line-align-bottom': this.align === 'bottom', 
        'am-list-line-last': this._isLastChild
      })
    }, 
    contentTextClass () {
      return Utils.makeClassList({
        'am-list-content-text-disabled': this.titleDisabled
      })
    }
  },
  methods: {
    handleClick ($event) { 
      this.$emit('click', $event)
    }
  }
}
</script>

<style scoped lang="less">
@import './variable.less';
.am-list-extra {
  color: @color-text-caption;
  font-size: @font-size-caption;
}
.am-list-nowrap
{
    overflow: hidden;
    lines: 1;
    
    text-overflow: ellipsis;
}
.am-list {
  &-item {
    position: relative;
    padding-left: @h-spacing-lg; 
    background-color: @fill-base;
    flex-direction: row;
    align-items: center;
    &-tap:active {
      background-color: @fill-tap;
    }
    &-first {
      border-color: @border-color-base;
      border-top-width: @border-width-sm;
    }
    &-last {
      border-color: @border-color-base;
      border-bottom-width: @border-width-sm;
    }
  }
  &-line {
    flex-direction: row;
    align-items: center;
    flex: 1;
    padding-right: @h-spacing-lg;
    padding-top: 10 * @hd;
    padding-bottom: 9 * @hd;
    min-height: @list-item-height; 
    &-border {
      border-bottom-color: @border-color-base;
      border-bottom-width: @border-width-sm;
    }
    &-last {
      border-bottom-width: 0;
    }
    &-align {
      &-top {
        align-items: flex-start;
      }
      &-middle {
        align-items: center;
      }
      &-bottom {
        align-items: flex-end;
      }
    }
    // align-self: stretch;
  }
  &-thumb {
    margin-right: @h-spacing-lg;
    width: @icon-size-md;
    height: @icon-size-md;
  }
  &-content {
    flex: 1;
    margin-right: @h-spacing-sm;
    &-text {
      color: @color-text-base;
      font-size: @font-size-heading; 
      line-height: @line-height-paragraph * @font-size-heading;
	  font-weight: 500;
      &-disabled {
        color: @color-text-disabled;
      }
      &-2 {
        max-width: 2 * @font-size-heading;
      }
  
      &-3 {
        max-width: 3 * @font-size-heading;
      }
  
      &-4 {
        max-width: 4 * @font-size-heading;
      }
  
      &-5 {
        max-width: 5 * @font-size-heading;
      }
  
      &-6 {
        max-width: 6 * @font-size-heading;
      }
  
      &-7 {
        max-width: 7 * @font-size-heading;
      }
    }
    &-brief {
      color: @color-text-caption;
      font-size: @font-size-subhead;
      line-height: @line-height-paragraph * @font-size-heading; 
    }
  }

  &-arrow { 
    margin-left: @h-spacing-md;
    color: #C7C7CC; 
  }
}
</style>
