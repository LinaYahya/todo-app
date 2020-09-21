import React, { useState, useEffect } from "react";
import TaskForm from "../component/TaskForm";
import Navbar from "../component/Nav";
import "./task.css";

function TaskPage({ userName }) {
  const [showForm, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [category, setCategory] = useState("personal");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetch("/api/v1/task")
      .then((res) => res.json())
      .then((tasks) => setTasks(tasks));
  }, []);

  const editTask = (id, t, desc, time, cat) => {
    setShow(true);
    setEdit(true);
    setID(id);
    setTitle(t);
    setDescription(desc);
    setTime(time);
    setCategory(cat);
  };

  const deleteTask = async (id) => {
    fetch(`/api/v1/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch(console.error);
  };

  return (
    <>
      <Navbar userName={userName} />
      <button
        type="button"
        onClick={() => {
          setShow(true);
          setTitle("");
          setDescription("");
          setTime(Date.now());
        }}
      >
        Add Task
      </button>
      <div className="mytask">
        {tasks.length > 0
          ? tasks.map((task) => (
            <div key={task._id} className="task">
              <h3
                onClick={() =>
                  editTask(
                    task._id,
                    task.title,
                    task.description,
                    task.time,
                    task.category
                  )
                }
              >
                {task.title}
              </h3>
              <div className="task_controller">
                <button type="button" onClick={() => deleteTask(task._id)}>
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editTask(
                      task._id,
                      task.title,
                      task.description,
                      task.time,
                      task.category
                    )
                  }
                >
                  <i class="fas fa-edit"></i>
                </button>
              </div>
              <p>{task.description}</p>
              <span>{task.category}</span>
              <span>{task.time}</span>
            </div>
          ))
          : null}
      </div>
      {showForm && (
        <TaskForm
          edit={edit}
          setEdit={setEdit}
          id={id}
          setID={setID}
          setShow={setShow}
          title={title}
          setTitle={setTitle}
          setDescription={setDescription}
          description={description}
          category={category}
          time={new Date(time)}
          setTime={setTime}
          setCategory={setCategory}
        />
      )}
    </>
  );
}

export default TaskPage;
