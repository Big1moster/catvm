// 从浏览器中知道Storage是全局的，且原型链只是一层，因此比较好伪造（window有多层所以要伪造多层）
// 浏览器中new会报错，因此我们此处也需要报错
var Storage = function Storage() { // 构造函数
    throw new TypeError("Illegal constructor");
};
catvm.safefunction(Storage);
// 浏览器
Object.defineProperties(Storage.prototype, {
    [Symbol.toStringTag]: {
        value: "Storage",
        configurable: true
    }
});
var localStorage = {};
localStorage.__proto__ = Storage.prototype;

////////// 浏览器代码自动生成部分

function get_length() {
    return Object.keys(catvm.memory.storage).length;
}

Storage.prototype.length = get_length();
Storage.prototype.key = function key(index) {
    return Object.keys(catvm.memory.storage)[index];
};
catvm.safefunction(Storage.prototype.key);
Storage.prototype.getItem = function getItem(keyName) {
    var result = catvm.memory.storage[keyName];
    if (result) {
        return result;
    } else {
        return null;
    }
};
catvm.safefunction(Storage.prototype.getItem);

Storage.prototype.setItem = function setItem(keyName, keyValue) {
    catvm.memory.storage[keyName] = keyValue;
};
catvm.safefunction(Storage.prototype.setItem);

Storage.prototype.removeItem = function removeItem(keyName) {
    delete catvm.memory.storage[keyName];
};
catvm.safefunction(Storage.prototype.removeItem);

Storage.prototype.clear = function clear() {
    catvm.memory.storage = {};
};
catvm.safefunction(Storage.prototype.clear);


////////

// 代理一般挂在实例上
localStorage = catvm.proxy(localStorage);
Storage = catvm.proxy(Storage);

