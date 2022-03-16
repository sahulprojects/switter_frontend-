import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/login", {
        username,
        password,
      })
      .then((res) => {
        const AccessToken = res.data.AccessToken;
        console.log(AccessToken);
        sessionStorage.setItem("AccessToken", AccessToken);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <div>
      <h1> Login Page</h1>
      {error && <h2>{error}</h2>}
      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>Password</p>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
