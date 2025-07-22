import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";

import connectDb from "./config/dbConnection.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();

connectDb();
app.use(express.json());
app.use(helmet());

app.use("/api/categories", categoryRoutes);

app.listen(process.env.PORT || 5000);