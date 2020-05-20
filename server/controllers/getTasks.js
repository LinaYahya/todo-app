const Task = require('../database/modals/Tasks');
const taskSchema = require('./validation/taskSchema');

const getTasks = async (req, res, next) => {
  const tasks = await Task.find({ userID: 'ab123' });
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

const editTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, category, time } = req.body;
  try {
    const { error, data } = await taskSchema.validate(
      { title, description, category, time },
      { abortEarly: false }
    );
    if (error) {
      throw error.details;
    }
    await Task.findByIdAndUpdate(id, {
      userID: 'ab123',
      title,
      description,
      category,
      time,
    });
    res.json('Task updated');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  deleteTask,
  editTask,
};
