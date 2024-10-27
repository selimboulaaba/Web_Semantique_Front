import axios from 'axios';

const API_URL = 'http://localhost:9090/garden'; // Adjust to your API endpoint

const fetchGardens = async () => {
  const response = await axios.get(API_URL);
  const bindings = response.data.results.bindings;

  // Transform the SPARQL response into a usable format
  const gardens = bindings.map(binding => ({
    id: binding.garden.value,
    name: binding.name.value,
    size: binding.size.value,
    location: binding.location.value,
    materials: binding.materialName ? binding.materialName.value : 'No materials assigned' // Get material name or default message
  }));

  return gardens;
};


const addGarden = async (gardenData) => {
  const response = await axios.post(API_URL, gardenData);
  return response.data;
};

const updateGarden = async (uri, gardenData) => {
  const response = await axios.put(`${API_URL}`, gardenData, {
    params: {
      URI: uri,
    },
  });
  return response.data;
};

const deleteGarden = async (uri) => {
  await axios.delete(`${API_URL}`, {
    params: {
      URI: uri,
    },
  });
};

// New function to assign a material to a garden
const assignMaterialToGarden = async (gardenURI, materialURI) => {
  const response = await axios.post(`${API_URL}/assign-material`, null, {
    params: {
      gardenURI,
      materialURI,
    },
  });
  return response.data;
};

// New function to fetch gardens with their materials
const getGardensWithMaterials = async () => {
  const response = await axios.get(`${API_URL}/with-materials`);
  const bindings = response.data.results.bindings;

  const gardensWithMaterials = bindings.map(binding => ({
    gardenId: binding.garden.value,
    gardenName: binding.gardenName.value,
    materials: binding.materials ? binding.materials.value.split(',') : [],
  }));

  return gardensWithMaterials;
};

export { fetchGardens, addGarden, updateGarden, deleteGarden, assignMaterialToGarden, getGardensWithMaterials };
