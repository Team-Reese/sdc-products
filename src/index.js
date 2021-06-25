const express = require('express');

const PORT = 3000; // relpace this with an environment variable later

const app = express();

app.listen(PORT, () => {
  console.log(`success - listening to requests on port ${PORT}`);
});