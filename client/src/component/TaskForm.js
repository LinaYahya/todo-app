import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';


function TaskFrom () {
  return(
    <form >
      <label>
        Title
        <input />  
      </label>
      <label>
        description
        <input />  
      </label>
      
      <label>
          Category:
          <select >
            <option value="personal">personal</option>
            <option value="work">work</option>
          </select>
        </label>
        <br />
        <label>
        Time
        <DateTimePicker />
      </label>
      </form>

  )
}

export default TaskFrom;
