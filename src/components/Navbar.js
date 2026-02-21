import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: "#1f2937",
      padding: "16px 40px",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2 style={{ margin: 0 }}>Support Ticket System</h2>

      <div>
        <button className="primary-btn" onClick={() => navigate("/")}>
          Tickets
        </button>
        <button
          className="secondary-btn"
          style={{ marginLeft: 10 }}
          onClick={() => navigate("/stats")}
        >
          Stats
        </button>
      </div>
    </div>
  );
}

export default Navbar;