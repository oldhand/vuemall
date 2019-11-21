<template>
    <div :class="[changeDirection,'flex-fluid']">
        <div class="radio-box flex-row" :class="[v.disabled ? 'disabled':'']" @click="select(v)" v-for="v in items">
            <div v-if="value.indexOf(v.value) != -1">
				<text class="iconfont checkbox" @click="select(v)" :style="{color:'#fff',backgroundColor:selectedColor}" name="ion-ios-checkmark">&#xe671;</text>  
			</div>
            <div v-if="value.indexOf(v.value) == -1">
				<text class="iconfont uncheckbox" @click="select(v)" :style="{color:unSelectedColor}" name="ion-ios-checkmark-outline">&#xe671;</text>  
			</div>
            <text class="radio-label" :style="{'font-size':fontSize}">{{v.title || v.value}}</text>
        </div>
    </div>
</template>


<script>
    module.exports = {
        props: {
            "value": {
                type: Array,
            },
            "direction": {
                type: String,
                default: 'horizontal' // horizontal | vertical
            },
            "items": {
                type: Array,
                default(){
                    return [];
                }
            },           
            "selectedColor":{
                type: String,
                default:"#00cc66"
            },
            "unSelectedColor":{
                type: String,
                default:"#9ea7b4"
            }
        },
        computed:{
            changeDirection(){
                return this.direction=="horizontal"? "flex-row":"flex-column";
            }
        },
        data () {
            return {
            }
        },
        methods: {
            select (v) {
                if(v.disabled) return;
                let i = this.value.indexOf(v.value)
                if (i != -1) { 
                    this.value.splice(i, 1); 
                } else { 
                    this.value.push(v.value) 
                }
                this.$emit("change", this.value);
                this.$emit("input", this.value);
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
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;  
}
.checkbox{
  width: 48px;
  height: 48px;
  line-height: 39px;
  font-size: 30px;
  border-radius: 50px; 
  justify-content: center;
  align-items: center;
  text-align:center;
}
.checkbox:active{
  background-color: #f5f5f5; 
}

.uncheckbox {
  width: 48px;
  height: 48px;
  line-height: 39px;
  font-size: 30px;
  border-radius: 50px;
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
.switch-box {
  height: 80px;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
}

.switch {
  position: absolute;
  right: 0px;
  top: 15px;
}

.switch-label {
  font-size: $nb30;
}

.flex-column {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.flex-fluid{
  flex-wrap: wrap;
}

.cb-flex-9{
  flex: 9;
}
.cb-flex-1{
  flex: 1;
  flex-direction:row;
  justify-content:flex-end;
}
</style>
  