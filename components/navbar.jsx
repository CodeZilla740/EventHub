import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [role, setRole] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let user = null;

if (token) {
  user = jwtDecode(token);
}

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
    const updateRole = () => {
      const storedRole = localStorage.getItem("role");
      console.log("Updated Role:", storedRole); // debug
      setRole(storedRole);
    };
    updateRole();
    window.addEventListener("authChange", updateRole);

    return () => {
      window.removeEventListener("authChange", updateRole);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    if (newTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }


  return (
  <nav className="navbar-ui d-flex justify-content-between align-items-center">

    {/* Logo */}
    <Link className="fw-bold fs-4 text-decoration-none" to="/">
      EventHub
    </Link>

    {/* Right */}
    <div className="d-flex align-items-center gap-3">

      <Link className="btn btn-outline-primary fw-medium" to="/home">
        Explore
      </Link>

      {role === "organiser" && (
        <button className="btn btn-outline-primary fw-semibold" onClick={() => navigate("/create")}>
          Create Event
        </button>
      )}

      {role === "admin" && (
        <button className="btn btn-primary fw-semibold" onClick={() => navigate("/admin")}>
          Admin
        </button>
      )}

      {/* Theme */}
      <button className="btn btn-outline-primary fw-medium" onClick={toggleTheme}>
        {darkMode ? "Light" : "Dark"}
      </button>

      {/* User */}
      {user ? (
        <>
            <div className="d-flex align-items-center">

            {/* Avatar */}
            <div
              className="btn btn-outline-primary fw-medium d-flex justify-content-center align-items-center rounded-circle text-black"
              style={{
                width: "34px",
                height: "34px",
                backgroundColor: "white",
                fontSize: "14px",
                color: "black"
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : user.role.charAt(0).toUpperCase()}
            </div>

            {/* Name */}
            <span
              className="fw-semibold"
              style={{
                fontSize: "24px"
              }}
            >
              {user.name}
            </span>
          </div>

          <button onClick={handleLogout} className="btn btn-outline-primary fw-medium">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="btn btn-outline-primary fw-medium">
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-primary fw-medium">
            Sign Up
          </Link>
        </>
      )}
    </div>
  </nav>
);
}

export default Navbar;