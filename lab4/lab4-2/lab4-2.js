// lab4-2.js
// 作用：在页面中动态生成“九九乘法表”并实现鼠标交互高亮
// 结构约定：JS 将在页面中查找 id 为 'mul-table' 的容器，然后构建若干个
// div.mul-row（表示每一行），每个 .mul-row 内包含若干个 div.cell（每个单元格）。

(function () {
    'use strict';

    // 获取容器（在 lab4-2.html 中）
    const container = document.getElementById('mul-table');
    // 如果容器不存在（例如文件路径错误），则直接返回，避免后续报错
    if (!container) return;

    // 创建表格：行 i 从 1 到 9，行内列 j 从 1 到 i（即第一行 1 个单元格，第九行 9 个单元格）
    // 这样生成了一个常见的三角形排列形式的乘法表（也叫阶梯式乘法表）
    for (let i = 1; i <= 9; i++) {
        // 创建行元素
        const row = document.createElement('div');
        row.className = 'mul-row';
        // 使用 data-row 属性记录这是第几行，便于调试与扩展
        row.dataset.row = i;

        // 当前行内逐个创建单元格
        for (let j = 1; j <= i; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            // data 属性便于通过选择器匹配同列或同行的元素
            cell.dataset.row = i;
            cell.dataset.col = j;
            // 单元格展示文本，例如 "3 × 4 = 12"
            cell.textContent = `${j} × ${i} = ${i * j}`;

            // 事件：鼠标进入单元格时需要高亮该单元格、整行和同列
            // hover（单元格自身的显著高亮）由 CSS 类 .hover 控制
            cell.addEventListener('mouseenter', () => {
                // 给当前单元格添加 hover 类，使其变为深色样式
                cell.classList.add('hover');
                // 给当前行添加 row-hover 类，使整行变为浅色背景
                row.classList.add('row-hover');
                // 找出所有具有 data-col 属性的单元格，并把与当前列匹配的单元格加上 col-hover
                // 这样可以高亮同一乘数列，便于视觉关联
                const col = cell.dataset.col;
                const all = container.querySelectorAll('.cell[data-col]');
                all.forEach(c => {
                    if (c.dataset.col === col) {
                        c.classList.add('col-hover');
                    }
                });
            });

            // 鼠标离开单元格时，移除所有在进入时添加的类，恢复默认样式
            cell.addEventListener('mouseleave', () => {
                cell.classList.remove('hover');
                row.classList.remove('row-hover');
                const col = cell.dataset.col;
                const all = container.querySelectorAll('.cell[data-col]');
                all.forEach(c => c.classList.remove('col-hover'));
            });

            // 把构造好的单元格追加到当前行
            row.appendChild(cell);
        }

        // 行构造完成后追加到容器中
        container.appendChild(row);

        // ------- 额外说明（关于行偏移） -------
        // 下面这段代码会计算第一个单元格的实际占位宽度（含左右 margin），
        // 并将当前行向右偏移 (i-1) * fullWidth 像素，从而形成视觉上的阶梯效果。
        // 如果希望左侧严格对齐，请删除或注释掉这段代码。
        const firstCell = row.querySelector('.cell');
        if (firstCell) {
            const cs = window.getComputedStyle(firstCell);
            const fullWidth = firstCell.getBoundingClientRect().width + (parseFloat(cs.marginLeft) || 0) + (parseFloat(cs.marginRight) || 0);
            // 例如 i=1 行 marginLeft 为 0，i=2 行 marginLeft 为 1*fullWidth，依次类推
            row.style.marginLeft = `${(i - 1) * fullWidth}px`;
        }
    }

})();

