const addTask = require('./addTask');
const { getTasks, deleteTask, editTask } = require('./getTasks');
const loginByGoogle = require('./googleLogin');
const verifyUser = require('./verifyProtected');

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  editTask,
  loginByGoogle,
  verifyUser,
};
