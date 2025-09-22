import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// LLamar a todos los boletos
export const getBoletos = async (req: Request, res: Response) => {
    try {
        const boletos = await prisma.boleto.findMany();
        res.json(boletos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los boletos" });
    }
};

// Obtener un boleto expecífico por ID
export const getBoletoById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const boleto = await prisma.boleto.findUnique({
            where: { id: parseInt(id) },
        });
        if (!boleto){
            return res.status(404).json({ error: "Boleto no encontrado" });
        }
        res.json(boleto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el boleto" });
    }
};

// para crear un nuevo boleto
export const createBoleto = async (req: Request, res: Response) => {
    try {
        const { nombre, tipo, fecha, lugar, boletos } = req.body;
        const nuevoBoleto = await prisma.boleto.create({
            data : {
                nombre,
                tipo,
                fecha: new Date(fecha),
                lugar,
                boletos: parseInt(boletos)
            },
    });
    res.status(201).json(nuevoBoleto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el boleto" });
    }
};

// para actualizar un boleto existente
export const updateBoleto = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Error al actualizar el boleto" });
    }
};

//para eliminar un boleto
export const deleteBoleto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const boletoEliminado = await prisma.boleto.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el boleto" });
    }
};
