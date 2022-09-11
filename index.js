import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js ";
import authRouter from "./routes/authRoute.js";

const app = express();
const port = 3001;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

const connectiontoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to mongoDB is successful");
  } catch (error) {
    console.error(error);
  }
};

//USER
app.use("/api", userRouter);

//AUTH
app.use("/api", authRouter);

app.listen(port, () => {
  connectiontoDB();
  console.log(`Server started on port ${port}`);
});
