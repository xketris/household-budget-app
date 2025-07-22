import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [ true, "First name is required" ]
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [ true, "Email is required" ]
    },
    password: {
        type: String,
        required: [ true, "Password is required" ]
    },
    groups: {
        type: Array,
        required: false
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema);
