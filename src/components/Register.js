import "../index.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length <= 7)
      setError("Password must be greater than 8 characters");
    else if (password !== confPass)
      setError("Password must match with Confirm Password");
    else {
      axios
        .post("https://swittersahul.herokuapp.com/", {
          username,
          email,
          password,
        })
        .then((res) => {
          navigate("/login");
          
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  };
  return (
    <div className="top-mar">
      {error && (
        <div class="container alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="form-group container md-1 " >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="form-control border-custom shadow-none"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            className="form-control border-custom shadow-none"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="form-control border-custom shadow-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Confirm Password"
            className="form-control border-custom shadow-none"
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
          />
          <br />
          <button className="btn button-clr justify-content-center">
            Sign Up
          </button>
        </form>
        <Link  className="small" to="/login"> already have an account? Login</Link>

      </div>
    </div>
  );
};

export default Register;
