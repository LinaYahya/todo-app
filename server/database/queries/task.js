const Task = require('../modals/Tasks');

const taskQueries = {};

taskQueries.createTask = ({ userID, title, description, category, time }) =>
  Task.create({ userID, title, description, category, time });

taskQueries.deleteTask = (id) => Task.findByIdAndDelete(id);

taskQueries.findTasksByUserID = (userID) => Task.find({ userID });

taskQueries.editTask = (id, { title, description, category, time }) =>
  Task.findByIdAndUpdate(id, { title, description, category, time });

module.exports = taskQueries;
