<template>
      <div class="wrapper">  
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >  
	 	     <div class="user-detail-header">   
	             <mycell :cellStyle="{height:'160px'}" @click="onchangeheadshow"> 
	 			    <text slot="label" class="label">头像</text>  
	 				<image slot="action" class="image" resize="cover" :src=link></image> 
	 				<text slot="action" class="iconfont">&#xe672;</text>
	             </mycell>
	 		</div>
		   <am-list> 
		   	 	   <am-list-input v-model="identifier" :max-length=6 :disabled=true title="    用户ID:" :title-number="5" placeholder=""></am-list-input>
				   <am-list-input v-model="mobile" type="number" :max-length=11 :disabled=true title="手机号码:" :title-number="5" placeholder="未绑定手机"></am-list-input>   
		           <am-list-input v-model="givenname" :max-length=12  title="        昵称:" :title-number="5" placeholder="请输入您的昵称"></am-list-input>
				   <am-list-select :items="genders" :max-length=6  title="        性别:" :title-number="5"></am-list-select>
				   <am-date-picker title="请选择日期" v-model="birthdate" defaultDate="1990-01-01" min-date="1950-01-01" max-date="2018-01-01" format="YYYY-MM-DD">
				          <am-list-item slot-scope="{ extra, show }" title="出生日期:" :title-number="5" :extra="extra" @click.native="show" ></am-list-item>
				   </am-date-picker> 
					  
  	  	           <am-picker title="请选择" :data="areas" :defaultValue="['430000','430100']" v-model="area" @ok="onOK" >
  	  	           		<am-list-item  slot-scope="{ extra, show }" title="        地区:" :extra="extra" :title-number="5" :extra-style="{width:'520px'}" @click.native="show"></am-list-item> 
			       </am-picker>
		 </am-list> 
		 <topbar :show="showtopbar" :top=180 @topbarclicked="topbarclicked"></topbar>
		</scroller>  
    </div>
</template> 

<script> 
    import Vue from 'vue'
	import picker from '../components/picker.vue'   
	import datepicker from '../components/datepicker.vue'   
	import listitem from '../components/listitem.vue'   
	import list from '../components/list.vue'  
	import input from '../components/input.vue'  
	import select from '../components/select.vue' 
	import mycell from '../common/mycell.vue';  
	import topbar from '../common/topbar.vue' 
	
	import { areas } from '../address/baseareas'
	import {get_profileid,get_profile_info,update_profile_info} from '../../../rest/profile.js'   
	import {application,webUrl} from '../../../rest/env'
	
    export default {
	    components: { 
		  mycell,
		 'am-picker':picker,
		 'am-date-picker':datepicker,
		 'am-list-item':listitem,
		 'am-list':list,
		 'am-list-input':input,  
		 'am-list-select':select,
		 topbar, 
	    },  
	    data() {
	        return {
	            genders: [{key:'男',value:'男',selected:true,},{key:'女',value:'女',selected:false,},{key:'保密',value:'',selected:false,}], 
				areas, 
				area:[],
				givenname:'',
				identifier:'',
				mobile:'',
				birthdate:'',
				province:'',
				city:'',
				gender:'',
				link:'', 
				showtopbar:true,
	        }
	    }, 
		mounted() {   
			var that = this; 
			get_profileid().then(profileid => {  
				get_profile_info().then(res => { 
					console.log('__________get_profile_info_____1___' + JSON.stringify(res));  
				    that.identifier = res.identifier;   
					that.givenname = res.givenname;   
					that.gender = res.gender;   
					that.mobile = res.mobile;   
					that.birthdate = res.birthdate;   
					that.province = res.province;   
					that.city = res.city;   
					that.link = res.link;    
					for (var i in that.genders)
					{
					  	if (that.genders[i].value == that.gender)
						{
							that.genders[i].selected = true;
						}
						else
						{
							that.genders[i].selected = false;
						}
					} 
					var temp = [];
					for (var i in that.areas)
					{ 
					   var province = that.areas[i];
					   if (province.label.indexOf(that.province) === 0)
					   { 
					       temp.push(province.value); 	 
						   that.area = temp;
						   if (province.children && province.children.length > 0)	
						   {
		   						for (var j in province.children)
		   						{
									   var city = province.children[j]; 
			  						   if (city.label.indexOf(that.city) === 0)
			  						   {
									       temp.push(city.value); 
										   that.area = temp;
										   break; 
									   }										 
								}
								break;
						   }			   
					   }
					}
					console.log('__________that.area___' + JSON.stringify(that.area));  
				});  
			},
			function(error) {	
				that.logined = false;	 
			}); 
	    },
        methods: { 
			onchangeheadshow()
			{ 
			    var that = this;
			    var params = {supplierid:this.$store.state.supplierid,application:application,profileid:this.profileid};
				var info = { maxCount:1, imageWidth:250, url:webUrl+'/Upload.php', allowCrop:true, header:{}, params :params};
			  	this.$image.pickAndUpload(info).then(resData => {
						    console.log('______pickAndUpload________'+ JSON.stringify(resData)); 
							if (resData[0].state == 200)
							{
							    var link = resData[0].src; 
								that.link = webUrl + link;
			   			        var info = {  link: link };  
				   				update_profile_info(info).then(res => {  
				   				  that.$router.refresh();
				   				}, 
				   		 		function(error) {			
				   		 			that.$notice.toast({ message: error});  
				   		 		});
							}
							else
							{
								that.$notice.toast({ message: resData[0].message });  
							}
				}, error => {
				    console.log('______error________'+ JSON.stringify(error));
					that.$notice.toast({ message: "上传图片失败!" });
				});
			},
			topbarclicked()
			{
			    this.showtopbar = false;
				var that = this;
				if (that.givenname.length == 0)
				{
					that.$notice.toast({ message: '昵称必填!' }); 
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}
				if (that.birthdate.length == 0)
				{ 
					that.$notice.toast({ message: '出生日期必填!' }); 
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}
				if (that.province.length == 0)
				{ 
					that.$notice.toast({ message: '地区必填!' }); 
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}    
				for (var i in that.genders)
				{
				  	if (that.genders[i].selected)
					{
						that.gender = that.genders[i].value;
					} 
				}
			    var info = { 
					    givenname: that.givenname, 
					    gender: that.gender,
					    province: that.province,
						city:that.city, 
					    birthdate: that.birthdate,  
						mobile: that.mobile,   
					};  
				update_profile_info(info).then(res => {   
					that.$router.replace('/index/usercenter'); 
				}, 
		 		function(error) {			
		 			that.$notice.toast({ message: error});  
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
		 		}); 
			}, 
  	    	onOK (items,lables) {  
 				if (this.area.length == 2)
 				{
 				    this.province = lables[0];
 					this.city = lables[1];  
 				}
 				else if (this.area.length == 1)
 				{
 					this.province = lables[0];
 					this.city = ''; 
 				}
  	       },
        }
    }
</script>
<style scoped>
    .wrapper {
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
    .header{
         margin-top: 30px;
    } 
 	.label
 	{  
 		 padding-left:55px; 
 	}
 	.image
 	{
 		width:80px;
 		height:80px;
		margin-right:10px; 
 	}
	.main-list { 
	 	margin-top: 0px;
		top:0;
	    margin-bottom: 0px;
	}  
</style>