import express from "express"; // Import Express
import mongoose from "mongoose"; // Import Mongoose
import dotenv from "dotenv"; // Import dotenv for environment variables
import userRouter from "./routes/user.route.js"; // Import user routes
import authRouter from "./routes/auth.route.js"; // Import auth routes

dotenv.config(); // Load environment variables

mongoose
  .connect(process.env.MONGO) // Connect to MongoDB
  .then(() => {
    console.log("connected to db"); // Log success message
  })
  .catch((error) => {
    console.log(error); // Log error message
  });

const app = express(); // Initialize Express app

app.use(express.json()); // Middleware to parse JSON

app.use("/api/user", userRouter); // User routes middleware
app.use("/api/auth", authRouter); // Auth routes middleware
app.use((err, req, res, next) => {
  // Error handling middleware
  const statuscode = err.statuscode || 500; // Default status code
  const message = err.message || "internal server error"; // Default message

  return res.status(statuscode).json({
    sucess: false,
    message,
    statuscode,
  }); // Send error response
});

app.listen(3000, () => {
  console.log("Server is running"); // Start server on port 3000
});
