import { createSlice } from "@reduxjs/toolkit";

const refreshSidebar = createSlice({
    name: 'refreshSidebar',
    initialState: {
        refresh: true
    },
    reducers: {
        refreshSidebarFun: (state) => {
            return state = !state
        }
    }
})

export const { refreshSidebarFun } = refreshSidebar.actions;
export default refreshSidebar.reducer