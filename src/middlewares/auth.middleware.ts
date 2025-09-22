import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Agrega una interfaz personalizada para extender el objeto Request
interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        role: string;
    }
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (token == null) return res.sendStatus(401); // Si no hay token, no autorizado

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.sendStatus(403); // Si el token es inválido, prohibido
        req.user = user as { id: number; role: string };
        next();
    });
};

export default authenticateToken;