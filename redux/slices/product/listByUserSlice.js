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
const listByUserSlice = createSlice({
    name: 'listByUser',
    initialState: {
        data: [],
        count: "",
        status: STATUSES.IDLE,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListByUser.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchListByUser.fulfilled, (state, action) => {
                state.data = action.payload.product
                state.count = action.payload.count
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchListByUser.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    }
},
)

export const fetchListByUser = createAsyncThunk('listByUser/fetch',
    async (data) => {
        const res = await axios.post(`${API}/products/listByUser`, { ...data },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return res.data
    })

export default listByUserSlice.reducer