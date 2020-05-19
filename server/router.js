const router = require('express').Router();
const { addTask, getTasks, deleteTask, editTask } = require('./controllers');

router.post('/task', addTask);
router.get('/task', getTasks);
router.delete('/task/:id', deleteTask);

router.patch('/task/:id', editTask);

module.exports = router;
