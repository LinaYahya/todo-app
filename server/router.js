const router = require('express').Router();
const { addTask } = require('./controllers');

router.post('/task', addTask );

module.exports = router;
