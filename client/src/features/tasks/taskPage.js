import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "./TaskForm";
import { fetchTasks, deleteTask } from "./taskSlice";
import Navbar from "../Nav";
import "./task.css";

function TaskPage({ userName, setData }) {
  const [showForm, setShow] = useState(false);
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    time: new Date(),
    category: "personal",
  });
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const tasksStatus = useSelector((state) => state.tasks.status);
  useEffect(() => {
    if (tasksStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [tasksStatus, dispatch]);

  const editTask = (id, title, description, time, category) => {
    setShow(true);
    setEdit(true);
    setTask({ id, title, description, time, category });
  };

  return (
    <>
      <Navbar userName={userName} setData={setData} />
      <div className="taskContainer">
        <button
          className="newBtn"
          type="button"
          onClick={() => {
            setShow(true);
            setTask({
              id: "",
              title: "",
              description: "",
              time: new Date(),
              category: "personal",
            });
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
                    <button
                      type="button"
                      onClick={() => dispatch(deleteTask(task._id))}
                    >
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
          setShow={setShow}
          task={task}
          setTask={setTask}
        />
      )}
    </>
  );
}

export default TaskPage;
