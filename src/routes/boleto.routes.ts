import { Router } from 'express';
import { getBoletos, getBoletoById, createBoleto, updateBoleto, deleteBoleto } from '../controllers/boleto.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/autorizacion.middleware';


const router = Router();

// comprador puede ver boletos
router.get('/',authenticateToken,authorizeRoles(['COMPRADOR', 'VENDEDOR', 'ADMIN']), getBoletos);
//comprador puede ver un boleto por id
router.get('/:id',authenticateToken,authorizeRoles(['COMPRADOR', 'VENDEDOR', 'ADMIN']), getBoletoById);
//solo el vendedor y el admin pueden crear boletos
router.post('/crear', authenticateToken, authorizeRoles(['VENDEDOR', 'ADMIN']), createBoleto);
//solo el vendedor y el admin pueden actualizar boletos
router.put('/:id', authenticateToken, authorizeRoles(['VENDEDOR', 'ADMIN']), updateBoleto);
//solo el admin puede eliminar boletos
router.delete('/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteBoleto);


export default router;