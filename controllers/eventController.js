const Event = require("../models/event");
const Registration = require("../models/registration");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const event = new Event({
      title,
      description,
      date,
      time: new Date(),
      location,
      capacity,
      image,
      status: "pending"
    });

    await event.save();
    res.status(201).json({ message: "Event created. Waiting for Admin approval."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: "approved" }).populate("createdBy", "name");
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // prevent duplicate registration
    if (event.registrations?.some(r => r.user.toString() === req.user.id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    if (event.registrations.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    event.registrations = event.registrations || [];
    event.registrations.push({ user: req.user.id, name: req.body.name, email: req.body.email });

    await event.save();

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEventStats = async (req, res) => {
  const eventId = req.params.eventId;

  const registrations = await Registration.countDocuments({ eventId });

  const event = await Event.findById(eventId);

  res.json({
    title: event.title,
    capacity: event.capacity,
    registrations
  });
};