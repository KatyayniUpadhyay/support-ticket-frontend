import TicketRow from "./TicketRow";

function TicketTable({ tickets }) {
  return (
    <table className="table card">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Category</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </tbody>
    </table>
  );
}

export default TicketTable;