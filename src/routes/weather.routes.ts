
import { Router } from 'express';
import { getWeatherByCity } from '../controllers/weather.controller';

const router = Router();

router.get('/clima/:city', getWeatherByCity);

export default router;