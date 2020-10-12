import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "./TaskForm";
import { fetchTasks, deleteTask } from "./taskSlice";
import Navbar from "../Nav";
import "./task.css";

function TaskPage({ userName, setData }) {
  const [showForm, setShow] = useState(false);
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [category, setCategory] = useState("personal");
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const tasksStatus = useSelector((state) => state.tasks.status);
  useEffect(() => {
    if (tasksStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [tasksStatus, dispatch]);

  const editTask = (id, t, desc, time, cat) => {
    setShow(true);
    setEdit(true);
    setID(id);
    setTitle(t);
    setDescription(desc);
    setTime(time);
    setCategory(cat);
  };



  return (
    <>
      <Navbar userName={userName} setData={setData} />
      {console.log(tasksStatus, "status")}
      <div className="taskContainer">
        <button
          className="newBtn"
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
                    <button type="button" onClick={() => dispatch(deleteTask(task._id)) }>
                      <i className="fas fa-trash-alt"></i>
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
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                  <p>{task.description}</p>
                  <span>{task.category}</span>
                  <span>{task.time}</span>
                </div>
              ))
            : null}
        </div>
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
          tasks={tasks}
        />
      )}
    </>
  );
}

export default TaskPage;
