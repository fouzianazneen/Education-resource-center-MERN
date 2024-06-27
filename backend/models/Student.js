const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  branch: String,
  year: String,
  role: { type: String, default: 'student' } 
  // collegeName: String,
});

module.exports = mongoose.model('Student', studentSchema);
