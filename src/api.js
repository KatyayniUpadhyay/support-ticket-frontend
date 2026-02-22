const BASE_URL = "http://localhost:8000/api";

export const getTickets = async (params = "") => {
  const res = await fetch(`${BASE_URL}/tickets/${params}`);
  return res.json();
};

export const createTicket = async (data) => {
  const res = await fetch(`${BASE_URL}/tickets/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateTicket = async (id, data) => {
  const res = await fetch(`${BASE_URL}/tickets/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const classifyTicket = async (description) => {
  const res = await fetch(`${BASE_URL}/tickets/classify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  return res.json();
};

export const getStats = async () => {
  const res = await fetch(`${BASE_URL}/tickets/stats/`);
  return res.json();
};