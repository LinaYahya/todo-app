import React from "react";
import DateTimePicker from "react-datetime-picker";
import './taskForm.css';

function TaskFrom({
  edit,
  setEdit,
  setShow,
  id,
  setID,
  title,
  setTitle,
  description,
  setDescription,
  time,
  setTime,
  category,
  setCategory,
  setTasks,
  tasks,
}) {
  const addTask = () => {
    fetch("/api/v1/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, time, category }),
    })
      .then((res) => res.json())
      .then(({ newTask }) => setTasks([...tasks, newTask]))
      .catch((err) => console.log(err));
  };

  const EditTask = () => {
    fetch(`/api/v1/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, time, category }),
    })
      .then((res) => res.json())
      .then(({ taskedited }) =>
        tasks.map((task) => {
          if (task._id !== taskedited._id) {
            return task;
          } else {
            return taskedited;
          }
        })
      )
      .then((result)=> setTasks(result))
      .catch((err) => console.log(err));
  };

  const clearItems = () => {
    setEdit(false);
    setShow(false);
    setDescription("");
    setTitle("");
    setID("");
    setTime(Date.now());
  };

  return (
    <>
      <form className="taskform">
        <h2>{edit ? 'Edit' : 'ADD'} Your Task</h2>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />

        <label>
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />

        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="personal">personal</option>
            <option value="work">work</option>
          </select>
        </label>
        <br />
        <label>
          Time
          <DateTimePicker
            className="timepicker"
            value={time}
            onChange={(date) => setTime(date)}
          />
        </label>
        <button
          type="button"
          className="taskbtn"
          onClick={() => {
            clearItems();
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="taskbtn"
          onClick={(e) => {
            e.preventDefault();
            if (edit) {
              EditTask();
            } else {
              addTask();
            }
            clearItems();
          }}
        >
          {edit ? "Edit" : "Add Task"}
        </button>
      </form>
    </>
  );
}

export default TaskFrom;
