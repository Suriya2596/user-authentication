import { createSlice } from "@reduxjs/toolkit";
import { userAccount, userProfilePic, userRegister } from "./UserAction";

const initialState = {
  userData: {},
  message: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    userRest: (state) => {
      state.userData = {};
      state.message = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true
      state.message = null
      state.isError = false
      state.isSuccess = false
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.userData = action.payload
      state.message = null
      state.isError = false
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false
      state.message = action.payload
      state.isError = true
      state.isSuccess = false
    });
    //account
    builder.addCase(userAccount.pending, (state) => {
      state.isLoading = true
      state.message = null
      state.isError = false
      state.isSuccess = false
    });
    builder.addCase(userAccount.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.userData = action.payload
      state.message = null
      state.isError = false
    });
    builder.addCase(userAccount.rejected, (state, action) => {
      state.isLoading = false
      state.message = action.payload
      state.isError = true
      state.isSuccess = false
    });
    // pic update
    builder.addCase(userProfilePic.pending, (state) => {
      state.isLoading = true
      state.message = null
      state.isError = false
      state.isSuccess = false
    });
    builder.addCase(userProfilePic.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.userData = action.payload
      state.message = null
      state.isError = false
    });
    builder.addCase(userProfilePic.rejected, (state, action) => {
      state.isLoading = false
      state.message = action.payload
      state.isError = true
      state.isSuccess = false
    });
  },
});

export default UserSlice.reducer;
