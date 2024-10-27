import React, { useState } from 'react'
import { addBlog } from '../../services/BlogService'
import { useNavigate } from 'react-router-dom'

function AddBlog() {

  const [blog, setBlog] = useState({
    title: "",
    date: "",
    content: ""
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog(blog)
    .then(response => {
      navigate("/blog")
    })
  }

  return (
    <div className="container mt-4">
      <div className='d-flex justify-content-between mt-5 mb-5'>
        <h1 className='ps-5'>Add Blog</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor='title' className="col-2 col-form-label">Title</label>
          <div className="col-10">
            <input
              id='title'
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder='Enter Title'
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
              value={blog.date}
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
              value={blog.content}
              onChange={handleChange}
              placeholder='Enter Content'
              required
              className="form-control"
              rows="5"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog
