import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/userRoutes.js';
import productRoutes from '../routes/productsRoutes.js';
import categoryRoutes from '../routes/categoriesRoutes.js';
import brandRoutes from '../routes/brandRoutes.js';
import colorsRoutes from '../routes/colorRoutes.js';
import { globalErrhandler, notFound } from '../midlewares/globalErrHandler.js';
dbConnect();

const app = express();
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/colors', colorsRoutes);
//errr middleware
app.use(notFound);
app.use(globalErrhandler);
export default app;
  