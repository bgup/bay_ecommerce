import express from 'express';
import { createProductCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const productRoutes = express.Router();
productRoutes.post('/', isLoggedIn, createProductCtrl);


export default productRoutes;