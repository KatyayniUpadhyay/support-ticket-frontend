import { BrowserRouter, Routes, Route } from "react-router-dom";
import TicketsPage from "./pages/TicketsPage";
import TicketFormPage from "./pages/TicketFormPage";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketsPage />} />
        <Route path="/create" element={<TicketFormPage />} />
        <Route path="/edit/:id" element={<TicketFormPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;