import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API} from '../../config'

export const STATUSES ={
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
}
const categorySlice = createSlice({
    name: 'categories',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategories.pending,(state,action)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
        })
    }
},
)

export const fetchCategories = createAsyncThunk('category/fetch',
async()=>{
    const res = await axios.get(`${API}/categories`)
    return res.data
})

export default categorySlice.reducer