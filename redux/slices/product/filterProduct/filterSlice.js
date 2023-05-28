import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name : 'filter',
    initialState:{
        text:"",
        price:false,
        sortPrice:"",
    },
    reducers:{
        setSearch:(state,action)=>{
            state.text=action.payload
        },
        setPrice:(state,action)=>{
            state.price=action.payload
        },
        setSortPrice:(state,action)=>{
            state.sortPrice=action.payload
        }
    },
})

export const {setSearch,setPrice,setSortPrice} = filterSlice.actions;

export default filterSlice.reducer