<template>
  <item
    arrow=""
    :title="title"
    :thumb="thumb"
    :thumb-style="thumbStyle"
    :title-disabled="disabled"
    :tap-active="!disabled"
    :brief="brief"
    :align="align"
    @click="handleClick"
  >
    <template slot="thumb">
      <slot name="thumb"></slot>
    </template>
    <template slot="brief">
      <slot name="brief"></slot>
    </template>
    <div slot="extra" class="am-radio" v-if="checked">
      <div :class="innerClass" :style="innerStyle"></div>
    </div>
    <template slot="border">
      <slot name="border"></slot>
    </template>
  </item>
</template>

<script>
import Utils from './utils'
import itemMixin from './item-mixin'
import Item from './listitem.vue'
export default {
  name: 'am-list-radio',
  components: {
    Item
  },
  mixins: [itemMixin],
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    thumb: {
      type: String,
      default: null
    },
    thumbStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    brief: {
      type: String,
      default: null
    },
    align: {
      type: String,
      default: 'middle'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    }
  },
  data () {
    return {}
  },
  computed: {
    innerClass () {
      return Utils.makeClassList({
        'am-radio-inner': true,
        'am-radio-inner-disabled': this.disabled
      })
    },
    innerStyle () {
      const style = {}
      if (this.color && !this.disabled) {
        style.borderColor = this.color
      }
      return style
    }
  },
  methods: {
    handleClick ($event) {
      if (this.disabled) return
      this.$emit('change', $event)
    }
  }
}
</script>

<style scoped lang="less">
@import './variable.less'; 
.am-radio {
  margin-right: 8 * @hd;
  transform: rotate(45deg);
  &-inner { 
    width: 8 * @hd;
    height: 16 * @hd;
    border-style: solid;
    border-right-width: 1.5 * @hd;
    border-bottom-width: 1.5 * @hd;
    border-color: @brand-primary;
    box-sizing: content-box;
    &-disabled {
      border-color: @color-text-disabled;
    }
  }
}
</style>
