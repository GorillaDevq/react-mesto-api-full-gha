module.exports = (err, req, res, next) => { // eslint-disable-line
  if (err.statusCode) res.status(err.statusCode).send({ message: err.message });
  else res.status(500).send({ message: 'На сервере произошла ошибка.' });

  next();
};
