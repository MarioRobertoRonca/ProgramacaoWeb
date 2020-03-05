var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello world');
});

//let teste = require('./route/teste')
//app.use('/teste', teste)

module.exports = app;
