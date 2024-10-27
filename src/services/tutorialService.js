import axios from 'axios';

const API_URL = 'http://localhost:9090/quiz/tuto';

const fetchTutos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addTuto = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const deleteTuto = async (URI) => {
  await axios.delete(API_URL, {
    params: { URI }
  });
};

export { fetchTutos, addTuto, deleteTuto };
