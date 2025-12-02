// lab4-1.js
// 动态生成星型菱形图案
// 参数：topRows 指定上半部分行数（不含中间最大行）
function generateDiamond(containerId, topRows) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    // 帮助函数：创建一行指定数量的星星和类名（颜色）
    function createLine(starCount, cls) {
        const line = document.createElement('div');
        line.className = 'pattern';
        //作用：创建一个文档片段，然后把创建的元素添加到文档片段中，最后把文档片段添加到容器中
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < starCount; i++) {
            const span = document.createElement('span');
            span.className = 'star ' + cls;
            span.textContent = '*';
            fragment.appendChild(span);
            if (i < starCount - 1) {
                const sp = document.createElement('span');
                sp.textContent = ' ';
                fragment.appendChild(sp);
            }
        }
        line.appendChild(fragment);
        container.appendChild(line);
    }

    // 生成上半部分（递增：1,3,5,...）
    for (let i = 0; i < topRows; i++) {
        const stars = i * 2 + 1;
        createLine(stars, 'blue');
    }

    // 中间最大行
    const middleStars = topRows * 2 + 1;
    createLine(middleStars, 'red');

    // 生成下半部分（递减）
    for (let i = topRows - 1; i >= 0; i--) {
        const stars = i * 2 + 1;
        createLine(stars, 'red');
    }
}

// 页面加载后生成图案（默认 topRows = 6，与附件图像相近）
document.addEventListener('DOMContentLoaded', () => {
    generateDiamond('diamond', 6);
});