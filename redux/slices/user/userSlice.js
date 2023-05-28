import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../../config'
import { getCookie } from '../../../actions/auth'

const token=getCookie('token')

export const STATUSES ={
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
}
const userSlice = createSlice({
    name: 'user',
    initialState:{
        data:{},
        status: STATUSES.IDLE,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state,action)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
        })
    }
},
)

export const fetchUser = createAsyncThunk('user/fetch',
async(token1)=>{
    const res = await axios.get(`${API}/user/Profile`,
    { headers: { Authorization: `Bearer ${token1 || token}` } })
    return res.data
})

export default userSlice.reducer