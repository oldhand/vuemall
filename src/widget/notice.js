 
const Notice = Object.create(null)

import _isFunction from 'lodash/isFunction'
import _isObject from 'lodash/isObject'

export default {
    install(Vue){
	    Vue.prototype.$notice = {
	        alert (options) {
	            return new Promise((resolve, reject) => {
					var modal = weex.requireModule('modal') 
	                modal.alert({
	                    // titleAlign: options.titleAlign || 'center',
	                    title: options.title || '',
	                    message: options.message || '',
	                    // messageAlign: options.messageAlign || 'center',
	                    okTitle: options.okTitle || '确定'
	                }, (params) => {
	                    if (_isFunction(options.callback)) {
	                        options.callback.call(params)
	                    }
	                    resolve()
	                })
	            })
	        },
	        confirm (options) {
	            return new Promise((resolve, reject) => {
					var modal = weex.requireModule('modal') 
					options.okTitle = options.okTitle || '确定';
	                modal.confirm({
	                    // titleAlign: options.titleAlign || 'center',
	                    title: options.title || '',
	                    message: options.message || '',
	                    // messageAlign: options.messageAlign || 'center',
	                    cancelTitle: options.cancelTitle || '取消',
	                    okTitle: options.okTitle
	                }, (value) => { 
						if ( options.okTitle == value)
						{
		                    if (_isFunction(options.okCallback)) {
		                        options.okCallback.call(value)
		                    }							
						}
						else
						{
		                    if (_isFunction(options.cancelCallback)) {
		                        options.cancelCallback.call(value)
		                    }
						}  
	                    resolve(value);
	                });
	            })
	        },
	        loading: {
	            show (message = '') { 
					console.log('____________this.$notice.loading.show()___________');
			 	    var evt = new Event('showloading')
			        evt.data = { showloading: true }
			        document.dispatchEvent(evt);
	            },
	            hide () {
					console.log('____________this.$notice.loading.hide()___________');
	                setTimeout(() => { 
				 	    var evt = new Event('showloading')
  				        evt.data = { showloading: false }
  				        document.dispatchEvent(evt);
	                }, 300)
	            }
	        },
	        toast (options) {
				var modal = weex.requireModule('modal') 
	            if (!options) return
	            if (_isObject(options)) {
	                modal.toast({
	                    message: options.message
	                })
	            } else {
	                modal.toast({
	                    message: options
	                })
	            }
	        }
	    }
	}
} 
