/**
 * <h3>Coock Utils</h3>
 * Laoxu <br>
 *  <ul>
 * 		<li>1、存储Cookie值</li>
 * 		<li>2、获取指定Cookie值</li>
 * 		<li>3、根据首字母查询Cookie值，或者根据正则表达式匹配Cookie值</li>
 * 	</ul>
 */
(function(document, owner) {
	/**
	 * 设置Cookie信息
	 * @param {String} _key
	 * @param {String} _value
	 * @param {Numer} _expires
	 * @param {String} _path
	 */
	owner.setCookie = function(_key, _value, _expires, _path) {
		_key = _key || "";
		_value = _value || "";
		var result = "";

		if(!_key) {
			return;
		}

		var jsonObj = {
			"value": _value
		};
		result = encodeURIComponent(_key) + "=" + encodeURIComponent(JSON.stringify(jsonObj)) + ";"

		// 获取过期时间
		if(typeof(_expires) == "number") {
			// 表示设置为expires的值
			// 设置过期时间
			var d = new Date();
			d.setDate(d.getDate() + _expires);
			result += "expires=" + d + ";" + "path=" + _path;
		} else if(typeof(_expires) == "string") {
			result += "path=" + _expires;
		}
		document.cookie = result;
	}

	/**
	 * 获取指定名称的Cookie值
	 * @param {Object} _name
	 */
	owner.getCookie = function(_name) {
		var info = document.cookie;
		var cookieArr = info.split("; ");

		for(var i = 0, l = cookieArr.length; i < l; i++) {
			var valueArr = cookieArr[i].split("=");
			if(decodeURIComponent(valueArr[0]) == _name) {
				return JSON.parse(decodeURIComponent(valueArr[1])).value;

			}
		}
	}
	
	/**
	 * 获取开头为指定名称的Cookie信息,采用正则表达式查询数据，如有特殊编码需要提前转换
	 * @param {Object} _name 传入的字符串或者是RegExp
	 * @param {Object} callback
	 */
	owner.getCookies = function(_name, callback) {
		var info = document.cookie;
		var cookieArr = info.split("; ");
		var getInfoArr = [];

		for(var i = 0, l = cookieArr.length; i < l; i++) {
			var valueArr = cookieArr[i].split("=");
			var key = valueArr[0];
			
			var regInfo = null;
			if (isRegExp(_name)){
				regInfo = _name;
			} else {
				regInfo = eval("/^" + _name + "/");
			}
			
			if(regInfo.test(key)) {
				var value = JSON.parse(decodeURIComponent(valueArr[1])).value;
				getInfoArr.push([key, value]);

				if(callback) {
					callback(key, value);
				}
			}
		}
		return getInfoArr;
	}
	
	/**
	 * 移除指定Cookie信息 
	 * @param {Object} _name
	 */
	owner.removeCookie = function (_name){
		this.setCookie(_name,"",-1);
	}
	
	function isRegExp (obj){
		return Object.prototype.toString.call(obj) == "[object RegExp]";
	}
})(document, window.CookieUtils = {});