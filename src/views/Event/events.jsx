import React, { useState, useEffect } from "react";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "../../services/eventService"; // Adjust the import path as necessary

const Events = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ name: "", date: "", location: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Fetch events from the server
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing event
      try {
        await updateEvent(events[editIndex].id, formData);
        loadEvents(); // Refresh events list
        resetForm();
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      // Add new event
      try {
        await addEvent(formData);
        loadEvents(); // Refresh events list
        resetForm();
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };

  const handleEdit = (index) => {
    setFormData(events[index]);
    setEditIndex(index);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      loadEvents(); // Refresh events list
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", date: "", location: "" });
    setEditIndex(null);
  };

  return (
    <div className="container mt-4">
      <h1>Events</h1>
      <button className="btn btn-primary mb-3" onClick={resetForm}>Add Event</button>

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

      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
