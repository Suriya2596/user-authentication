import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import cookie from "js-cookie"
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
            cookie.set("token",response.data.token,{expires:1})
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
                "Authorization": cookie.get("token")
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
            cookie.remove("token")
        }
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})


export const userUpdate = createAsyncThunk("user/update",async(req,thunkApi)=>{
    try {
        const response = await axios.put("http://localhost:3450/api/user/update",req.formData,{
            headers:{Authorization:cookie.get("token")}
        })
        if (response.data && response.data._id) {
            req.resolve()
            return response.data
        }
        const message = "Something went wrong! try again"
        return thunkApi.rejectWithValue(message)

    } catch (error) {
        if(error.response && error.response.data && error.response.data.message && error.response.data.message==="Invalidate Token"){
            cookie.remove("token")
        }
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const userResetPassword = createAsyncThunk("user/resetPassword",async (req,thunkApi)=>{
    try {
        const response = await axios.post("http://localhost:3450/api/user/resetPassword",req.formData,{
            headers: {
                "Authorization": cookie.get("token")
            }
        })
        if(response.data && response.data._id){
            req.resolve()
            window.alert("Success full reset your password! Please login again")
            return {}
        }
        const message = "Something went wrong! try again"
        return thunkApi.rejectWithValue(message)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        if(message==="Invalidate Token"){
            cookie.remove("token")
        }
        return thunkApi.rejectWithValue(message)
    }
})

export const userProfileImage = createAsyncThunk("user/ProfileImage",async (req,thunkApi)=>{
    console.log(req)
    try {
        const response = await axios.post("http://127.0.0.1:3450/api/images/upload",req.formData,{
            headers: {
                "Authorization": cookie.get("token"),
                "Content-Type": "multipart/form-data",
            }
        })
        if(response.data && response.data._id){
            // req.formData.resolve()
            return response.data
        }
        const message = "Something went wrong! try again"
        return thunkApi.rejectWithValue(message)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        if(message==="Invalidate Token"){
            cookie.remove("token")
        }
        return thunkApi.rejectWithValue(message)
    }
})

export const userLogout = createAsyncThunk("user/logout",()=>{
    if(cookie.get("token")){
        cookie.remove("token")
        return {}
    }
})