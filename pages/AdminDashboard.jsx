import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

function AdminDashboard() {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventStats, setEventStats] = useState({});
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});

  const data = {
    labels: ["Users", "Events", "Registrations"],
    datasets: [
      {
        label: "Platform Statistics",
        data: [
          stats.users || 0,
          stats.events || 0,
          stats.registrations || 0
        ],
        backgroundColor: [
          "rgba(99,102,241,0.8)",
          "rgba(34,197,94,0.8)",
          "rgba(245,158,11,0.8)"
        ],
        borderRadius: 10,
        barThickness: 50
      }
    ]
  };


  useEffect(() => {

    fetch("http://localhost:3000/events/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setEvents(data));

    fetch("http://localhost:3000/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch("http://localhost:3000/admin/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setStats(data));

  }, []);

  const deleteEvent = async (id) => {

    await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setEvents(events.filter(event => event._id !== id));
  };

  const approveEvent = async (id) => {

    await fetch(`http://localhost:3000/events/approve/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setEvents(events.map(event =>
      event._id === id ? { ...event, status: "approved" } : event
    ));
  };

  const rejectEvent = async (id) => {

    await fetch(`http://localhost:3000/events/reject/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setEvents(events.map(event =>
      event._id === id ? { ...event, status: "rejected" } : event
    ));
  };

  return (

<div className="container-fluid p-4 bg-light">
<h1 className="mb-4 fw-bold">Admin Dashboard</h1>

{/* STAT CARDS */}

<div className="row g-4 mb-5">

<div className="col-md-4">
<div className="card shadow-sm border-0">
<div className="card-body text-center">
<h6 className="text-muted">Total Users</h6>
<h2 className="fw-bold">{stats.users || 0}</h2>
</div>
</div>
</div>

<div className="col-md-4">
<div className="card shadow-sm border-0">
<div className="card-body text-center">
<h6 className="text-muted">Total Events</h6>
<h2 className="fw-bold">{stats.events || 0}</h2>
</div>
</div>
</div>

<div className="col-md-4">
<div className="card shadow-sm border-0">
<div className="card-body text-center">
<h6 className="text-muted">Registrations</h6>
<h2 className="fw-bold">{stats.registrations || 0}</h2>
</div>
</div>
</div>

</div>

{/* PLATFORM CHART */}

<div className="card shadow-sm border-0 mb-5">
<div className="card-body">
<h5 className="mb-4">Platform Overview</h5>

<div style={{ maxWidth: "700px", margin: "auto" }}>
<Bar data={data} />
</div>

</div>
</div>

{/* EVENTS TABLE */}

<div className="card shadow-sm border-0 mb-5">
<div className="card-body">

<h4 className="mb-3">All Events</h4>

<table className="table table-hover align-middle">

<thead className="table-light">
<tr>
<th>Title</th>
<th>Description</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{events.map(event => (

<>

<tr key={event._id}>

<td>{event.title}</td>
<td>{event.description}</td>

<td>
<span className={`badge 
${event.status==="approved"?"bg-success":
event.status==="rejected"?"bg-danger":"bg-warning"}`}>
{event.status}
</span>
</td>

<td>

<div className="d-flex gap-2">

<button
className="btn btn-sm btn-success"
onClick={() => approveEvent(event._id)}
>
Approve
</button>

<button
className="btn btn-sm btn-warning"
onClick={() => rejectEvent(event._id)}
>
Reject
</button>

<button
className="btn btn-sm btn-danger"
onClick={() => deleteEvent(event._id)}
>
Delete
</button>

</div>

</td>

</tr>

{selectedEvent === event._id && (

<tr>
<td colSpan="4">

<div className="card mt-3 shadow-sm">
<div className="card-body">

<h5>{event.title} Analytics</h5>

<div style={{ maxWidth: "500px", margin: "auto" }}>
<Bar data={analyticsData} />
</div>

<p className="mt-3">
Registrations: {eventStats.registrations} / {eventStats.capacity}
</p>

</div>
</div>

</td>
</tr>

)}

</>

))}

</tbody>

</table>

</div>
</div>

{/* USERS TABLE */}

<div className="card shadow-sm border-0">

<div className="card-body">

<h4 className="mb-3">All Users</h4>

<table className="table table-striped">

<thead className="table-light">
<tr>
<th>Name</th>
<th>Email</th>
<th>Role</th>
</tr>
</thead>

<tbody>

{users.map(user => (

<tr key={user._id}>
<td>{user.name}</td>
<td>{user.email}</td>
<td>
<span className="badge bg-primary">
{user.role}
</span>
</td>
</tr>

))}

</tbody>

</table>

</div>
</div>

</div>
  );
}

export default AdminDashboard;

