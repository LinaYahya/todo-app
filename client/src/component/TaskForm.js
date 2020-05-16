import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';


function TaskFrom() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [Category, setCategory] = useState('');

  return (
    <>
      
      < form >
        <label >
          Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          description
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label>
          Category:
          <select value={Category} onChange={(e) => setCategory(e.target.value)} >
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
      </form>
    </>
  )
}

export default TaskFrom;
