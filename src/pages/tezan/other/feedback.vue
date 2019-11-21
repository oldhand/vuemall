<template>
      <div class="feed-wrapper">  
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >  
		   <am-list>  
		           <am-picker title="请选择" :data="feedbacks" v-model="feedbacktype" >
		           		<am-list-item  slot-scope="{ extra, show }" title="反馈类型:" :extra="extra" :title-number="5" :extra-style="{width:'520px'}" @click.native="show"></am-list-item> 
			       </am-picker>
				   <am-list-input v-model="mobile" type="number" :max-length=11 title="手机号码:" :title-number="5" placeholder="请填写手机号码，方便与您联系"></am-list-input>  
				   <am-list-textarea v-model="content" title="反馈内容:" :rows="4" :title-number="5" placeholder="对我们网站、商品、服务，您还有什么建议吗？请告诉我们，谢谢！"></am-list-textarea>
				   <text class="upload-label">上传图片(最多四张)</text> 
				   <upload class="uploads" :items="items"></upload> 
		 </am-list> 
		</scroller> 
		<topbar :top=50 :show="showtopbar" @topbarclicked="topbarclicked"></topbar>
    </div>
</template> 

<script> 
   
	import picker from '../components/picker.vue'   
	import listitem from '../components/listitem.vue'   
	import list from '../components/list.vue'  
	import input from '../components/input.vue'  
	import textarea from '../components/textarea.vue'  
	import upload from '../common/upload.vue'
	import topbar from '../common/topbar.vue'
	
	
    export default {
	    components: { 
		 'am-picker':picker,
		 'am-list-item':listitem,
		 'am-list':list,
		 'am-list-input':input, 
		 'am-list-textarea':textarea,
		 upload,
		 topbar,
	    },  
	    data() {
	        return {
	            feedbacktype: [],   
				mobile: '',    
				content: '',   
			    feedbacks:[{value: '商品相关',label: '商品相关'},{value: '物流状况',label: '物流状况'},{value: '客户服务',label: '客户服务'},{value: '优惠活动',label: '优惠活动'},
						   {value: '功能异常',label: '功能异常'},{value: '产品建议',label: '产品建议'},{value: '其他',label: '其他'}], 
				items:[], 
				showtopbar:true, 
	        }
	    }, 
		mounted() {    
	    },
        methods: { 
 			topbarclicked()
 			{
				var that = this;
 				this.showtopbar = false;
				if (this.feedbacktype.length == 0)
				{
					this.$notice.toast({ message: '反馈类型必填!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}
				if (this.mobile.length == 0)
				{
					this.$notice.toast({ message: '手机号码必填!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}
				if (this.mobile.length != 11)
				{
					this.$notice.toast({ message: '请填写正确的手机号码!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}
				if (this.content.length == 0)
				{
					this.$notice.toast({ message: '反馈内容必填!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}  
				this.$router.push('/index/usercenter'); 
			}
        }
    }
</script>
<style scoped>
    .feed-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
		background-color: #fafafa;
    }
  	.iconfont {
  	    font-family: iconfont;
  	}  
	.main-list { 
	    position: fixed;
	    top: 0px; 
	    bottom: 0px;
	    left: 0;
	    right: 0;
	}  
	.upload-label
	{
	   padding-left:30px;
	   padding-top:30px;
	}
	.uploads
	{
	   padding-left:20px;
	}
   
</style>