const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, validate: /[a-z_]+/ },
	firstname: { type: String, validate: /[a-zA-Z]+/ },
	lastname: { type: String, validate: /[a-zA-Z]+/ },
	pronouns: { type: String, validate: /[a-zA-Z]+\/[a-zA-Z]+/ },
	age: Number,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
