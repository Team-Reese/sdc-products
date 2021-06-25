const env = require('dotenv').config().parsed;
const {Pool} = require('pg');

// pool uses environment variables by default, can define these in compose/dockerfile later
export const db = new Pool({...env});

