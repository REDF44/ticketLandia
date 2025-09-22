import e, { Request, Response, NextFunction } from 'express';

// Reutilizando la interfaz AuthenticatedRequest del paso anterior
interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        role: string;
    }
}

export const authorizeRoles = (requiredRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        // Verifica si el usuario tiene al menos uno de los roles requeridos
        if (!req.user || !requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "No tienes permiso para realizar esta acción." });
        }
        next();
    };
};

export default authorizeRoles;