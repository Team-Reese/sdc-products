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
  let range = ((page, count) => {
    let start = ((page - 1) * count) + 1;
    return[start, (start + count) - 1];
  })(parseInt(page) || 1, parseInt(count) || 5);
  try {
    let { rows } = await db.query('SELECT * from product where id BETWEEN $1 AND $2', range);
    if (rows.length === 0) {
      throw new RangeError();
    }
    res.send(rows);
  } catch (err) {
    if (err instanceof RangeError) {
      res.sendStatus(400);
    } else {
      // error gets forwarded to error handling middleware (tbd)
      throw err;
    }
  }
});

// /products/:id/ - query product and features table
router.get('/products/:id', async(req, res) => {
  // no other params besides id
  let {id} = req.params;
  try {
    // product table
    let getProducts = async (params) => (
      db.query('SELECT * from product where id = $1', [id])
    );
    // feature table
    let getFeatures = async (params) => (
      db.query('SELECT feature, value from features where product_id = $1', [id])
    );
    let [product, features] = await Promise.all([getProducts(id), getFeatures(id)]);
    let body = {...product.rows[0], features: features.rows };
    res.send(body);

  } catch (err) {
    console.log(err.stack);
    throw err;
  }
});

// /products/:id/styles - query styles, photos, and skus table (yikes)
router.get('products/:id/styles', async (req, res) => {
  // no other params besides id
  let {id} = req.params;
  try {
    // will probably have to write an aggregate function here
  } catch(err) {
    console.log(err.stack);
    throw err;
  }
});

// /products/:id/related - query related table
router.get('/products/:id/related', async (req, res) => {
  // no other params besides id
  let {id} = req.params;
  let config = (param => ({
    name: 'get_related',
    text: 'SELECT array_agg (related_id)from related where current_id = $1',
    values: [param],
    rowMode: 'array'
  }))(id);
  try {
    // let {rows} = await db.query('SELECT related_id from related where current_id = $1', [id]);
    let {rows} = await db.query(config);
    console.log(rows);
    res.send(rows[0][0]);
    // res.send(body);
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
});


module.exports = router;