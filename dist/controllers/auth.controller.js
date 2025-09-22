"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';
const login = async (req, res) => {
    const { email } = req.body; // Suponemos que la contraseña se ha verificado
    try {
        const user = await prisma.usuario.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
exports.login = login;
const register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await prisma.usuario.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        const newUser = await prisma.usuario.create({
            data: {
                email,
                contrasenha: password,
                role
            }
        });
        res.status(201).json({ user: { id: newUser.id, email: newUser.email, role: newUser.role } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
exports.register = register;
//# sourceMappingURL=auth.controller.js.map