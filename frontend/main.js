const BACKEND_URL = 'http://localhost:2121';
const OPENWEATHER_API_KEY = 'f8bd'; // ¡Reemplaza esto con tu clave de API!
const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.getElementById('message-container');
    const token = localStorage.getItem('token');

    if (messageContainer) {
        messageContainer.innerHTML = '<div class="alert alert-info" role="alert">Cargando boletos...</div>';
    }

    if (token) {
        fetchBoletos(token);
        // Llama a la función del clima con la ciudad que desees.
        fetchWeather('Asuncion');
    } else {
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
            const errorData = await response.json();
            throw new Error(errorData.error || 'No se pudo obtener la lista de boletos.');
        }

        const boletos = await response.json();
        renderBoletos(boletos);
        
        if (messageContainer) {
            messageContainer.innerHTML = '';
        }

    } catch (error) {
        console.error('Error al obtener los boletos:', error);
        if (messageContainer) {
            messageContainer.innerHTML = `<div class="alert alert-danger" role="alert">Error: ${error.message}</div>`;
        }
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

// ------------------- Funciones para el clima -------------------

async function fetchWeather(ciudad) {
    const weatherContainer = document.getElementById('weather-container');
    if (!weatherContainer) return;
    
    weatherContainer.innerHTML = '<p>Cargando datos del clima...</p>';

    try {
        const response = await fetch(`${OPENWEATHER_URL}?q=${ciudad}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'No se pudo obtener el clima.');
        }

        const data = await response.json();
        renderWeather(data);
    } catch (error) {
        console.error('Error al obtener el clima:', error.message);
        if (weatherContainer) {
            weatherContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        }
    }
}

function renderWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    if (!weatherContainer) return;

    const { name, main, weather } = data;
    const temp = Math.round(main.temp);
    const description = weather[0].description;
    const iconCode = weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherContainer.innerHTML = `
        <div class="d-flex align-items-center">
            <img src="${iconUrl}" alt="${description}">
            <div>
                <h4 class="mb-0">${name}</h4>
                <p class="mb-0">${description}</p>
                <p class="mb-0 fs-4">${temp}°C</p>
            </div>
        </div>
    `;
}