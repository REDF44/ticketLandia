
import { Request, Response } from 'express';
import axios from 'axios';

const API_KEY = process.env.API_WEATHER_KEY;
console.log('API Key cargada:', API_KEY);
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (req: Request, res: Response) => {
    const { city } = req.params;
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', 
                lang: 'es'
            }
        });
        interface WeatherApiResponse {
            name: string;
            main: { temp: number; humidity: number };
            weather: { description: string }[];
            wind: { speed: number };
        }
        const weatherData = response.data as WeatherApiResponse;
        res.json({
            ciudad: weatherData.name,
            temperatura: weatherData.main.temp,
            descripcion: weatherData.weather[0].description,
            humedad: weatherData.main.humidity,
            viento: weatherData.wind.speed
        });
    } catch (error) {
        console.error('Error al obtener el clima:', error);
        res.status(500).json({ error: 'No se pudo obtener la información del clima.' });
    }
};