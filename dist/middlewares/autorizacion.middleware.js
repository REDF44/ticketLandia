"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const authorizeRoles = (requiredRoles) => {
    return (req, res, next) => {
        // Verifica si el usuario tiene al menos uno de los roles requeridos
        if (!req.user || !requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "No tienes permiso para realizar esta acción." });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
exports.default = exports.authorizeRoles;
//# sourceMappingURL=autorizacion.middleware.js.map