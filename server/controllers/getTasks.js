const Task = require('../database/modals/Tasks');
const taskSchema = require('./validation/taskSchema');

const getTasks = async (req, res, next) => {
  try {
    const { id } = req.user;
    const tasks = await Task.find({ userID: id });
    if (tasks.length > 0) {
      res.json(tasks);
    } else {
      res.json([]);
    }
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask != null) {
      res.json('Task deleted successfully');
    } else {
      res.json('NO TASK FOUND FOR THIS ID ');
    }
  } catch (err) {
    next(err);
  }
};

const editTask = async (req, res, next) => {
  const { id } = req.params;
  const userID = req.user.id;

  const { title, description, category, time } = req.body;
  try {
    const { error, data } = await taskSchema.validate(
      { title, description, category, time },
      { abortEarly: false }
    );
    if (error) {
      throw error.details;
    }
    const taskedited = await Task.findByIdAndUpdate(id, {
      userID,
      title,
      description,
      category,
      time,
    });
    res.json({ msg: 'Task updated', taskedited });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  deleteTask,
  editTask,
};
