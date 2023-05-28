import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name : 'theme',
    initialState:{
        themeMode:{},
    },
    reducers:{
        setTheme:(state,action)=>{
            state.themeMode=action.payload;
        },
    },
})

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer