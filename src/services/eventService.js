// src/services/eventService.js
import axios from 'axios';

const API_URL = 'http://localhost:9090/event'; // Adjust to your API endpoint

const fetchEvents = async () => {
  const response = await axios.get(API_URL);
  const bindings = response.data.results.bindings;

  const events = bindings.map(binding => ({
    id: binding.event.value,
    name: binding.name.value,
    date: binding.date.value,
    location: binding.location.value,
    sponsor: binding.sponsorName ? binding.sponsorName.value : "", // Add sponsor name
  }));

  return events;
};

// Other CRUD functions remain unchanged
const addEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const updateEvent = async (uri, eventData) => {
  const response = await axios.put(`${API_URL}`, eventData, {
    params: {
      URI: uri
    }
  });
  return response.data;
};

const deleteEvent = async (uri) => {
  await axios.delete(`${API_URL}`, {
    params: {
      URI: uri
    }
  });
};

// New method to assign sponsor
const assignSponsorToEvent = async (eventURI, sponsorURI) => {
  const response = await axios.post(`${API_URL}/assign-sponsor`, null, {
    params: {
      eventURI: eventURI,
      sponsorURI: sponsorURI
    }
  });
  return response.data;
};

export { fetchEvents, addEvent, updateEvent, deleteEvent, assignSponsorToEvent };
