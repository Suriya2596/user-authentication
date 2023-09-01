import {configureStore} from "@reduxjs/toolkit"
import UserSlice from "../features/User/UserSlice"

const store = configureStore({
    reducer:{
        User:UserSlice
    }
})

export default store