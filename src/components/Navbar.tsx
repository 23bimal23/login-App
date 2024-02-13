import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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
      <div className="top-menu">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/gallery">Gallery</Link>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
      <div className="cart-botton">
      <AddShoppingCartIcon color="secondary" fontSize="small"/>
      <span className="cart-quantity">
        3
      </span>
      </div>
    </div>
  );
};

export default Navbar;
