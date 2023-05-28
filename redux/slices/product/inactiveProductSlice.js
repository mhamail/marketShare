import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API} from '../../../config'
import { getCookie } from '../../../actions/auth'

const token = getCookie('token')

export const STATUSES ={
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
}
const inactiveProductSlice = createSlice({ 
    name: 'products',
    initialState:{
        data:[],
        count:"",
        status: STATUSES.IDLE,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchInactiveProduct.pending,(state,action)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchInactiveProduct.fulfilled,(state,action)=>{
            state.data = action.payload.product;
            state.count = action.payload.count;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchInactiveProduct.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
        })
    }
},
)

export const fetchInactiveProduct = createAsyncThunk('inactiveProduct/fetch',
async(data)=>{
    const res = await axios.post(`${API}/inactive/products`,{...data},
    { headers: { Authorization: `Bearer ${token}` } },
    )
    return res.data
})

export default inactiveProductSlice.reducer