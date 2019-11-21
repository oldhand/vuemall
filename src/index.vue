<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<transition name="loading" mode="out-in">
			<loading ref="loading" v-if="showloading"></loading>
		</transition> 
    </div>
</template>  
<script> 
import loading from './pages/tezan/common/loader.vue'; 
const animation = weex.requireModule('animation')
export default {
	components: {
		loading, 
	},
	data(){
		return {
			showloading: false,  
		}
	},
	mounted() {
	    var that = this;
		var globalEvent = weex.requireModule('globalEvent');
		globalEvent.addEventListener("showloading", function(e) {
			  console.log('__________showloading__________' + JSON.stringify(e) + '_________'+that.showloading+'___________');  
			  if (e.data)
			  { 
					if (e.data.showloading)
					{
					    that.showloading = true; 
		  		        setTimeout(() => {
		  	  			   that.show_loading();
		  		        }, 10);
					}
					else
					{
						that.hide_loading();
					}
			  } 
		});
	},
    methods: { 
        show_loading () {
            animation.transition(this.$refs.loading, {
                styles: {
                    opacity: 0.9,
                },
                duration: 100, //ms
                timingFunction: 'ease-out',
                delay: 0 //ms
            });
        },
        hide_loading () {
			var that = this; 
            animation.transition(this.$refs.loading, {
                styles: {
                     opacity: 0.1,
                },
                duration: 500, //ms
                timingFunction: 'ease-out',
                delay: 0 //ms
            }, function () {
	           that.showloading = false;  
	        });
        }
    },
}
</script>	

<style scoped>
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
