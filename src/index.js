const express = require('express');
const path = require('path');
const PORT = 3000; // relpace this with an environment variable later, but not the same one as in /database
const routes = require('./routes');
const db = require('../database');
const morgan = require('morgan');
const app = express();
// mounting router and other middleware
app.use(routes);
app.use(morgan('tiny'));
// establish database connection
// db.connect();
// put front end code at this directory when composing with docker later
// app.use(express.static(path.join(__dirname, '../app/')));

app.listen(PORT, () => {
  console.log(`success - listening to requests on port ${PORT}`);
});
