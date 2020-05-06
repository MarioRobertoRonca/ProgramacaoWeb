// 4º Parte criar routa
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const db = require('./config/database')
db('mongodb://localhost:27017/4not2020')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Fornecedor
const fornecedor  = require('./routes/fornecedor')
app.use('/fornecedor', fornecedor);

//Produto
const produto = require('./routes/produto')
app.use('/produto', produto);

//Cliente
const cliente = require('./routes/cliente')
app.use('/cliente', cliente);

//venda
const venda = require('./routes/venda')
app.use('/venda', venda);

module.exports = app;