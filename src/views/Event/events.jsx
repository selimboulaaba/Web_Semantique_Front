import React, { useState, useEffect } from "react";
import { fetchEvents, addEvent, updateEvent, deleteEvent, assignSponsorToEvent } from "../../services/eventService"; // Adjust the import path as necessary
import axios from "axios"; // Adjust the import path as necessary

const Events = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ name: "", date: "", location: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [sponsors, setSponsors] = useState([]); // State for sponsors
  const [selectedSponsor, setSelectedSponsor] = useState(""); // State for selected sponsor
  const [message, setMessage] = useState(""); // For displaying messages

  useEffect(() => {
    loadEvents();
    fetchSponsors(); // Fetch sponsors when component mounts
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      setMessage("Error fetching events: " + error.message);
    }
  };

  const fetchSponsors = async () => {
    try {
      const response = await axios.get('http://localhost:9090/sponsor'); // Adjust to your sponsors API endpoint
      const sponsorsData = response.data.results.bindings.map(sponsor => ({
        id: sponsor.sponsor.value,
        name: sponsor.name.value,
      }));
      setSponsors(sponsorsData);
    } catch (error) {
      setMessage("Error fetching sponsors: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        const uri = events[editIndex].id; // Get the URI from the selected event
        await updateEvent(uri, formData);
        setMessage("Event updated successfully!");
      } else {
        await addEvent(formData);
        setMessage("Event added successfully!");
      }
      loadEvents(); // Refresh events list
      resetForm();
    } catch (error) {
      setMessage("Error saving event: " + error.message);
    }
  };

  const handleAssignSponsor = async (eventId) => {
    try {
      await assignSponsorToEvent(eventId, selectedSponsor);
      setMessage(`Sponsor assigned to event successfully!`);
      loadEvents(); // Refresh events list
    } catch (error) {
      setMessage("Failed to assign sponsor to event: " + error.message);
    }
  };

  const handleEdit = (index) => {
    setFormData(events[index]);
    setEditIndex(index);
  };

  const handleDelete = async (uri) => {
    try {
      await deleteEvent(uri);
      setMessage("Event deleted successfully!");
      loadEvents(); // Refresh events list
    } catch (error) {
      setMessage("Error deleting event: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", date: "", location: "" });
    setEditIndex(null);
  };

  return (
      <div className="container mt-4">
        <h1>Events</h1>
        <button className="btn btn-primary mb-3" onClick={resetForm}>Reset Form</button>

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="row">
            <div className="col">
              <input
                  type="text"
                  name="name"
                  placeholder="Event Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-control"
              />
            </div>
            <div className="col">
              <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="form-control"
              />
            </div>
            <div className="col">
              <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="form-control"
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-success">
                {editIndex !== null ? "Update Event" : "Add Event"}
              </button>
            </div>
          </div>
        </form>

        <div>
          <h2>Assign Sponsor to Event</h2>
          <select onChange={(e) => setSelectedSponsor(e.target.value)} value={selectedSponsor}>
            <option value="">Select Sponsor</option>
            {sponsors.map((sponsor) => (
                <option key={sponsor.id} value={sponsor.id}>
                  {sponsor.name}
                </option>
            ))}
          </select>

          <table className="table table-striped table-bordered">
            <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Sponsor</th> {/* Column header for sponsors */}
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {events.map((event, index) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>{event.sponsor || "N/A"}</td> {/* Display sponsor name */}
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(event.id)}>Delete</button>
                    <button className="btn btn-info" onClick={() => handleAssignSponsor(event.id)}>Assign Sponsor</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
          {message && <p>{message}</p>} {/* Display messages here */}
        </div>
      </div>
  );
};

export default Events;
