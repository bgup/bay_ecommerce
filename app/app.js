import express from 'express';
import dbConnect from '../config/dbConnect.js';

dbConnect();

const app = express();

export default app;
 