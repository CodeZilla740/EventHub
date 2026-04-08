import { useEffect, useState } from "react";
import API from "../api/api";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Events</h2>

      {events.map(event => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.location}</p>
        </div>
      ))}
    </div>
  );
}

export default Events;