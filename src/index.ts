import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import boletoRoutes from './routes/boleto.routes';
import authRoutes from './routes/auth.routes'; // <-- IMPORTA ESTA LÍNEA

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 2121;

app.use(cors());
app.use(express.json());

app.use('/boletos', boletoRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor conectado ${PORT}`);
});