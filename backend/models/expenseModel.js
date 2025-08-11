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
        enum: ["Other", "Groceries", "Transportation", "Entertainment", "Utilities", "Housing", "Healthcare"],
        default: "Other"
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Group"
    },
    date: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

export default mongoose.model("Expense", expenseSchema);