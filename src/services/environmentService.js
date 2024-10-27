import axios from 'axios';

const API_URL = 'http://localhost:9090/environment';

const fetchEnvironments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addEnvironment = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const deleteEnvironment = async (uri) => {
  await axios.delete(API_URL, { params: { URI: uri } });
};

export { fetchEnvironments, addEnvironment, deleteEnvironment };