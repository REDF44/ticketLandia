"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boleto_controller_1 = require("../controllers/boleto.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const autorizacion_middleware_1 = require("../middlewares/autorizacion.middleware");
const router = (0, express_1.Router)();
// Esta ruta solo necesita autenticación, cualquier usuario con un token puede ver los boletos.
router.get('/', auth_middleware_1.authenticateToken, boleto_controller_1.getBoletos);
// La ruta de creación sí necesita el middleware de autorización, ya que es una acción restringida.
router.post('/crear', auth_middleware_1.authenticateToken, (0, autorizacion_middleware_1.authorizeRoles)(['VENDEDOR', 'ADMIN']), boleto_controller_1.createBoleto);
exports.default = router;
//# sourceMappingURL=boleto.routes.js.map