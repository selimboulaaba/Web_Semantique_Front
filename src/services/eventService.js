// src/services/eventService.js
import axios from 'axios';

const API_URL = 'http://localhost:9090/event'; // Adjust to your API endpoint

const fetchEvents = async () => {
  const response = await axios.get(API_URL);
  const bindings = response.data.results.bindings;

  // Transform the SPARQL response into a usable format
  const events = bindings.map(binding => ({
    id: binding.event.value,
    name: binding.name.value,
    date: binding.date.value,
    location: binding.location.value,
  }));

  return events;
};

// Other CRUD functions remain unchanged
const addEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${API_URL}/${id}`, eventData);
  return response.data;
};


// Modify deleteEvent to use URI query parameter
const deleteEvent = async (uri) => {
  await axios.delete(`${API_URL}`, {
    params: {
      URI: uri
    }
  });
};
export { fetchEvents, addEvent, updateEvent, deleteEvent };
