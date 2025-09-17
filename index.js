"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const boleto_routes_1 = __importDefault(require("./src/routes/boleto.routes"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 2121;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/boletos', boleto_routes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor conectado ${PORT}`);
});
//# sourceMappingURL=index.js.map