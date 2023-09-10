const express = require('express');
const path = require('path');
const router = express.Router();
const { body, matchedData, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const config = require('../config.json');
const dbh = require('../database/db_handler.js');

const pages = path.join(__dirname, '../assets');

mongoose.set('strictQuery', false);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(config.mongo);
  console.log('Connected to the database');
}

router.post('/submit-form',
  body('username_field').notEmpty().matches(/[a-z_]+/).escape(),
  body('name1_field').notEmpty().matches(/[a-zA-Z]+/),
  body('name2_field').notEmpty().matches(/[a-zA-Z]+/),
  body('pronouns_field').notEmpty().matches(/[a-zA-Z]+\/[a-zA-Z]+/),
  body('age_field').notEmpty().matches(/\d+/),
  (req, res) => {
  console.log('Validation started');
  const result = validationResult(req);
  console.log(result);
  if (result.isEmpty()) {
    const data = matchedData(req);
    console.log('Validation success');
    dbh(data);
    res.status(200);
    res.send('Success!');
  }
  else {
    res.send({ errors: result.array() });
  }
});

router.get('/', (req, res) => {
  res.status(200);
  res.sendFile('form.html', { root: pages });
});

module.exports = router;
