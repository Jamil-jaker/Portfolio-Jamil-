// Simulación de Base de Datos en LocalStorage
let users = JSON.parse(localStorage.getItem('users')) || [
    { name: "Admin Maestro", email: "admin@test.com", pass: "Admin123!", role: "admin" }
];

// Elementos del DOM
const loginForm = document.getElementById('login-form');
const regForm = document.getElementById('register-form');

// --- FUNCIONES DE NAVEGACIÓN ---
function showSection(id) {
    document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// --- VALIDACIÓN DE CONTRASEÑA ---
function validatePassword(pass, name) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!regex.test(pass)) {
        alert("La contraseña debe tener mínimo 8 caracteres, una mayúscula y un carácter especial.");
        return false;
    }
    if (pass.toLowerCase().includes(name.toLowerCase())) {
        alert("La contraseña no puede contener tu nombre.");
        return false;
    }
    return true;
}

// --- REGISTRO ---
regForm.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    const confirm = document.getElementById('reg-pass-confirm').value;

    if (users.find(u => u.email === email)) return alert("Este correo ya está registrado.");
    if (pass !== confirm) return alert("Las contraseñas no coinciden.");
    if (!validatePassword(pass, name)) return;

    users.push({ name, email, pass, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));
    alert("¡Registro exitoso! Ya puedes iniciar sesión.");
    showSection('login-section');
};

// --- LOGIN ---
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    const user = users.find(u => u.email === email && u.pass === pass);

    if (user) {
        if (user.role === 'admin') {
            loadAdminPanel();
            showSection('admin-dashboard');
        } else {
            document.getElementById('user-display-name').innerText = user.name;
            showSection('user-dashboard');
        }
    } else {
        alert("Credenciales incorrectas.");
    }
};

// --- PANEL ADMIN ---
function loadAdminPanel() {
    const list = document.getElementById('users-list');
    list.innerHTML = "";
    users.forEach(u => {
        list.innerHTML += `<tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td><span class="badge">${u.role}</span></td>
        </tr>`;
    });
}

function logout() {
    location.reload(); // Reinicia el estado de la app
}