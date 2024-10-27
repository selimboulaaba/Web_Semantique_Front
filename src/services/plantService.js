import axios from 'axios';

const API_URL = 'http://localhost:9090/plant';

const fetchPlants = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addPlant = async (plantData) => {
  const response = await axios.post(API_URL, plantData);
  return response.data;
};

const deletePlant = async (uri) => {
  await axios.delete(API_URL, { params: { URI: uri } });
};

export { fetchPlants, addPlant, deletePlant };