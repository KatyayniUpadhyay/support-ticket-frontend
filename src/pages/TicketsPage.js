import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TicketsPage() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const BASE_URL = "http://127.0.0.1:8000/api/tickets/";

  // 🔹 Debounce logic (1.5s)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1500);

    return () => clearTimeout(handler);
  }, [search]);

  // 🔹 Fetch tickets when filters/search change
  useEffect(() => {
    fetchTickets();
  }, [debouncedSearch, categoryFilter, priorityFilter, statusFilter]);

  const fetchTickets = async () => {
    try {
      let url = `${BASE_URL}?`;

      if (debouncedSearch.length > 3) {
        url += `search=${debouncedSearch}&`;
      }

      if (categoryFilter) {
        url += `category=${categoryFilter}&`;
      }

      if (priorityFilter) {
        url += `priority=${priorityFilter}&`;
      }

      if (statusFilter) {
        url += `status=${statusFilter}&`;
      }

      const response = await axios.get(url);
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Auto-progress status on row click
  const progressStatus = async (id) => {
    try {
      await axios.patch(`${BASE_URL}${id}/`);
      fetchTickets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* Top Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate("/create")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Ticket
        </button>

        <button
          onClick={() => navigate("/stats")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Stats
        </button>
      </div>

      {/* Search + Filters */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />

        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="billing">Billing</option>
          <option value="technical">Technical</option>
          <option value="account">Account</option>
          <option value="general">General</option>
        </select>

        <select onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Tickets Table */}
      <table
        width="100%"
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse" }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
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
            <tr
              key={ticket.id}
              style={{ cursor: "pointer" }}
              onClick={() => progressStatus(ticket.id)}
            >
              <td>{ticket.title}</td>
              <td>{ticket.description.slice(0, 50)}...</td>
              <td>{ticket.category}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{new Date(ticket.created_at).toLocaleString()}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${ticket.id}`);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div><h3>click on status to change ticket status</h3></div>
    </div>
  );
}

export default TicketsPage;