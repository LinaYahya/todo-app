const addTask = require('./addTask');
const { getTasks, deleteTask, editTask } = require('./getTasks');
const loginByGoogle = require('./googleLogin');

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  editTask,
  loginByGoogle,
};
