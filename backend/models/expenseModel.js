import mongoose from "mongoose";

const expenseModel = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    category: {
        type: String,
        enum: ["Personal", "Groceries", "Transportation", "Insurance", "Entertainment", "Utilities", "Housing", "Healthcare", "Uncategorized"],
        default: "Uncategorized"
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Group"
    }
})

export default mongoose.model("Expense", expenseModel);