import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Name of the group is required" ],
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
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }]
})

export default mongoose.model("Group", groupSchema);