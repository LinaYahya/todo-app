const router = require('express').Router();
const {
  addTask,
  getTasks,
  deleteTask,
  editTask,
  loginByGoogle,
  verifyUser,
  logout,
} = require('./controllers');

router.post('/login/google', loginByGoogle);

// //login routes only
router.use(verifyUser);

router.get('/auth', (req, res) => {
  res.json(req.user);
});
router.get('/logout', logout);
router.post('/task', addTask);
router.get('/task', getTasks);
router.delete('/task/:id', deleteTask);
router.patch('/task/:id', editTask);

module.exports = router;
