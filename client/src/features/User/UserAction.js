import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const userRegister  = createAsyncThunk("user/register",async (formData,thunkApi)=>{
    // console.log(formData)
    try {
        const response = await axios.post("http://localhost:3450/api/user/register",formData)
        console.log(response)
        if(response && response.data && response.data._id){
            return true
        }
    } catch (error) {
        console.log(error)
        const message = (error.response&& error.response.data&& error.response.data.message) || error.message ||error.toString()
        return thunkApi.rejectWithValue(message)
    }
})