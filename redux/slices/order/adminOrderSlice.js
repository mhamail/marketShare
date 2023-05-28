import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../../config'
import { getCookie } from '../../../actions/auth'

const token = getCookie("token")

export const STATUSES = {
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
}
const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState: {
        data: [],
        count:"0",
        status: STATUSES.IDLE,
    },
    reducers:{
        setAllOrderCount:(state,action)=>{
            state.count=action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrder.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchAllOrder.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchAllOrder.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    }
},
)

export const fetchAllOrder = createAsyncThunk('adminOrder/fetch',
    async (data) => {
        const res = await axios.post(`${API}/order/getOrders`,
            { ...data },
            { headers: { Authorization: `Bearer ${token}` } })
        return res.data
    })

export const { setAllOrderCount } = adminOrderSlice.actions

export default adminOrderSlice.reducer