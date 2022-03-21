// import express from 'express';
const express = require('express');
const fileUpload = require("express-fileupload");
// var session = require('express-session')

import 'dotenv/config';
import cors from 'cors';
import viewEngine from './src/configExpress/viewEngine'
import initRoutes from './src/routes/routes';
import connectToDB from './config/connectDB'
import bodyParser from 'body-parser';


const app = express();
app.use(cors({"origin": "http://localhost:3000/"}));
//config params from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());

// app.use(session({
//   secret:accessKey,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true ,maxAge: 60000 }
// }))



viewEngine(app);
initRoutes(app);
connectToDB();

let port = process.env.PORT || 1234;
app.listen(port, () =>
  console.log('Authentication app listening on port ' +port),
);
