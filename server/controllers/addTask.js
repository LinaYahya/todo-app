/* eslint-disable no-unused-vars */
const taskSchema = require('./validation/taskSchema');
const Task = require('../database/modals/Tasks');

module.exports = async (req, res, next) => {
  const { title, description, category, time } = req.body;
  const { id } = req.user;

  try {
    const { error, data } = await taskSchema.validate(
      { title, description, category, time },
      { abortEarly: false }
    );
    if (error) {
      throw error.details;
    }
    const sameTimeTask = await Task.find({ userID: id, time });
    if (sameTimeTask.length === 0) {
      await Task.create({
        userID: id,
        title,
        description,
        category,
        time,
      });
      res.json('Task created');
    } else {
      res.json('You already have task at this time');
    }
  } catch (err) {
    next(err);
  }
};
