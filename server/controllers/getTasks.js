const Task = require('../database/modals/Tasks');

const getTasks = async (req, res, next) => {
  const tasks = await Task.find({ userID: '12b' });
  if (tasks.length > 0) {
    res.json(tasks);
  } else {
    res.json('No tasks found');
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);
  if (deletedTask != null) {
    res.json('Task deleted successfully');
  } else {
    res.json('NO TASK FOUND FOR THIS ID ');
  }
};

module.exports = {
  getTasks,
  deleteTask,
};
