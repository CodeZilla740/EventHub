import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      // alert("Login successful");
      window.dispatchEvent(new Event("authChange"));
      navigate("/home");

    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert("Login failed");
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
      <h2 className="text-center mb-4 text-primary">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
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
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100 mt-2">
          Login
        </button>
      </form>

      <p className="text-center mt-3">
        Don't have an account?{" "}
        <span
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </div>
  </div>
);
}

export default Login;