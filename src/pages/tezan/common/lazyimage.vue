<template>
  <div>
   	    <image ref="loadimage" resize="cover" :class="[border ? 'lazyimage' : '']" :style="{width:width+'px',height:height+'px'}" :src="lazysrc" :placeholder="placeholder" @appear="appear()"></image>
  </div>
</template>

<style scoped>
  .lazyimage {   		 
	    border-width: 1px;
	    border-color: #cccccc;
  } 
</style>

<script>
const dom = weex.requireModule('dom');

export default { 
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    src: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: "/images/placeholder.jpg"
    },
    index: {
      type: Number,
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 8
    },
  },  
  data() {
      return {
          lazysrc: '',  
      }
  },
  mounted(){   
  		setTimeout(() => {  this.on_src_changed(); }, 200);		 
  },
  methods: { 
	  on_src_changed() {  
  	      if (this.lazysrc == '' && this.index <= this.limit )
  		  {
		      if (this.src != '')
			  {
		    	this.lazysrc = this.src;
				console.log('___lazyimage___timeout__'+this.lazysrc+'__'+this.limit+'__'+this.index+'____');
			  } 
			  else
			  {
			 	 setTimeout(() => {  this.on_src_changed(); }, 500);	
			  }
  		  }   
	  },
	  appear() {  
	      if (this.lazysrc  == '')
		  {
		    	this.lazysrc = this.src;
				console.log('___lazyimage___appear__'+this.lazysrc+'__'+this.limit+'__'+this.index+'____');  
		  }  
	  }
   }
};
</script>
