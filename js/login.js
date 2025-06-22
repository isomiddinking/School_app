document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme preferences immediately on page load
    const savedTextColor = localStorage.getItem('siteTextColor');
    if (savedTextColor) {
        document.body.style.setProperty('color', savedTextColor, 'important');
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            if (login == admin && password == admin123) {
                localStorage.setItem("admin", JSON.stringify({ login, password }));
                alert("Admin saqlandi!");
                window.location.href = "admin.html";
              } else {
                alert("Iltimos, to‘liq to‘ldiring.");
              }

            let isAuthenticated = false;

            if (role === 'admin') {
                const adminData = JSON.parse(localStorage.getItem('admin'));
                if (adminData && adminData.login === login && adminData.password === password) {
                    localStorage.setItem('loggedInUserRole', 'admin');
                    localStorage.setItem('currentAdminLogin', login);
                    isAuthenticated = true;
                    window.location.href = 'admin.html';
                }
            } else if (role === 'teacher') {
                const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
                const teacher = teachers.find(t => t.login === login && t.password === password);
                if (teacher) {
                    localStorage.setItem('loggedInUserRole', 'teacher');
                    localStorage.setItem('currentTeacherLogin', login);
                    isAuthenticated = true;
                    window.location.href = 'teacher.html';
                }
            } else if (role === 'student') {
                const students = JSON.parse(localStorage.getItem('students')) || [];
                const student = students.find(s => s.login === login && s.password === password);
                if (student) {
                    localStorage.setItem('loggedInUserRole', 'student');
                    localStorage.setItem('currentStudentLogin', login);
                    isAuthenticated = true;
                    window.location.href = 'student.html';
                }
            }

            if (!isAuthenticated) {
                alert('Noto‘g‘ri login yoki parol!');
            }
        });
    }
});