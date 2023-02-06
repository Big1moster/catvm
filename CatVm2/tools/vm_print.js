// 日志调试功能
catvm.print = {};
catvm.memory.print = []; // 缓存
catvm.print.log = function () {
    if (catvm.memory.config.print) {
        console.table(catvm.memory.log);

    }
};

catvm.print.getAll = function () { // 列出所有日志
    if (catvm.memory.config.print) {
        console.table(catvm.memory.log);

    }
};