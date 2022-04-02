import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://swittersahul.herokuapp.com/login", {
        username,
        password,
      })
      .then((res) => {
        const AccessToken = res.data.AccessToken;
        localStorage.setItem("AccessToken", AccessToken);
        navigate("/allposts");
      })
      .catch((err) => {
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
      <div className="form-group container md-1 ">
        <form  onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="form-control border-custom shadow-none"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="password"
            className="form-control shadow-none border-custom"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn button-clr justify-content-center">
            Login
          </button>
        </form>
        <Link className=" d-inline small" to="/register">
          Not have an account? Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
