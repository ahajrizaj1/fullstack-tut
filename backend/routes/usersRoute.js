import express from "express";
import { User } from "../models/userModel.js";


const router = express.Router();

// Route to save a new user

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email and password are required" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// route to get all the users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length > 0) {
      res.status(200).json({
        count: users.length,
        data: users,
      });
    } else {
      res.status(400).json({ message: "No users found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// route to get users by id

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// route to update a user

router.put("/:userId", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = req.params.userId;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email and password are required" });
    }

    const updates = { username, email, password };

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (user) {
      res.status(200).json({ message: "User updated successfully", user });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// route to delete a user

router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted succesfullt" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
