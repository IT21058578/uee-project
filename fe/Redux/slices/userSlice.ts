import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    
    name : 'user',

    initialState : {},

    reducers : {

        setUser : (state, action) => {

            state = action.payload;

            return state;
        },

        logoutCurrentUser : (state, action) => {

            state = {};
            console.log('hello')
            return state;
        },
    }

})

export const { setUser, logoutCurrentUser } = userSlice.actions;