import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/EventHubHome";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/createEvent";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Events from "./components/Events";
import "./styles/theme.css";
import EventHubHome from "./pages/EventHubHome";
import EventAnalytics from "./pages/EventAnalytics";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/event-analytics/:id" element={<EventAnalytics />} />

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><EventHubHome /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />

        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;