"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherByCity = void 0;
const axios_1 = __importDefault(require("axios"));
const API_KEY = process.env.API_WEATHER_KEY;
console.log('API Key cargada:', API_KEY);
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const getWeatherByCity = async (req, res) => {
    const { city } = req.params;
    try {
        const response = await axios_1.default.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'es'
            }
        });
        const weatherData = response.data;
        res.json({
            ciudad: weatherData.name,
            temperatura: weatherData.main.temp,
            descripcion: weatherData.weather[0].description,
            humedad: weatherData.main.humidity,
            viento: weatherData.wind.speed
        });
    }
    catch (error) {
        console.error('Error al obtener el clima:', error);
        res.status(500).json({ error: 'No se pudo obtener la información del clima.' });
    }
};
exports.getWeatherByCity = getWeatherByCity;
//# sourceMappingURL=weather.controller.js.map