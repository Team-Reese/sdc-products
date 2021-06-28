const env = require('dotenv').config().parsed;
const {Pool} = require('pg');

const db = new Pool({...env});

// pool uses environment variables by default, can define these in compose/dockerfile later
module.exports = db;

