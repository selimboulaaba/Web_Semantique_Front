import React, { useState, useEffect } from "react";
import { fetchSponsors, addSponsor, updateSponsor, deleteSponsor } from "../../services/sponsorService"; // Adjust the import path as necessary

const Sponsors = () => {
    const [sponsors, setSponsors] = useState([]);
    const [formData, setFormData] = useState({ name: "", industry: "", phone: "" });
    const [editIndex, setEditIndex] = useState(null);

    // Fetch sponsors from the server
    useEffect(() => {
        loadSponsors();
    }, []);

    const loadSponsors = async () => {
        try {
            const data = await fetchSponsors();
            setSponsors(data);
        } catch (error) {
            console.error("Error fetching sponsors:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            // Update existing sponsor
            const uri = sponsors[editIndex].id; // Get the URI from the selected sponsor
            try {
                await updateSponsor(uri, formData);
                loadSponsors(); // Refresh sponsors list
                resetForm();
            } catch (error) {
                console.error("Error updating sponsor:", error);
            }
        } else {
            // Add new sponsor
            try {
                await addSponsor(formData);
                loadSponsors(); // Refresh sponsors list
                resetForm();
            } catch (error) {
                console.error("Error adding sponsor:", error);
            }
        }
    };

    const handleEdit = (index) => {
        setFormData(sponsors[index]);
        setEditIndex(index);
    };

    const handleDelete = async (uri) => {
        try {
            await deleteSponsor(uri);
            loadSponsors(); // Refresh sponsors list
        } catch (error) {
            console.error("Error deleting sponsor:", error);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", industry: "", phone: "" });
        setEditIndex(null);
    };

    return (
        <div className="container mt-4">
            <h1>Sponsors</h1>
            <button className="btn btn-primary mb-3" onClick={resetForm}>Reset Form</button>

            <form onSubmit={handleSubmit} className="mb-3">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="name"
                            placeholder="Sponsor Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="industry"
                            placeholder="Industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-success">
                            {editIndex !== null ? "Update Sponsor" : "Add Sponsor"}
                        </button>
                    </div>
                </div>
            </form>

            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                <tr>
                    <th>Name</th>
                    <th>Industry</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sponsors.map((sponsor, index) => (
                    <tr key={sponsor.id}>
                        <td>{sponsor.name}</td>
                        <td>{sponsor.industry}</td>
                        <td>{sponsor.phone}</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(sponsor.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sponsors;
