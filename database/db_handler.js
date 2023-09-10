const userModel = require('./schemas/user.js');

async function addUser(user) {
  console.log('db_handler called');
  const newUser = new userModel({
    username: user.username_field,
    firstname: user.name1_field,
    lastname: user.name2_field,
    pronouns: user.pronouns_field,
    age: user.age_field,
  });
  console.log('model created');
  await newUser.save();
}

module.exports = addUser;
