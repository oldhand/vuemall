<template>
  <div :style="{width:width+'px'}">
    <text class="html-text" :ref="'text_'+index" :style="item.style" v-for="(item,index) in templateArr" v-if="!item.img">{{item.content}}</text>
	<lazyimage :width="width" :height=500 auto-height resize="cover"  placeholder="/images/placeholder.jpg" v-else :src="item.img.src" ></lazyimage>  
  </div>
</template>
<style scoped>
   
  .html-text { 
	padding:0px;
	line-height: 40px; 
	font-size: 25px;
	color: #333333;    
  }  
  .html-image { 
	height: 750px;
	padding:0px;
  }    
</style>
<script>
  const animation = weex.requireModule('animation')
  import lazyimage from './image.vue'
  export default {
	  components: {
	     lazyimage,  
	  },
    props: {
      inner: {
        default: ""
      }, 
	  width:
	  {
	      type: Number,
	      default: 750
	  }
    },
    computed: {
      templateArr: function() {
        return this.transform(this.inner);
      }
    },  
    methods: {
       onimageload (event) {
         if (event.success) {
		    var index = event.target.attr.index; 
            animation.transition(this.$refs['image_'+index], {
                styles: {
                    height: 750 * event.size.naturalHeight / event.size.naturalWidth  + 'px',
                },
                duration: 300,
				needLayout: true,
                timingFunction: 'ease-out',
                delay: 0
            }) 
         }
       },
      transform: function (html){
	    html = html.replace(/&lt;/g, '<');
		html = html.replace(/&gt;/g, '>');
        var arr = html.match(/<p.*?>(.*?)<.*?\/p>/g);
        if (!arr || !arr.length) return;
        var templateArr = [];
        for (var i = 0; i < arr.length; i++) {
          var obj = {
            content: '',
            style: {},
            img: false
          };
          //处理外层p的align
          if(/<p.*align="(\w+)".*>/.test(arr[i])) {
            obj.style.textAlign = /<p.*?align="(\w+)".*?>/.exec(arr[i])[1];
          }
          var inner = /<p.*?>(.*)<\/p>/.exec(arr[i])[1];
          if (!inner.length) continue;
          if(/<img.*?\/>/.test(inner)) {
            //处理图
            obj.img = true;
            obj.img = {
              //style: /style="(.+?)"/.exec(inner)[1],
              src: /src="(.+?)"/.exec(inner)[1]
            };
          }
          else {
            if (/<strong.*?>(.*)<\/strong>/.test(inner)){
                obj.style.fontWeight = 'bold';
                obj.content = contentHandler(/<strong.*?>(.*)<\/strong>/.exec(inner)[1]);
            } else {
                obj.content = contentHandler(inner);
            }
          }
          templateArr.push(obj);
        }
        return templateArr;
        function contentHandler(str) {
          var str2 = str.replace(/&nbsp;/g, '');
          return str2.replace(/<.*?>/g, '');
        }
      }
    }
  }
</script>