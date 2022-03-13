import express from "express";
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));
