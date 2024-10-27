import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteTuto, fetchTutos } from '../../services/tutorialService';

function TutorialList() {
    
    const [tutos, setTutos] = useState([])
    const navigate = useNavigate();
    const [selectedTuto, setSelectedTuto] = useState(null);

    useEffect(() => {
        loadTutos();
    }, []);

    const loadTutos = async () => {
        try {
            const data = await fetchTutos();
            setTutos(data);
        } catch (error) {
            console.error("Error fetching tutos:", error);
        }
    };

    const handleCreate = () => {
        navigate("/tuto/add")
    }

    const handleDelete = (id) => {
        deleteTuto(id)
        .then(() => {
            loadTutos();
        })
    }

  return (
    <div className="container mt-4">
            <div className='d-flex justify-content-between mt-5 mb-5'>
                <h1 className='ps-5'>Tutorial List</h1>
                <button className="me-5 w-25 btn btn-success mb-3" onClick={handleCreate}>Add Tutorial</button>
            </div>

            <table className="table table-hover table-bordered">
                <thead className="table-success text-center">
                    <tr>
                        <th>Title</th>
                        <th>Information</th>
                        <th>Delete Tutorial</th>
                    </tr>
                </thead>
                <tbody>
                    {tutos.map((tuto, index) => (
                        <tr key={index}>
                            <td className='text-center align-middle'>{tuto.title.value}</td>
                            <td className='text-center'>
                                <button
                                    className="btn btn-info"
                                    data-bs-toggle="modal"
                                    data-bs-target="#viewInformation"
                                    onClick={() => {
                                        setSelectedTuto(tuto);
                                    }}
                                >
                                    View Information
                                </button>
                                <div className="modal fade" id="viewInformation" tabIndex="-1" role="dialog" aria-labelledby="viewInformationLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="viewInformationLabel">View Information</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            {selectedTuto &&
                                                <div className="modal-body">
                                                    <p><strong>Title:</strong> {selectedTuto.title.value}</p>
                                                    <p><strong>Content:</strong> {selectedTuto.content.value}</p>
                                                    <p><strong>Estimaed Time:</strong> {selectedTuto.estimated_time.value}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className='text-center'>
                                <button className="btn btn-danger" onClick={() => handleDelete(tuto.tutorial.value)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default TutorialList