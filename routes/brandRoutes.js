import express from 'express';
import {
    createBrandCtrl, getAllBrandsCtlr, getBrandCtrl, updateBrandCtrl, deleteBrandCtrl
} from '../controllers/brandCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const brandRoutes = express.Router();
brandRoutes.post('/', isLoggedIn, createBrandCtrl);
brandRoutes.get('/', getAllBrandsCtlr);
brandRoutes.get('/:id', getBrandCtrl);
brandRoutes.put('/:id', isLoggedIn, updateBrandCtrl);
brandRoutes.delete('/:id/delete', isLoggedIn, deleteBrandCtrl);




export default brandRoutes;