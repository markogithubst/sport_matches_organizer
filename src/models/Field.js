const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    unique: true
  },
  address: {
    type: String,
    minLength: 8,
    maxLength: 50,
    unique: true

  }

}, {
  timestamps: true,
  strict: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.createdAt;
      delete ret.updatedAt;
    }
  }
});

module.exports = mongoose.model('Field', fieldSchema);
