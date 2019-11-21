<template>
  <div class="stepper">
    <div class="stepper-minus"
         @click="minusClicked"
         aria-label="减数"
         :accessible="true">
      <text class="stepper-icon" :style="{ color: isLess?'#cccccc':'#666666' }">-</text>
    </div>
    <input class="stepper-input"
           type="number"
           :value="valueString"
           @input="onInput"
           @blur="onBlur"
           :style="disableStyle"
           :disabled="disabled||readOnly"/>
    <div class="stepper-plus"
         @click="plusClicked"
         aria-label="加数"
         :accessible="true">
      <text class="stepper-icon" :style="{ color: isOver ? '#cccccc': '#666666' }">+</text>
    </div>
  </div>
</template>

<style scoped>
  .stepper {
    flex-direction: row; 
  }

  .stepper-plus, .stepper-minus {
    width: 56px;
    height: 56px;
    background-color: #ededed;
    align-items: center;
    justify-content: center;  
  }
  
  .stepper-minus {
	  border-top-left-radius: 8px; 
	  border-top-right-radius: 0px; 
	  border-bottom-right-radius: 0px; 
	  border-bottom-left-radius: 8px; 
  }
  
  .stepper-plus {
	  border-top-left-radius: 0px; 
	  border-top-right-radius: 8px; 
	  border-bottom-right-radius: 8px; 
	  border-bottom-left-radius: 0px; 
  }
  

  .stepper-input {
    border-width: 0;
    text-align: center;
    color: #3d3d3d;
    font-size: 30px;
    line-height: 56px;
	height: 56px;
    width: 86px;
    border-bottom-width: 2px;
    border-bottom-color: #ededed;
    border-top-width: 2px;
    border-top-color: #ededed;
  }

  .stepper-icon {
    font-size: 36px;
    color: #666666;
    margin-top: -4px;
  }

</style>

<script>
  export default {
    props: {
      min: {
        type: [String, Number],
        default: 1
      },
      max: {
        type: [String, Number],
        default: 100
      },
      step: {
        type: [String, Number],
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      defaultValue: {
        type: [String, Number],
        default: 1
      },
      readOnly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      disableStyle () {
        if (this.disabled) {
          return {
            color: '#cccccc'
          }
        }
      },
      valueString () {
        return this.value.toString();
      }
    },
    data: () => ({
      value: 1,
      isLess: false,
      isOver: false
    }),
    watch: {
      defaultValue (newNum) {
        this.value = newNum;
      }
    },
    created () {
      this.value = parseInt(this.defaultValue, 10);
      if (this.disabled) {
        this.isLess = true;
        this.isOver = true;
      }
    },
    methods: {
      minusClicked () {
	        if (this.disabled) {
	          return;
	        }
	        const isMinOver = parseInt(this.value, 10) <= parseInt(this.min, 10);
	        const nowNum = parseInt(this.value, 10) - parseInt(this.step, 10);
	        if (isMinOver) {
	          this.$emit('steppervalueisminover', { value: this.value });
	        } else {
	          this.value = nowNum;
	          this.resetDisabledStyle();
	        }
	        // 由于此处已经减step
	        if (nowNum <= this.min) {
	          this.value = parseInt(this.min, 10);
	          this.isLess = true;
	        }
	        this.$emit('steppervaluechanged', { value: this.value });
      },
      plusClicked () {
	        if (this.disabled) {
	          return;
	        }
	        const isMaxOver = parseInt(this.value, 10) >= parseInt(this.max, 10);
	        const nowNum = parseInt(this.value, 10) + parseInt(this.step, 10); 
	        if (isMaxOver) {
	          this.$emit('steppervalueismaxover', { value: this.value });
	        } else {
	          this.value = nowNum;
	          this.resetDisabledStyle();
	        }
	        // 由于此处已经加step
	        if (nowNum >= this.max) {
	          this.value = parseInt(this.max, 10);
	          this.isOver = true;
	        } 
	        this.$emit('steppervaluechanged', { value: this.value });
      },
      onInput (e) {
        	this.correctInputValue(e.value);
      },
      onBlur (e) {
        	this.correctInputValue(e.value);
      },
      correctInputValue (v) {
	        if (/^[1-9]\d{0,}$/.test(v) && parseInt(v, 10) >= this.min && parseInt(v, 10) <= this.max) {
	          this.value = parseInt(v, 10);
	        }
	        this.$emit('steppervaluechanged', { value: this.value });
      },

      resetDisabledStyle () {
	        this.isLess = false;
	        this.isOver = false;
      }
    }
  };
</script>
