import express from 'express';
import { createProductCtrl, getProductsCtrl, getProductCtrl, updateProductCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const productRoutes = express.Router();
productRoutes.post('/', isLoggedIn, createProductCtrl);
productRoutes.get('/', getProductsCtrl);
productRoutes.get('/:id', getProductCtrl);
productRoutes.put('/:id', isLoggedIn, updateProductCtrl);



export default productRoutes;