const router = require('express').Router();
const { addTask, getTasks } = require('./controllers');

router.post('/task', addTask);
router.get('/task', getTasks);

module.exports = router;
