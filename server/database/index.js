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
        const data = await Task.create(taskData);
        return data;
      })
      .then(resolve)
      .catch(reject);
  });

buildDB()
  .then((l) => {
    console.log('Database was built successfully !', l);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
    mongoose.disconnect();
  });
