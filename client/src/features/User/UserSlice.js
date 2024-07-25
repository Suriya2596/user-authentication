import { createSlice } from "@reduxjs/toolkit";
import { userAccount, userLogin, userLogout, userProfileImage, userRegister, userResetPassword, userUpdate } from "./UserAction";


const initialState = {
  userData: {},
  message: null,
  image: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
};

const UserSlice = createSlice({
  name: "User",
  initialState : initialState,
  reducers: {
    userRest: (state) => {
      state.userData = {};
      state.image = {};
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
    // login
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true
      state.message = null
      state.isError = false
      state.isSuccess = false
    });
    builder.addCase(userLogin.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = null
      state.isError = false
    });
    builder.addCase(userLogin.rejected, (state, action) => {
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
    // update
    builder.addCase(userUpdate.pending, (state) => {
      state.isLoading = true
      state.message = null
      state.isError = false
      state.isSuccess = false
    });
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.userData = action.payload
      state.message = null
      state.isError = false
    });
    builder.addCase(userUpdate.rejected, (state, action) => {
      state.isLoading = false
      state.message = action.payload
      state.isError = true
      state.isSuccess = false
    });
    // resetPassword userResetPassword
    builder.addCase(userResetPassword.pending, (state) => {
      state.isLoading = true
      state.message = null
      state.isError = false
      state.isSuccess = false
    });
    builder.addCase(userResetPassword.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.userData = action.payload
      state.message = null
      state.isError = false
    });
    builder.addCase(userResetPassword.rejected, (state, action) => {
      state.isLoading = false
      state.message = action.payload
      state.isError = true
      state.isSuccess = false
    });
    // userProfileImage
    builder.addCase(userProfileImage.pending, (state) => {
      state.isLoading = true
      state.message = null
      state.isError = false
      state.isSuccess = false
    });
    builder.addCase(userProfileImage.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.image = action.payload
      state.message = null
      state.isError = false
    });
    builder.addCase(userProfileImage.rejected, (state, action) => {
      state.isLoading = false
      state.message = action.payload
      state.isError = true
      state.isSuccess = false
    });
    // userLogout
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true
      state.message = null
      state.isError = false
      state.isSuccess = false
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.userData = action.payload
      state.message = null
      state.isError = false
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false
      state.message = action.payload
      state.isError = true
      state.isSuccess = false
    });
  },
});

// Export the reducer
export const { userRest } = UserSlice.actions;

// Export the extra reducer
export default UserSlice.reducer;