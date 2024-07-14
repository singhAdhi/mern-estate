import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });
const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/signup", authRouter);

app.use((err, req, res, next) => {
  //this is the middleware for error
  const statuscode = err.statuscode || 500;
  const message = err.message || "internal server error";

  return res.status(statuscode).json({
    sucess: false,
    message,
    statuscode,
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
