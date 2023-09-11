const express = require('express');
const path = require('path');
const router = express.Router();
const { body, matchedData, validationResult } = require('express-validator');
const dbh = require('../database/db_handler.js');

const pages = path.join(__dirname, '../assets');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/submit-form',
  body('username_field').notEmpty().matches(/[a-z_]+/).escape(),
  body('name1_field').notEmpty().matches(/[a-zA-Z]+/),
  body('name2_field').notEmpty().matches(/[a-zA-Z]+/),
  body('pronouns_field').notEmpty().matches(/[a-zA-Z]+\/[a-zA-Z]+/),
  body('age_field').notEmpty().matches(/\d+/),
  (req, res) => {

  const result = validationResult(req);

  if (result.isEmpty()) {
    const data = matchedData(req);
    console.log('Validation success');
    dbh(data);
    res.status(200);
    res.send('Success!');
  }
  else {
    res.status(400);
    res.sendFile('form_invalid.html', { root: pages });
  }
});

router.get('/', (req, res) => {
  res.status(200);
  res.sendFile('form.html', { root: pages });
});

module.exports = router;
