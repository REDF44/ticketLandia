const BACKEND_URL = 'http://localhost:2121';

document.getElementById('create-boleto-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const tipo = document.getElementById('tipo').value;
    const fecha = document.getElementById('fecha').value;
    const lugar = document.getElementById('lugar').value;
    const boletos = document.getElementById('boletos').value;

    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión para crear un boleto.');
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/boletos/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviar el token en el encabezado
            },
            body: JSON.stringify({ nombre, tipo, fecha, lugar, boletos }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'No se pudo crear el boleto');
        }

        alert('¡Boleto creado con éxito!');
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error al crear el boleto:', error.message);
        alert(error.message);
    }
});