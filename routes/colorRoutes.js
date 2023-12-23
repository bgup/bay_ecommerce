import express from 'express';
import {
    createColorCtrl,
    getAllColorsCtlr,
    getColorCtrl,
    updateColorCtrl,
    deleteColorCtrl
} from '../controllers/colorCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const colorRoutes = express.Router();
colorRoutes.post('/', isLoggedIn, createColorCtrl);
colorRoutes.get('/', getAllColorsCtlr);
colorRoutes.get('/:id', getColorCtrl);
colorRoutes.put('/:id', isLoggedIn, updateColorCtrl);
colorRoutes.delete('/:id/delete', isLoggedIn, deleteColorCtrl);




export default colorRoutes;