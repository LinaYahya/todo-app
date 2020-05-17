import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';


function TaskFrom() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [category, setCategory] = useState('');

  const addTask = () => {
    fetch('/api/v1/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, time, category })
    })
      .then((res) => res.json())
      .then(console.log)

  }

  return (
    <>

      < form className="taskform">
        <label  >
          Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />

        <label>
          description
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />

        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} >
            <option value="personal">personal</option>
            <option value="work">work</option>
          </select>
        </label>
        <br />
        <label>
          Time
        <DateTimePicker
            value={time}
            onChange={(date) => setTime(date)}
          />
        </label>
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          addTask();
        }}>
          Add Task</button>
      </form>
    </>
  )
}

export default TaskFrom;
