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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Group"
    }
})

export default mongoose.model("Expense", expenseModel);