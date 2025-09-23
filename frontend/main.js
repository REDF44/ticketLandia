const BACKEND_URL = 'http://localhost:2121';

// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', () => {
    // Referencia al contenedor de mensajes para mostrar errores o notificaciones
    const messageContainer = document.getElementById('message-container');
    const token = localStorage.getItem('token');

    // Muestra un mensaje de carga mientras se obtienen los boletos
    if (messageContainer) {
        messageContainer.innerHTML = '<div class="alert alert-info" role="alert">Cargando boletos...</div>';
    }

    if (token) {
        fetchBoletos(token);
    } else {
        // Redirige si no hay token (usuario no autenticado)
        window.location.href = 'login.html';
    }
});

async function fetchBoletos(token) {
    const messageContainer = document.getElementById('message-container');
    const boletosTabla = document.getElementById('boletos-tabla');

    try {
        const response = await fetch(`${BACKEND_URL}/boletos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            // Intenta leer el error del cuerpo de la respuesta
            const errorData = await response.json();
            throw new Error(errorData.error || `Error al obtener los boletos. Código de estado: ${response.status}`);
        }

        const boletos = await response.json();
        renderBoletos(boletos);
        
        // Limpiar el mensaje de carga una vez que los datos son renderizados
        if (messageContainer) {
            messageContainer.innerHTML = '';
        }

    } catch (error) {
        console.error('Error al obtener los boletos:', error);
        // Mostrar un mensaje de error en la interfaz de usuario
        if (messageContainer) {
            messageContainer.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
        }
        // Si no se puede renderizar la tabla por el error, se muestra un mensaje de error en la tabla misma
        if (boletosTabla) {
             boletosTabla.innerHTML = `<tr><td colspan="6" class="text-danger">${error.message}</td></tr>`;
        }
    }
}

function renderBoletos(boletos) {
    const tabla = document.getElementById('boletos-tabla');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    
    if (boletos.length === 0) {
        tabla.innerHTML = '<tr><td colspan="6">No hay boletos disponibles.</td></tr>';
        return;
    }

    boletos.forEach(boleto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${boleto.id}</td>
            <td>${boleto.nombre}</td>
            <td>${boleto.tipo}</td>
            <td>${new Date(boleto.fecha).toLocaleDateString()}</td>
            <td>${boleto.lugar}</td>
            <td>${boleto.boletos}</td>
        `;
        tabla.appendChild(fila);
    });
}
