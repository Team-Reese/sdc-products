const Router = require('express-promise-router');
const db = require('../database');
const router = new Router();

// all routes are for get requests only, and return 200's on success

// /products -  query products table
  // params: page (default 1) and count (per page) (default 5)

// /products/:id/ - query product and features table
  // no other params besides id

// /products/:id/styles - query styles, photos, and skus table (yikes)
  // no other params besides id

// /products/:id/related - query related table
  // no other params besides id


  module.exports = router;