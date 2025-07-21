import express from "express";
import helmet from "helmet";
import connectDb from "./config/dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDb();
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
    res.json("Valid response");
})

app.listen(process.env.PORT || 5000);