import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [ true, "First name is required" ]
    },
    lastName: {
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
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Group"
    }]
}, { timestamps: true })

export default mongoose.model("User", userSchema);
