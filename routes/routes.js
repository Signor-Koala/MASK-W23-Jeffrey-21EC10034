const express = require('express');
const path = require('path');
const router = express.Router();
const { query, matchedData, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const config = require('../config.json');

const pages = path.join(__dirname, '../assets');

mongoose.set('strictQuery', false);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(config.mongo);
  console.log('Connected to the database')
}

router.post('/submit-form', query('username').notEmpty().escape(), (req, res) => {
  const username = req.body.username_field;
});

router.get('/', (req, res) => {
  res.status(200);
  res.sendFile('form.html', { root: pages });
});

module.exports = router;
