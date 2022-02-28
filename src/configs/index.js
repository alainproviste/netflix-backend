const dbConfig = require('./db.config');
const serverConfig = require('./server.config');
const jwtConfig = require('./jwt.config');
const checkout = require('./checkout.config');

exports.database = dbConfig;
exports.server = serverConfig;
exports.jwt = jwtConfig;
exports.checkout = checkout;