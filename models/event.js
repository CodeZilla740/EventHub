const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    time: { type: Date, default: Date.now },
    location: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: String,
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    registrations: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
            name: String,
            email: String,
        }
    ],
    capacity: { type: Number, required: true}
});

module.exports = mongoose.model('Event', eventSchema);