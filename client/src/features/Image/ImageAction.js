import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
// http://127.0.0.1:3450/api/images/profilePic


export const imageCreate = createAsyncThunk("image/create", async (req, thunkApi) => {
    const formData = new FormData
    formData.append("image",req.image)
    // console.log(req)
    try {
        const response = await axios.post("http://localhost:3450/api/profilePic", formData,{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        // console.log(response.data)
        if (response && response.data && response.data._id) {
            // console.log(response.data)
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


export const imageUpdate = createAsyncThunk("image/update", async (req, thunkApi) => {
    const formData = new FormData
    formData.append("image",req.image)
    // console.log(req)
    try {
        const response = await axios.put("http://localhost:3450/api/profilePic", formData,{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        // console.log(response.data)
        if (response && response.data && response.data._id) {
            // console.log(response.data)
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

export const imageShow = createAsyncThunk("image/show", async (req, thunkApi) => {
    try {
        const response = await axios.get("http://localhost:3450/api/profilePic",{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        if (response && response.data && response.data._id) {
            return response.data
        }
        if (response && response.data && !response.data._id) {
            return {}
        }
        if (response.data && response.data.errors) {
            thunkApi.rejectWithValue(response.data.message)
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})