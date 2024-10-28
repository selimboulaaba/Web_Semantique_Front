// src/services/materielService.js
import axios from 'axios';

const API_URL = 'http://localhost:9090/materiel'; // Adjust to your API endpoint

const fetchMateriels = async () => {
    const response = await axios.get(API_URL);
    const bindings = response.data.results.bindings;

    // Transform the SPARQL response into a usable format
    const materiels = bindings.map(binding => ({
        id: binding.materiel.value,
        name: binding.name.value,
        type: binding.type.value,
        quantity: binding.quantity.value,
    }));

    return materiels;
};

const addMateriel = async (materielData) => {
    const response = await axios.post(API_URL, materielData);
    return response.data;
};

const updateMateriel = async (uri, materielData) => {
    const response = await axios.put(`${API_URL}`, materielData, {
        params: {
            URI: uri
        }
    });
    return response.data;
};

const deleteMateriel = async (uri) => {
    await axios.delete(`${API_URL}`, {
        params: {
            URI: uri
        }
    });
};

export { fetchMateriels, addMateriel, updateMateriel, deleteMateriel };
