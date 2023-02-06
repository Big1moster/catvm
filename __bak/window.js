// 环境框架内容(环境头)

window = this;

navigator = {
    userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
}
function vmProxy(obj){
    // Proxy 可以多层代理，即 a = new proxy(a); a = new proxy(a);第二次代理
    // 后代理的检测不到先代理的
    return new Proxy(obj, {
        set(target, property, value){
            console.log(target, property, value);
            return Reflect.set(...arguments); //这是一种反射语句，这种不会产生死循环问题
        },
        get(target,property,receiver){
            console.log(target, property, receiver);
            return target[property];  // target中访问属性不会被proxy拦截，所以不会死循环
        }
    });
}
// 主要用来保护伪造的函数，让其更难识破
(() => {
    'use strict';
    // 取原型链上的toString
    const $toString = Function.toString;
    // 取方法名 reload
    const myFunction_toString_symbol = Symbol('('.concat('',')_',(Math.random()+'').toString(36)));
    const myToString = function(){
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };
    function set_native(func,key,value){
        Object.defineProperty(func,key,{
            "enumerable":false,  // 不可枚举
            "configurable":true, // 可配置
            "writable":true, // 可写
            "value":value
        })
    }
    delete Function.prototype['toString'];// 删除原型链上的toString
    set_native(Function.prototype,"toString",myToString); // 自定义一个getter方法，其实就是一个hook
    //套个娃，保护一下我们定义的toString，避免js对toString再次toString，如：location.reload.toString.toString() 否则就暴露了
    set_native(Function.prototype.toString,myFunction_toString_symbol,"function toString() { [native code] }");
    this.func_set_native = (func) => {
        set_native(func,myFunction_toString_symbol,`function ${myFunction_toString_symbol,func.name || ''}() { [native code] }`);
    }; //导出函数到globalThis，更改原型上的toSting为自己的toString。这个方法相当于过掉func的toString检测点
}).call(this);


Object.defineProperties(window,{
    [Symbol.toStringTag]:{
        value:"window",
        configurable:true
    }
})

window = vmProxy(window);
/*
创建对象的几种方式： {} 、 Object.create({})、class xxx{} 、function xxx(){};+new xxx;
代理这些常见的浏览器对象，以便进行环境调试。
*/
navigator = vmProxy(class navigator{});
document = vmProxy(class document{});

location = class location{};
location.reload = function reload(){ //此处必须给个方法名，因为toString会默认调用该方法，可能会检测该方法名

};func_set_native(location.reload);

location = vmProxy(location);
screen = vmProxy(class location{});
debugger;