const userModel = require('./schemas/user.js');

async function addUser(user) {
  const newUser = new userModel(user);
  await newUser.save();
}

module.exports = {
  addUser,
};
