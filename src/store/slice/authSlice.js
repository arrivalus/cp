import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        refresh_token: null
    },
    reducers: {
        setAuth: (state, action) => {
            localStorage.setItem('user', JSON.stringify({
                token: action.payload.token,
                refresh_token: action.payload.refresh_token
            }))

            state.token = action.payload.token
            state.refresh_token = action.payload.refresh_token
        },
        logout: (state, action) => {
            localStorage.clear()
            state.token = null
            state.refresh_token = null

        }
    }
})

export const selectAuth = (state) => state.auth;

export const {setAuth, logout} = authSlice.actions

export default authSlice.reducer
