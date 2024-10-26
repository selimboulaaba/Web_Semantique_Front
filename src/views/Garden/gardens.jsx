import React, { useState, useEffect } from "react";
import { fetchGardens, addGarden, updateGarden, deleteGarden } from "../../services/jardinService"; // Adjust the import path as necessary

const Events = () => {
    const [gardens, setGardens] = useState([]);
    const [formData, setFormData] = useState({ name: "", size: "", location: "" });
    const [editIndex, setEditIndex] = useState(null);

    // Fetch events from the server
    useEffect(() => {
        loadGardens();
    }, []);

    const loadGardens = async () => {
        try {
            const data = await fetchGardens();
            setGardens(data);
        } catch (error) {
            console.error("Error fetching garden:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add new event
            try {
                await addGarden(formData);
                await loadGardens(); // Refresh events list
                resetForm();
            } catch (error) {
                console.error("Error adding garden:", error);
            }
        };


    const handleDelete = async (id) => {
        try {
            await deleteGarden(id);
            await loadGardens(); // Refresh events list
        } catch (error) {
            console.error("Error deleting garden:", error);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", size: "", location: "" });
        setEditIndex(null);
    };

    return (
        <div className="container mt-4">
            <h1>Gardens</h1>

            <form  onSubmit={handleSubmit} className="mb-5 mt-5">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            id="name"
                            placeholder="garden Name"
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            id="size"
                            placeholder="garden size"
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="col">
                        <input
                            type="text"
                            id="location"
                            name="name"
                            placeholder="Event location"
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-success">
                            Add garden
                        </button>
                    </div>
                </div>
            </form>

            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Location</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {gardens.map((garden, index) => (
                    <tr key={garden.id}>
                        <td>{garden.name}</td>
                        <td>{garden.size}</td>
                        <td>{garden.location}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(garden.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Events;
