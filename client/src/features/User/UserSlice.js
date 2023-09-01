import { createSlice } from "@reduxjs/toolkit";
import { userRegister } from "./UserAction";

const initialState = {
  userData: {},
  message: null,
  isError: false,
  isLoading: false,
  isSuccess:false,
  isRegister:false
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
      state.isRegister = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending,(state)=>{
        state.isLoading = true
        state.message = null
        state.isError = false
        state.isSuccess = false
        state.isRegister = false
    });
    builder.addCase(userRegister.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = action.payload
        state.isRegister = action.payload
        state.message = null
        state.isError = false
    });
    builder.addCase(userRegister.rejected,(state,action)=>{
        state.isLoading = false
        state.message = action.payload
        state.isError = true
        state.isSuccess = false
        state.isRegister = false
    });
  },
});

export default UserSlice.reducer;
