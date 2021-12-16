var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('dotenv').config();

require('./config/sequelize');

var app = express();

/*middlewares*/
app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.options('*', cors());

app.use('/api/v1/users', usersRouter);

module.exports = app;
