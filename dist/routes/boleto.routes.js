"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boleto_controller_1 = require("../controllers/boleto.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const autorizacion_middleware_1 = require("../middlewares/autorizacion.middleware");
const router = (0, express_1.Router)();
// comprador puede ver boletos
router.get('/', auth_middleware_1.authenticateToken, (0, autorizacion_middleware_1.authorizeRoles)(['COMPRADOR', 'VENDEDOR', 'ADMIN']), boleto_controller_1.getBoletos);
//comprador puede ver un boleto por id
router.get('/:id', auth_middleware_1.authenticateToken, (0, autorizacion_middleware_1.authorizeRoles)(['COMPRADOR', 'VENDEDOR', 'ADMIN']), boleto_controller_1.getBoletoById);
//solo el vendedor y el admin pueden crear boletos
router.post('/crear', auth_middleware_1.authenticateToken, (0, autorizacion_middleware_1.authorizeRoles)(['VENDEDOR', 'ADMIN']), boleto_controller_1.createBoleto);
//solo el vendedor y el admin pueden actualizar boletos
router.put('/:id', auth_middleware_1.authenticateToken, (0, autorizacion_middleware_1.authorizeRoles)(['VENDEDOR', 'ADMIN']), boleto_controller_1.updateBoleto);
//solo el admin puede eliminar boletos
router.delete('/:id', auth_middleware_1.authenticateToken, (0, autorizacion_middleware_1.authorizeRoles)(['ADMIN']), boleto_controller_1.deleteBoleto);
exports.default = router;
//# sourceMappingURL=boleto.routes.js.map