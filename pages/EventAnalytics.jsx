import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";

function EventAnalytics() {

  const { id } = useParams();
  const [stats, setStats] = useState({});

  useEffect(() => {

    fetch(`http://localhost:3000/admin/event-stats/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setStats(data));

  }, [id]);

  const data = {
    labels: ["Registered", "Remaining Seats"],
    datasets: [
      {
        label: stats.title,
        data: [
          stats.registrations || 0,
          (stats.capacity || 0) - (stats.registrations || 0)
        ],
        backgroundColor: ["#6366f1", "#e5e7eb"]
      }
    ]
  };

  return (
    <div className="container p-4">

      <h2 className="mb-4">{stats.title} Analytics</h2>

      <Bar data={data} />

    </div>
  );
}

export default EventAnalytics;