const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educatorSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  collegeName: String,
  experience: String,
  role: { type: String, default: 'educator' } 
});

module.exports = mongoose.model('Educator', educatorSchema);
