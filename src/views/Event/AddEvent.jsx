// src/components/AddEvent.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "../../services/eventService"; // Adjust the import path as necessary

const AddEvent = () => {
  const [formData, setFormData] = useState({ name: '', date: '', location: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent(formData);
      navigate('/'); // Redirect to the events page after adding the event
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
