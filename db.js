// db.js
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:postgres@54.180.83.43:5432/O2Calendar');

module.exports = db;