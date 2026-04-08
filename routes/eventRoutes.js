const express = require('express');
const router = express.Router();

const Event = require('../models/event');
const upload = require("../middleware/uploads");
const { registerEvent } = require("../controllers/eventController.js");
const { protect } = require("../middleware/auth.js");
const { authorizeRoles } = require("../middleware/role.js");
const { verifyToken } = require("../middleware/auth.js");
const { createEvent, getEvents } = require("../controllers/eventController.js");


router.post(
  "/create",
  verifyToken,
  authorizeRoles("organiser", "admin"),
  upload.single("image"),
  createEvent
);


router.get("/", getEvents);

router.get(
  "/all",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    
    
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching events" });
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/register", verifyToken, registerEvent);

router.put(
  "/approve/:id",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      event.status = "approved";
      await event.save();

      res.json({ message: "Event approved" });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.put(
  "/reject/:id",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      event.status = "rejected";
      await event.save();

      res.json({ message: "Event rejected" });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      res.json({ message: "Event deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;