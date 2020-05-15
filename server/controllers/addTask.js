const taskSchema = require('./validation/taskSchema');

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
  } catch (err) {
    next(err);
  }
};
