 
const modal = weex.requireModule('modal') 
 

export default {
	install(Vue){
        Vue.prototype.$myrouter = {
            open (options = {}) {  
                    // let preOptions = {
                    //     url: currentPageInfo.url,
                    //     type: options.type || DEFAULT_ANIMATETYPE,
                    //     params: options.params || {},
                    //     navShow: options.navShow || !!currentPageInfo.title,
                    //     navTitle: options.navTitle || currentPageInfo.title,
                    // } 
					console.log('____1111________'+options.name+'______');  
                    //this.$router && this.$router.push('/'+options.name); 
					router.push('home')
            }, 
        }
    }
}
