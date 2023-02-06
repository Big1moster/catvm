// 传进来的对象是一个实例还是一个原型
// 思路：遍历原型里面所有的值，拿出来进行封装

//判断对象的类型
function judge_type(pr,property,_name) {
    var code = "";
    // Screen.prototype.width = 1494;
    var temp = _name+".prototype."+property;
    switch (typeof (pr[property])) {
        case "function":
            code = temp + "= function " +property+"(){debugger;};catvm.safefunction("+temp+");";
            break;
        case "object":
            code = temp + "= catvm.proxy(class " +property+"{});";
            break;
        default:
            // "string"\"boolean"\"undefined"\"number"
            code += _name+".prototype."+property + "=" +pr[property];
            break;
    }
    return code;
}

function getcode(pr,_name) {
    var code = "";
    for (var property in pr.__proto__) {
        console.log(property,typeof property);
        // 原型、字段名、别名
        code += judge_type(pr,property,_name) + "\r\n";
    }
    return code;
}

/*
浏览器运行我们的脚本：
getcode(localStorage,"Storage")
生成：
Storage.prototype.length=0
Storage.prototype.clear= function clear(){debugger;};catvm.safefunction(Storage.prototype.clear);
Storage.prototype.getItem= function getItem(){debugger;};catvm.safefunction(Storage.prototype.getItem);
Storage.prototype.key= function key(){debugger;};catvm.safefunction(Storage.prototype.key);
Storage.prototype.removeItem= function removeItem(){debugger;};catvm.safefunction(Storage.prototype.removeItem);
Storage.prototype.setItem= function setItem(){debugger;};catvm.safefunction(Storage.prototype.setItem);
然后我们再具体实现每个方法
 */