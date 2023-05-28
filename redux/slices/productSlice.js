import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API} from '../../config'

export const STATUSES ={
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
}
const productSlice = createSlice({ 
    name: 'products',
    initialState:{
        count:0,
        data:[],
        status: STATUSES.IDLE,
    },
    reducers:{
        setFilterProducts:(state,action)=>{
            state.data=action.payload
        },
        setProductCount:(state,action)=>{
            state.count=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProduct.pending,(state,action)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchProduct.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchProduct.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
        })
    }
},
)

export const fetchProduct = createAsyncThunk('product/fetch',
async(data)=>{
    const res = await axios.post(`${API}/products`,{...data})
    return res.data
})

export const {setFilterProducts,setProductCount} = productSlice.actions;

export default productSlice.reducer