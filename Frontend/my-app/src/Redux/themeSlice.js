import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: {
        lightTheme: true
    },
    reducers: {
        toggleTheme:(state)=>{
            return state = !state
        }
    }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer