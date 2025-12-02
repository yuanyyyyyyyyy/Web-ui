// 全局变量
let currentDeleteId = null;

document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const tableElement = document.getElementById('studentsTable');
    const tableBody = document.getElementById('tableBody');
    const addForm = document.getElementById('addStudentForm');
    const editForm = document.getElementById('editStudentForm');
    const editFormSection = document.getElementById('editFormSection');
    const cancelEditBtn = document.getElementById('cancelEdit');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');

    // 初始化 - 加载学生数据
    loadStudents();

    // 添加学生表单提交事件
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addStudent();
    });

    // 编辑学生表单提交事件
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateStudent();
    });

    // 取消编辑按钮事件
    cancelEditBtn.addEventListener('click', function() {
        hideEditForm();
    });

    // 删除确认按钮事件
    confirmDeleteBtn.addEventListener('click', function() {
        deleteStudent(currentDeleteId);
        hideDeleteModal();
    });

    // 取消删除按钮事件
    cancelDeleteBtn.addEventListener('click', function() {
        hideDeleteModal();
    });

    // 加载学生数据函数
    function loadStudents() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/students', true);
        
        xhr.onload = function() {
            loadingElement.style.display = 'none';
            
            if (xhr.status === 200) {
                try {
                    const students = JSON.parse(xhr.responseText);
                    displayStudents(students);
                } catch (error) {
                    showError('数据解析错误: ' + error.message);
                }
            } else {
                showError('请求失败，状态码: ' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            loadingElement.style.display = 'none';
            showError('网络错误，请检查JSON Server是否运行');
        };
        
        xhr.send();
    }

    // 显示学生数据函数
    function displayStudents(students) {
        if (students.length === 0) {
            showError('没有找到学生数据');
            return;
        }
        
        tableBody.innerHTML = '';
        
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
                <td class="actions-cell">
                    <button class="btn btn-warning" onclick="editStudent(${student.id})">编辑</button>
                    <button class="btn btn-danger" onclick="showDeleteModal(${student.id}, '${student.name}')">删除</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        tableElement.style.display = 'table';
    }

    // 添加学生函数
    function addStudent() {
        const formData = new FormData(addForm);
        const studentData = {
            name: formData.get('name'),
            age: parseInt(formData.get('age')),
            major: formData.get('major'),
            grade: formData.get('grade')
        };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/students', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
            if (xhr.status === 201) {
                addForm.reset();
                loadStudents(); // 重新加载数据
                showSuccess('学生添加成功！');
            } else {
                showError('添加失败，状态码: ' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            showError('网络错误，添加失败');
        };
        
        xhr.send(JSON.stringify(studentData));
    }

    // 编辑学生函数
    window.editStudent = function(studentId) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:3000/students/${studentId}`, true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const student = JSON.parse(xhr.responseText);
                showEditForm(student);
            } else {
                showError('获取学生数据失败');
            }
        };
        
        xhr.onerror = function() {
            showError('网络错误，获取数据失败');
        };
        
        xhr.send();
    };

    // 显示编辑表单
    function showEditForm(student) {
        document.getElementById('editId').value = student.id;
        document.getElementById('editName').value = student.name;
        document.getElementById('editAge').value = student.age;
        document.getElementById('editMajor').value = student.major;
        document.getElementById('editGrade').value = student.grade;
        
        editFormSection.style.display = 'block';
        // 滚动到编辑表单
        editFormSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 隐藏编辑表单
    function hideEditForm() {
        editFormSection.style.display = 'none';
        editForm.reset();
    }

    // 更新学生信息
    function updateStudent() {
        const formData = new FormData(editForm);
        const studentId = formData.get('id');
        const studentData = {
            name: formData.get('name'),
            age: parseInt(formData.get('age')),
            major: formData.get('major'),
            grade: formData.get('grade')
        };

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:3000/students/${studentId}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                hideEditForm();
                loadStudents(); // 重新加载数据
                showSuccess('学生信息更新成功！');
            } else {
                showError('更新失败，状态码: ' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            showError('网络错误，更新失败');
        };
        
        xhr.send(JSON.stringify(studentData));
    }

    // 显示删除确认模态框
    window.showDeleteModal = function(studentId, studentName) {
        currentDeleteId = studentId;
        document.getElementById('deleteStudentName').textContent = studentName;
        deleteModal.style.display = 'flex';
    };

    // 隐藏删除确认模态框
    function hideDeleteModal() {
        deleteModal.style.display = 'none';
        currentDeleteId = null;
    }

    // 删除学生
    function deleteStudent(studentId) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `http://localhost:3000/students/${studentId}`, true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                loadStudents(); // 重新加载数据
                showSuccess('学生删除成功！');
            } else {
                showError('删除失败，状态码: ' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            showError('网络错误，删除失败');
        };
        
        xhr.send();
    }

    // 显示错误信息
    function showError(message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
        // 3秒后自动隐藏
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    }

    // 显示成功信息（临时显示）
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1001;
            font-weight: bold;
        `;
        successDiv.textContent = message;
        document.body.appendChild(successDiv);
        
        // 3秒后自动移除
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 3000);
    }
});