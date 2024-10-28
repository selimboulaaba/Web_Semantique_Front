import React, { useState, useEffect } from "react";
import { fetchGardens, addGarden, updateGarden, deleteGarden, assignMaterialToGarden } from "../../services/gardenService";
import axios from "axios"; // Adjust the import path as necessary

const Gardens = () => {
    const [gardens, setGardens] = useState([]);
    const [formData, setFormData] = useState({ name: "", size: "", location: "" });
    const [editIndex, setEditIndex] = useState(null);
    const [materials, setMaterials] = useState([]); // State for materials
    const [selectedMaterial, setSelectedMaterial] = useState(""); // State for selected material
    const [message, setMessage] = useState(""); // For displaying messages

    useEffect(() => {
        loadGardens();
        fetchMaterials(); // Fetch materials when component mounts
    }, []);

    const loadGardens = async () => {
        try {
            const data = await fetchGardens();
            setGardens(data);
        } catch (error) {
            setMessage("Error fetching gardens: " + error.message);
        }
    };

    const fetchMaterials = async () => {
        try {
            const response = await axios.get('http://localhost:9090/materiel');
            const materialsData = response.data.results.bindings.map(material => ({
                id: material.materiel.value,
                name: material.name.value,
            }));
            setMaterials(materialsData);
        } catch (error) {
            setMessage("Error fetching materials: " + error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editIndex !== null) {
                const uri = gardens[editIndex].id; // Get the URI from the selected garden
                await updateGarden(uri, formData);
                setMessage("Garden updated successfully!");
            } else {
                await addGarden(formData);
                setMessage("Garden added successfully!");
            }
            loadGardens(); // Refresh gardens list
            resetForm();
        } catch (error) {
            setMessage("Error saving garden: " + error.message);
        }
    };

    const handleAssignMaterial = async (gardenId) => {
        try {
            await assignMaterialToGarden(gardenId, selectedMaterial);
            setMessage(`Material assigned to garden successfully!`);
            loadGardens(); // Refresh gardens list
        } catch (error) {
            setMessage("Failed to assign material to garden: " + error.message);
        }
    };

    const handleEdit = (index) => {
        setFormData(gardens[index]);
        setEditIndex(index);
    };

    const handleDelete = async (uri) => {
        try {
            await deleteGarden(uri);
            setMessage("Garden deleted successfully!");
            loadGardens(); // Refresh gardens list
        } catch (error) {
            setMessage("Error deleting garden: " + error.message);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", size: "", location: "" });
        setEditIndex(null);
    };

    return (
        <div className="container mt-4">
            <h1>Gardens</h1>
            <button className="btn btn-primary mb-3" onClick={resetForm}>Reset Form</button>

            <form onSubmit={handleSubmit} className="mb-3">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="name"
                            placeholder="Garden Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            name="size"
                            placeholder="Size"
                            value={formData.size}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-success">
                            {editIndex !== null ? "Update Garden" : "Add Garden"}
                        </button>
                    </div>
                </div>
            </form>

            <div>
                <h2>Assign Material to Garden</h2>
                <select onChange={(e) => setSelectedMaterial(e.target.value)} value={selectedMaterial}>
                    <option value="">Select Material</option>
                    {materials.map((material) => (
                        <option key={material.id} value={material.id}>
                            {material.name}
                        </option>
                    ))}
                </select>

                <table className="table table-striped table-bordered">
                    <thead className="table-primary">
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Location</th>
                        <th>Materials</th> {/* Column header for materials */}
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gardens.map((garden, index) => (
                        <tr key={garden.id}>
                            <td>{garden.name}</td>
                            <td>{garden.size}</td>
                            <td>{garden.location}</td>
                            <td>{garden.materials}</td> {/* Display material names */}
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(garden.id)}>Delete</button>
                                <button className="btn btn-info" onClick={() => handleAssignMaterial(garden.id)}>Assign Material</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {message && <p>{message}</p>} {/* Display messages here */}
            </div>
        </div>
    );
};

export default Gardens;
