import React, { useEffect, useState } from 'react'
import { deleteReview, fetchReviews } from '../../services/ReviewService'
import { useNavigate } from 'react-router-dom'

function ReviewList() {

    const [reviews, setReviews] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            const data = await fetchReviews();
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleCreate = () => {
        navigate("/review/add")
    }

    const handleDelete = async (uri) => {
        await deleteReview(uri)
        loadReviews();
    }

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between mt-5 mb-5'>
                <h1 className='ps-5'>Review List</h1>
                <button className="me-5 w-25 btn btn-success mb-3" onClick={handleCreate}>Add Review</button>
            </div>

            <table className="table table-hover table-bordered">
                <thead className="table-success text-center">
                    <tr>
                        <th>User</th>
                        <th>Date</th>
                        <th>Content</th>
                        <th>.</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={index}>
                            <td className='text-center align-middle'>{review.user}</td>
                            <td className='text-center align-middle'>{review.date}</td>
                            <td className='text-center align-middle'>{review.content}</td>
                            <td className='text-center'>
                                <button className="btn btn-danger" onClick={() => handleDelete(review.uri)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReviewList
