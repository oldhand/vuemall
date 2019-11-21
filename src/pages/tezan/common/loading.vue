<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/26. -->
<!--A loading indicator. Custom text supported. -->

<template>
  <div :class="[showLoading && needMask && 'loading-need-mask']"
       @click.native="maskClicked"
       :style="maskStyle">
    <div class="loading" :style="{ top: topPosition +'px'}" v-if="showLoading">
      <div :class="['loading-box',loading.class]" :aria-hidden="true">
        <image :src="loading.url"
               class="loading-trip-image"
               resize="contain"
               quality="original"></image>
        <text v-if="loadingText"
              class="loading-text">{{loadingText}}</text>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .loading-need-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .loading {
    position: absolute;
    left: 225px;
    top: 200px;
    z-index: 9999;
  }

  .loading-box {
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 300px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .trip-loading {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .loading-trip-image {
    height: 105px;
    width: 105px;
  }

  .loading-text {
    color: #ffffff;
    font-size: 24px;
    line-height: 30px; 
    margin-top: 38px; 
    width: 270px;
    text-align: center;
  }
</style>

<script>  
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'default'
      },
      interval: {
        type: [Number, String],
        default: 0
      },
      needMask: {
        type: Boolean,
        default: false
      },
      maskStyle: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      showLoading: false,
      tid: 0
    }),
    watch: {
      show () {
        this.setShow();
      }
    },
    computed: {
      loading () {
        let loading = {};
        switch (this.type) {
          case 'trip':
            loading = {
              url: '/images/trip.gif',
              class: 'trip-loading'
            };
            break;
          default:
            loading = {
              url: '/images/loading.gif',
              class: 'default-loading'
            }
        }
        return loading;
      },
      topPosition () {
        return (this.getPageHeight() - 300) / 2 - 100;
      }
    },
    created () {
      this.setShow();
    },
    methods: {
	    isWeb () {
	      const { platform } = weex.config.env;
	      return typeof (window) === 'object' && platform.toLowerCase() === 'web';
	    },
	    isIOS () {
	      const { platform } = weex.config.env;
	      return platform.toLowerCase() === 'ios';
	    }, 
	    isIPhoneX () {
	      const { deviceHeight } = weex.config.env;
	      if (this.isWeb()) {
	        return typeof window !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375) && (parseInt(window.screen.height, 10) === 812);
	      }
	      return this.isIOS() && deviceHeight === 2436;
	    },
	    isAndroid () {
	      const { platform } = weex.config.env;
	      return platform.toLowerCase() === 'android';
	    },  
	    getPageHeight () {
	      const { env } = weex.config;
	      const navHeight = this.isWeb() ? 0 : (this.isIPhoneX() ? 176 : 132);
	      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
	    },
	      maskClicked () {
	        this.needMask && (this.$emit('wxcLoadingMaskClicked', {}));
	      },
	      setShow () {
	        const { interval, show, showLoading } = this;
	        const stInterval = parseInt(interval);
	        clearTimeout(this.tid);
	        if (show) {
	          if (showLoading) {
	            return;
	          }
	          if (stInterval === 0) {
	            this.showLoading = true;
	          } else {
	            this.tid = setTimeout(() => {
	              this.showLoading = true;
	            }, stInterval);
	          }
	        } else {
	          this.showLoading = false;
	        }
	      }
    }
  };
</script>
