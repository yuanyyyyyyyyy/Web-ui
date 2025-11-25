//获取DOM元素
let totalheads = document.getElementById("totalheads"); //总头数输入框
let totallegs = document.getElementById("totallegs");   //总腿数输入框
let calculateBtn = document.getElementById("calculateBtn"); //计算按钮
let resultDiv = document.getElementById("result"); //结果显示区域
//按钮点击事件处理函数
calculateBtn.addEventListener('click', () => {
    let heads = parseInt(totalheads.value);
    let legs = parseInt(totallegs.value);
    let result = cal(heads, legs);
    if (result) {
        resultDiv.innerHTML = `分别有鸡 ${result.chickens}, 有兔 ${result.rabbits}只`;
    } else {
        resultDiv.innerHTML = "<span class = 'no-result'>无解</span>";
    }
    totalheads.value = "";
    totallegs.value = "";
}
);
//计算鸡兔数量的函数
function cal(totalheads, totallegs) { 
    for (let chickens = 0; chickens <= totalheads; chickens++) {
        let rabbits = totalheads - chickens;
        if ((chickens * 2 + rabbits * 4) === totallegs) {
            return { chickens: chickens, rabbits: rabbits };
        }
    }
    return null; //无解
}
