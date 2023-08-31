import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:{},
    error:null,
    loading:false
}

const UserSlice = createSlice({
    name:"User",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase()
    }
})

export default UserSlice.reducer