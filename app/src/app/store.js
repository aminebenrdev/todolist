import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "../feature/task/taskSlice"

const store = configureStore({
    reducer: {
        task: taskReducer
    }
})

export default store