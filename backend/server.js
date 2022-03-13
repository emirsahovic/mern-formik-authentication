import express from "express";
import colors from 'colors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

connectDB();

const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));
