import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";

import PrivateRoute from "./PrivateRoute";
import { Home } from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      {/* <Provider store={store}> */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
        {/* </Provider> */}
      </Routes>
    </Router>
  );
};

export default App;
