const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    unique: true
  },
  address: {
    type: String,
    unique: true

  }

}, {
  timestamps: true,
  strict: true
});

module.exports = mongoose.model('Field', fieldSchema);
