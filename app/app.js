import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/userRoutes.js';
import { globalErrhandler } from '../midlewares/globalErrHandler.js';
dbConnect();

const app = express();
app.use(express.json());
app.use('/', userRoutes);
//errr middleware
app.use(globalErrhandler)
export default app;
 