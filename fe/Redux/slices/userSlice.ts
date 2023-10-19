import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    
    name : 'user',

    initialState : {} as any,

    reducers : {

        setUser : (state, action) => {

            state = action.payload;

            return state;
        },

        setRoomID : (state , action) => {
            state.roomId = action.payload;
            return state;
        },

        logoutCurrentUser : (state, action) => {

            state = {};
            console.log('hello')
            return state;
        },
    }

})

export const { setUser, setRoomID ,logoutCurrentUser } = userSlice.actions;