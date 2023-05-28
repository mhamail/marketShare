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
const vendorOrderSlice = createSlice({
    name: 'vendorOrder',
    initialState: {
        data: [],
        count: "0",
        status: STATUSES.IDLE,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendorOrder.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchVendorOrder.fulfilled, (state, action) => {
                state.data = action.payload.orders;
                state.count = action.payload.count;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchVendorOrder.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    }
},
)

export const fetchVendorOrder = createAsyncThunk('vendorOrder/fetch',
    async (data) => {
        const res = await axios.post(`${API}/order/ordersVendor`,
            { ...data },
            { headers: { Authorization: `Bearer ${token}` } })
        return res.data
    })

export default vendorOrderSlice.reducer