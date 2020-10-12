import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const data = await fetch("/api/v1/task");
  const tasks = await data.json();
  return tasks;
});
const initialState = {
  status: "idle",
  error: null,
  tasks: [],
};
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ title, description, time, category }) => {
    const res = await fetch("/api/v1/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, time, category }),
    });
    const { newTask } = await res.json();
    return newTask;
  }
);
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, title, description, time, category }) => {
    const res = await fetch(`/api/v1/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, time, category }),
    });
    const { taskedited } = await res.json();
    return taskedited;
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const res = await fetch(`/api/v1/task/${id}`, {
    method: "DELETE",
  });
  const result = await res.json();
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.tasks = state.tasks.concat(action.payload);
    },
    [fetchTasks.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addTask.fulfilled]: (state, action) => {
      state.tasks = state.tasks.concat(action.payload);
    },
    [editTask.fulfilled]: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task._id !== action.payload._id) {
          return task;
        } else {
          return action.payload;
        }
      });
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export default taskSlice.reducer;
