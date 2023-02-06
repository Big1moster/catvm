// 存储一些值，避免污染全局变量空间
catvm.memory.PluginArray = {};

var PluginArray = function PluginArray() { // 构造函数
    throw new TypeError("Illegal constructor");
};
catvm.safefunction(PluginArray);


catvm.memory.PluginArray.iterator = function values() {
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

Object.defineProperties(PluginArray.prototype, {
    [Symbol.toStringTag]: {
        value: "PluginArray",
        configurable: true
    },
    // 原型上多了个这个,里面是个方法
    [Symbol.iterator]: {
        value: catvm.memory.PluginArray.iterator,
        configurable: true
    }
});
// PluginArray实例, PluginArray这个虽然跟Plugin很像，但是无需被new，浏览器一开始就有该实例 navigator.plugins
catvm.memory.PluginArray._ = {};

////////// ///////////////////浏览器代码自动生成部分
PluginArray.prototype.length = 0;
PluginArray.prototype.item = function item(index) {
    // debugger;
    return this[index];
};
catvm.safefunction(PluginArray.prototype.item);
PluginArray.prototype.namedItem = function namedItem(key) {
    // debugger;
    return this[key];
};
catvm.safefunction(PluginArray.prototype.namedItem);

PluginArray.prototype.refresh = function refresh() {
    debugger;
};
catvm.safefunction(PluginArray.prototype.refresh);

// 适用于 调用原型的属性会抛出异常的对象
for (var _prototype in PluginArray.prototype) {
    if (typeof (PluginArray.prototype[_prototype]) != "function") {
        // 相当于Object.defineProperty的get方法，Proxy的get方法，hook原型上的所有方法属性
        PluginArray.prototype.__defineGetter__(_prototype, function () {
            // this是实例
            throw new TypeError("Illegal constructor");
            // return this[pr];
        });
    }
}
/*
{ name: 'Chrome PDF Viewer', filename: 'internal-pdf-viewer', description: 'Portable Document Format',MimeTypes:[{"description": "Portable Document Format","suffixes": "pdf","type": "application/pdf"},{"description": "xxxxx","suffixes": "xxxxpdf","type": "xxxxapplication/pdf"}]}
 */
///////////////////////
catvm.memory.PluginArray.ls = [
        {
            "name": "PDF Viewer",
            "filename": "internal-pdf-viewer",
            "description": "Portable Document Format",
            "MimeTypes": [
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "application/pdf"
                },
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "text/pdf"
                }
            ]
        },
        {
            "name": "Chrome PDF Viewer",
            "filename": "internal-pdf-viewer",
            "description": "Portable Document Format",
            "MimeTypes": [
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "application/pdf"
                },
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "text/pdf"
                }
            ]
        },
        {
            "name": "Chromium PDF Viewer",
            "filename": "internal-pdf-viewer",
            "description": "Portable Document Format",
            "MimeTypes": [
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "application/pdf"
                },
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "text/pdf"
                }
            ]
        },
        {
            "name": "Microsoft Edge PDF Viewer",
            "filename": "internal-pdf-viewer",
            "description": "Portable Document Format",
            "MimeTypes": [
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "application/pdf"
                },
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "text/pdf"
                }
            ]
        },
        {
            "name": "WebKit built-in PDF",
            "filename": "internal-pdf-viewer",
            "description": "Portable Document Format",
            "MimeTypes": [
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "application/pdf"
                },
                {
                    "description": "Portable Document Format",
                    "suffixes": "pdf",
                    "type": "text/pdf"
                }
            ]
        }
    ]


for (let index = 0; index < catvm.memory.PluginArray.ls.length; index++) {
    let tmp_plugin = catvm.memory.plugin.new(catvm.memory.PluginArray.ls[index]);
    catvm.memory.PluginArray._[index] = tmp_plugin;
    // mimetype.type浏览器显示的是灰色名称，下面这种添加属性会是亮的，因此我们需要换一种添加方式
    Object.defineProperty(catvm.memory.PluginArray._, tmp_plugin.name, {
        value: tmp_plugin,
    });
}
catvm.memory.PluginArray._.length = catvm.memory.PluginArray.ls.length;

catvm.memory.PluginArray._.__proto__ = PluginArray.prototype;
// 代理一般挂在实例上
catvm.memory.PluginArray._ = catvm.proxy(catvm.memory.PluginArray._);
// 依赖注入
navigator.plugins = catvm.memory.PluginArray._;
