import {createSlice} from "@reduxjs/toolkit"
import { imageCreate, imageShow } from "./ImageAction"

const ImageSlice = createSlice({
    name:"Image",
    initialState:{
        isLoadingImage:false,
        errorIamge:false,
        messageImage:null,
        dataImage:{}
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(imageCreate.pending,(state)=>{
            state.isLoadingImage = true
        })
        .addCase(imageCreate.fulfilled,(state,action)=>{
            state.isLoadingImage = false
            state.errorIamge = false
            state.messageImage = null
            state.dataImage = action.payload
        })
        .addCase(imageCreate.rejected,(state,action)=>{
            state.isLoadingImage = false
            state.errorIamge = false
            state.messageImage = action.payload
        })
        // get
        .addCase(imageShow.pending,(state)=>{
            state.isLoadingImage = true
        })
        .addCase(imageShow.fulfilled,(state,action)=>{
            state.isLoadingImage = false
            state.errorIamge = false
            state.messageImage = null
            state.dataImage = action.payload
        })
        .addCase(imageShow.rejected,(state,action)=>{
            state.isLoadingImage = false
            state.errorIamge = false
            state.messageImage = action.payload
        })
    }
})

export default ImageSlice.reducer