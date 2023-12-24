import express from 'express';
import {
    createReviewCtrl
} from '../controllers/reviewCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const reviewRoutes = express.Router();
reviewRoutes.post('/:productID', isLoggedIn, createReviewCtrl);
// reviewRoutes.get('/', getAllReviewsCtlr);
// reviewRoutes.get('/:id', getReviewCtrl);
// reviewRoutes.put('/:id', isLoggedIn, updateReviewCtrl);
// reviewRoutes.delete('/:id/delete', isLoggedIn, deleteReviewCtrl);




export default reviewRoutes;