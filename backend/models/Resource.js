const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  subject: String,
  description: String,
  semester: String,
  branch: String,
  fileUrl: String,
  educator: { type: Schema.Types.ObjectId, ref: 'Educator' },
  uploader: { type: Schema.Types.ObjectId, ref: 'Educator' },
});

module.exports = mongoose.model('Resource', resourceSchema);
