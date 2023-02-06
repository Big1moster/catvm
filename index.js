var  fs = require('fs');
var catvm2 = require('./CatVm2/catvm2.node.js');
const {VM,VMScript} = require('vm2');
var catvm2_code = catvm2.GetCode();  // 框架代码
// debugger;
// var web_js_code = fs.readFileSync(`${__dirname}/jy.js`) ; // 网站js代码
var web_js_code = fs.readFileSync(`${__dirname}/rs.js`) ; // 网站js代码
var log_code = "\r\ncatvm.print.getAll();\r\r"
web_js_code = web_js_code+log_code
var all_code = catvm2_code+web_js_code;
fs.writeFileSync(`${__dirname}/debugger_bak.js`,all_code);
const script = new VMScript(all_code,`${__dirname}/debugger.js`); //真实路径，浏览器打开的就是该缓存文件

const vm = new VM(); // new 一个纯净v8环境
debugger
vm.run(script);
debugger
