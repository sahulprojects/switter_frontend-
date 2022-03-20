import "../index.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <a className="navbar-brand" href="#">
          Switter
        </a>
        <div>
          <Link to="/allposts" className="p-2 text-light navabar-item">
            All Post
          </Link>

          <Link to="/myposts" className="p-2 text-light navbar-item">
            My Post
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
