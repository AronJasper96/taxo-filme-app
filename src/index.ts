import http from 'http';
var express = require('express');
var indexRouter = require('./routes/root');
var app = express();

export default async () => {
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb', extended: false}));
    app.use('/', indexRouter);
    
  return http.createServer(app);

};