import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteEnvironment, fetchEnvironments } from '../../services/environmentService'


function EnvironmentList() {

    const [Environments, setEnvironments] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        loadEnvironments();
    }, []);

    const loadEnvironments = async () => {
        try {
            const data = await fetchEnvironments();
            setEnvironments(data);
        } catch (error) {
            console.error("Error fetching Environments:", error);
        }
    };

    const handleCreate = () => {
        navigate("/Environment/add")
    }

    const handleDelete = async (uri) => {
        await deleteEnvironment(uri)
        loadEnvironments()
    }

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between mt-5 mb-5'>
                <h1 className='ps-5'>Environment List</h1>
                <button className="me-5 w-25 btn btn-success mb-3" onClick={handleCreate}>Add Environment</button>
            </div>

            <table className="table table-hover table-bordered">
                <thead className="table-success text-center">
                    <tr>
                        <th>Light Conditions</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        <th>.</th>
                    </tr>
                </thead>
                <tbody>
                    {Environments.map((Environment, index) => (
                        <tr key={index}>
                            <td className='text-center align-middle'>{Environment.light_conditions}</td>
                            <td className='text-center align-middle'>{Environment.temperature}</td>
                            <td className='text-center align-middle'>{Environment.humidity}</td>
                            <td className='text-center'>
                                <button className="btn btn-danger" onClick={() => handleDelete(Environment.uri)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EnvironmentList