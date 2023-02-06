// .node.js文件的用途就是拼接多个文件的js代码
var fs = require('fs');

function GetCode() {
    var code = ""
    code += fs.readFileSync(`${__dirname}/HTMLDivElement.js`) + '\r\n';
    // code += fs.readFileSync(`${__dirname}/vm_safefunction.js`) + '\r\n';
    // code += fs.readFileSync(`${__dirname}/vm_print.js`) + '\r\n';
    // code += fs.readFileSync(`${__dirname}/vm_proxy.js`) + '\r\n';
    return code;

}
module.exports = {
    GetCode
}