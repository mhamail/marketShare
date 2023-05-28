import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API} from '../../config'

export const STATUSES ={
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
}
const subcategorySlice = createSlice({
    name: 'subcategories',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSubCategories.pending,(state,action)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchSubCategories.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchSubCategories.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
        })
    }
},
)

export const fetchSubCategories = createAsyncThunk('subcategory/fetch',
async()=>{
    const res = await axios.get(`${API}/subcategories`)
    return res.data
})

export default subcategorySlice.reducer