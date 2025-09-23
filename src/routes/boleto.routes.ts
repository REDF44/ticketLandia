import { Router } from 'express';
import { createBoleto, getBoletos } from '../controllers/boleto.controller'; 
import { authenticateToken } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/autorizacion.middleware';

const router = Router();

// Esta ruta solo necesita autenticación, cualquier usuario con un token puede ver los boletos.
router.get('/', authenticateToken, getBoletos);

// La ruta de creación sí necesita el middleware de autorización, ya que es una acción restringida.
router.post('/crear', authenticateToken, authorizeRoles(['VENDEDOR', 'ADMIN']), createBoleto);

export default router;