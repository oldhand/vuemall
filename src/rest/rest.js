import fetch from './fetch'  

var rest = { 
	application : "admin", 
	viewer : "", 
	contenttype : {
		Content: "content",
		BigContent: "bigcontent",
		MainContent: "maincontent",
		YearContent: "yearcontent",
		YearmonthContent: "yearmonthcontent",
		Application: "application",
		Profile: "profile",
		Message: "message",
		Mq: "mq",
		Sql : "schedule"
	},
	isNumber : function (obj) {
		return obj === +obj;
	},
	isString : function (obj) {
		return obj === obj + '';
	},
	isBoolean : function (obj) {
		return obj === !!obj
	}, 
	init: function(options)
	{
		if (options.application)
		{
			this.application = options.application;
		} 
		if (options.viewer)
		{
			this.viewer = options.viewer;
		} 
	},
	transdatatype : function(datatype) 
	{
		if (datatype == 0)
		{
			return  "/content";
		}
		else if (datatype == 1)
		{
			return "/bigcontent";
		}
		else if (datatype == 2)
		{
			return "/mq";
		}
		else if (datatype == 4)
		{
			return "/maincontent";
		}
		else if (datatype == 5)
		{
			return "/schedule";
		}
		else if (datatype == 6)
		{
			return "/message";
		}
		else if (datatype == 7)
		{
			return "/yearcontent";
		}
		else if (datatype == 9)
		{
			return "/yearmonthcontent";
		} 
		return "";
	},	
	//解析 json，Content 对像
	contentrequestdata : function(json, datatype, tag) 
	{
		var Contents = []
		for (var i in json.entry)
		{ 
			var Content         = new rest.XN_Content.contentobject();
			Content.datatype = datatype
			if (tag && tag !== "" && rest.isString(tag))
				Content.tag = tag;
			
			for (var j in json.entry[i])
			{ 
				switch (j)
				{
					case "id":
					case "xn_id":
						Content.id = json.entry[i][j]
						break
					case "type":
					case "xn_type":
						Content.type = json.entry[i][j]
						break
					case "application":
					case "xn_application":
						if (json.entry[i][j] && json.entry[i][j] !== "")
							Content.application = json.entry[i][j]
						break
					case "title":
						if (json.entry[i][j] && json.entry[i][j] !== "")
							Content.title = json.entry[i][j]
						break
					case "published":
						Content.published = json.entry[i][j]
						break
					case "updated":
						Content.updated = json.entry[i][j]
						break
					case "author":
						Content.author = json.entry[i][j]
						break
					default :
						Content.my[j] = json.entry[i][j] || ""
				}
			}  
			Contents.push(Content);
		}
		return Contents;
	},
	XN_Filter :
	{ 
		filter: function (field, oper, value) {
			if (typeof value === 'object')
			{
				var convertResult = "";
				for (var k in value)
				{
					if (convertResult === "")
						convertResult = "'" + value[k] + "'";
					else
						convertResult += ",'" + value[k] + "'";
				}
				return field.toLowerCase() + " " + oper + " [" + convertResult + "]";
			}
			else if (typeof value == "number")
			{
				return field.toLowerCase() + " " + oper + " " + value;
			}
			else if (typeof value == "string")
			{
				return field.toLowerCase() + " " + oper + " '" + value + "'";
			}
			else
			{
				return "";
			}
		}, 
		any: function () {
			var filters = "";
			if (arguments.length > 0)
			{
				for (var i = 0; i < arguments.length; i++)
				{
					if (typeof arguments[i] === 'object')
					{
						for (var j in arguments[i])
						{
							if (arguments[i][j].length === 3)
							{
								if (filters === "")
								{
									filters = "(" + this.filter(arguments[i][j][0], arguments[i][j][1], arguments[i][j][2]);
								}
								else
								{
									filters += " | " + this.filter(arguments[i][j][0], arguments[i][j][1], arguments[i][j][2]);
								}
							}
							else if (arguments[i][j] !== "")
							{
								if (filters === "")
								{
									filters = "(" + arguments[i][j];
								}
								else
								{
									filters += " | " + arguments[i][j];
								}
							}
						}
					}
					else if (arguments[i].length === 3)
					{
						if (filters === "")
						{
							filters = "(" + this.filter(arguments[i][0], arguments[i][1], arguments[i][2]);
						}
						else
						{
							filters += " | " + this.filter(arguments[i][0], arguments[i][1], arguments[i][2]);
						}
					}
					else if (arguments[i] !== "")
					{
						if (filters === "")
						{
							filters = "(" + arguments[i];
						}
						else
						{
							filters += " | " + arguments[i];
						}
					}
				}
				if (filters !== "")
				{
					filters += ")"
				}
			}
			return filters;
		},
		all: function () {
			var filters = "";
			if (arguments.length > 0)
			{
				for (var i = 0; i < arguments.length; i++)
				{
					if (typeof arguments[i] === 'object')
					{
						for (var j in arguments[i])
						{
							if (arguments[i][j].length === 3)
							{
								if (filters === "")
								{
									filters = "(" + this.filter(arguments[i][j][0], arguments[i][j][1], arguments[i][j][2]);
								}
								else
								{
									filters += " & " + this.filter(arguments[i][j][0], arguments[i][j][1], arguments[i][j][2]);
								}
							}
							else if (arguments[i][j] !== "")
							{
								if (filters === "")
								{
									filters = "(" + arguments[i][j];
								}
								else
								{
									filters += " & " + arguments[i][j];
								}
							}
						}
					}
					else if (arguments[i].length === 3)
					{
						if (filters === "")
						{
							filters = "(" + this.filter(arguments[i][0], arguments[i][1], arguments[i][2]);
						}
						else
						{
							filters += " & " + this.filter(arguments[i][0], arguments[i][1], arguments[i][2]);
						}
					}
					else if (arguments[i] !== "")
					{
						if (filters === "")
						{
							filters = "(" + arguments[i];
						}
						else
						{
							filters += " & " + arguments[i];
						}
					}
				}
				if (filters !== "")
				{
					filters += ")"
				}
			}
			return filters;
		} 
	},
	//XN_Profile类
	XN_Profile :
	{
		//profileobject数据对像
		profileobject : function() 
		{
			var ProfileObject = {
				id: "", 
				published: "",
				updated: "",    
				save: function () 
				{
					  return new Promise((resolve, reject) => {  
						  resolve("");
					  });
				},  
			}
			return ProfileObject;
		}, 
		to_profile : function(json) 
		{ 
			var Profiles = []
			for (var i in json.entry)
			{ 
				var Profile         = new rest.XN_Profile.profileobject();  
				for (var j in json.entry[i])
				{ 
					switch (j)
					{
						case "id":
						case "xn_id":
							Profile.id = json.entry[i][j]
							break  
						case "title":
							if (json.entry[i][j] && json.entry[i][j] !== "")
								Profile.fullname = json.entry[i][j]
							break
						case "published":
							Profile.published = json.entry[i][j]
							break
						case "updated":
							Profile.updated = json.entry[i][j] 
							break
						default :
							Profile[j] = json.entry[i][j] || ""
					}
				}  
				Profiles.push(Profile);
			}
			return Profiles;
		}, 
		load : function()
		{
		    return new Promise((resolve, reject) => {  
				if (arguments.length == 0)
				{
					reject("参数不能为空");
				}
				var profileid  = arguments[0];
				var	keyname   = arguments[1] || "id";
				var	tag = arguments[2] || "";   
				
				console.log("XN_Profile.load(id:'"+profileid+"',keyname:'"+keyname+"',tag:'"+tag+"',)");
				
				if (profileid === "")
				{ 
					reject("记录 ID 不能为空");
				} 
				var url = '/profile'; 
				url += "("+keyname+"='"+profileid+"')";
				
				var headers = {'domain':rest.application};
				if (tag !== "")
				{
					headers = {'tag':tag, 'domain':rest.application};
				}  
				url += "?xn_out=json";
				fetch(url,headers).then(function(json) { 		 		  
					var profiles = rest.XN_Profile.to_profile(json);
					if (profiles.length > 0)
					{
						resolve(profiles[0]);
					}
					else
					{
					    console.error('error: load failure');
						reject('load failure');
					} 
				}, function(error) {
				    console.error('error:', error);
					reject(error)
				});   
		    }); 
		},
		loadMany : function()
		{
		    return new Promise((resolve, reject) => {  
				if (arguments.length == 0)
				{
					reject("参数不能为空");
				}
				var profileid  = arguments[0];
				var	keyname   = arguments[1] || "id";
				var	tag = arguments[2] || "";   
				
				console.log("XN_Profile.load(id:'"+profileid.join(',')+"',keyname:'"+keyname+"',tag:'"+tag+"',)");
				
				if (profileid.length === 0)
				{ 
					reject("记录 ID 不能为空");
				} 
				var url = '/profile'; 
				url += "("+keyname+" in ['"+profileid.join("','")+"'])";
				
				var headers = {'domain':rest.application};
				if (tag !== "")
				{
					headers = {'tag':tag, 'domain':rest.application};
				}  
				url += "?xn_out=json";
				fetch(url,headers).then(function(json) { 		 			  
					var profiles = rest.XN_Profile.to_profile(json);
					resolve(profiles); 
				}, function(error) {
				    console.error('error:', error);
					reject(error)
				});   
		    }); 
		},  
		sign : function(profileid,password)
		{
		    return new Promise((resolve, reject) => {   
				console.log("XN_Profile.sign(profileid:'"+profileid+"',password:'"+password+"')"); 
				if (profileid === "")
				{ 
					reject("记录 ID 不能为空");
				} 
				var url = '/profile'; 
				url += "(id='"+profileid+"')/signin";  
				var headers = {'domain':rest.application,'Authorization': "Basic " + btoa(profileid + ":" + password)}; 
				url += "?xn_out=json&max-age=31536000"; 
				fetch(url,headers,{},'POST').then(function(json) { 	 
					 resolve(json);
				}, function(error) {
				    console.error('error:', error);
					reject(error)
				});   
		    }); 
		},
	},	
	//XN_Content类
	XN_Content :
	{
		//Content数据对像
		contentobject : function() 
		{
			var Content = {
				id: "",
				application:"",
				title:"",
				type: "",
				tag: "",
				published: "",
				updated: "",
				author: "anonymous",
				datatype: 0,
				my: {},
				/**
				 @param {Boolaen} async 是否异步，默认异步，false 为同步
				 @param {string} tag 数据缓存标签
				 @param {function} success 异步时，执行成功的回调函数
				 @param {function} error 异步时，执行错误的回调函数
				 @return {Content} 同步时，执行成功时返回数据对像，错误时使用 try 获取
				 */
			
				save: function () 
				{
					 return new Promise((resolve, reject) => {  
							if (!arguments[0])
							{ 
								var	tag = this.tag;
							}
							else
							{
								var	tag = arguments[0] || ""; 
							} 
							var datatype              = this.datatype;
							var sendbody              = {size: 1, entry: [this.my]};
							sendbody.entry[0].id      = this.id;
							sendbody.entry[0].xn_id   = this.id;
							sendbody.entry[0].xn_type = this.type;
							sendbody.entry[0].xn_application = this.application;
							sendbody.entry[0].title = this.title
							sendbody.entry[0].author = this.author;
				 
							var jsonbody = sendbody;
				 
							var headers = {'domain':rest.application};
							if (tag !== "")
							{
								headers = {'tag':tag, 'domain':rest.application};
							}  
							var url = rest.transdatatype(datatype);
							if (url === "")
						    {
								reject("datatype参数错误");
							} 				
							//console.log('jsonbody: ' + jsonbody); 
							url += "?xn_out=json";
							if (this.id !== "")
							{
								fetch(url,headers,jsonbody,'PUT').then(function(json) {  
									var contents = rest.contentrequestdata(json,datatype,tag);
									if (contents.length > 0)
									{
										resolve(contents[0]);
									}
									else if (json.error && json.error != "")
									{
									    console.error('error:'+json.error);
										reject(json.error);
									}
									else
									{ 
									    console.error('error: save failure');
										reject('save failure');
									} 
								}, function(error) {
								    console.error('error:', error);
									reject(error)
								});   
							}
							else
							{
								fetch(url,headers,jsonbody,'POST').then(function(json) { 	 				  
									var contents = rest.contentrequestdata(json,datatype,tag);
									if (datatype == 5)
									{
										resolve(contents);
									}
									else if (contents.length > 0)
									{
										resolve(contents[0]);
									}
									else if (json.error && json.error != "")
									{
									    console.error('error:'+json.error);
										reject(json.error);
									}
									else
									{
									    console.error('error: save failure');
										reject('save failure');
									} 
								}, function(error) {
								    console.error('error:', error);
									reject(error)
								}); 
							}
					}); 
				},
				delete: function () 
				{
				    return new Promise((resolve, reject) => {   
						var	tag      = arguments[0] || "";  
						var url = rest.transdatatype(this.datatype);
						if (url === "")
					    {
							reject("datatype参数错误");
						}  
						url += "(id="+this.id+")"; 
						var headers = {'domain':rest.application};
						if (tag !== "")
						{
							headers = {'tag':tag, 'domain':rest.application};
						}  
						else
						{
							headers = {'tag':this.tag, 'domain':rest.application};
						}
						url += "?xn_out=json";
						fetch(url,headers,'','DELETE').then(function(json) {   
							resolve(json); 
						}, function(error) {
						    console.error('error:', error);
							reject(error)
						});   
				    });  
				}
			
			}
			return Content;
		},
		/** 
		 @param {string} xn_type 数据缓存标签
		 @param {string} title 数据表名称
		 @param {string} anonymous 
		 @param {integer} datatype 数据类型，
		 @return {Content}
		 */
		create: function () 
		{
			var xn_type   = arguments[0];
			var	title     = arguments[1] || "";
			var	anonymous = arguments[2] || false;   
			var	datatype  = arguments[3] || 0;   
			
			var Content         = new rest.XN_Content.contentobject();
			Content.type        = xn_type;
			Content.title       = title;
			Content.datatype    = datatype; 
			if (anonymous)
			{
				Content.author  = "";
			}
			else
			{
				Content.author  = rest.viewer;
			} 
			Content.application = rest.application; 
			return Content;
		},
		load : function()
		{
		    return new Promise((resolve, reject) => {  
				if (arguments.length == 0)
				{
					reject("参数不能为空");
				}
				var id       = arguments[0];
				var	tag      = arguments[1] || "";
				var	datatype = arguments[2] || 0;   
				
				console.log("XN_Content.load(id:'"+id+"',tag:'"+tag+"',datatype:'"+datatype+"',)");
				
				if (id === "")
				{ 
					reject("记录 ID 不能为空");
				} 
				var url = rest.transdatatype(datatype);
				if (url === "")
			    {
					reject("datatype参数错误");
				} 
				url += "(id="+id+")";
				
				var headers = {'domain':rest.application};
				if (tag !== "")
				{
					headers = {'tag':tag, 'domain':rest.application};
				}  
				url += "?xn_out=json";
				fetch(url,headers).then(function(json) { 
					  
					var contents = rest.contentrequestdata(json,datatype,tag);
					if (contents.length > 0)
					{
						resolve(contents[0]);
					}
					else
					{
					    console.error('error: load failure');
						reject('load failure');
					} 
				}, function(error) {
				    console.error('error:', error);
					reject(error)
				});   
		    }); 
		},
		loadMany : function()
		{
		    return new Promise((resolve, reject) => {  
				if (arguments.length == 0)
				{
					reject("参数不能为空");
				}
				var ids       = arguments[0];
				var	tag      = arguments[1] || "";
				var	datatype = arguments[2] || 0;   
				 
				console.log("XN_Content.loadMany(id:'"+ids.join(',')+"',tag:'"+tag+"',datatype:'"+datatype+"',)"); 
				 
				var url = rest.transdatatype(datatype);
				if (url === "")
			    {
					reject("datatype参数错误");
				} 
				url += "(id in ["+ids.join(',')+"])";
				
				var headers = {'domain':rest.application};
				if (tag !== "")
				{
					headers = {'tag':tag, 'domain':rest.application};
				}  
				url += "?xn_out=json";
				fetch(url,headers).then(function(json) { 					  
					var contents = rest.contentrequestdata(json,datatype,tag);
					resolve(contents);					 
				}, function(error) {
				    console.error('error:', error);
					reject(error)
				});   
		    }); 
		},
		delete: function () 
		{
		    return new Promise((resolve, reject) => {  
				if (arguments.length == 0)
				{
					reject("参数不能为空");
					return;
				}
				var id       = arguments[0];
				var	tag      = arguments[1] || "";
				var	datatype = arguments[2] || 0;   
				
				var url = rest.transdatatype(datatype);
				if (url === "")
			    {
					reject("datatype参数错误");
				} 
				
				if (typeof id === "object")
				{ 
					if (typeof id[0] === "string" || typeof id[0] === "number" )
					{
						console.log("XN_Content.delete(id:'"+id.join(',')+"',tag:'"+tag+"',datatype:'"+datatype+"',)");  
						url += "(id in ["+id.join(',')+"])";
					}
					else
					{
						var ids = [];
						for (var i in id)
						{  
							ids.push(id[i].id);
						}
						console.log("XN_Content.delete(id:'"+ids.join(',')+"',tag:'"+tag+"',datatype:'"+datatype+"',)");  
						url += "(id in ["+ids.join(',')+"])";
					} 
				}
				else
				{
					console.log("XN_Content.delete(id:'"+id+"',tag:'"+tag+"',datatype:'"+datatype+"',)"); 
					if (id === "")
					{ 
						reject("记录 ID 不能为空");
					} 				
					url += "(id="+id+")";
				} 
				
				var headers = {'domain':rest.application};
				if (tag !== "")
				{
					headers = {'tag':tag, 'domain':rest.application};
				}  
				url += "?xn_out=json";
				fetch(url,headers,'','DELETE').then(function(json) {   
					resolve(json); 
				}, function(error) {
				    console.error('error:', error);
					reject(error)
				});   
		    });  
		}
	},	
	XN_Query :
	{
		queryobject : function () 
		{
			var _subject  = "",
				_tag  = "",
				_begin   = 0,
				_end      = 100,
				_orders = [],
				_datatype = 0,
				_filters  = [],
				_rollups  = [],
				_groups   = [], 
				_isrollup = false
			var Query     = {
				set subject(value) { 
					_subject = value;  
				},
				get subject() {
					return _subject;
				}, 
				begin: function (value) {
					_begin = value;
					return this;
				},
				end: function (value) {
					_end = value;
					return this;
				},
				tag: function (value) { 
					_tag = value; 
					return this;
				},
				filter: function () { 
					if (arguments.length === 1)
					{
						var filter = arguments[0]; 
						_filters.push(arguments[0]);
					}
					else if (arguments.length === 3)
					{
						var prop = arguments[0];
						var operator = arguments[1];
						var value = arguments[2]; 
						if (operator == "in" || operator == "!in")
						{
							if (typeof value == "number")
							{
							    var filter = prop + " " + operator + " [" + value + "]"; 
								_filters.push(filter);
							}
							else if (typeof value == "object")
							{
							    var filter = prop + " " + operator + " [" + value.join(',') + "]"; 
								_filters.push(filter);
							}
							else
							{
							    var filter = prop + " " + operator + " ['" + value + "']"; 
								_filters.push(filter);
							}
						}
						else
						{
							if (typeof value == "number")
							{
							    var filter = prop + " " + operator + " " + value + ""; 
								_filters.push(filter);
							}
							else
							{
							    var filter = prop + " " + operator + " '" + value + "'"; 
								_filters.push(filter);
							}
						} 
					} 
					return this;
				},
				order: function (field, type) {
					if (field != "")
					{
						switch(type)
						{
							case "desc":
							case "DESC":
							case "d":
							case "D":
								_orders.push("order=" + field.toLowerCase() + "@D");
							break;
							case "asc":
							case "ASC":
							case "a":
							case "A":
								_orders.push("order=" + field.toLowerCase() + "@A");
							break;
							case "desc_number":
							case "DESC_NUMBER":
							case "d_n":
							case "D_N":
								_orders.push("order=" + field.toLowerCase() + "@D_N");
							break;
							case "asc_number":
							case "ASC_NUMBER":
							case "a_n":
							case "A_N":
								_orders.push("order=" + field.toLowerCase() + "@A_N");
							break;
						}
					}
						
					return this;
				},
				rollup: function (field) {
					if (rest.isString(field) && field !== "")
					{ 
						_rollups.push("field = '" + field.toLowerCase() + "'")
						_isrollup = true
					} 
					else if (arguments.length === 0)
					{
						_isrollup = true
					}
					return this
				},
				group: function (field) {
					if (rest.isString(field) && field !== "")
					{
						_groups.push("field = '" + field.toLowerCase() + "'")
						_isrollup = true
					}
					return this
				},				 
				execute: function () 
				{
				
				    return new Promise((resolve, reject) => {   
						var url = "";
						if (_subject.toLowerCase() == "content")
						{
							_datatype = 0;
							url =  "/content("+_filters.join("&")+")";							
						}
						else if (_subject.toLowerCase() == "content_count")
						{ 
							_datatype = -1;
							url =  "/content("+_filters.join("&")+")";
							if (_isrollup)
							{
								url +=  "/rollup("+_rollups.join("&")+")";
								url +=  "/group("+_groups.join("&")+")"; 
							}
						}
						else if (_subject.toLowerCase() == "bigcontent")
						{ 
							_datatype = 1;
							url =  "/bigcontent("+_filters.join("&")+")";	
						}
						else if (_subject.toLowerCase() == "mq")
						{ 
							_datatype = 2;
							url =  "/mq("+_filters.join("&")+")";
						}
						else if (_subject.toLowerCase() == "maincontent")
						{ 
							_datatype = 4;
							url =  "/maincontent("+_filters.join("&")+")";
						}
						else if (_subject.toLowerCase() == "maincontent_count")
						{ 
							_datatype = -1;
							url =  "/maincontent("+_filters.join("&")+")";
							if (_isrollup)
							{
								url +=  "/rollup("+_rollups.join("&")+")";
								url +=  "/group("+_groups.join("&")+")"; 
							}
						}
						else if (_subject.toLowerCase() == "schedule")
						{ 
							_datatype = 5;
							url =  "/schedule("+_filters.join("&")+")";
						}
						else if (_subject.toLowerCase() == "message_count")
						{ 
							_datatype = -1;
							url =  "/message("+_filters.join("&")+")";
							if (_isrollup)
							{
								url +=  "/rollup("+_rollups.join("&")+")";
								url +=  "/group("+_groups.join("&")+")"; 
							}
						}
						else if (_subject.toLowerCase() == "message")
						{ 
							_datatype = 6;
							url =  "/message("+_filters.join("&")+")";
						} 
						else if (_subject.toLowerCase() == "yearcontent")
						{ 
							_datatype = 7;
							url =  "/yearcontent("+_filters.join("&")+")";
						}
						else if (_subject.toLowerCase() == "yearcontent_count")
						{ 
							_datatype = -1;
							url =  "/yearcontent("+_filters.join("&")+")";
							if (_isrollup)
							{
								url +=  "/rollup("+_rollups.join("&")+")";
								url +=  "/group("+_groups.join("&")+")"; 
							}
						}
						else if (_subject.toLowerCase() == "yearmonthcontent")
						{ 
							_datatype = 9;
							url =  "/yearmonthcontent("+_filters.join("&")+")";
						} 
						else if (_subject.toLowerCase() == "yearmonthcontent_count")
						{ 
							_datatype = -1;
							url =  "/yearmonthcontent("+_filters.join("&")+")";
							if (_isrollup)
							{
								url +=  "/rollup("+_rollups.join("&")+")";
								url +=  "/group("+_groups.join("&")+")"; 
							}
						}
						else if (_subject.toLowerCase() == "profile")
						{ 
							_datatype = 9;
							url =  "/profile("+_filters.join("&")+")";
						} 
						else if (_subject.toLowerCase() == "profile_count")
						{ 
							_datatype = -1;
							url =  "/profile("+_filters.join("&")+")";
							if (_isrollup)
							{
								url +=  "/rollup("+_rollups.join("&")+")";
								url +=  "/group("+_groups.join("&")+")"; 
							}
						}
						else
						{
							reject("Query类型不正确");
							return;
						}						
						url +=  "?from=" + _begin + "&to=" + _end;
						if (_orders.length > 0)
						{
							url +=  "&"+_orders.join("&");
						}
						url += "&xn_out=json";
						//console.log('______________________url: ' + url + "____________"); 
						var headers = {'domain':rest.application};
						if (_tag !== "")
						{
							headers = {'tag':_tag, 'domain':rest.application};
						}  
						fetch(url,headers).then(function(json) { 					  
							var contents = rest.contentrequestdata(json,_datatype,_tag); 
							resolve({size: json.size, entry: contents});					 
						}, function(error) {
						    console.error('error:', error);
							reject(error)
						});   
					 });  
					
					 
				}
			}
			return Query;
		},
		create: function (subject) 
		{ 
			var QueryObj      = new rest.XN_Query.queryobject();
			QueryObj.subject = subject;
			return QueryObj;
		}
	}
}
export default rest