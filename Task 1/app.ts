import express from "express";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
