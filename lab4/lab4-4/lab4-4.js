// 水仙花数（Narcissistic Number）是指一个三位数，其各位数字的立方和等于该数本身。
// 例如 153 是水仙花数，因为 1³ + 5³ + 3³ = 153。
// 实现函数 isNarcissisticNumber，并提供简单的命令行输入处理。

const readline = require('readline');

/**
 * 判断一个三位整数是否为水仙花数
 * @param {number} num 三位整数（100-999）
 * @returns {boolean} 是水仙花数返回 true，否则返回 false（非三位数也返回 false）
 */
function isNarcissisticNumber(num) {
    if (typeof num !== 'number' || !Number.isInteger(num)) return false;
    if (num < 100 || num > 999) return false;
    const digits = String(Math.abs(num)).split('').map(d => Number(d));
    const sum = digits.reduce((acc, d) => acc + Math.pow(d, 3), 0);
    return sum === num;
}

// 如果作为脚本直接运行，使用 readline 接收一行输入并输出结果
if (require.main === module) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('请输入一个三位整数 (100-999)：', (input) => {
        const num = Number(input.trim());
           if (Number.isNaN(num)) {
            console.error('输入的数字格式错误');
            rl.close();
            process.exitCode = 1;
            return;
        }
        if (!Number.isInteger(num) || num < 100 || num > 999) {
            console.error('输入的数字范围必须在100-999之间');
            rl.close();
            process.exitCode = 1;
            return;
        }
        console.log(isNarcissisticNumber(num)); // true or false
        rl.close();
    });
}

// 导出函数以便测试
module.exports = { isNarcissisticNumber };