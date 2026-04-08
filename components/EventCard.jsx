import { useNavigate } from "react-router-dom";
import  { useState } from "react";

function EventCard({ event }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const progress = (event.registered / event.total) * 100;

  const register = async (id) => {
    await fetch(`http://localhost:3000/events/${id}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      <img src={event.image} className="card-img-top" alt={event.title} />

      <div className="card-body">
        <h5>{event.title}</h5>
        <p>{event.description}</p>
        <p className="text-muted small">{event.date}</p>
        <p className="text-muted small">{event.location}</p>

        <p className="small">
          {event.registered}/{event.total} registered
        </p>

        <div className="progress mb-3" style={{ height: "6px" }}>
          <div
            className="progress-bar bg-warning"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={() => navigate(`/event/${event.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default EventCard;