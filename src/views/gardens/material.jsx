import React, { useState, useEffect } from "react";
import { fetchMateriels, addMateriel, updateMateriel, deleteMateriel } from "../../services/materielService"; // Adjust the import path as necessary

const Materiels = () => {
    const [materiels, setMateriels] = useState([]);
    const [formData, setFormData] = useState({ name: "", type: "", quantity: "" });
    const [editIndex, setEditIndex] = useState(null);

    // Fetch materiels from the server
    useEffect(() => {
        loadMateriels();
    }, []);

    const loadMateriels = async () => {
        try {
            const data = await fetchMateriels();
            setMateriels(data);
        } catch (error) {
            console.error("Error fetching materiels:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            // Update existing materiel
            const uri = materiels[editIndex].id; // Get the URI from the selected materiel
            try {
                await updateMateriel(uri, formData);
                loadMateriels(); // Refresh materiels list
                resetForm();
            } catch (error) {
                console.error("Error updating materiel:", error);
            }
        } else {
            // Add new materiel
            try {
                await addMateriel(formData);
                loadMateriels(); // Refresh materiels list
                resetForm();
            } catch (error) {
                console.error("Error adding materiel:", error);
            }
        }
    };

    const handleEdit = (index) => {
        setFormData(materiels[index]);
        setEditIndex(index);
    };

    const handleDelete = async (uri) => {
        try {
            await deleteMateriel(uri);
            loadMateriels(); // Refresh materiels list
        } catch (error) {
            console.error("Error deleting materiel:", error);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", type: "", quantity: "" });
        setEditIndex(null);
    };

    return (
        <div className="container mt-4">
            <h1>Materiels</h1>
            <button className="btn btn-primary mb-3" onClick={resetForm}>Reset Form</button>

            <form onSubmit={handleSubmit} className="mb-3">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="name"
                            placeholder="Materiel Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="type"
                            placeholder="Type"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-success">
                            {editIndex !== null ? "Update Materiel" : "Add Materiel"}
                        </button>
                    </div>
                </div>
            </form>

            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {materiels.map((materiel, index) => (
                    <tr key={materiel.id}>
                        <td>{materiel.name}</td>
                        <td>{materiel.type}</td>
                        <td>{materiel.quantity}</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(materiel.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Materiels;
