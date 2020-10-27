# LOADYS.js

A helper library for Load Repository

## Usage

```javascript
import PageJson from 'loadys';
const pageobj = new PageJson(this.productKey, this.sceneKey, {
    env: Config.get('env') === 'prod' ? 'prod' : 'test',
    axios,
    domain: '',
});

pageobj.onError = e => {
    this.noticError(e);
};
// 初始化索引json
await pageobj.init();
// 得到所有的分类以及总条数
await pageobj.getCategory();
// 得到某分类下的列表
pageobj.getList(category, { page: 1 });
```