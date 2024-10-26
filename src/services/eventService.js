// src/services/eventService.js

import axios from 'axios';

const API_URL = 'http://your-api-url/events'; // Update with your API endpoint

const fetchEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${API_URL}/${id}`, eventData);
  return response.data;
};

const deleteEvent = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export { fetchEvents, addEvent, updateEvent, deleteEvent };
