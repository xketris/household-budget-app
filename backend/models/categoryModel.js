import mongoose from "mongoose";

const categoryModel = mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Name of the category is required" ]
    }
}, { timestamps: true })

export default mongoose.model("Category", categoryModel);