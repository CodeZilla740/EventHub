
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.js");
const { authorizeRoles } = require("../middleware/role.js");


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Kindly Login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "user"
    });

    await user.save();

    res.status(201).json({ message: "Signup successful" });

  } catch(error) {
    console.log(error);

  res.status(500).json({
    message: error.message   
  });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = user.password.length<20
                    ? password === user.password
                    : await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id,
        role: user.role
       },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
      token,
      role: user.role
     });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
  }
);



module.exports = router;