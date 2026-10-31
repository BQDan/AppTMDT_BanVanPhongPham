
// Lấy danh sách tài khoản đã đăng ký
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// ĐĂNG KÝ
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password.length < 8) {
            alert("Mật khẩu phải có ít nhất 8 ký tự!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        const users = getUsers();

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert("Email này đã được đăng ký!");
            return;
        }

        const newUser = {
            fullname,
            email,
            phone,
            password
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Đăng ký thành công! Vui lòng đăng nhập.");

        window.location.href = "login.html";
    });
}

// ĐĂNG NHẬP
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const remember = document.getElementById("remember").checked;

        const users = getUsers();

        const user = users.find(
            item => item.email === email && item.password === password
        );

        if (!user) {
            alert("Email hoặc mật khẩu không chính xác!");
            return;
        }

        const sessionData = {
            fullname: user.fullname,
            email: user.email
        };

        if (remember) {
            localStorage.setItem("currentUser", JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem("currentUser", JSON.stringify(sessionData));
        }

        alert("Đăng nhập thành công! Xin chào " + user.fullname);

        window.location.href = "index.html";
    });
}

// KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP
function getCurrentUser() {
    const localUser = localStorage.getItem("currentUser");
    const sessionUser = sessionStorage.getItem("currentUser");

    return JSON.parse(localUser || sessionUser || "null");
}

// ĐĂNG XUẤT
function logout() {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");

    alert("Bạn đã đăng xuất!");

    window.location.href = "index.html";
}
