const Router = require('express-promise-router');
const db = require('../database');
const router = new Router();

// all routes are for get requests only, and return 200's on success

// /products -  query products table
router.get('/products', async(req, res) => {
  // params: page (default 1) and count (per page) (default 5)
  let {page, count} = req.query;
  // defaults will return products id 1-5
  // starting id to query with is ((page-1) * count) + 1
  // ending id is start + count
  let range = ((page = 1, count = 5) => {
    let start = ((page - 1) * count) + 1;
    return[start, (start + count) - 1];
  })(parseInt(page), parseInt(count));

  const { rows } = await db.query("SELECT * from product where id BETWEEN $1 AND $2", range);
  res.send(rows);
});

// /products/:id/ - query product and features table
  // no other params besides id

// /products/:id/styles - query styles, photos, and skus table (yikes)
  // no other params besides id

// /products/:id/related - query related table
  // no other params besides id


module.exports = router;