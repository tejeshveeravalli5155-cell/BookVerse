import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setLoginSuccess(false);

    // Required Validation
    if (!email || !password) {
      setError("Please enter Email and Password.");
      return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid Email.");
      return;
    }

    // Loading
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Dummy Credentials
      if (
        email === "admin@bookverse.com" &&
        password === "Admin@123"
      ) {
        localStorage.setItem("isLoggedIn", "true");

        setLoginSuccess(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);

      } else {
        setError("Invalid Email or Password.");
      }

    }, 3000);
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setError("");
    setLoginSuccess(false);
  };

  return (
    <div className="login-container">

      <h1>BookVerse Login</h1>

      <form onSubmit={handleLogin}>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="show-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>

        {/* Loading */}
        {loading ? (
          <button type="button" disabled>
            Loading...
          </button>
        ) : (
          <button type="submit">
            Login
          </button>
        )}

        <button
          type="button"
          onClick={handleReset}
        >
          Clear
        </button>

        <p className="forgot">
          <a href="#">Forgot Password?</a>
        </p>

        <p className="register-link">
          New User? <Link to="/register">Register</Link>
        </p>

      </form>

      {/* Error */}
      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {/* Success */}
      {loginSuccess && (
        <h2 className="success">
          🎉 Login Successful! Redirecting...
        </h2>
      )}

    </div>
  );
}

export default Login;