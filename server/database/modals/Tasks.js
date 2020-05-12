const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = model('Task', taskSchema);
