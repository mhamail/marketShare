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
const userOrderSlice = createSlice({
    name: 'userOrder',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrder.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchUserOrder.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchUserOrder.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    }
},
)

export const fetchUserOrder = createAsyncThunk('userOrder/fetch',
    async () => {
        const res = await axios.get(`${API}/order/getUserOrders`,
            { headers: { Authorization: `Bearer ${token}` } })
        return res.data
    })

export default userOrderSlice.reducer