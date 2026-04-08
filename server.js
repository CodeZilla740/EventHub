require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const Event = require('./models/event');
const Registration = require('./models/registration');
const adminRoutes = require('./routes/adminRoutes');
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const userRoutes = require("./routes/userRoute");
app.use(cors());
app.use(express.json());

app.use("/uploads",express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth"));
app.use("/events", require("./routes/eventRoutes"));
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.log(err));




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});