import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
