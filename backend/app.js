require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/user'));
app.use('/', require('./routes/card'));

app.use('*', (req, res, next) => next(new NotFoundError('Ошибка 404')));

app.use(errorLogger);

app.use(errors());

app.use(globalHandleError);

app.listen(PORT);
