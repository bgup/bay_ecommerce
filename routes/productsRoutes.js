import express from 'express';
import { createProductCtrl, getProductsCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const productRoutes = express.Router();
productRoutes.post('/', isLoggedIn, createProductCtrl);
productRoutes.get('/', getProductsCtrl);



export default productRoutes;