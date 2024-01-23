import express from 'express';
import {
    createOrderCtrl, 
    getAllOrdersCtrl,
    getSingleOrderCtrl,
    updateOrderCtrl
    // getOrderCtrl, updateOrderCtrl, deleteOrderCtrl
} from '../controllers/orderCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'


const orderRoutes = express.Router();
orderRoutes.post('/', isLoggedIn, createOrderCtrl);
orderRoutes.get('/', isLoggedIn, getAllOrdersCtrl);
orderRoutes.get('/:id',isLoggedIn, getSingleOrderCtrl);
orderRoutes.put("/update/:id", isLoggedIn, updateOrderCtrl);
// orderRoutes.put('/:id', isLoggedIn, updateOrderCtrl);
// orderRoutes.delete('/:id/delete', isLoggedIn, deleteOrderCtrl);




export default orderRoutes;