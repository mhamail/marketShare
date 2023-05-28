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
const allUserSlice = createSlice({
    name: 'allUser',
    initialState:{
        data:[],
        count:"",
        status: STATUSES.IDLE,
    },
    reducers:{
        setUserCount:(state,action)=>{
            state.count=action.payload
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllUser.pending,(state,action)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchAllUser.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchAllUser.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
        })
    }
},
)

export const fetchAllUser = createAsyncThunk('allUser/fetch',
async(token1)=>{
    const res = await axios.get(`${API}/users`,
    { headers: { Authorization: `Bearer ${token1 || token}` } })
    return res.data
})

export const {setUserCount} = allUserSlice.actions

export default allUserSlice.reducer