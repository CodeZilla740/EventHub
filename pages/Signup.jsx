import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api/api";


function Signup() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", formData);
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      window.dispatchEvent(new Event("authChange"));
      navigate("/home");
    } catch (err) {
      // console.log(err);

      if (err.response && err.response.data) {
        alert(
          err.response.data.message || 
          err.response.data.error ||   
          "Something went wrong"
        );
      } else {
        alert("Server not responding or network error");
      }
    }
  };

  return (
  <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative"
    }}
  >
    
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)"
      }}
    ></div>

    <div
      className="card shadow p-4"
      style={{
        width: "400px",
        borderRadius: "15px",
        zIndex: 1
      }}
    >
      <h2 className="text-center mb-4 text-primary">Create Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Create a password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
        <label className="form-label">Register As</label>
        <select
          name="role"
          className="form-select"
          onChange={handleChange}
          value={formData.role}
        >
          <option value="user">User</option>
          <option value="organiser">Organiser</option>
          <option value="admin">Admin</option>
        </select>
      </div>


        <button className="btn btn-primary w-100 mt-2">
          Sign Up
        </button>
      </form>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <span
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  </div>
);
}

export default Signup;