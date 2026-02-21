function TicketForm({
  title, setTitle,
  description, setDescription,
  category, setCategory,
  priority, setPriority,
  onPreprocess,
  onSave,
  loading,
  preprocessed
}) {
  return (
    <div className="card">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 15 }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: 12, height: 100, marginBottom: 15 }}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 15 }}
      />

      <input
        placeholder="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 15 }}
      />

      {!preprocessed ? (
        <button className="secondary-btn" onClick={onPreprocess}>
          {loading ? "Loading..." : "Preprocess Ticket"}
        </button>
      ) : (
        <button className="primary-btn" onClick={onSave}>
          Save Ticket
        </button>
      )}
    </div>
  );
}

export default TicketForm;