
var Storage = Object.create(null)

export default {
    install(Vue){
	    Vue.prototype.$storage = {
	        set (key, value) {
	            return new Promise((resolve, reject) => { 
					const storage = weex.requireModule('storage') 
				    storage.setItem(key.toString(), JSON.stringify(value), event => {
							resolve(true);
				    });
	            })
	        }, 
	        setSync (key, value) {
	            return new Promise((resolve, reject) => { 
					const storage = weex.requireModule('storage') 
				    storage.setItem(key.toString(), JSON.stringify(value), event => {
							resolve(true);
				    }); 
	            })
	        }, 
	        get (key) {  
	            return new Promise((resolve, reject) => {  
					const storage = weex.requireModule('storage') 
				    storage.getItem(key.toString(), event => {  
						   if (event.data && event.data != "" && event.data != "undefined")
						   { 
						   	   resolve(JSON.parse(event.data)); 
						   }
						   else
						   {
							   reject("no key"); 
						   } 
				    }) 
	            })
	        }, 
			deleteSync (key)
			{
	            return new Promise((resolve, reject) => { 
					const storage = weex.requireModule('storage') 
				    storage.removeItem(key.toString(), event => {
						resolve(true);
				   });
	            })
			},
	        delete (key) {
	            return new Promise((resolve, reject) => { 
					const storage = weex.requireModule('storage') 
				    storage.removeItem(key.toString(), event => {
						resolve(true);
				   });
	            })
	        },
	    }
    }
}

