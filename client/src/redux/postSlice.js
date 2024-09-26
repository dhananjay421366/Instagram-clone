import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    selectedPost: null,
  },
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
    },
    selectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setPost, selectedPost } = postSlice.actions;
export default postSlice.reducer;
