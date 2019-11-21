<template>
  <div class="footer" :class="[border ? 'footer-top-border' : '']" :style="{backgroundColor:backgroundColor,bottom:bottom+'px',height:height+'px'}">
    <slot></slot>
  </div>
</template>

<style scoped>
  .footer {
    flex-direction: row;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0; 
    justify-content: space-between;
	justify-content: center;
    align-items: center; 
	width:750px;
  } 
  .footer-top-border { 
    border-top-width: 1px;
    border-top-color: #dddddd;
  }
</style>

<script>
export default {
  name: 'footer',
  props: {
    paddingSize: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    bottom: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 100
    },
    border: {
      type: Boolean,
      default: true
    }
  }, 
};
</script>
