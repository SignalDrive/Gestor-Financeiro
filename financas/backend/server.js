import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json();); // API aceitando JSON

//Conexão com o MongoDB Atlas

moongose.connect(process.env.MONGODB_URI,{ dbName:})