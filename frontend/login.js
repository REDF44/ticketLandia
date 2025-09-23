const BACKEND_URL = 'http://localhost:2121';

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'No se pudo iniciar sesión.');
        }

        const data = await response.json();
        // Store the token in local storage
        localStorage.setItem('token', data.token);

        console.log('Inicio de sesión exitoso:', data);
        alert('¡Inicio de sesión exitoso!');
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error de inicio de sesión:', error.message);
        alert(error.message);
    }
});