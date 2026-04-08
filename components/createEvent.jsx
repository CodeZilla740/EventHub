import API from "../api/api";

const createEvent = async () => {
  try {
    const res = await API.post("/events/create", {
      title: "Hackathon",
      date: "2026-04-10",
      location: "Bangalore",
      image: "https://cdn.vectorstock.com/i/1000v/27/09/hackathon-round-icon-set-vector-28032709.jpg",
      registered: 87,
      total: 100,
    });

    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};