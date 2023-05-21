const allowedCors = [
  'http://localhost:3001',
  'https://mesto.application.nomoredomains.monster',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
