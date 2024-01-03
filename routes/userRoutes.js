import express from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl, updateShippingAddressCtrl } from '../controllers/userCtrl.js';
import { isLoggedIn } from '../midlewares/isLoggedIn.js'
const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfileCtrl);
userRoutes.put('/update/shipping', isLoggedIn, updateShippingAddressCtrl);


export default userRoutes;