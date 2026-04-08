import { useParams, useNavigate } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2>Event Details</h2>
      <p>Event ID: {id}</p>

      <button
        className="btn btn-primary"
        onClick={() => navigate(`/register/${id}`)}
      >
        Register Now
      </button>
    </div>
  );
}

export default EventDetails;