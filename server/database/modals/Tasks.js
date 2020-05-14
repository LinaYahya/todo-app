const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

module.exports = model('Task', taskSchema);
