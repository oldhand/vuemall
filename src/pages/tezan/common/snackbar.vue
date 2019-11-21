<!-- CopyRight (C) 2018-2022 FlymeApps Group Holding Limited. -->
<!-- Created and Update by Yanjiie on 2018/04/12. -->
<template>
	<div ref="snackbar"
		v-if="show" 
		class="snackbar"
		:style="barStyle"
		@click="snackClick">
		<slot name="title">
			<text class="title" :style="{ color: titleColor }">{{ title }}</text>
		</slot>
		<slot name="right"> 
		     <div class="close">
			     <text v-if="closeIcon" class="iconfont closeIcon" :style="{ color: closeColor }">&#xe67a;</text> 
				 <text v-if="closeText != ''" class="iconfont closeText" :style="{ color: closeColor }" @click="ctrClick">{{closeText}}</text>
			 </div>
		</slot>
	</div>
</template>

<style scoped>
	.snackbar {
		position: fixed;
		left: 0;
		right: 0; 
		bottom: 0;
		background-color: #FFFFFF;
		flex-direction: row;
		padding: 0 50px;
		justify-content: space-between;
		align-items: center;
		min-height: 0;
	}

	.title, .closeText {
		font-size: 24px; 
		font-weight: 500;
		font-family: sans-serif-medium;
	}  
	.closeText {
		color:#ffffff;
	}
	.closeIcon
	{
		color:#ffffff;
		font-size: 24px; 
		font-weight: 500;
		padding-top:5px;
		padding-right:10px;
	}
	.close
	{
	   flex-direction: row;
	}
	.rotate {
		font-size: 54px;
    	height: 54px;
		font-weight: 700;
		transform: rotate(180deg);
	}
	.iconfont {
	    font-family: iconfont;
	}

</style>

<script>
const animation = weex.requireModule('animation');   
export default {
  name: 'snackbar', 
  components: {  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    
    backgroundColor: {
      type: String,
      default: '#ddd'
    },
    title: String,
    titleColor: {
      type: String,
      default: '#b4272d'
    },
    closeText: {
      type: String,
      default () {
        return '';
      }
    },
    closeIcon: {
      type: Boolean,
      default: false
    },
    closeColor: {
      type: String,
      default: '#198DED'
    },
    height: {
      type: Number,
      default: 80
    },
    bottom: {
      type: Number,
      default: 0
    },
    animation: {
      type: Object,
      default: () => ({
        timingFunction: 'ease-out'
      })
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    stayTime: {
      type: Number,
      default: 3000
    },  
  }, 
  watch: {
     show () {
	  	  var that = this;
	  	  if (this.isshow != this.show)
	  	  {
	  		  this.isshow = this.show;
	  	      setTimeout(() => {
	  	           that.appearBar(this.show);
	  	      }, 50);     
	  	  }
    }, 
  },
  computed: {
    barStyle () {
      const { height,backgroundColor } = this;
      return {
        backgroundColor: backgroundColor,
        bottom: `${-height}px`,
        height: `${height}px`
      };
    }, 
  },
  data: () => ({
      timer: null,
	  isshow:false,
  }), 
  methods: { 
      appearBar (bool, duration = 150) {
		  if (!bool)
		  {
			  this.isshow = false;
			  this.isNeedShow = false;
		  }   
	      const popupEl = this.$refs['snackbar'];
	      if (!popupEl) { return; }
	      animation.transition(popupEl, {
		        styles: {
		          transform: this.getTransform(this.height+this.bottom, bool)
		        },
		        duration,
		        delay: 0,
		        ...this.animation
	      }, 
		  () => {
		        const { autoClose, stayTime } = this;
		        if (bool && autoClose) 
				{
			          this.timer = setTimeout(() => 
					  {
			            this.appearBar(false);
			          }, stayTime);
		        } 
				else if (!bool) 
				{ 
			          this.$emit('snackbarclose');
		        }
	      });
    },
    getTransform (height, bool) {
      bool || (height = 0); 
      return `translateY(-${height}px)`;
    },
    hide () {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.appearBar(false);
    },
    ctrClick () { 
      this.hide();
    },
    snackClick () {  
      this.hide(); 
      this.$emit('snackbarclose');
    }
  }
};
</script>


