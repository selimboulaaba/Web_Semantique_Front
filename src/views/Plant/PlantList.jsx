import React, { useEffect, useState } from 'react'
import { deletePlant, fetchPlants } from '../../services/plantService'
import { useNavigate } from 'react-router-dom'

function PlantList() {

    const [Plants, setPlants] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        loadPlants();
    }, []);

    const loadPlants = async () => {
        try {
            const data = await fetchPlants();
            setPlants(data);
        } catch (error) {
            console.error("Error fetching Plants:", error);
        }
    };

    const handleCreate = () => {
        navigate("/Plant/add")
    }

    const handleDelete = async (uri) => {
        await deletePlant(uri)
        loadPlants();
    }

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between mt-5 mb-5'>
                <h1 className='ps-5'>Plant List</h1>
                <button className="me-5 w-25 btn btn-success mb-3" onClick={handleCreate}>Add Plant</button>
            </div>

            <table className="table table-hover table-bordered">
                <thead className="table-success text-center">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Water Needs</th>
                        <th>.</th>
                    </tr>
                </thead>
                <tbody>
                    {Plants.map((Plant, index) => (
                        <tr key={index}>
                            <td className='text-center align-middle'>{Plant.name}</td>
                            <td className='text-center align-middle'>{Plant.type}</td>
                            <td className='text-center align-middle'>{Plant.water_needs}</td>
                            <td className='text-center'>
                                <button className="btn btn-danger" onClick={() => handleDelete(Plant.uri)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlantList