"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.usuario.findUnique({ where: { email }, });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.contrasenha);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        // 🚨 NORMALIZA EL ROL A MAYÚSCULAS ANTES DE CREAR EL TOKEN
        const normalizedRole = user.role.toUpperCase();
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: normalizedRole }, // <-- USAR EL ROL NORMALIZADO
        JWT_SECRET, { expiresIn: '1h' });
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
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // 🚨 Normaliza el rol a mayúsculas antes de guardarlo
        const normalizedRole = role.toUpperCase();
        const newUser = await prisma.usuario.create({
            data: {
                email,
                contrasenha: hashedPassword,
                role: normalizedRole
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