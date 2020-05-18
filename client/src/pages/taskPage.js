import React, { useState, useEffect } from 'react';
import TaskForm from '../component/TaskForm';


function TaskPage() {
  const [showForm, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [category, setCategory] = useState('personal');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetch('/api/v1/task')
      .then((res) => res.json())
      .then((tasks) => setTasks(tasks))
  })

  const editTask = (t, desc, time, cat) => {
    setShow(true);
    setEdit(true);
    setTitle(t);
    setDescription(desc);
    setTime(time);
    setCategory(cat);
  }


  return (
    <>
      <button type="button" onClick={() => {
        setShow(true);
        setTitle('');
        setDescription('');
        setTime(Date.now());
      }}>
        Add Task</button>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span>{task.category}</span>
          <span>{task.time}</span>
          <button>Delete</button>
          <button type="button" onClick={() => editTask(task.title, task.description, task.time, task.category)}>Edit</button>
        </div>

      ))}
      {showForm && <TaskForm
      edit={edit} setEdit={setEdit}
        setShow={setShow} title={title} setTitle={setTitle}
        setDescription={setDescription} description={description}
        category={category} time={new Date(time)} setTime={setTime} setCategory={setCategory} />}

    </>

  )
}

export default TaskPage;