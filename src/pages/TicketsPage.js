import { useEffect, useState } from "react";
import { getTickets } from "../api";
import { useNavigate } from "react-router-dom";

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const fetchTickets = async () => {
    const data = await getTickets();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/create")}>Create</button>
        <button onClick={() => navigate("/stats")}>Stats</button>
      </div>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Timestamp</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.description.slice(0, 50)}...</td>
              <td>{ticket.category}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{ticket.created_at}</td>
              <td>
                <button onClick={() => navigate(`/edit/${ticket.id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketsPage;