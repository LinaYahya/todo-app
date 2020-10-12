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
  },
});

export default taskSlice.reducer;
