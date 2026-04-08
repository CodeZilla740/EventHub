const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { verifyToken } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/role");

router.get("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.delete("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;