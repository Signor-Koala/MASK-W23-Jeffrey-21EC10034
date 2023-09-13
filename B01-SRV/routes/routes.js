const express = require('express');
const path = require('path');
const router = express.Router();
const { body, matchedData, validationResult } = require('express-validator');
const dbh = require('../database/db_handler.js');

const pages = path.join(__dirname, '../static');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/submit-form',
  body('username').notEmpty().matches(/[a-z_]+/).escape(),
  body('name1').notEmpty().matches(/[a-zA-Z]+/),
  body('name2').notEmpty().matches(/[a-zA-Z]+/),
  body('pronouns').notEmpty().matches(/[a-zA-Z]+\/[a-zA-Z]+/),
  body('age').notEmpty().matches(/\d+/),
  async (req, res) => {

  const result = validationResult(req);

  if (result.isEmpty()) {
    const data = matchedData(req);
    console.log('Validation success');
    await dbh.addUser(data);
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
