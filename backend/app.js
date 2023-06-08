require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const cors = require('./middlewares/cors');
const globalHandleError = require('./utils/globalHandleError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(cors);

app.use('/', require('./routes/index'));

app.use('*', (req, res, next) => next(new NotFoundError('Ошибка 404')));

app.use(errorLogger);

app.use(errors());

app.use(globalHandleError);

app.listen(PORT);
