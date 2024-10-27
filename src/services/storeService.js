import axios from 'axios';

const API_URL = 'http://localhost:9090/store';

const fetchStore = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addStore = async (storeData) => {
  const response = await axios.post(API_URL, storeData);
  return response.data;
};

const deleteStore = async (URI) => {
  await axios.delete(API_URL, {
    params: { URI }
  });
};

const searchStore = async (search) => {
  const response = await axios.get(`${API_URL}${search ? '/' + search : ''}`);
  return response.data;
};

export { fetchStore, addStore, deleteStore, searchStore };