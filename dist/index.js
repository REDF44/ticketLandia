"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const boleto_routes_1 = __importDefault(require("./routes/boleto.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const weather_routes_1 = __importDefault(require("./routes/weather.routes"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 2121;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/boletos', boleto_routes_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/weather', weather_routes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor conectado ${PORT}`);
});
//# sourceMappingURL=index.js.map