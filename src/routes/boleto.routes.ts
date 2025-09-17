import { Router } from 'express';
import { getBoletos, getBoletoById, createBoleto, updateBoleto, deleteBoleto } from '../controller/boleto.controller';

const router = Router();

router.get('/', getBoletos);
router.get('/:id', getBoletoById);
router.post('/', createBoleto);
router.put('/:id', updateBoleto);
router.delete('/:id', deleteBoleto);

export default router;