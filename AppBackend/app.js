var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


//AGREGAR USUARIO Y CONTRASEÑA PARA BASE DE DATOS DE MONGODB

const username = 'gonzalomadness'
const pwd = 'Bl4ckS4bb4th';
const dbname = 'TestDB';

var uri = `mongodb+srv://${username}:${pwd}@cluster0.zcriz.mongodb.net/${dbname}?retryWrites=true&w=majority`;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Connected to Database')
})
.catch(e=> console.log(e));

 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());



app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
