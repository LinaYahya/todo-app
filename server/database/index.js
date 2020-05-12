const mongoose = require('mongoose');

const connection = require('./connection');
const Task = require('./modals/Tasks');

const taskData = require('./data/task');

const buildDB = () =>
  new Promise((resolve, reject) => {
    connection
      .then(async () => {
        await Task.createCollection();
        await Task.deleteMany();
        await taskData();
      })
      .then(resolve)
      .catch(reject);
  });

buildDB()
  .then(() => {
    console.log('Database was built successfully !');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
    mongoose.disconnect();
  });
