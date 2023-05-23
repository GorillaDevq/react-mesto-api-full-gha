const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {  // eslint-disable-line
  if (!req.cookies.token) return next(new UnauthorizedError('Ошибка авторизации.'));

  let payload;

  try {
    payload = jwt.verify(req.cookies.token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
