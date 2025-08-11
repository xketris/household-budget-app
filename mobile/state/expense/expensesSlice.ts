import { createSlice } from "@reduxjs/toolkit";

interface Expense {
    id: string,
    date: Date,
    amount: number,
    description: string,
    createdBy: {
        id: string,
        email: string,
        firstName: string,
        lastName: string,
    },
    category: string,
    groupId?: string
}

interface ExpensesState {
    expenses: Expense[]
}

const initialState: ExpensesState = { expenses: [] };

const expensesSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        set: (state, action) => {
            state.expenses = action.payload;
        },
        add: (state, action) => {
            state.expenses = [...state.expenses, action.payload];
        },
    }
})

export const { set, add } = expensesSlice.actions;

export default expensesSlice.reducer;