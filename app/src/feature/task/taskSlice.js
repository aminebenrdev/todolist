import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appAxios from "../../axios";
import Swal from 'sweetalert2'


export const getTasks = createAsyncThunk("task/getTasks", async () => {
    try {
        const { data } = await appAxios.get("/api/")
        return data
    } catch (error) {
        console.log(error);
    }
})

export const deleteTask = createAsyncThunk("task/deleteTask", async  (id) => {
    try {
        let deletedId = undefined
        await Swal.fire({
            title: '本当に削除しますか？',
            text: 'この操作は元に戻せません。',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'はい、削除します！',
            cancelButtonText: 'キャンセル'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await appAxios.delete(`/api/${id}`);
                deletedId = id
                Swal.fire(
                    '削除されました！',
                    'タスクが正常に削除されました。',
                    'success'
                );
                
            }
        })

        return deletedId
    } catch (error) {
        Swal.fire(
            'エラー！',
            `タスクの削除中にエラーが発生しました: ${error}`,
            'error'
        );
    }
})


export const addTask = createAsyncThunk("task/addTask", async ({title, description}) => {
    try {
        if(title && description) {
            const { data } = await appAxios.post("/api/create", {"title": title,"description": description})
            return data
        }else{
            Swal.fire(
                'エラー！',
                `タイトルと説明は必須です。`,
                'error'
            );
        }
    } catch (error) {
        console.log(error);
    }
})


export const doneTask = createAsyncThunk("task/doneTask", async (id) => {
    try {
        const { data } = await appAxios.get(`/api/${id}/done`)
        return data
    } catch (error) {
        console.log(error);
    }
})

const taskSlice = createSlice({
    name: "task",

    initialState:{
        tasks: [],
        loading: false
    },

    reducers: {},
    
    extraReducers: {
        [getTasks.pending]: (state) => {
            state.loading = true
        },

        [getTasks.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                tasks: payload,
                loading: false
            }
        },

        [getTasks.rejected]: (state) => {
            state.loading = false
        },

       
        [deleteTask.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== payload)
            }
        },

        [addTask.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                tasks: payload ? state.tasks.concat(payload) : state.tasks
            }
        },

        [doneTask.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === payload.id ? payload : task)
            }
        },


    }
})


export default taskSlice.reducer