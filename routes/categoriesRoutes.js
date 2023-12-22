import express from 'express';
import { createCategoryCtrl } from '../controllers/categoriesCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const categoryRoutes = express.Router();
categoryRoutes.post('/', isLoggedIn, createCategoryCtrl);



export default categoryRoutes;