// import express from 'express';
const express = require('express');
import 'dotenv/config';
import cors from 'cors';
import viewEngine from './configExpress/viewEngine'
import initRoutes from './routes/routes';
import connectToDB from '../config/connectDB'
import bodyParser from 'body-parser';

const app = express();
app.use(cors());

//config params from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

viewEngine(app);
initRoutes(app);
connectToDB();

let port = process.env.PORT || 1234;
app.listen(port, () =>
  console.log('Authentication app listening on port ' +port),
);
