import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const userRegister  = createAsyncThunk("user/register",async (req)=>{
    try {
        const reponse = await axios.post("http://localhost:3450/api/user/register",req.data)
        
    } catch (error) {
        throw new Error(error.message)
    }
})