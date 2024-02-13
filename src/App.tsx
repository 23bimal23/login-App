import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";

import PrivateRoute from "./PrivateRoute";
import { Home } from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
