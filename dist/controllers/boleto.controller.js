"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoleto = exports.updateBoleto = exports.createBoleto = exports.getBoletoById = exports.getBoletos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// LLamar a todos los boletos
const getBoletos = async (req, res) => {
    try {
        const boletos = await prisma.boleto.findMany();
        res.json(boletos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los boletos" });
    }
};
exports.getBoletos = getBoletos;
// Obtener un boleto expecífico por ID
const getBoletoById = async (req, res) => {
    try {
        const { id } = req.params;
        const boleto = await prisma.boleto.findUnique({
            where: { id: parseInt(id) },
        });
        if (!boleto) {
            return res.status(404).json({ error: "Boleto no encontrado" });
        }
        res.json(boleto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el boleto" });
    }
};
exports.getBoletoById = getBoletoById;
// para crear un nuevo boleto
const createBoleto = async (req, res) => {
    try {
        const { nombre, tipo, fecha, lugar, boletos } = req.body;
        const nuevoBoleto = await prisma.boleto.create({
            data: {
                nombre,
                tipo,
                fecha: new Date(fecha),
                lugar,
                boletos: parseInt(boletos)
            },
        });
        res.status(201).json(nuevoBoleto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el boleto" });
    }
};
exports.createBoleto = createBoleto;
// para actualizar un boleto existente
const updateBoleto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo, fecha, lugar, boletos } = req.body;
        const boletoActualizado = await prisma.boleto.update({
            where: { id: parseInt(id) },
            data: {
                nombre,
                tipo,
                fecha: new Date(fecha),
                lugar,
                boletos: parseInt(boletos)
            },
        });
        res.json(boletoActualizado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el boleto" });
    }
};
exports.updateBoleto = updateBoleto;
//para eliminar un boleto
const deleteBoleto = async (req, res) => {
    try {
        const { id } = req.params;
        const boletoEliminado = await prisma.boleto.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el boleto" });
    }
};
exports.deleteBoleto = deleteBoleto;
//# sourceMappingURL=boleto.controller.js.map