import { useEffect, useState } from "react";
import { createTicket, updateTicket, classifyTicket, getTickets } from "../api";
import { useNavigate, useParams } from "react-router-dom";

function TicketFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [preprocessed, setPreprocessed] = useState(false);

  const isEdit = !!id;

  useEffect(() => {
  if (isEdit) {
    getTickets().then((data) => {
      const ticket = data.find((t) => t.id === parseInt(id));
      if (ticket) {
        setTitle(ticket.title);
        setDescription(ticket.description);
        setCategory(ticket.category);
        setPriority(ticket.priority);
        setPreprocessed(true);
      }
    });
  }
}, [id, isEdit]);

  const handlePreprocess = async () => {
    setLoading(true);
    try {
      const result = await classifyTicket(description);
      if (result.suggested_category)
        setCategory(result.suggested_category);
      if (result.suggested_priority)
        setPriority(result.suggested_priority);
    } catch (err) {}
    setPreprocessed(true);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!title || !description || !category || !priority) {
      alert("All fields required.");
      return;
    }

    const payload = { title, description, category, priority };

    if (isEdit) {
      await updateTicket(id, payload);
    } else {
      await createTicket(payload);
    }

    navigate("/");
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Ticket" : "Create Ticket"}</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />

      <input
        placeholder="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />
      <br />

      {!preprocessed ? (
        <button onClick={handlePreprocess}>
          {loading ? "Loading..." : "Preprocess Ticket"}
        </button>
      ) : (
        <button onClick={handleSubmit}>Save</button>
      )}
    </div>
  );
}

export default TicketFormPage;