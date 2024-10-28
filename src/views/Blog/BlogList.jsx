import React, { useEffect, useState } from 'react'
import { deleteBlog, fetchBlogs } from '../../services/BlogService'
import { fetchReviews, addReviewToBlog } from '../../services/ReviewService'
import { useNavigate } from 'react-router-dom'

function BlogList() {
    const [blogs, setBlogs] = useState([])
    const [reviews, setReviews] = useState([])
    const [selectedBlog, setSelectedBlog] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadBlogs()
        loadReviews()
    }, [])

    const loadBlogs = async () => {
        try {
            const data = await fetchBlogs()
            setBlogs(data)
        } catch (error) {
            console.error("Error fetching blogs:", error)
        }
    }

    const loadReviews = async () => {
        try {
            const reviewData = await fetchReviews()
            setReviews(reviewData)
        } catch (error) {
            console.error("Error fetching reviews:", error)
        }
    }

    const handleCreate = () => {
        navigate("/blog/add")
    }

    const handleDelete = async (uri) => {
        await deleteBlog(uri)
        loadBlogs()
    }

    const addReviewToSelectedBlog = async (e) => {
        e.preventDefault()
        const reviewId = e.target.value
        try {
            await addReviewToBlog(selectedBlog.uri, reviewId)
            loadBlogs()
        } catch (error) {
            console.error("Error adding review to blog:", error)
        }
    }

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between mt-5 mb-5'>
                <h1 className='ps-5'>Blog List</h1>
                <button className="me-5 w-25 btn btn-success mb-3" onClick={handleCreate}>Add Blog</button>
            </div>

            <table className="table table-hover table-bordered">
                <thead className="table-success text-center">
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Content</th>
                        <th>Reviews</th>
                        <th>Delete Blog</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, index) => (
                        <tr key={index}>
                            <td className='text-center align-middle'>{blog.title}</td>
                            <td className='text-center align-middle'>{blog.date}</td>
                            <td className='text-center align-middle'>{blog.content}</td>
                            <td className='text-center'>
                                <button
                                    className="btn btn-info"
                                    data-bs-toggle="modal"
                                    data-bs-target="#viewReviews"
                                    onClick={() => setSelectedBlog(blog)}
                                >
                                    View/Add Review
                                </button>
                                <div className="modal fade" id="viewReviews" tabIndex="-1" role="dialog" aria-labelledby="viewReviewsLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="viewReviewsLabel">Reviews for {selectedBlog?.title}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <h6>Existing Reviews:</h6>
                                                {selectedBlog?.reviews?.length ? (
                                                    <ul>
                                                        {selectedBlog.reviews.map((review, idx) => (
                                                            <li key={idx}>{review.content}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No reviews attached</p>
                                                )}
                                                <hr />
                                                <form>
                                                    <select onChange={addReviewToSelectedBlog} className="form-select" aria-label="Select Review">
                                                        <option value="" className='d-none' defaultValue>Select a review to add</option>
                                                        {reviews.map((review, idx) => (
                                                            <option key={idx} value={review.id}>{review.content}</option>
                                                        ))}
                                                    </select>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className='text-center'>
                                <button className="btn btn-danger" onClick={() => handleDelete(blog.uri)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BlogList
