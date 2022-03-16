import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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
        .post("http://127.0.0.1:5000", {
          username,
          email,
          password,
        })
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          setError(err.response.data);
          console.log(err.response.data);
        });
    }
  };
  return (
    <div>
      <h1> Resgiter Page</h1>
      {error && <h2>{error}</h2>}
      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p> Email</p>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Confirm Password</p>
        <input
          type="password"
          required
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}
        />
        <br />
        <button>Sign Up</button>
      </form>
      <button onClick={() => navigate("/login")}>take me to login</button>
    </div>
  );
};

export default Register;
