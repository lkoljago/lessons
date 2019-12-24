const express   = require('express');
const https     = require('https');
const fs        = require('fs');
const colors    = require('colors');
const bodyParser = require('body-parser');
const morgan    = require('morgan');

const app       = express();

const mongoose  = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/gauth');
const routesUsers = require('./routes/users');
//middlewфкуы
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
app.use(bodyParser.json({ limit: '25mb', extended: true }));


//routes
app.use('/users', routesUsers);

//controllers

//start the server
const port = 9000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`.blue);
});
