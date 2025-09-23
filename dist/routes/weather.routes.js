"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/weather.routes.ts
const express_1 = require("express");
const weather_controller_1 = require("../controllers/weather.controller");
const router = (0, express_1.Router)();
router.get('/clima/:city', weather_controller_1.getWeatherByCity);
exports.default = router;
//# sourceMappingURL=weather.routes.js.map