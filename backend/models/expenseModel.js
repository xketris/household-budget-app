import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    category: {
        type: String,
        enum: ["Personal", "Groceries", "Transportation", "Insurance", "Entertainment", "Utilities", "Housing", "Healthcare", "Uncategorized"],
        default: "Uncategorized"
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Group"
    }
}, { timestamps: true })

export default mongoose.model("Expense", expenseSchema);