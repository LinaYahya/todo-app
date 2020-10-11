import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchPosts } from "../../../../../../redux/redux-essentials-example-app/src/features/posts/postsSlice";

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
  },
});

export default taskSlice.reducer;
