import { configureStore } from "@reduxjs/toolkit"
import expensesReducer from "./expenses/expensesSlice"
import userReducer from "./user/userSlice"

export const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;