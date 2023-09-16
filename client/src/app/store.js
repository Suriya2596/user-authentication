import {configureStore} from "@reduxjs/toolkit"
import UserSlice from "../features/User/UserSlice"
import ImageSlice from "../features/Image/ImageSlice"

const store = configureStore({
    reducer:{
        User:UserSlice,
        image:ImageSlice
    }
})

export default store