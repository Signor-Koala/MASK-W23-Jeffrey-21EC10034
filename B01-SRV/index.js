const express = require('express');
const routes = require('./routes/routes.js');
const config = require('./config.json');
const db = require('./database/db_init.js');
const app = express();

db.init();

app.use('/', routes);

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
});
