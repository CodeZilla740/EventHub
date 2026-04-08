import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventHubHome = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f3f4f6" }}>

      {/* HERO SECTION */}
      <div style={{
        background: "linear-gradient(135deg,#4f46e5,#6366f1)",
        color: "white",
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "10px" }}>
          Discover Amazing Events
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
          Find, join and create events effortlessly 🚀
        </p>
      </div>

      {/* EVENTS SECTION */}
      <div style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "50px 20px"
      }}>

        <h2 style={{
          marginBottom: "30px",
          fontSize: "2rem",
          color: "#111827",
          fontWeight: "600"
        }}>
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
            gap: "30px"
          }}>

            {events.map(event => (
              <div
                key={event._id}
                style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 35px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";
                }}
              >

                {/* EVENT IMAGE */}
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "cover"
                  }}
                />

                {/* EVENT CONTENT */}
                <div style={{
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1
                }}>

                  <h3 style={{
                    color: "#111827",
                    marginBottom: "8px",
                    fontSize: "1.2rem",
                    fontWeight: "600"
                  }}>
                    {event.title}
                  </h3>

                  <p style={{
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    marginBottom: "12px",
                    lineHeight: "1.4"
                  }}>
                    {event.description?.substring(0, 80)}...
                  </p>

                  <p style={{ fontSize: "0.9rem", color: "#374151" }}>
                    📅 {new Date(event.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </p>

                  <p style={{ fontSize: "0.9rem", color: "#374151" }}>
                    ⏰ {new Date(event.date).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      }
                    )}
                  </p>

                  <p style={{ fontSize: "0.9rem", color: "#374151" }}>
                    📍 {event.location}
                  </p>

                  <p style={{
                    marginTop: "6px",
                    fontSize: "0.85rem",
                    color: "#ef4444",
                    fontWeight: "500"
                  }}>
                    Seats Left: {event.capacity - event.registrations.length}
                  </p>

                  {/* REGISTER BUTTON */}
                  <div style={{ marginTop: "auto" }}>
                    <button
                      onClick={() => navigate(`/register/${event._id}`)}
                      style={{
                        width: "100%",
                        marginTop: "15px",
                        padding: "10px",
                        background: "#4f46e5",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "500",
                        transition: "0.2s"
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.background = "#4338ca")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "#4f46e5")
                      }
                    >
                      Register
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default EventHubHome;