import React, { useEffect, useState } from 'react'
import { deleteBlog, fetchBlogs } from '../../services/BlogService'
import { useNavigate } from 'react-router-dom'

function BlogList() {

    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const data = await fetchBlogs();
            setBlogs(data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleCreate = () => {
        navigate("/blog/add")
    }

    const handleDelete = async (uri) => {
        await deleteBlog(uri)
        loadBlogs();
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
                        <th>.</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, index) => (
                        <tr key={index}>
                            <td className='text-center align-middle'>{blog.title}</td>
                            <td className='text-center align-middle'>{blog.date}</td>
                            <td className='text-center align-middle'>{blog.content}</td>
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
