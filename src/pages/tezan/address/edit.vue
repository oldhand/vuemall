<template>
      <div class="wrapper">  
		 <scroller class="main-list" offset-accuracy="300px" @scroll="scroll" >  
		   <am-list> 
		           <am-list-input v-model="consignee" :max-length=12  title="    收货人:" :title-number="5" placeholder="请输入收货人姓名"></am-list-input>
				   <am-list-input v-model="mobile" type="number" :max-length=11 title="手机号码:" :title-number="5" placeholder="请输入收货人手机号码"></am-list-input>
  	  	           <am-picker title="请选择" :data="areas" v-model="baseaddress" @ok="onOK" >
  	  	           		<am-list-item  slot-scope="{ extra, show }" title="基本地址:" :extra="extra" :title-number="5" :extra-style="{width:'520px'}" @click.native="show"></am-list-item> 
			       </am-picker> 
				   
				   <am-list-textarea v-model="shortaddress" title="详细地址:" :rows="2" :title-number="5" placeholder="请输入详细地址"></am-list-textarea>
					  
				   <am-list-input v-model="zipcode" type="number" :max-length=6 title="邮政编码:" :title-number="5" placeholder="请输入邮政编码"></am-list-input> 
				   <am-list-input title="设置为默认地址" :title-number="8">
				    		<am-switch v-model="selected" slot="extra"></am-switch>
				   </am-list-input>  
		 </am-list>
 	     <div class="delete-wrapper" v-if="deliveraddressid != 0">    
             <div class="delete" @click="ondeleteclick">
                 <text class="delete-txt">删除收货地址</text>
             </div>
 		</div> 
		<topbar :top=50 :show="showtopbar" @topbarclicked="topbarclicked"></topbar>
		</scroller> 
    </div>
</template> 

<script> 
    import Vue from 'vue'
	import picker from '../components/picker.vue'   
	import listitem from '../components/listitem.vue'   
	import list from '../components/list.vue'  
	import input from '../components/input.vue' 
	import myswitch from '../components/switch.vue' 
	import textarea from '../components/textarea.vue' 
	
	import topbar from '../common/topbar.vue'
	
	import { areas } from './areas'
	import { getdeliveraddress_info,savedeliveraddress_info,deletedeliveraddress_info} from './config'  
	
    export default {
	    components: { 
		 'am-picker':picker,
		 'am-list-item':listitem,
		 'am-list':list,
		 'am-list-input':input,
		 'am-switch':myswitch,
		 'am-list-textarea':textarea,
		 topbar,
	    },  
	    data() {
	        return {
	            consignee: '',   
				mobile: '',   
				province: '',  
				city: '',  
				district: '',  
				shortaddress: '',  
				zipcode: '', 
				address: '',  
				selected: false, 
			    areas,
			    baseaddress: [], 
				deliveraddressid:0,
				params:{},  
				showtopbar:true,
	        }
	    }, 
		mounted() {     
		    this.params = this.$route.query; 
	   		this.deliveraddressid = this.params.openid;
			if (this.deliveraddressid != '' && this.deliveraddressid != 0)
			{
		   	    getdeliveraddress_info(this.deliveraddressid).then(res => {   
				    this.consignee = res.consignee;
					this.mobile = res.mobile;
				    this.province = res.province;
					this.city = res.city;
				    this.district = res.district;
					this.shortaddress = res.shortaddress;
				    this.zipcode = res.zipcode;
					this.selected = res.selected; 
					var baseaddress = [];
			
					for (var i in this.areas)
					{ 
					   var province = this.areas[i];
					   if (province.label == this.province)
					   { 
					       baseaddress.push(province.value); 	
						   this.baseaddress = baseaddress;
						   if (province.children && province.children.length > 0)	
						   {
		   						for (var j in province.children)
		   						{
									   var city = province.children[j]; 
			  						   if (city.label == this.city)
			  						   {
									       baseaddress.push(city.value);
										   this.baseaddress = baseaddress;
										   if (city.children && city.children.length > 0)	
										   {
						   						for (var j in city.children)
						   						{
													   var district = city.children[j]; 
							  						   if (district.label == this.district)
							  						   {
													       baseaddress.push(district.value);
														   this.baseaddress = baseaddress;
														   break;
													   }										 
												}
												break;
										   }
									   }										 
								}
								break;
						   }			   
					   }
					}
				});
			}   
	    },
        methods: { 
			topbarclicked()
			{  
			    var that = this;
				this.showtopbar = false;
				if (this.consignee.length == 0)
				{
					this.$notice.toast({ message: '收货人必填!' });
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
				if (this.province.length == 0)
				{
					this.$notice.toast({ message: '基本地址必填!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}
				if (this.shortaddress.length == 0)
				{
					this.$notice.toast({ message: '详细地址必填!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}
				if (this.shortaddress.length < 5)
				{
					this.$notice.toast({ message: '详细地址填写得过于简单!' });
			        setTimeout(() => {
			          that.showtopbar = true;
			        }, 500);
					return;
				}
			
			
			    var info = {
					    id: this.deliveraddressid,
					    consignee: this.consignee, 
					    mobile: this.mobile,
					    province: this.province,
						city:this.city, 
					    district: this.district,  
						shortaddress: this.shortaddress,
						zipcode: this.zipcode,
					    address: this.province+this.city+this.district+' '+this.shortaddress, 
						selected: this.selected,   
					};
				savedeliveraddress_info(info).then(res => { 
			        if (this.params.from == 'shoppingcart' || this.params.from == 'detail')
					{ 
					   this.params.selectdeliveraddressid = this.deliveraddressid;
					   this.$router.replace({path:'/selectaddress',query:this.params});  
					}
					else
					{
					 	this.$router.replace('address');   
					} 
				});
			},
 	    	onOK (items,lables) { 
				if (this.baseaddress.length == 3)
				{
				    this.province = lables[0];
					this.city = lables[1];
				    this.district = lables[2];
				}
				else if (this.baseaddress.length == 2)
				{
				    this.province = lables[0];
					this.city = lables[1]; 
					this.district = '';
				}
				else if (this.baseaddress.length == 1)
				{
					this.province = lables[0];
					this.city = '';
				    this.district = '';
				}
 	       },
		   ondeleteclick () { 
				deletedeliveraddress_info(this.deliveraddressid).then(res => {
			        if (this.params.from == 'shoppingcart' || this.params.from == 'detail')
					{ 
					   this.params.selectdeliveraddressid = '';
					   this.$router.push({path:'/selectaddress',query:this.params});    
					}
					else
					{
			 	 		  this.$router.push('address');
					} 
				});
		   }
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
	.address-border
	{
		width:750px;
		height:4px;
	}
    .address-info{
        margin-top: 2px;
		width:750px;  
		padding-top:10px;
    } 
    .address-icon { 
	    font-size: 60px;  
		width:80px;
    }
	.main-list { 
	    margin-bottom: 0px;
	}  
    .delete-wrapper{ 
        margin-top: 40px;
	    align-items: center;
	    justify-content: center;
    }
    .delete {
        height: 100px;
        width: 750px;
        background-color: #ffffff;  
    }
    .delete:active {
      background-color: #eeeeee;
    }
    .delete-txt{
        height: 100px; 
        text-align: center;
        line-height: 100px;
        color: #b4272d;
        font-size: 35px;
    }
</style>