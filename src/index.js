
class LoadYS {

    /**
     * [constructor description]
     * @param  {[type]} options.max 最多保留5条
     * @return {[type]}             [description]
     */
    constructor(product, module ,{axios ,domain ,env="prod"}) {
        this.product = product;
        this.module = module;
        if(typeof axios !== 'function') throw new Error('axios为空，无法创建对象！');
        this.axios = axios;
        this.onError = () => {};
        this.domain = domain;

        this.static_domain = domain+(env === 'test' ? 'test_static' : 'static');
        this.release_domain = domain+(env === 'test' ? 'test_release' : 'release');
        this.cache = {};
    }

    async init(){
        let indexData = await this._fetch(this.release_domain+'/'+this.product+'/'+this.module+'/'+'index.json');
        if(!indexData || !indexData.data_list) return this.onError('获取分类错误！');
        this.static_domain = indexData.static_path;
        this.last_update_time = indexData.last_update_time;
        this.category = indexData.data_list;
        return true;
    }


    _fetch(url){
        let cache = this.cache[url];
        if(cache) return cache;
        return this.axios.get(url).then(({status ,data}) => {
            if(status !== 200) throw new Error(`获取状态码错误:${status}`);
            this.cache[url] = data;
            return data;
        }).catch(e => {
            this.onError(e);
        });
    }

    /**
     * 得到所有的分类
     * @return {[type]} [description]
     */
    getCategory(name){
        if(!name) return this.category;
        return this.category.find(k => k.name == name);
    }

    /**
     * 得到某个分类的第n页的数据
     * @param  {[type]} category_name [description]
     * @param  {[type]} options.page  [description]
     * @return {[type]}               [description]
     */
    async getList(name ,{page=1}={}){
        let d = this.category.find(k => k.name === name);
        if(!d) return this.onError('getList:分类中没有:'+name);
        if(page > d.paths.length) return this.onError('getList:页数无效:'+page);
        let data = await this._fetch(this.release_domain + d.paths[page-1]);
        if(!data || !data instanceof Array) return this.onError(`获取制定页数${page}内容${data}错误！`);
        const static_domain = this.static_domain;
        return data.map((k,i) => {
            k.file = static_domain + k.file;
            k.preview = static_domain + k.preview;
            return k;
        });
    }

}
export default LoadYS;