import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="header_container">
      <div className="header_logo">
        <h2>TheGivingTree</h2>
      </div>
      <div className="header_links">
        <button onClick={() => navigate("/")}>X-Mas Gifts</button>
        <button onClick={() => navigate("/cevents")}>X-Mas Events</button>
      </div>
    </div>
  );
};

export default Navbar;
