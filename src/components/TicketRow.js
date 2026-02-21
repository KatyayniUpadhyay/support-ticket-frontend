import { useNavigate } from "react-router-dom";

function TicketRow({ ticket }) {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{ticket.title}</td>
      <td>{ticket.description.slice(0, 60)}...</td>
      <td>{ticket.category}</td>
      <td>
        <span className={`badge badge-${ticket.priority}`}>
          {ticket.priority}
        </span>
      </td>
      <td>{ticket.status}</td>
      <td>
        <button
          className="primary-btn"
          onClick={() => navigate(`/edit/${ticket.id}`)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default TicketRow;