function Person(option) {
    //一般传入字面量对象做参数
    //new之后自动创建一个空对象，把这个对象的地址给this，即var this = new Object();
    //this给空对象绑定属性和行为
    this._init(option);
    this.name = option.name;
    this.eat = function(food) {
        console.log("吃" + food)
    }
    ;
    //自动默认return this;如果有存在 return 对象，则不返回this，若return 非对象，则依然return this
}
Person.prototype = {
    //所有此对象共享的属性和方法
    _init: function(option) {
        this.earth = option.earth;
    },
    run: function(where) {
        console.log(this.name + "在" + where + "泡");
    }
};
var per = new Person({
    name: "dsf"
});
//向构造函数传入字面量对象
per.eat("牛排");
//调用对象方法




一般补环境的几个步骤：
比如补Navigator：
1、先在浏览器环境观察该对象：Navigator
能否进行new Navigator,不能的话则在其构造函数定义中抛出异常，能的话不抛；
查看其原型Navigator.prototype  的属性、方法、原型链，
发现Navigator原型属性、方法不能通过原型调用，即
Navigator.appVersion 会抛出异常。
发现 其原型链只有一层，即Navigator.prototype.__proto__  === Object.prototype
2、在浏览器环境观察其实例对象：navigator
查看其属性、方法与 原型上的差异，发现差不多，基本都是继承原型的，

3、补环境：
定义Navigator 构造函数，并保护其toString,
    定义navigator对象，将其原型指向Navigator，即navigator.__proto__ = Navigator.prototype;
如果是多层原型的话，需要多次指向。
补全原型上的属性、方法：
Navigator.prototype.plugins = [];
Navigator.prototype.languages = ["zh-CN", "zh"];
补全实例上的属性、方法（不要与继承自原型的属性、方法冲突）



4、代理该对象  navigator





补一个方法如location.reload()时，
需要看其是在原型上还是实例上，这会决定我们是在原型上补还是在实例上补（唯一区别），
通过浏览器环境观察，发现reload是在location实例上定义的，
因此我们直接在location实例上补该方法：
location = class location{};
//此处必须给个方法名，因为toString会默认调用该方法，可能会检测该方法名，location.reload.toString时，
// 会将该方法定义（包括方法定义中的注释）都输出
// eg：loca.reload.toString()
// 'function reload(){ //此处必须给个方法名，因为toString会默认调用该方法，可能会检测该方法名\n\n}'
location.reload = function reload(){

};
定义完方法之后，需要对方法进行保护
func_set_native(location.reload);







一般补环境的几个步骤：
比如补Navigator：
1、先在浏览器环境观察该对象：Navigator
先查看其原型链，发现只有一层即 Navigator.prototype.__proto__ 为Object原型
能否进行new Navigator,不能的话则在其构造函数定义中抛出异常，能的话不抛；
var Navigator = function Navigator() { // 构造函数
    throw new TypeError("Illegal constructor");
};
然后保护该方法：
catvm.safefunction(Navigator);
然后给其原型一个名字：
Object.defineProperties(Navigator.prototype, {
    [Symbol.toStringTag]: {
        value: "Navigator",
        configurable: true
    }
}
});
在浏览器查看其实例navigator是否存在，存在的话我们也要定义一个：
navigator = {};
然后指定其原型：
navigator.__proto__ = Navigator.prototype;
此时对比浏览器原型链，确定我们原型已经补完，接下来就是填充navigator的原型方法、属性、实例方法、属性
对比浏览器上navigator的原型与实例上方法、属性的差异，将原型上的补到我们原型上，实例上的补到实例上，两者都有的优先补到原型上。
Navigator.prototype.plugins = [];
Navigator.prototype.languages = ["zh-CN", "zh"];
...
然后在最末尾加上代理：
navigator = catvm.proxy(navigator);
最终在调试网站js环境代码时，根据log一个个补，浏览器上输出啥，我们就补成啥，如果log输出本来就跟浏览器上的
一致，则不用动，继续去看下一个log

遇到不清楚的属性、方法，去 https://developer.mozilla.org/上查看