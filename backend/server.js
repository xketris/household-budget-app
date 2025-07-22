import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDb from "./config/dbConnection.js";
import groupRoutes from "./routes/groupRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

connectDb();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/groups", groupRoutes);
app.use("/api/auth", userRoutes);

app.use(errorHandler)

app.listen(process.env.PORT || 5000);