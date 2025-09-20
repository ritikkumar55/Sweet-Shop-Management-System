import { Router } from 'express';
import {
  createSweet, listSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet
} from '../controllers/sweetsController';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
const router = Router();

router.use(auth);
router.post('/', createSweet);
router.get('/', listSweets);
router.get('/search', searchSweets);
router.put('/:id', updateSweet);
router.delete('/:id', admin, deleteSweet);
router.post('/:id/purchase', purchaseSweet);
router.post('/:id/restock', admin, restockSweet);

export default router;
