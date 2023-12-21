import express from 'express';
import { createProductCtrl, getProductsCtrl, getProductCtrl, updateProductCtrl,deleteProductCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const productRoutes = express.Router();
productRoutes.post('/', isLoggedIn, createProductCtrl);
productRoutes.get('/', getProductsCtrl);
productRoutes.get('/:id', getProductCtrl);
productRoutes.put('/:id', isLoggedIn, updateProductCtrl);
productRoutes.delete('/:id/delete', isLoggedIn, deleteProductCtrl);



export default productRoutes;