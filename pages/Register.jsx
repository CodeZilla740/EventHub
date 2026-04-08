import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RegisterEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [event, setEvent] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const res = await fetch(`http://localhost:3000/events/${id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          eventId: id   
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully!");
        navigate("/");
      } else {
        console.log("Registration failed:", data);
        alert(data.message || "Registration failed");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.log("Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    
    <div style={containerStyle}>
    <div style={cardStyle}>

      {/* Event Details */}
      {event && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h3>{event.title}</h3>

          {event.image && (
            <img
              src={`http://localhost:3000${event.image}`}
              alt={event.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />
          )}

          <p><b>Date:</b> {event.date}</p>
          <p><b>Location:</b> {event.location}</p>
          <p>{event.description}</p>
        </div>
      )}

      <h2 style={titleStyle}>Register for Event</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Register
        </button>

      </form>
    </div>
  </div>

  );
};

// Styles
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')", 
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
};

const cardStyle = {
  width: "350px",
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  position: "relative",
  zIndex: 10
};

export default RegisterEvent;