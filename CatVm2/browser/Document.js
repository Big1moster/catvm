// 从浏览器中知道Document是全局的，new Document会返回一个对象
var Document = function Document() { // 构造函数
};
catvm.safefunction(Document);
// 浏览器
Object.defineProperties(Document.prototype, {
    [Symbol.toStringTag]: {
        value: "Document",
        configurable: true
    }
});
document = {};
document.__proto__ = Document.prototype;

////////// 浏览器代码自动生成部分
document.cookie = '';
document.referrer = location.href || '';
document.getElementById = function getElementById(id) {
    debugger;
    // 用id匹配当前环境内存中已有的Element，没找到则返回null
    return null;
};
catvm.safefunction(document.getElementById);

document.getElementsByTagName = function getElementsByTagName(tag_name) {
    var map_tag = {'body': ["<body link=\"#0000cc\" mpa-version=\"7.16.14\" mpa-extension-id=\"ibefaeehajgcpooopoegkifhgecigeeg\" style=\"\"></body>"]};
    debugger;
    return map_tag[tag_name]
};
catvm.safefunction(document.getElementsByTagName);


document.addEventListener = function addEventListener(type, listener, options, useCapture) {
    debugger;
};
catvm.safefunction(document.addEventListener);


document.createElement = function createElement(tagName) {
    tagName = tagName.toLowerCase();
    if (catvm.memory.htmlelements[tagName] == undefined) {
        debugger;
    } else {
        var tagElement = catvm.memory.htmlelements[tagName]();
        return catvm.proxy(tagElement);
    }
};
catvm.safefunction(document.createElement);
////////
// 浏览器中document是全局的，因此我们也需要定义一个document 

document = catvm.proxy(document);

