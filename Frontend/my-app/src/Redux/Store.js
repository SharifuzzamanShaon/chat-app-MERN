import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import authReducer from './authSlice'
const rootReducer = combineReducers({
    themeKey: themeReducer,
    authKey: authReducer
})

export const store = configureStore({
    reducer: rootReducer
})