const express = require('express');
const path = require('path');
const PORT = 3000; // relpace this with an environment variable later, but not the same one as in /database
const routes = require('./routes');
const app = express();

// put front end code at this directory when composing with docker later
app.use(express.static(path.join(__dirname, '../app/')))

// mounting router
app.use(routes);

app.listen(PORT, () => {
  console.log(`success - listening to requests on port ${PORT}`);
});