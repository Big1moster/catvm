// 从浏览器中知道History是全局的，且原型链只是一层，因此比较好伪造（window有多层所以要伪造多层）
// 浏览器中new会报错，因此我们此处也需要报错
var History = function History() { // 构造函数
    throw new TypeError("Illegal constructor");
};
catvm.safefunction(History);
// 浏览器
Object.defineProperties(History.prototype, {
    [Symbol.toStringTag]: {
        value: "History",
        configurable: true
    }
});

history = {
    length: 1,
};
history.__proto__ = History.prototype;
////////// 浏览器代码自动生成部分
History.prototype.back = function back() {
    debugger;
};
catvm.proxy(History.prototype.back);
////////
// 浏览器中history是全局的，因此我们也需要定义一个history

history = catvm.proxy(history);

