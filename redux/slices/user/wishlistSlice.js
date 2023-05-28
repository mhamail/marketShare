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
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchWishlist.pending,(state,action)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchWishlist.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchWishlist.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
        })
    }
},
)

export const fetchWishlist = createAsyncThunk('wishlist/fetch',
async()=>{
    const res = await axios.get(`${API}/user/wishlist`,
    { headers: { Authorization: `Bearer ${token}` } })
    return res.data.wishlist
})

export default wishlistSlice.reducer