import express from 'express';
import productCtrl from '../controllers/product.controller.js';

const router = express.Router();

router.route('/api/products')
  .post(productCtrl.create)
  .get(productCtrl.list)
  .delete(productCtrl.removeAll);

router.param('productId', productCtrl.productByID);

router.route('/api/products/:productId')
  .get(productCtrl.read)
  .put(productCtrl.update)
  .delete(productCtrl.remove);

export default router;
