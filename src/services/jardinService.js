// src/services/eventService.js

import axios from 'axios';

const API_URL = 'http://your-api-url/events'; // Update with your API endpoint

const fetchGardens = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const addGarden = async (eventData) => {
    const response = await axios.post(API_URL, eventData);
    return response.data;
};

const updateGarden = async (id, eventData) => {
    const response = await axios.put(`${API_URL}/${id}`, eventData);
    return response.data;
};

const deleteGarden = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export { fetchGardens, addGarden, updateGarden, deleteGarden };
