import express from 'express';
import { createProductCtrl, getProductsCtrl, getProductCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const productRoutes = express.Router();
productRoutes.post('/', isLoggedIn, createProductCtrl);
productRoutes.get('/', getProductsCtrl);
productRoutes.get('/:id', getProductCtrl);



export default productRoutes;