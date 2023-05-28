import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API} from '../../../config'

export const STATUSES ={
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
}
const featuredSlice = createSlice({ 
    name: 'featured',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchFeatured.pending,(state,action)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchFeatured.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchFeatured.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
        })
    }
},
)

export const fetchFeatured = createAsyncThunk('featured/fetch',
async()=>{
    const res = await axios.get(`${API}/products/featured`)
    return res.data
})

export default featuredSlice.reducer