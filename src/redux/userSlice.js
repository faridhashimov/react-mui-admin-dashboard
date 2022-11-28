import { createSlice } from '@reduxjs/toolkit'

export const USER_LS_KEY = 'admn_accs_ky1'

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(USER_LS_KEY)) || null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUserData(state, action) {
            localStorage.setItem(USER_LS_KEY, JSON.stringify(action.payload))
            state.user = action.payload
        },
        logOut(state) {
            state.user = null
        },
    },
})

export const userReducer = userSlice.reducer
export const { setUserData, logOut } = userSlice.actions
