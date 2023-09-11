const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.set('strictQuery', false);

exports.init = async () => {
  try {
    const db = await mongoose.connect(config.mongo);
    console.log('Connected to the database');
    return db;
  }
  catch (e) {
    console.log(` UNABLE TO CONNECT TO THE DATABASE: ${e.message}`, e);
  }
};

// YES, I KNOW THIS IS UNSAFE
