// 从浏览器中知道Screen是全局的，且原型链只是一层，因此比较好伪造（window有多层所以要伪造多层）
// 浏览器中new会报错，因此我们此处也需要报错
var Screen = function Screen() { // 构造函数
    throw new TypeError("Illegal constructor");
};
catvm.safefunction(Screen);
// 浏览器
Object.defineProperties(Screen.prototype, {
    [Symbol.toStringTag]: {
        value: "Screen",
        configurable: true
    }
});
screen = {};
screen.__proto__ = Screen.prototype;
////////// 浏览器代码自动生成部分
Screen.prototype.width = 1494;
Screen.prototype.height = 934;
Screen.prototype.availWidth = 1494;
Screen.prototype.availHeight = 934;
Screen.prototype.colorDepth = 24;
Screen.prototype.pixelDepth = 24;
////////
// 浏览器中screen是全局的，因此我们也需要定义一个screen

screen = catvm.proxy(screen);

