import React from "react";
import DateTimePicker from "react-datetime-picker";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "./taskSlice";
import "./taskForm.css";

function TaskFrom({ edit, setEdit, setShow, task, setTask }) {
  const { id, title, description, time, category } = task;

  const dispatch = useDispatch();

  const clearItems = () => {
    setEdit(false);
    setShow(false);
    setTask({
      id: "",
      title: "",
      description: "",
      time: new Date(),
      category: "personal",
    });
  };

  const setValue = (key, value) => {
    setTask({ ...task, [key]: value });
  };

  return (
    <>
      <form className="taskform">
        <h2>{edit ? "Edit" : "ADD"} Your Task</h2>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setValue("title", e.target.value)}
          />
        </label>
        <br />

        <label>
          Description
          <input
            value={description}
            onChange={(e) => setValue("description", e.target.value)}
          />
        </label>
        <br />

        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setValue("category", e.target.value)}
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
            onChange={(date) => setValue("time", date)}
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
              dispatch(editTask({ id, title, description, time, category }));
            } else {
              dispatch(addTask({ title, description, time, category }));
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
