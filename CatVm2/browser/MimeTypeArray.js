// 存储一些值，避免污染全局变量空间
catvm.memory.MimeTypeArray = {};
// MimeTypeArray实例,MimeTypeArray这个虽然跟MimeType很像，但是无需被new，浏览器一开始就有该实例 navigator.mimeTypes
catvm.memory.MimeTypeArray._ = {};


var MimeTypeArray = function MimeTypeArray() { // 构造函数
    throw new TypeError("Illegal constructor");
};
catvm.safefunction(MimeTypeArray);


catvm.memory.MimeTypeArray.iterator = function values() {
    debugger;
    return {
        next:function () {
            if(this.index_ == undefined){
                this.index_ = 0;
            }
            var tmp = this.self_[this.index_];
            this.index_ += 1;
            return {value:tmp,done:tmp==undefined};
        },
        self_:this
    }
};
catvm.safefunction(catvm.memory.MimeTypeArray.iterator);

Object.defineProperties(MimeTypeArray.prototype, {
    [Symbol.toStringTag]: {
        value: "MimeTypeArray",
        configurable: true
    },
    // 原型上多了个这个,里面是个方法
    [Symbol.iterator]: {
        value: catvm.memory.MimeTypeArray.iterator,
        configurable: true
    }
});

////////// ///////////////////浏览器代码自动生成部分
MimeTypeArray.prototype.length = 0;
MimeTypeArray.prototype.item = function item(index) {
    // debugger;
    return this[index];
};
catvm.safefunction(MimeTypeArray.prototype.item);
MimeTypeArray.prototype.namedItem = function namedItem(key) {
    // debugger;
    return this[key];
};
catvm.safefunction(MimeTypeArray.prototype.namedItem);


// 适用于 调用原型的属性会抛出异常的对象
for (var _prototype in MimeTypeArray.prototype) {
    if (typeof (MimeTypeArray.prototype[_prototype]) != "function") {
        // 相当于Object.defineProperty的get方法，Proxy的get方法，hook原型上的所有方法属性
        MimeTypeArray.prototype.__defineGetter__(_prototype, function () {
            // this是实例
            throw new TypeError("Illegal constructor");
            // return this[pr];
        });
    }
}
///////////////////////
// catvm.memory.MimeTypeArray.ls = []  // 所有MimeType存放点
// 遍历 PluginArray实例里面的所有Plugin实例
catvm.memory.MimeTypeArray.mimetype_count = 0;
catvm.memory.MimeTypeArray.mimetype_types = {}; // 所有MimeType.type存放点
for (let index = 0; index < catvm.memory.PluginArray._.length; index++) {
    let tmp_plugin = catvm.memory.PluginArray._[index];
    // 遍历 Plugin实例里面的所有MimeType实例，增加到 MimeTypeArray中
    for(let m_index=0;m_index<tmp_plugin.length;m_index++){
        let tmp_mimetype = tmp_plugin.item(m_index);
        // catvm.memory.MimeTypeArray.ls.push(tmp_mimetype);
        if(!(tmp_mimetype.type in catvm.memory.MimeTypeArray.mimetype_types)){
            catvm.memory.MimeTypeArray.mimetype_types[tmp_mimetype.type] = 1;
            catvm.memory.MimeTypeArray._[catvm.memory.MimeTypeArray.mimetype_count] = tmp_mimetype;
            catvm.memory.MimeTypeArray.mimetype_count += 1;
            // mimetype.type浏览器显示的是灰色名称，下面这种添加属性会是亮的，因此我们需要换一种添加方式
            Object.defineProperty(catvm.memory.MimeTypeArray._, tmp_mimetype.type, {
                value: tmp_mimetype,
            });
        }
    }
}
catvm.memory.MimeTypeArray._.length = catvm.memory.MimeTypeArray.mimetype_count;

catvm.memory.MimeTypeArray._.__proto__ = MimeTypeArray.prototype;
// 依赖注入
navigator.mimeTypes = catvm.memory.MimeTypeArray._;
// 代理一般挂在实例上
navigator.mimeTypes  = catvm.proxy(navigator.mimeTypes)