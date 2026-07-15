import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter Username and Password");
      return;
    }

    // Save login data
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username,
        loggedIn: true,
      })
    );

    alert("Login Successful!");

    navigate("/dashboard");
  }

  return (
    <div className="login-container">

      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>

      <p className="register-link">
        Not Registered?{" "}
        <Link to="/register">
          Register Here
        </Link>
      </p>

    </div>
  );
}

export default Login;