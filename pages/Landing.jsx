import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleHostEvent = () => {
    const token = localStorage.getItem("token");
    if(token) {
        navigate("/create");
    } else {
        navigate("/login");
    }
  };

  const events = [
        {
            id: 1,
            title: "Tech Conference 2026",
            location: "Bangalore • April 2026",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        },
        {
            id: 2,
            title: "Music Festival",
            location: "Mumbai • May 2026",
            image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
        },
        {
            id: 3,
            title: "Startup Meetup",
            location: "Delhi • June 2026",
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786"
        }
    ];          

  return (
    <div>
      <div className="container py-5">
            <div className="row align-items-center">

                <div className="col-md-6">
                    <h1 className="display-4 fw-bold mb-3">
                        Discover & Manage Events Effortlessly
                    </h1>

                    <p className="lead text-muted mb-4">
                        Find events, register instantly, and manage everything in one place.
                    </p>

                    <button
                        className="btn btn-primary btn-lg me-3"
                        onClick={() => navigate("/home")}
                    >
                        Get Started
                    </button>

                    <button
                        className="btn btn-outline-secondary btn-lg"
                        onClick={handleHostEvent}
                    >
                        Host an Event
                    </button>
                </div>

                <div className="col-md-6 text-center">
                <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                    alt="Events"
                    className="img-fluid rounded"
                />
                </div>

            </div>
        </div>

        <div className="bg-light py-5">
        <div className="container text-center">
            <div className="row">

            <div className="col-md-4">
                <h1 className="fw-bold text-primary">500+</h1>
                <p className="text-muted">Events Hosted</p>
            </div>

            <div className="col-md-4">
                <h1 className="fw-bold text-primary">10K+</h1>
                <p className="text-muted">Users Registered</p>
            </div>

            <div className="col-md-4">
                <h1 className="fw-bold text-primary">50+</h1>
                <p className="text-muted">Cities Covered</p>
            </div>

            </div>
        </div>
        </div>

        <div className="container py-5">
    <h2 className="text-center fw-bold mb-4">Featured Events</h2>

    <div className="container">
  <div className="row g-4 justify-content-center">
    
    {events.map((event) => (
      <div className="col-md-4 d-flex" key={event.id}>
        
        <div className="card shadow-sm w-100 h-100">
          
          <img
            src={event.image}
            className="card-img-top"
            alt="event"
            style={{ height: "200px", objectFit: "cover" }}
          />

          <div className="card-body d-flex flex-column">
            
            <h5 className="card-title">{event.title}</h5>
            <p className="text-muted">{event.location}</p>

            <button className="btn btn-primary w-100 mt-auto" onClick={() => navigate("/home")}>
              Register 
            </button>

          </div>
        </div>

      </div>
    ))}

  </div>
</div>
    </div>




        <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">What Users Say</h2>

        <div className="row g-4">
            <div className="col-md-4">
            <div className="p-4 border rounded">
                <p>"Amazing platform! Very easy to register for events."</p>
                <h6 className="mt-3 fw-bold">— Rahul</h6>
            </div>
            </div>

            <div className="col-md-4">
            <div className="p-4 border rounded">
                <p>"Managing events has never been this simple."</p>
                <h6 className="mt-3 fw-bold">— Sneha</h6>
            </div>
            </div>

            <div className="col-md-4">
            <div className="p-4 border rounded">
                <p>"Clean UI and smooth experience."</p>
                <h6 className="mt-3 fw-bold">— Arjun</h6>
            </div>
            </div>
        </div>
        </div>

        <div className="bg-primary text-white text-center py-5">
        <h2 className="fw-bold">Stay Updated</h2>
        <p>Get notified about upcoming events</p>

        <div className="d-flex justify-content-center mt-3">
            <input
            type="email"
            placeholder="Enter your email"
            className="form-control w-25 me-2"
            />
            <button className="btn btn-light">Subscribe</button>
        </div>
        </div>

      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-1">© 2026 EventHub</p>
        <small>Built with React & Bootstrap</small>
        </footer>

    </div>
  );
}

export default Landing;