const taskSchema = require('./validation/taskSchema');
const { taskQueries } = require('../database/queries/task');
const Task = require('../database/modals/Tasks');

module.exports = async (req, res, next) => {
  const { title, description, category, time } = req.body;
  try {
    const validation = await taskSchema.validate(
      { title, description, category, time },
      { abortEarly: false }
    );
    if (validation.error) {
      throw validation.error.details;
    }
    const a = await Task.create({
      userID: 'ab123',
      title,
      description,
      category,
      time,
    });
    console.log('hi task', a);
    // console.log(Task.find({userID:'ab123'}));
    // res.json("Task.find({userID:'ab123'})");
  } catch (err) {
    console.log(err);
  }
};
