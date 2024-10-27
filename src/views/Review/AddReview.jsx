import React, { useState } from 'react'
import { addReview } from '../../services/ReviewService'
import { fetchReviews } from '../../services/ReviewService'
import { useNavigate } from 'react-router-dom'

function AddReview() {

  const [review, setReview] = useState({
    user: "",
    content: "",
    date: ""
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(review)
    .then(response => {
      navigate("/review")
    })
  }

  return (
    <div className="container mt-4">
      <div className='d-flex justify-content-between mt-5 mb-5'>
        <h1 className='ps-5'>Add Review</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor='user' className="col-2 col-form-label">User</label>
          <div className="col-10">
            <input
              id='user'
              type="text"
              name="user"
              value={review.user}
              onChange={handleChange}
              placeholder='Enter Username'
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor='date' className="col-2 col-form-label">Date</label>
          <div className='col-10'>
            <input
              id='date'
              type="date"
              name="date"
              value={review.date}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor='content' className="col-2 col-form-label">Content</label>
          <div className='col-10'>
            <textarea
              id='content'
              name="content"
              value={review.content}
              onChange={handleChange}
              placeholder='Enter Content'
              required
              className="form-control"
              rows="5"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Add Review</button>
      </form>
    </div>
  )
}

export default AddReview
