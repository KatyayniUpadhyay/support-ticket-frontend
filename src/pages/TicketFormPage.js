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
      if (result.suggested_category) setCategory(result.suggested_category);
      if (result.suggested_priority) setPriority(result.suggested_priority);
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

  // --- Inline Styles ---
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "80px auto",
      padding: "40px",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      letterSpacing: "0.5px",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "300",
      marginBottom: "40px",
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: "4px",
    },
    inputGroup: {
      marginBottom: "24px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      outline: "none",
      transition: "border 0.3s ease",
    },
    textarea: {
      width: "100%",
      height: "150px",
      padding: "12px 16px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      outline: "none",
      fontFamily: "inherit",
      resize: "vertical",
    },
    button: {
      width: "100%",
      padding: "16px",
      fontSize: "0.9rem",
      fontWeight: "600",
      letterSpacing: "2px",
      textTransform: "uppercase",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "20px",
      transition: "opacity 0.2s ease",
    },
    label: {
      display: "block",
      fontSize: "0.75rem",
      fontWeight: "600",
      marginBottom: "8px",
      textTransform: "uppercase",
      color: "#666",
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{isEdit ? "Edit Ticket" : "New Ticket"}</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Title</label>
        <input
          style={styles.input}
          placeholder="What is the issue?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          style={styles.textarea}
          placeholder="Provide more details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Category</label>
        <input
          style={styles.input}
          placeholder="e.g. Technical, Billing"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isEdit}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Priority</label>
        <input
          style={styles.input}
          placeholder="e.g. High, Medium, Low"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isEdit}
        />
      </div>

      {!preprocessed ? (
        <button
          style={styles.button}
          onClick={handlePreprocess}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze & Preprocess"}
        </button>
      ) : (
        <button style={styles.button} onClick={handleSubmit}>
          Save Ticket
        </button>
      )}
    </div>
  );
}

export default TicketFormPage;