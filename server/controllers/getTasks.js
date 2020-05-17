const Task = require('../database/modals/Tasks');

module.exports = async (req, res, next) => {
  const tasks = await Task.find({ userID: '12b' });
  if (tasks.length > 0) {
    res.json(tasks);
  } else {
    res.json('No tasks found');
  }
};
