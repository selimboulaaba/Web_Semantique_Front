// src/services/sponsorService.js
import axios from 'axios';

const API_URL = 'http://localhost:9090/sponsor'; // Adjust to your API endpoint

const fetchSponsors = async () => {
    const response = await axios.get(API_URL);
    const bindings = response.data.results.bindings;

    // Transform the SPARQL response into a usable format
    const sponsors = bindings.map(binding => ({
        id: binding.sponsor.value,
        name: binding.name.value,
        industry: binding.industry.value,
        phone: binding.phone.value,
    }));

    return sponsors;
};

const addSponsor = async (sponsorData) => {
    const response = await axios.post(API_URL, sponsorData);
    return response.data;
};

const updateSponsor = async (uri, sponsorData) => {
    const response = await axios.put(`${API_URL}`, sponsorData, {
        params: {
            URI: uri
        }
    });
    return response.data;
};

const deleteSponsor = async (uri) => {
    await axios.delete(`${API_URL}`, {
        params: {
            URI: uri
        }
    });
};

export { fetchSponsors, addSponsor, updateSponsor, deleteSponsor };
