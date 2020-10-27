'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadYS = function () {
	function LoadYS(product, module, _ref) {
		var axios = _ref.axios,
		    domain = _ref.domain,
		    _ref$env = _ref.env,
		    env = _ref$env === undefined ? 'prod' : _ref$env;

		_classCallCheck(this, LoadYS);

		this.product = product;
		this.module = module;
		if (typeof axios !== 'function') throw new Error('axios为空，无法创建对象！');
		this.axios = axios;

		this.onError = function () {};

		this.domain = domain;
		this.static_domain = domain + (env === 'test' ? 'test_static' : 'static');
		this.release_domain = domain + (env === 'test' ? 'test_release' : 'release');
		this.cache = {};
	}

	_createClass(LoadYS, [{
		key: 'init',
		value: function init() {
			var _this = this;

			return this._fetch(this.release_domain + '/' + this.product + '/' + this.module + '/index.json').then(function (indexData) {
				if (!indexData || !indexData.data_list) return _this.onError('获取分类错误！');
				_this.static_domain = indexData.static_path;
				_this.last_update_time = indexData.last_update_time;
				_this.category = indexData.data_list;
				return true;
			});
		}
	}, {
		key: '_fetch',
		value: function _fetch(url) {
			var _this2 = this;

			var cache = this.cache[url];
			if (cache) return Promise.resolve(cache);
			return this.axios.get(url).then(function (_ref2) {
				var status = _ref2.status,
				    data = _ref2.data;

				if (status !== 200) throw new Error('\u83B7\u53D6\u72B6\u6001\u7801\u9519\u8BEF:' + status);
				_this2.cache[url] = data;
				return data;
			}).catch(function (e) {
				_this2.onError(e);
			});
		}

		/**
   * 得到所有的分类
   * @return {[type]} [description]
   */

	}, {
		key: 'getCategory',
		value: function getCategory(name) {
			if (!name) return this.category;
			return this.category.find(function (k) {
				return k.name === name;
			});
		}

		/**
   * 得到某个分类的第n页的数据
   * @param  {[type]} category_name [description]
   * @param  {[type]} options.page  [description]
   * @return {[type]}               [description]
   */

	}, {
		key: 'getList',
		value: function getList(name) {
			var _this3 = this;

			var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    _ref3$page = _ref3.page,
			    page = _ref3$page === undefined ? 1 : _ref3$page;

			var d = this.category.find(function (k) {
				return k.name === name;
			});
			if (!d) return this.onError('getList:分类中没有:' + name);
			if (page > d.paths.length) return this.onError('getList:页数无效:' + page);
			return this._fetch(this.release_domain + d.paths[page - 1]).then(function (data) {
				if (!data || !(data instanceof Array)) return _this3.onError('\u83B7\u53D6\u5236\u5B9A\u9875\u6570' + page + '\u5185\u5BB9' + data + '\u9519\u8BEF\uFF01');
				var static_domain = _this3.static_domain;
				return data.map(function (k) {
					if (k.file.indexOf('http') < 0) k.file = static_domain + k.file;
					if (k.preview.indexOf('http') < 0) k.preview = static_domain + k.preview;
					return k;
				});
			});
		}
	}]);

	return LoadYS;
}();

exports.default = LoadYS;