import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        validUser: false
    },
    reducers: {
        setValidUser: (state) => {
            return state = !state
        }
    }
})

export const { setValidUser } = authSlice.actions
export default authSlice.reducer