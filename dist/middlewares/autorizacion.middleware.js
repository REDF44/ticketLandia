"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const authorizeRoles = (requiredRoles) => {
    return (req, res, next) => {
        // 🚨 Normaliza el rol del token a mayúsculas antes de la comparación
        const userRole = req.user?.role.toUpperCase();
        if (!req.user || !userRole || !requiredRoles.includes(userRole)) {
            return res.status(403).json({ error: "No tienes permiso para realizar esta acción." });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=autorizacion.middleware.js.map