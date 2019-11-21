<template>
  <image
    ref="image"
    :src="lazysrc"
    :resize="resize"
    :placeholder="placeholder"
    @load="handleLoad"
	@appear="appear"
    :style="{width:image_width+'px',height:image_height+'px'}"
  />
</template>

<script>
const dom = weex.requireModule('dom')
export default { 
  props: {
    autoWidth: {
      type: Boolean,
      default: false
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 100
    },
    placeholder: {
      type: String,
      default: null
    },
    resize: {
      type: String,
      default: 'stretch',
      validator (val) {
        return ['cover', 'contain', 'stretch'].indexOf(val) >= 0
      }
    },
    src: {
      type: String,
      default: ''
    }, 
  },
  data () {
    return { 
	  lazysrc:'', 
	  image_height:this.height,
	  image_width:this.width,
    }
  }, 
  mounted () {
      this.image_width = this.width; 
	  this.image_height = this.height;  
  },
  methods: {
    appear() {  
      if (this.lazysrc  == '')
	  {
	    	this.lazysrc = this.src;
			console.log('___lazyimage_____'+this.lazysrc+'____');  
	  }  
    },
    handleLoad ($event) {
      if ($event.success && (this.autoWidth || this.autoHeight)) {
        dom.getComponentRect(this.$refs.image, option => { 
          if (!option.result) return
          if (this.autoWidth) {
            this.image_width = option.size.height / $event.size.naturalHeight * $event.size.naturalWidth
			console.log('___lazyimage_____'+this.lazysrc+'__autoWidth____'+this.width+'__'); 
          } else {
            this.image_height = option.size.width / $event.size.naturalWidth * $event.size.naturalHeight
			console.log('___lazyimage_____'+this.lazysrc+'__autoheight____'+this.height+'__'); 
          } 
        });
      }
    }
  }
}
</script>

 
