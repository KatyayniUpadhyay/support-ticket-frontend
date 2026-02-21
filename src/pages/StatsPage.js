import { useEffect, useState } from "react";
import { getStats } from "../api";
import { useNavigate } from "react-router-dom";

function StatsPage() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>

      <h2>Stats</h2>

      <p>Total Tickets: {stats.total_tickets}</p>
      <p>Open Tickets: {stats.open_tickets}</p>
      <p>Avg Tickets Per Day: {stats.avg_tickets_per_day}</p>

      <h3>Priority Breakdown</h3>
      {Object.entries(stats.priority_breakdown).map(([k, v]) => (
        <p key={k}>{k}: {v}</p>
      ))}

      <h3>Category Breakdown</h3>
      {Object.entries(stats.category_breakdown).map(([k, v]) => (
        <p key={k}>{k}: {v}</p>
      ))}
    </div>
  );
}

export default StatsPage;