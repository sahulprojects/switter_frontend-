import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
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
        localStorage.setItem("AccessToken", AccessToken);
        navigate('/allposts')
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };
  return (
    <div className="top-mar">
      {error && (
        <div class="container alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form className="form-group container md-1" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          className="form-control border-custom"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="password"
          className="form-control border-custom"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn button-clr justify-content-center">Login</button>
      </form>
    </div>
  );
};

export default Login;
