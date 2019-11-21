<template>
    <div class="flex-fluid">
        <div class="radio-box flex-row" :class="[disabled ? 'disabled':'']" @click="select()">
            <div v-if="checked">
				<text class="iconfont checkbox" @click="select()" :style="{color:'#fff',backgroundColor:selectedColor}">&#xe671;</text>  
			</div>
            <div v-else>
				<text class="iconfont uncheckbox" @click="select()" :style="{color:unSelectedColor}">&#xe671;</text>  
			</div>
            <text class="radio-label">{{label}}</text>
        </div>
    </div>
</template>


<script>
    module.exports = {
        props: {
            "value": {
                type: Boolean,
				default: false
            }, 
            "disabled": {
               type: Boolean,
				default:false
            },
            "label": {
                type: String,
                default: "label"
            },           
            "selectedColor":{
                type: String,
                default:"#b4272d"
            },
            "unSelectedColor":{
                type: String,
                default:"#9ea7b4"
            }
        },  
	    data () {
	      return {
	          checked: false
	      }
	    },
        mounted () {
            this.checked = this.value; 
        },
	    watch: {
	      value (val) {
		        if (this.checked !== val) {
		          this.checked = val
		        }
	      }, 
	    },
        methods: { 
            select (e) {   
                if (this.checked)
				{
					this.checked = false;
				}
				else
				{
					this.checked = true;
				}  
                this.$emit("checkchange", this.checked); 
            }
        },
    }
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}
.radio-box {
  align-items: center;
  justify-content: flex-start;
}
.checkbox{
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  border-radius: 20px; 
  justify-content: center;
  align-items: center;
  text-align:center;
}
.checkbox:active{
  background-color: #f5f5f5; 
}

.uncheckbox {
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  border-radius: 20px; 
  background-color: #f5f5f5; 
  justify-content: center;
  align-items: center;
  text-align:center;
  border-width: 1px;
  border-color: #e2e2e2;
}

.radio-label {
  font-size: 30px;
  margin-left: 5px;;
}

.disabled {
  opacity: 0.5;
}
  
.flex-row {
  flex-direction: row;
}

.flex-fluid{
  flex-wrap: wrap;
}  
</style>
  