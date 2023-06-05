import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users";

const express = require("express");
 const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  async (req: Request, res: Response) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();

      return res.json({ message: "Signup successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
  }
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email"),
  async (req: Request, res: Response) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Generate JWT tokens
      const accessToken = jwt.sign({ userId: user.id }, "secretKey", {
        expiresIn: "120s",
      });
      const refreshToken = jwt.sign({ userId: user.id }, "refreshKey");

      return res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
  }
);

router.post("/refresh-token", (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  try {
    // Verify the refresh token
    jwt.verify(refreshToken, "refreshKey", (err: any, decoded: any) => {
      if (err) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid refresh token" }] });
      }

      // Generate a new access token
      const accessToken = jwt.sign({ userId: decoded.userId }, "secretKey", {
        expiresIn: "120s",
      });

      return res.json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

export default router;