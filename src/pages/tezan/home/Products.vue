<template>
    <div class="products-wrapper"> 
        <div class="singlerow-box" v-if="indexcolumns == 1">
            <div class="singlerow" v-for="(i,index) in products">
                <div :ref="'shoppingcart_'+i.productid" class="gd-bg" @click="showdetail(i.productid)"> 
					<lazyimage :width=750 :height=537 :border=false :src="i.productlogo" :index="index" :limit=4 ></lazyimage>
                </div> 
                <text class="singlerow-tlt">{{i.productname}}</text>
				<div :ref="'shoppingcart_'+i.productid" class="singlerow-txt-info" @click="onaddshoppingcartclick(i.productid,i.productlogo)">
	                <text class="gd-price">¥{{i.shop_price}}</text> 
					<text class="shoppingcart-icon iconfont" v-if="logined && i.hasproperty === 0">&#xe62f;</text>  
				</div>
            </div>
	   </div>
	   <div class="doublerow-box" v-if="indexcolumns == 2">
            <div class="doublerow" v-for="(i,index) in products">
                <div :ref="'shoppingcart_'+i.productid" class="gd-bg" @click="showdetail(i.productid)"> 
					<lazyimage :width=365 :height=261 :border=false :src="i.productlogo" :index="index" :limit=6 ></lazyimage>
                </div> 
                <text class="doublerow-tlt">{{i.productname}}</text>
				<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(i.productid,i.productlogo)" >
	                <text class="gd-price">¥{{i.shop_price}}</text> 
					<text class="shoppingcart-icon iconfont" v-if="logined && i.hasproperty === 0">&#xe62f;</text>  
				</div>
            </div>
        </div>
 	   <div v-if="indexcolumns == 3"> 
               <div v-for="(item,index) in productlength">
				   	   <div class="singlerow-box">
			               <div class="singlerow" v-if="productcount >= index*columnlength + 1">
			                    <div :ref="'shoppingcart_'+products[index*columnlength + 0].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 0].productid)"> 
			   						<lazyimage :width=750 :height=537 :border=false :src="products[index*columnlength + 0].productlogo" :index="index" :limit=4 ></lazyimage>
			                    </div> 
			                    <text class="singlerow-tlt">{{products[index*columnlength + 0].productname}}</text>
				   				<div :ref="'shoppingcart_'+products[index*columnlength + 0].productid" class="singlerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 0].productid,products[index*columnlength + 0].productlogo)">
				   	                <text class="gd-price">¥{{products[index*columnlength + 0].shop_price}}</text> 
				   					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 0].hasproperty === 0">&#xe62f;</text>  
				   				</div>
						   </div>	
		               </div> 
					   <div class="doublerow-box">
				             <div class="doublerow" v-if="productcount >= index*columnlength + 2">
				                <div :ref="'shoppingcart_'+products[index*columnlength + 1].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 1].productid)"> 
									<lazyimage :width=365 :height=261 :src="products[index*columnlength + 1].productlogo" :index="index" :limit=6 ></lazyimage>
				                </div> 
				                <text class="doublerow-tlt">{{products[index*columnlength + 1].productname}}</text>
								<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 1].productid,products[index*columnlength + 1].productlogo)" >
					                <text class="gd-price">¥{{products[index*columnlength + 1].shop_price}}</text> 
									<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 1].hasproperty === 0">&#xe62f;</text>  
								</div>
				             </div> 
				             <div class="doublerow" v-if="productcount >= index*columnlength + 3">
				                 <div :ref="'shoppingcart_'+products[index*columnlength + 2].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 2].productid)"> 
				 					<lazyimage :width=365 :height=261 :src="products[index*columnlength + 2].productlogo" :index="index" :limit=6 ></lazyimage>
				                 </div> 
				                 <text class="doublerow-tlt">{{products[index*columnlength + 2].productname}}</text>
				 				<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 2].productid,products[index*columnlength + 2].productlogo)" >
				 	                <text class="gd-price">¥{{products[index*columnlength + 2].shop_price}}</text> 
				 					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 2].hasproperty === 0">&#xe62f;</text>  
				 				</div>
				             </div>
				       </div>
			   </div> 
       </div>
  	   <div v-if="indexcolumns == 4"> 
                <div v-for="(item,index) in productlength">
	 			   	   <div class="singlerow-box">
	 		               <div class="singlerow" v-if="productcount >= index*columnlength + 1">
	 		                    <div :ref="'shoppingcart_'+products[index*columnlength + 0].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 0].productid)"> 
	 		   						<lazyimage :width=750 :height=537 :border=false :src="products[index*columnlength + 0].productlogo" :index="index" :limit=4 ></lazyimage>
	 		                    </div> 
	 		                    <text class="singlerow-tlt">{{products[index*columnlength + 0].productname}}</text>
	 			   				<div :ref="'shoppingcart_'+products[index*columnlength + 0].productid" class="singlerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 0].productid,products[index*columnlength + 0].productlogo)">
	 			   	                <text class="gd-price">¥{{products[index*columnlength + 0].shop_price}}</text> 
	 			   					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 0].hasproperty === 0">&#xe62f;</text>  
	 			   				</div>
	 					   </div>	
	 	               </div> 
	 			   	   <div class="singlerow-box">
	 		               <div class="singlerow" v-if="productcount >= index*columnlength + 2">
	 		                    <div :ref="'shoppingcart_'+products[index*columnlength + 1].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 1].productid)"> 
	 		   						<lazyimage :width=750 :height=537 :border=false :src="products[index*columnlength + 1].productlogo" :index="index" :limit=4 ></lazyimage>
	 		                    </div> 
	 		                    <text class="singlerow-tlt">{{products[index*columnlength + 1].productname}}</text>
	 			   				<div :ref="'shoppingcart_'+products[index*columnlength + 1].productid" class="singlerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 1].productid,products[index*columnlength + 1].productlogo)">
	 			   	                <text class="gd-price">¥{{products[index*columnlength + 1].shop_price}}</text> 
	 			   					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 1].hasproperty === 0">&#xe62f;</text>  
	 			   				</div>
	 					   </div>	
	 	               </div>
	 				   <div class="doublerow-box">
	 			             <div class="doublerow" v-if="productcount >= index*columnlength + 3">
	 			                <div :ref="'shoppingcart_'+products[index*columnlength + 2].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 2].productid)"> 
	 								<lazyimage :width=365 :height=261 :src="products[index*columnlength + 2].productlogo" :index="index" :limit=6 ></lazyimage>
	 			                </div> 
	 			                <text class="doublerow-tlt">{{products[index*columnlength + 2].productname}}</text>
	 							<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 2].productid,products[index*columnlength + 2].productlogo)" >
	 				                <text class="gd-price">¥{{products[index*columnlength + 2].shop_price}}</text> 
	 								<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 2].hasproperty === 0">&#xe62f;</text>  
	 							</div>
	 			             </div> 
	 			             <div class="doublerow" v-if="productcount >= index*columnlength + 4">
	 			                 <div :ref="'shoppingcart_'+products[index*columnlength + 3].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 3].productid)"> 
	 			 					<lazyimage :width=365 :height=261 :src="products[index*columnlength + 3].productlogo" :index="index" :limit=6 ></lazyimage>
	 			                 </div> 
	 			                 <text class="doublerow-tlt">{{products[index*columnlength + 3].productname}}</text>
	 			 				<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 3].productid,products[index*columnlength + 3].productlogo)" >
	 			 	                <text class="gd-price">¥{{products[index*columnlength + 3].shop_price}}</text> 
	 			 					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 3].hasproperty === 0">&#xe62f;</text>  
	 			 				</div>
	 			             </div>
	 			       </div>
 			   </div>
         </div>
    	 <div v-if="indexcolumns == 5"> 
                  <div v-for="(item,index) in productlength">
   			   	      <div class="doublerow-box">
	   			             <div class="doublerow" v-if="productcount >= index*columnlength + 1">
	   			                <div :ref="'shoppingcart_'+products[index*columnlength + 0].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 0].productid)"> 
	   								<lazyimage :width=365 :height=261 :src="products[index*columnlength + 0].productlogo" :index="index" :limit=6 ></lazyimage>
	   			                </div> 
	   			                <text class="doublerow-tlt">{{products[index*columnlength + 0].productname}}</text>
	   							<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 0].productid,products[index*columnlength + 0].productlogo)" >
	   				                <text class="gd-price">¥{{products[index*columnlength + 0].shop_price}}</text> 
	   								<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 0].hasproperty === 0">&#xe62f;</text>  
	   							</div>
	   			             </div> 
	   			             <div class="doublerow" v-if="productcount >= index*columnlength + 2">
	   			                 <div :ref="'shoppingcart_'+products[index*columnlength + 1].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 1].productid)"> 
	   			 					<lazyimage :width=365 :height=261 :src="products[index*columnlength + 1].productlogo" :index="index" :limit=6 ></lazyimage>
	   			                 </div> 
	   			                 <text class="doublerow-tlt">{{products[index*columnlength + 1].productname}}</text>
	   			 				<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 1].productid,products[index*columnlength + 1].productlogo)" >
	   			 	                <text class="gd-price">¥{{products[index*columnlength + 1].shop_price}}</text> 
	   			 					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 1].hasproperty === 0">&#xe62f;</text>  
	   			 				</div>
	   			             </div>
   			         </div>
	 			     <div class="doublerow-box">
	 			             <div class="doublerow" v-if="productcount >= index*columnlength + 3">
	 			                <div :ref="'shoppingcart_'+products[index*columnlength + 2].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 2].productid)"> 
	 								<lazyimage :width=365 :height=261 :src="products[index*columnlength + 2].productlogo" :index="index" :limit=6 ></lazyimage>
	 			                </div> 
	 			                <text class="doublerow-tlt">{{products[index*columnlength + 2].productname}}</text>
	 							<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 2].productid,products[index*columnlength + 2].productlogo)" >
	 				                <text class="gd-price">¥{{products[index*columnlength + 2].shop_price}}</text> 
	 								<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 2].hasproperty === 0">&#xe62f;</text>  
	 							</div>
	 			             </div> 
	 			             <div class="doublerow" v-if="productcount >= index*columnlength + 4">
	 			                 <div :ref="'shoppingcart_'+products[index*columnlength + 3].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 3].productid)"> 
	 			 					<lazyimage :width=365 :height=261 :src="products[index*columnlength + 3].productlogo" :index="index" :limit=6 ></lazyimage>
	 			                 </div> 
	 			                 <text class="doublerow-tlt">{{products[index*columnlength + 3].productname}}</text>
	 			 				<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 3].productid,products[index*columnlength + 3].productlogo)" >
	 			 	                <text class="gd-price">¥{{products[index*columnlength + 3].shop_price}}</text> 
	 			 					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 3].hasproperty === 0">&#xe62f;</text>  
	 			 				</div>
	 			             </div>
	 			     </div>
     			     <div class="singlerow-box">
     		               <div class="singlerow" v-if="productcount >= index*columnlength + 5">
     		                    <div :ref="'shoppingcart_'+products[index*columnlength + 4].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 4].productid)"> 
     		   						<lazyimage :width=750 :height=537 :border=false :src="products[index*columnlength + 4].productlogo" :index="index" :limit=4 ></lazyimage>
     		                    </div> 
     		                    <text class="singlerow-tlt">{{products[index*columnlength + 4].productname}}</text>
     			   				<div :ref="'shoppingcart_'+products[index*columnlength + 4].productid" class="singlerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 4].productid,products[index*columnlength + 4].productlogo)">
     			   	                <text class="gd-price">¥{{products[index*columnlength + 4].shop_price}}</text> 
     			   					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 4].hasproperty === 0">&#xe62f;</text>  
     			   				</div>
     					   </div>	
     	            </div>
   			   </div>
        </div>
  	    <div v-if="indexcolumns == 6"> 
                <div v-for="(item,index) in productlength">
 				   	   <div class="singlerow-box">
 			               <div class="singlerow" v-if="productcount >= index*columnlength + 1">
 			                    <div :ref="'shoppingcart_'+products[index*columnlength + 0].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 0].productid)"> 
 			   						<lazyimage :width=750 :height=537 :border=false :src="products[index*columnlength + 0].productlogo" :index="index" :limit=4 ></lazyimage>
 			                    </div> 
 			                    <text class="singlerow-tlt">{{products[index*columnlength + 0].productname}}</text>
 				   				<div :ref="'shoppingcart_'+products[index*columnlength + 0].productid" class="singlerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 0].productid,products[index*columnlength + 0].productlogo)">
 				   	                <text class="gd-price">¥{{products[index*columnlength + 0].shop_price}}</text> 
 				   					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 0].hasproperty === 0">&#xe62f;</text>  
 				   				</div>
 						   </div>	
 		               </div> 
 				   	   <div class="singlerow-box">
 			               <div class="singlerow" v-if="productcount >= index*columnlength + 2">
 			                    <div :ref="'shoppingcart_'+products[index*columnlength + 1].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 1].productid)"> 
 			   						<lazyimage :width=750 :height=537 :border=false :src="products[index*columnlength + 1].productlogo" :index="index" :limit=4 ></lazyimage>
 			                    </div> 
 			                    <text class="singlerow-tlt">{{products[index*columnlength + 1].productname}}</text>
 				   				<div :ref="'shoppingcart_'+products[index*columnlength + 1].productid" class="singlerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 1].productid,products[index*columnlength + 1].productlogo)">
 				   	                <text class="gd-price">¥{{products[index*columnlength + 1].shop_price}}</text> 
 				   					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 1].hasproperty === 0">&#xe62f;</text>  
 				   				</div>
 						   </div>	
 		               </div>
 				   	   <div class="singlerow-box">
 			               <div class="singlerow" v-if="productcount >= index*columnlength + 3">
 			                    <div :ref="'shoppingcart_'+products[index*columnlength + 2].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 2].productid)"> 
 			   						<lazyimage :width=750 :height=537 :border=false :src="products[index*columnlength + 2].productlogo" :index="index" :limit=4 ></lazyimage>
 			                    </div> 
 			                    <text class="singlerow-tlt">{{products[index*columnlength + 2].productname}}</text>
 				   				<div :ref="'shoppingcart_'+products[index*columnlength + 2].productid" class="singlerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 2].productid,products[index*columnlength + 2].productlogo)">
 				   	                <text class="gd-price">¥{{products[index*columnlength + 2].shop_price}}</text> 
 				   					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 2].hasproperty === 0">&#xe62f;</text>  
 				   				</div>
 						   </div>	
 		               </div>
 					   <div class="doublerow-box">
 				             <div class="doublerow" v-if="productcount >= index*columnlength + 4">
 				                <div :ref="'shoppingcart_'+products[index*columnlength + 3].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 3].productid)"> 
 									<lazyimage :width=365 :height=261 :src="products[index*columnlength + 3].productlogo" :index="index" :limit=6 ></lazyimage>
 				                </div> 
 				                <text class="doublerow-tlt">{{products[index*columnlength + 3].productname}}</text>
 								<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 3].productid,products[index*columnlength + 3].productlogo)" >
 					                <text class="gd-price">¥{{products[index*columnlength + 3].shop_price}}</text> 
 									<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 3].hasproperty === 0">&#xe62f;</text>  
 								</div>
 				             </div> 
 				             <div class="doublerow" v-if="productcount >= index*columnlength + 5">
 				                 <div :ref="'shoppingcart_'+products[index*columnlength + 4].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 4].productid)"> 
 				 					<lazyimage :width=365 :height=261 :src="products[index*columnlength + 4].productlogo" :index="index" :limit=6 ></lazyimage>
 				                 </div> 
 				                 <text class="doublerow-tlt">{{products[index*columnlength + 4].productname}}</text>
 				 				<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 4].productid,products[index*columnlength + 4].productlogo)" >
 				 	                <text class="gd-price">¥{{products[index*columnlength + 4].shop_price}}</text> 
 				 					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 4].hasproperty === 0">&#xe62f;</text>  
 				 				</div>
 				             </div>
 				       </div>
 			   </div> 
        </div>
        <div v-if="indexcolumns == 7"> 
                  <div v-for="(item,index) in productlength">
   			   	      <div class="doublerow-box">
	   			             <div class="doublerow" v-if="productcount >= index*columnlength + 1">
	   			                <div :ref="'shoppingcart_'+products[index*columnlength + 0].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 0].productid)"> 
	   								<lazyimage :width=365 :height=261 :src="products[index*columnlength + 0].productlogo" :index="index" :limit=6 ></lazyimage>
	   			                </div> 
	   			                <text class="doublerow-tlt">{{products[index*columnlength + 0].productname}}</text>
	   							<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 0].productid,products[index*columnlength + 0].productlogo)" >
	   				                <text class="gd-price">¥{{products[index*columnlength + 0].shop_price}}</text> 
	   								<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 0].hasproperty === 0">&#xe62f;</text>  
	   							</div>
	   			             </div> 
	   			             <div class="doublerow" v-if="productcount >= index*columnlength + 2">
	   			                 <div :ref="'shoppingcart_'+products[index*columnlength + 1].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 1].productid)"> 
	   			 					<lazyimage :width=365 :height=261 :src="products[index*columnlength + 1].productlogo" :index="index" :limit=6 ></lazyimage>
	   			                 </div> 
	   			                 <text class="doublerow-tlt">{{products[index*columnlength + 1].productname}}</text>
	   			 				<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 1].productid,products[index*columnlength + 1].productlogo)" >
	   			 	                <text class="gd-price">¥{{products[index*columnlength + 1].shop_price}}</text> 
	   			 					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 1].hasproperty === 0">&#xe62f;</text>  
	   			 				</div>
	   			             </div>
   			         </div>
	 			     <div class="doublerow-box">
	 			             <div class="doublerow" v-if="productcount >= index*columnlength + 3">
	 			                <div :ref="'shoppingcart_'+products[index*columnlength + 2].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 2].productid)"> 
	 								<lazyimage :width=365 :height=261 :src="products[index*columnlength + 2].productlogo" :index="index" :limit=6 ></lazyimage>
	 			                </div> 
	 			                <text class="doublerow-tlt">{{products[index*columnlength + 2].productname}}</text>
	 							<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 2].productid,products[index*columnlength + 2].productlogo)" >
	 				                <text class="gd-price">¥{{products[index*columnlength + 2].shop_price}}</text> 
	 								<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 2].hasproperty === 0">&#xe62f;</text>  
	 							</div>
	 			             </div> 
	 			             <div class="doublerow" v-if="productcount >= index*columnlength + 4">
	 			                 <div :ref="'shoppingcart_'+products[index*columnlength + 3].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 3].productid)"> 
	 			 					<lazyimage :width=365 :height=261 :src="products[index*columnlength + 3].productlogo" :index="index" :limit=6 ></lazyimage>
	 			                 </div> 
	 			                 <text class="doublerow-tlt">{{products[index*columnlength + 3].productname}}</text>
	 			 				<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 3].productid,products[index*columnlength + 3].productlogo)" >
	 			 	                <text class="gd-price">¥{{products[index*columnlength + 3].shop_price}}</text> 
	 			 					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 3].hasproperty === 0">&#xe62f;</text>  
	 			 				</div>
	 			             </div>
	 			     </div>
	 			     <div class="doublerow-box">
	 			             <div class="doublerow" v-if="productcount >= index*columnlength + 5">
	 			                <div :ref="'shoppingcart_'+products[index*columnlength + 4].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 4].productid)"> 
	 								<lazyimage :width=365 :height=261 :src="products[index*columnlength + 4].productlogo" :index="index" :limit=6 ></lazyimage>
	 			                </div> 
	 			                <text class="doublerow-tlt">{{products[index*columnlength + 4].productname}}</text>
	 							<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 4].productid,products[index*columnlength + 4].productlogo)" >
	 				                <text class="gd-price">¥{{products[index*columnlength + 4].shop_price}}</text> 
	 								<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 4].hasproperty === 0">&#xe62f;</text>  
	 							</div>
	 			             </div> 
	 			             <div class="doublerow" v-if="productcount >= index*columnlength + 6">
	 			                 <div :ref="'shoppingcart_'+products[index*columnlength + 5].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 5].productid)"> 
	 			 					<lazyimage :width=365 :height=261 :src="products[index*columnlength + 5].productlogo" :index="index" :limit=6 ></lazyimage>
	 			                 </div> 
	 			                 <text class="doublerow-tlt">{{products[index*columnlength + 5].productname}}</text>
	 			 				<div  class="doublerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 5].productid,products[index*columnlength + 5].productlogo)" >
	 			 	                <text class="gd-price">¥{{products[index*columnlength + 5].shop_price}}</text> 
	 			 					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 5].hasproperty === 0">&#xe62f;</text>  
	 			 				</div>
	 			             </div>
	 			     </div>
     			     <div class="singlerow-box">
     		               <div class="singlerow" v-if="productcount >= index*columnlength + 7">
     		                    <div :ref="'shoppingcart_'+products[index*columnlength + 6].productid" class="gd-bg" @click="showdetail(products[index*columnlength + 6].productid)"> 
     		   						<lazyimage :width=750 :height=537 :border=false :src="products[index*columnlength + 6].productlogo" :index="index" :limit=4 ></lazyimage>
     		                    </div> 
     		                    <text class="singlerow-tlt">{{products[index*columnlength + 6].productname}}</text>
     			   				<div :ref="'shoppingcart_'+products[index*columnlength + 6].productid" class="singlerow-txt-info" @click="onaddshoppingcartclick(products[index*columnlength + 6].productid,products[index*columnlength + 6].productlogo)">
     			   	                <text class="gd-price">¥{{products[index*columnlength + 6].shop_price}}</text> 
     			   					<text class="shoppingcart-icon iconfont" v-if="logined && products[index*columnlength + 6].hasproperty === 0">&#xe62f;</text>  
     			   				</div>
     					   </div>	
     	            </div>
   			   </div>
        </div>
		<div ref="addshoppingcart" class="addshoppingcart" v-if="showthumbnail">
			<image class="productlogo" resize="cover"  :src="productlogo"></image> 
		</div>
    </div>
</template>
<script>
import Vue from 'vue' 


import {addshoppingcart} from '../../../rest/api' 
import {get_profileid} from '../../../rest/profile' 
import lazyimage from '../common/lazyimage.vue'; 

export default { 
    props: {
        indexcolumns: {
            type: Number,
			default: 2,
        }, 
		productlength: {
            type: Number,
			default: 0,
        }, 
		columnlength: {
            type: Number,
			default: 0,
        }, 	
		productcount: {
            type: Number,
			default: 0,
        },	 
        products: {
            type: Array,
            default: [],
        }
    },
    components: { 
		 lazyimage,
    },
    data() {
        return {  
 		   showthumbnail: false,
		   logined:false,
		   productlogo: "",
        }
    },
	mounted(){   
		get_profileid().then(profileid => { 
		    this.logined = true;
		}); 
	},
    methods: {
	    showdetail(productid) {  
			 this.$router.push({path:'/detail',query:{from:'category',productid: productid}});
	    },   
	    onaddshoppingcartclick (productid,productlogo) {   
		  if(!this.logined) return;
		  if(this.showthumbnail) return;
		  this.showthumbnail = true;  
		  var divid = 'shoppingcart_'+productid; 
		  var refid = this.$refs[divid][0];
          var that = this; 		  
		 
          setTimeout(() => {
			  var dom = weex.requireModule('dom');
			  var animation = weex.requireModule('animation');
	  		  dom.getComponentRect( refid, option => {  
	  		      	var top = option.size.top;
					var width = option.size.width;
					var height = option.size.height;
					var left = 0;
					if (option.size.left)
					{
						left = option.size.left;
					} 
					left = left + (width - 350)/2;
					top = top + (height - 250)/2;
	  		        animation.transition(that.$refs.addshoppingcart, {
	  		            styles: { 
	  		                transform: 'translate(' + left + 'px, ' + top + 'px)',
	  		            },
	  		            duration: 10,  
	  		            delay: 1  
	  		        },
	  				function () {  
	  					that.productlogo = productlogo;
	  		  		    dom.getComponentRect('viewport', option => {  			 
	  		                 var height = option.size.height;
	  		   	             animation.transition(that.$refs.addshoppingcart, {
	  		   	                   styles: {  
	  		   	                       transform: 'translate(300px, ' + (height - 150) + 'px) scale(0.01)',
	  		   	                   }, 
	  		   	                   duration: 1000, 
	  		   	                   timingFunction: 'ease-in',
	  		   	                   delay: 50  
	  		   	               }, 
	  		   	   			function () { 
	  		   	   	 			that.showthumbnail = false;  
	  							that.productlogo = "";
	  		   	   	 	        animation.transition(that.$refs.addshoppingcart, {
	  		   	   	 	            styles: {
	  		   	   	 	                transform: 'translate(0,0)',
	  		   	   	 	            },
	  		   	   	 	            duration: 10, 
	  		   	   	 	            timingFunction: 'ease-out',
	  		   	   	 	            delay: 0  
	  		   	   	 	        });
	  		             	});
	  		            }); 
	  				});
	  		  });  
	  		 addshoppingcart(String(productid),"",1).then( res => {  
	  			Vue.prototype.$storage.deleteSync('shoppingcart_count');   
	  			document.dispatchEvent(new Event('shoppingcart'));
	  		 });
          }, 50);		 
	    }, 
    }
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}

.products-wrapper {
    background-color: #ffffff; 
    padding-top: 10px; 
	padding-bottom: 10px;  
    width: 750px;
}

.tlt {
    text-align: center;
    color: #333333;
    width: 750px;
    padding: 10px;
    font-size: 30px;
}
.singlerow-box
{
	padding: 0px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}
.doublerow-box {
    /*padding: 16px;*/
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.doublerow {
    width: 365px;
    height: 365px; 
}

.singlerow{
    width: 750px;
    height: 635px; 
}

.gd-bg {
    background-color: #f4f4f4;
}

 
.singlerow-tlt {
    font-size: 28px;
    color: #333333;
    width: 350px;
    margin-top: 5px;
    overflow: hidden;
    lines: 1;    
    text-overflow: ellipsis;
	padding-left:10px;
} 
.singlerow-txt-info {
    align-items: center;
    justify-content: space-between; 
	flex-direction: row;  
	margin-top: 8px;
	padding-left:10px;
	padding-right:10px;
}
.doublerow-tlt {
    font-size: 28px;
    color: #333333;
    width: 350px;
    margin-top: 5px;
    overflow: hidden;
    lines: 1;    
    text-overflow: ellipsis;
	padding-left:5px;
	padding-right:5px;
} 
.doublerow-txt-info {
    align-items: center;
    justify-content: space-between; 
	flex-direction: row;  
	margin-top: 8px;
	padding-left:5px;
	padding-right:5px;
}
.gd-price {
    font-size: 32px;
    width: 250px;
	height: 60px;    
    color: #b4282d;
    overflow: hidden;
    lines: 1;    
    text-overflow: ellipsis; 
}

.shoppingcart-icon {
    font-size: 38px;
    width: 60px;
	height: 60px;    
    color: #b4282d;
	text-align: right; 
} 

.addshoppingcart {
    position: fixed;
    top: 0px;
    left: 0px;
	width: 350px;
    height: 250px;   
}

.productlogo { 
	width: 350px;
    height: 250px;   
}

</style>