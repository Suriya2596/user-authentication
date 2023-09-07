import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const userRegister = createAsyncThunk("user/register", async (req, thunkApi) => {
    try {
        const response = await axios.post("http://localhost:3450/api/user/register", req.formData)
        if (response && response.data && response.data._id) {
            req.resolve()
            return response.data
        }
        if (response.data && response.data.errors) {
            thunkApi.rejectWithValue(response.data.message)
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const userLogin = createAsyncThunk("user/login", async (req, thunkApi) => {
    try {
        const response = await axios.post("http://localhost:3450/api/user/login", req.formData)
        if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token)
            return req.resolve()
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const userAccount = createAsyncThunk("user/account", async (_, thunkApi) => {
    try {
        const response = await axios.get("http://localhost:3450/api/user", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        if (response.data && response.data._id) {
            return response.data
        }
        if (response.data && response.data.error) {
            const message = "Something went wrong! try again"
            return thunkApi.rejectWithValue(message)
        }
    } catch (error) {
        if(error.response && error.response.data && error.response.data.message && error.response.data.message==="Invalidate Token"){
            localStorage.removeItem("token")
        }
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const userProfilePic = createAsyncThunk("user/pic", async (formData, thunkApi) => {
    try {
        const response = await axios.post("http://localhost:3450/api/user/profilePic", formData, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        if (response.data && response.data._id) {
            return response.data
        }
        const message = "Something went wrong! try again"
        return thunkApi.rejectWithValue(message)
    } catch (error) {
        if(error.response && error.response.data && error.response.data.message && error.response.data.message==="Invalidate Token"){
            localStorage.removeItem("token")
        }
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const userUpdate = createAsyncThunk("user/update",async(req,thunkApi)=>{
    try {
        const response = await axios.put("http://localhost:3450/api/user/update",req.formData,{
            headers:{Authorization:localStorage.getItem("token")}
        })
        if (response.data && response.data._id) {
            req.resolve()
            return response.data
        }
        const message = "Something went wrong! try again"
        return thunkApi.rejectWithValue(message)

    } catch (error) {
        if(error.response && error.response.data && error.response.data.message && error.response.data.message==="Invalidate Token"){
            localStorage.removeItem("token")
        }
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const userResetPassword = createAsyncThunk("user/resetPassword",async (req,thunkApi)=>{
    try {
        const response = await axios.post("http://localhost:3450/api/user/resetPassword",req.formData,{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        if(response.data && response.data._id){
            req.resolve()
            window.alert("Success full reset your password! Please login again")
            return response.data
        }
        const message = "Something went wrong! try again"
        return thunkApi.rejectWithValue(message)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        if(message==="Invalidate Token"){
            localStorage.removeItem("token")
        }
        return thunkApi.rejectWithValue(message)
    }
})

export const userLogout = createAsyncThunk("user/logout",()=>{
    if(localStorage.getItem("token")){
        localStorage.removeItem("token")
        return {}
    }
})