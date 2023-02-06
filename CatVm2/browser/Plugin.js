// 存储一些值，避免污染全局变量空间
catvm.memory.plugin = {};

var Plugin = function Plugin() { // 构造函数
    throw new TypeError("Illegal constructor");
};
catvm.safefunction(Plugin);


catvm.memory.plugin.iterator = function values() {
    // debugger;
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
catvm.safefunction(catvm.memory.plugin.iterator);

Object.defineProperties(Plugin.prototype, {
    [Symbol.toStringTag]: {
        value: "Plugin",
        configurable: true
    },
    // 原型上多了个这个,里面是个方法
    [Symbol.iterator]: {
        value: catvm.memory.plugin.iterator,
        configurable: true
    }
});

////////// 浏览器代码自动生成部分
Plugin.prototype.name = "";
Plugin.prototype.filename = "";
Plugin.prototype.description = "";
Plugin.prototype.length = 0;
Plugin.prototype.item = function item(index) {
    // debugger;
    return this[index];
};
catvm.safefunction(Plugin.prototype.item);
Plugin.prototype.namedItem = function namedItem(key) {
    // debugger;
    return this[key];
};
catvm.safefunction(Plugin.prototype.namedItem);


for (var _prototype in Plugin.prototype) {
    if (typeof (Plugin.prototype[_prototype]) != "function") {
        // 相当于Object.defineProperty的get方法，Proxy的get方法，hook原型上的所有方法属性
        Plugin.prototype.__defineGetter__(_prototype, function () {
            // this是实例
            throw new TypeError("Illegal constructor");
            // return this[pr];
        });
    }
}
/*
{ name: 'Chrome PDF Viewer', filename: 'internal-pdf-viewer', description: 'Portable Document Format',MimeTypes:[{"description": "Portable Document Format","suffixes": "pdf","type": "application/pdf"},{"description": "xxxxx","suffixes": "xxxxpdf","type": "xxxxapplication/pdf"}]}
 */
////////
catvm.memory.plugin.new = function (data) {
    var plugin = {};
    if (data != undefined) {
        plugin.description = data.description;
        plugin.filename = data.filename;
        plugin.name = data.name;
        // MimeType
        if (data.MimeTypes != undefined) {
            for (let index = 0; index < data.MimeTypes.length; index++) {
                var mimetypedata = data.MimeTypes[index];
                var mimetype = catvm.memory.mimetype.new(mimetypedata, plugin);
                plugin[index] = mimetype;
                // mimetype.type浏览器显示的是灰色名称，下面这种添加属性会是亮的，因此我们需要换一种添加方式
                // plugin[mimetype.type] = mimetype;
                Object.defineProperty(plugin, mimetype.type, {
                    value: mimetype,
                    writable: true // 是否可以改变
                });
            }

            plugin.length = data.MimeTypes.length;
        }
    }
    // 先赋完值，在指向原型
    plugin.__proto__ = Plugin.prototype;
    return plugin;
};

// 代理一般挂在实例上
navigator.plugins = catvm.proxy(navigator.plugins);

