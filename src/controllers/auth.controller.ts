import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

export const login = async (req: Request, res: Response) => {
    const { email } = req.body; // Suponemos que la contraseña se ha verificado
    try {
        const user = await prisma.usuario.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const token = jwt.sign(
            { id: user.id, role: user.role },
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
