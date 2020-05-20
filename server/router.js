const router = require('express').Router();
const {
  addTask,
  getTasks,
  deleteTask,
  editTask,
  loginByGoogle,
} = require('./controllers');

router.post('/login/google', loginByGoogle);

router.post('/task', addTask);
router.get('/task', getTasks);
router.delete('/task/:id', deleteTask);

router.patch('/task/:id', editTask);

module.exports = router;
