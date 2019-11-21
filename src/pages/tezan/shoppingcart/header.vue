<template>
    <div class="wrapper"> 
	    <div class="left">
	        <text class="leftTxt">&nbsp;</text>
	    </div> 
        <text class="tlt">购物车</text>
        <div class="right" @click="oneditclick">
            <text class="rightTxt">{{editlabel}}</text>
        </div>
    </div>
</template>
<script>
export default {
     props: {
	     status: {
	       type: Boolean,
	       default: false
	     },
	 },
     data() {
         return { 
 	  	    isedit: false,  
			editlabel: '编辑',  
         }
     },
    watch: {
      status () {
           setTimeout(() => {  this.onstatuschange(); }, 50);
      }, 
    },
	 methods: {
		 onstatuschange()
		 {
			if (!this.status)
			{
				this.isedit = false; 
				this.editlabel = '编辑';
			}
			else
			{
				this.isedit = true; 
				this.editlabel = '完成';
			}
		 },
		 oneditclick()
		 {
	 			if (this.isedit)
				{
					this.isedit = false;
					this.status = false;
					this.editlabel = '编辑';
				}
				else
				{
					this.isedit = true;
					this.status = true;
					this.editlabel = '完成';
				}   
				this.$emit('editchanged', this.isedit);  
		},
	 },
}
</script>
<style scoped>
.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 74px;
    padding-top: 00px;
    background-color: #fafafa;
    opacity: .99;
    z-index: 101;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    border-bottom-width: 1px;
    border-bottom-color: #d9d9d9;
}

.tlt {
    flex: 1;
    font-size: 36px;
    padding-top: 15px;
    color: #333333;
    text-align: center;
}

.left,
.right {
    height: 80px;
    width: 120px;
     padding-top: 20px;
}

.leftTxt,
.rightTxt {
    font-size: 30px;
    text-align: center;
}
</style>