// import { createSlice } from "@reduxjs/toolkit";
// const socketSlice = createSlice({
//   name: "socket",
//   initialState: {
//     socket: null,
//   },
//   reducers: {
//     setSocket: (state, action) => {
//       state.socket = action.payload;
//     },
//   },
// });
// export const { setSocket } = socketSlice.actions;

// export default socketSlice.reducer;

// redux/socketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket: (state, action) => {
      // Do not store the socket instance directly in Redux, use context or another method
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
