import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
    sessionId: {
        type: String,
        required: [ true, "Session Id is required" ],
    },
    valid: {
        type: Boolean,
        required: true,
        default: true
    },
})

export default mongoose.model("RefreshToken", refreshTokenSchema);