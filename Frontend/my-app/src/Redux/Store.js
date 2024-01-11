import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import authReducer from './authSlice'
import refreshSidebar from './refreshSidebar'
const rootReducer = combineReducers({
    themeKey: themeReducer,
    authKey: authReducer,
    refreshKey: refreshSidebar
})

export const store = configureStore({
    reducer: rootReducer
})