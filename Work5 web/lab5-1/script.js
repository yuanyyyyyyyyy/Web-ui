// JavaScript代码 - 使用原生XMLHttpRequest
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const tableElement = document.getElementById('studentsTable');
    const tableBody = document.getElementById('tableBody');
    
    // 显示加载状态
    loadingElement.innerHTML = '⏳ 正在从JSON Server加载学生数据...<br><small>请求地址: http://localhost:3000/students</small>';
    
    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
    
    // 配置请求
    xhr.open('GET', 'http://localhost:3000/students', true);
    
    // 设置请求完成后的回调函数
    xhr.onload = function() {
        // 隐藏加载提示
        loadingElement.style.display = 'none';
        
        if (xhr.status === 200) {
            // 请求成功
            try {
                const students = JSON.parse(xhr.responseText);
                console.log('获取到的学生数据:', students);
                displayStudents(students);
            } catch (error) {
                showError('数据解析错误: ' + error.message);
            }
        } else {
            // 请求失败
            showError('请求失败，状态码: ' + xhr.status + '<br>请确保JSON Server正在运行在端口3000');
        }
    };
    
    // 设置请求错误的回调函数
    xhr.onerror = function() {
        loadingElement.style.display = 'none';
        showError('网络错误，请检查：<br>1. JSON Server是否运行<br>2. 地址是否为 http://localhost:3000<br>3. 浏览器是否阻止了跨域请求');
    };
    
    // 设置超时处理
    xhr.timeout = 10000; // 10秒超时
    xhr.ontimeout = function() {
        loadingElement.style.display = 'none';
        showError('请求超时，请检查：<br>1. JSON Server是否启动<br>2. 网络连接是否正常');
    };
    
    // 发送请求
    console.log('开始发送XMLHttpRequest请求...');
    xhr.send();
    
    // 显示学生数据的函数
    function displayStudents(students) {
        if (students.length === 0) {
            showError('没有找到学生数据，请检查db.json文件');
            return;
        }
        
        // 清空表格内容
        tableBody.innerHTML = '';
        
        // 遍历学生数据并创建表格行
        students.forEach(function(student) {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td style="text-align: center; font-weight: bold;">${student.id}</td>
                <td style="color: #2196F3; font-weight: bold;">${student.name}</td>
                <td style="text-align: center;">${student.age}</td>
                <td>${student.major}</td>
                <td style="text-align: center;">
                    <span class="grade-badge">${student.grade}</span>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // 显示表格
        tableElement.style.display = 'table';
        
        // 添加成功消息
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `✅ 成功加载 ${students.length} 条学生数据`;
        successMessage.style.cssText = 'text-align: center; color: #4CAF50; font-weight: bold; margin: 15px 0; padding: 10px; background: #E8F5E8; border: 2px solid #4CAF50; border-radius: 5px;';
        tableElement.parentNode.insertBefore(successMessage, tableElement);
    }
    
    // 显示错误信息的函数
    function showError(message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }
});