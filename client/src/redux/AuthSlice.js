import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUser: [],
    userProfile: null,
    selectedUser: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUser: (state, action) => {
      state.suggestedUser = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setselectedUser: (state, action) => {
      state.selectedUser = action.payload
    }
  },
});
export const { setAuthUser, setSuggestedUser, setUserProfile,setselectedUser } =
  authSlice.actions;
export default authSlice.reducer;
