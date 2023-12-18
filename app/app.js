import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/userRoutes.js';
import productRoutes from '../routes/productsRoutes.js';
import { globalErrhandler, notFound } from '../midlewares/globalErrHandler.js';
dbConnect();

const app = express();
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
//errr middleware
app.use(notFound);
app.use(globalErrhandler);
export default app;
  