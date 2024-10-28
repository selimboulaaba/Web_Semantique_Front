import axios from 'axios';

const API_URL = 'http://localhost:9090/seed';

const fetchSeed = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addSeed = async (seedData) => {
  const response = await axios.post(API_URL, seedData);
  return response.data;
};

const deleteSeed = async (URI) => {
  await axios.delete(API_URL, {
    params: { URI }
  });
};

const addToStore = async (seedURI, storeURI) => {
  await axios.put(`${API_URL}?seedURI=${encodeURIComponent(seedURI)}&storeURI=${encodeURIComponent(storeURI)}`);
};



export { fetchSeed, addSeed, deleteSeed ,addToStore};