import express from 'express';
import {
    createCategoryCtrl, getAllCategoriesCtlr, getCategoryCtrl, deleteCategoryCtrl, updateCategoryCtrl
} from '../controllers/categoriesCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const categoryRoutes = express.Router();
categoryRoutes.post('/', isLoggedIn, createCategoryCtrl);
categoryRoutes.get('/', getAllCategoriesCtlr);
categoryRoutes.get('/:id', getCategoryCtrl);
categoryRoutes.put('/:id', isLoggedIn, updateCategoryCtrl);
categoryRoutes.delete('/:id/delete', isLoggedIn, deleteCategoryCtrl);




export default categoryRoutes;