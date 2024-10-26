import React, { useState } from 'react'
import { addTuto } from '../../services/tutorialService';
import { useNavigate } from 'react-router-dom'

function AddTutorial() {

    const [tuto, setTuto] = useState({
        title: "",
        content: "",
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTuto({
            ...tuto,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // addTuto(quiz)
        // .then(response => {
        //   navigate("/quiz")
        // })
    }

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between mt-5 mb-5'>
                <h1 className='ps-5'>Add Tutorial</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor='title' className="col-2 col-form-label">Title</label>
                    <div className="col-10">
                        <input
                            id='question'
                            type="text"
                            name="title"
                            value={tuto.title}
                            onChange={handleChange}
                            placeholder='Enter Title'
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor='content' className="col-2 col-form-label">Content</label>
                    <div className='col-10'>
                        <input
                            id='content'
                            type="text"
                            name="content"
                            value={tuto.content}
                            onChange={handleChange}
                            placeholder='Enter Content'
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Add Tutorial</button>
            </form>
        </div>
    )
}

export default AddTutorial