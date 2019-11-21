<template>
  <div class="am-picker">
    <am-popup
      ref="popup"
      :show="currentShow"
      :auto-close="false"
      @clickmask="handleMaskClick"
      :height="562"
    >
      <am-nav-bar
        class="am-picker-header"
        mode="light"
        :title="title"
        :left-btn="[{is: 'text', text: dismissText, key: 'dismiss'}]"
        :right-btn="[{is: 'text', text: okText, key: 'ok'}]"
        @myclick="handleHeaderClick"
      ></am-nav-bar>
	  
      <am-picker-view
        :data="data"
        :value="currentValue"
        ref="pickerView"
      ></am-picker-view>
	  
    </am-popup>
    <slot :extra="extra" :show="() => {currentShow = true}"></slot>
  </div>
</template>

<script>
import AmPopup from './popup.vue'
import AmNavBar from './navbar.vue'
import AmPickerView from './pickerview.vue'
import ListItemMixin from './item-mixin'
import Utils from './utils'

export default {
  name: 'am-picker',
  mixins: [ListItemMixin],
  components: { AmPopup, AmNavBar, AmPickerView },
  model: {
    prop: 'value',
    event: 'ok'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array, // Array<Array<{value, label, children: Array}>>
      default: () => []
    },
    value: {
      type: Array,
      default: []
    },
	defaultValue:{
      type: Array,
      default: null
	},
    okText: {
      type: String,
      default: '确定'
    },
    dismissText: {
      type: String,
      default: '取消'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    format: {
      type: [Function, String],
      default: (lables) => lables.join('-')
    }
  },
  data () {
    return {
      currentShow: this.show,
      currentValue: this.value || [],
      selected: null
    }
  },
  computed: {
    lables () {
      return this.selected ? this.selected.map(item => item.label) : []
    },
    extra () {
      return this.format(this.lables) || this.placeholder
    }
  },
  methods: {
    initData () {
      if (this.currentValue) {
        const isCascade = this.data[0] && Utils.isPlainObject(this.data[0])
        this.selected = []
        this.currentValue.some((value, index) => {
          let current = isCascade
            ? (index === 0 ? this.data : this.selected[index - 1].children)
            : this.data[index]

          current.some(item => {
            if (item.value === this.currentValue[index]) {
              this.selected[index] = item
              return true
            }
          })
          return !this.selected[index]
        })
      }
    },
    close (type = 'dismiss') {
      this.$emit('hide', type)
      this.currentShow = false
    },
    handleMaskClick () {
      this.close('dismiss')
    },
    handleHeaderClick (type) {
	  console.log('__________handleHeaderClick__________________'); 
      switch (type) {
        case 'ok':
          this.selected = [...this.$refs.pickerView.selected]
          this.currentValue = [...this.$refs.pickerView.selectedValue]
          this.$emit('ok', this.currentValue, this.lables)
          this.close('ok')
          break
        case 'dismiss':
          this.close('dismiss')
          break
      }
    }
  },
  watch: {
    currentShow (val) {
	  if (this.currentValue == "" && this.defaultValue != null)
	  {
		  this.currentValue = this.defaultValue;
	  }
      if (this.show !== val) {
        this.$emit('update:show', val)
      }
    },
    show (val) {
      if (this.currentShow !== val) {
        this.currentShow = val
      }
    },
    value (val) {
      if (val.join() !== this.currentValue.join()) {
        this.currentValue = val
        this.initData()
      }
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped lang="less">
@import './variable.less';
.am-picker {
  &-header {
    height: @picker-header-height;
    border-color: @border-color-base;
    border-bottom-width: @border-width-sm;
  }
}
</style>
