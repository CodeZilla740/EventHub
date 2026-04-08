import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    image: null
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("date", formData.date);
      form.append("location", formData.location);
      form.append("image", formData.image);
      form.append("capacity", formData.capacity);      
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/events/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: form
      });

      const data = await res.json();

      if (res.ok) {
        alert("Event created successfully! Waiting to be approved by the admin.");
        navigate("/home");
      } else {
        alert("Failed to create event");
        console.log("ERROR:", data); 
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Create Event</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
            style={{ ...inputStyle, height: "80px" }}
          />

          <input
            type="date"
            name="date"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            required
            style={{ marginBottom: "15px" }}
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              style={previewStyle}
            />
          )}

          <input
            type="number"
            name="capacity"
            placeholder="Event Capacity"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {loading ? "Creating..." : "Create Event"}
          </button>

        </form>
      </div>
    </div>
  );
};



const containerStyle = {
  minHeight: "100vh",
  background: "#f1f5f9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const cardStyle = {
  width: "400px",
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#1f2937"
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
  padding: "12px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer"
};

const previewStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "15px"
};

export default CreateEvent;