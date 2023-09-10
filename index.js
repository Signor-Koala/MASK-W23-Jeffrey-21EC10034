const express = require('express');
const routes = require('./routes/routes.js');
const config = require('./config.json');
const app = express();

app.use('/', routes);

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
