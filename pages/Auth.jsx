import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("user", "loggedIn");

    navigate("/home");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">
          {isLogin ? "Login" : "Sign Up"}
        </h3>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              className="form-control mb-2"
              placeholder="Name"
              required
            />
          )}

          <input
            className="form-control mb-2"
            placeholder="Email"
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            required
          />

          <button className="btn btn-primary w-100">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p
          className="text-center mt-3 text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Auth;