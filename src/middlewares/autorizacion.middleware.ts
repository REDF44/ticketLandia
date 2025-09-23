// src/middlewares/autorizacion.middleware.ts
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        role: string;
    }
}

export const authorizeRoles = (requiredRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        // 🚨 Normaliza el rol del token a mayúsculas antes de la comparación
        const userRole = req.user?.role.toUpperCase();
        
        if (!req.user || !userRole || !requiredRoles.includes(userRole)) {
            return res.status(403).json({ error: "No tienes permiso para realizar esta acción." });
        }
        next();
    };
};