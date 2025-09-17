"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boleto_controller_1 = require("../controller/boleto.controller");
const router = (0, express_1.Router)();
router.get('/', boleto_controller_1.getBoletos);
router.get('/:id', boleto_controller_1.getBoletoById);
router.post('/', boleto_controller_1.createBoleto);
router.put('/:id', boleto_controller_1.updateBoleto);
router.delete('/:id', boleto_controller_1.deleteBoleto);
exports.default = router;
//# sourceMappingURL=boleto.routes.js.map