import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (confirm("Are you sure?") == true) {
      localStorage.removeItem("email");
      navigate("/login");
    } else {
      alert("You Canceled");
    }
  };

  return (
    <div className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
      <Link to="/gallery">Gallery</Link>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default Navbar;
