const env = require('dotenv').config().parsed;
const {Pool} = require('pg');


// pool uses environment variables by default, can define these in compose/dockerfile later
module.exports = new Pool({...env});

