import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Navbar from "./components/navabar";
import CreatePost from "./components/createpost";
import MyPost from "./components/mypost";
import UpdatePost from "./components/updatepost";
import AllPost from "./components/allpost";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createPost" element={<CreatePost />} />
          <Route exact path="/myposts" element={<MyPost />} />
          <Route exact path="/updatemypost" element={<UpdatePost />} />
          <Route exact path="/allposts" element={<AllPost />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
