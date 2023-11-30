import express from 'express';
import {registerUserCtrl} from '../controllers/userCtrl.js';

const userRoutes = express.Router();

userRoutes.post('/api/v1/users/register', registerUserCtrl);

export default userRoutes;