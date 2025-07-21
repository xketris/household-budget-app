import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected");
    } catch(err) {
        console.log(err);
        process.exit();
    }
}

export default connectDb;