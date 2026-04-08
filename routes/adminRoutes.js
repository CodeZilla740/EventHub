const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { authorizeRoles } = require("../middleware/role.js");
const { verifyToken } = require("../middleware/auth.js");
const Event = require("../models/event.js");

router.get(
  "/stats",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const users = await User.countDocuments();
      const events = await Event.countDocuments();

      const registrations = await Event.aggregate([
        {
          $project: {
            count: {
                $size: {
                    $ifNull: ["$registrations", []]
                }
            }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$count" }
          }
        }
      ]);

      res.json({
        users,
        events,
        registrations: registrations[0]?.total || 0
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching stats" });
    }
  }
);

module.exports = router;