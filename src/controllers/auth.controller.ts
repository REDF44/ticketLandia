
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.usuario.findUnique({ where: { email }, });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const passwordMatch = await bcrypt.compare(password, user.contrasenha);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        // 🚨 NORMALIZA EL ROL A MAYÚSCULAS ANTES DE CREAR EL TOKEN
        const normalizedRole = user.role.toUpperCase();
        
        const token = jwt.sign(
            { id: user.id, role: normalizedRole }, // <-- USAR EL ROL NORMALIZADO
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const register = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    // 🚨 Añadir estas verificaciones para ver qué está fallando 🚨
    if (!role) {
        return res.status(400).json({ error: 'El campo role es obligatorio.' });
    }
    if (!email) {
        return res.status(400).json({ error: 'El campo email es obligatorio.' });
    }
    if (!password) {
        return res.status(400).json({ error: 'El campo password es obligatorio.' });
    }

    // La línea 44 está aquí, ahora 'username' no debería ser undefined
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.usuario.create({
            data: {
                email,
                contrasenha: hashedPassword,
                role: role.toUpperCase()
            }
        });
        res.status(201).json({ user: { id: newUser.id, email: newUser.email, role: newUser.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};