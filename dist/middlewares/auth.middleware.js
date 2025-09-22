"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (token == null)
        return res.sendStatus(401); // Si no hay token, no autorizado
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403); // Si el token es inválido, prohibido
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
exports.default = exports.authenticateToken;
//# sourceMappingURL=auth.middleware.js.map