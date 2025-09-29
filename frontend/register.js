const BACKEND_URL = 'http://localhost:2121';

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    // CAMBIAR ESTO: Obtener 'role' en lugar de 'username'
    const role = document.getElementById('role').value; 
    // FIN DEL CAMBIO

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${BACKEND_URL}/auth/register`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // CAMBIAR ESTO: Enviar 'role' en lugar de 'username'
            body: JSON.stringify({ role, email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'No se pudo crear el usuario. Inténtalo de nuevo.');
        }

        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        window.location.href = 'login.html'; 

    } catch (error) {
        console.error('Error de registro:', error.message);
        alert(error.message);
    }
});