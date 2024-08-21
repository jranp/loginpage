const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/login", {})
  .then(() => {
    console.log("Connected to local MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to local MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  email: String,
  phone: String,
  password: String,
});
const User = mongoose.model("User", userSchema, "user");
console.log(User);

app.post("/", async (req, res) => {
  console.log("test42");
  const { email, phone, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.find({
      $or: [{ email }, { phone }],
    });
    console.log("testuserexit", existingUser);
    if (existingUser.length != 0) {
      return res
        .status(400)
        .json({ message: "Already have this email or phone" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      phone,
      password: hashedPassword,
    });
    const saveuser = await newUser.save();
    console.log("testsaveuser", saveuser);
    // await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

app.post("/test-db", async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const newUser = new User({ email, phone, password });
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
