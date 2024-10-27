import React, { useState } from 'react'
import { addPlant } from '../../services/plantService'
import { useNavigate } from 'react-router-dom'

function AddPlant() {

  const [plant, setPlant] = useState({
    name: "",
    type: "",
    water_needs: 0
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant({
      ...plant,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlant(plant)
    .then(response => {
      navigate("/plant")
    })
  }

  return (
    <div className="container mt-4">
      <div className='d-flex justify-content-between mt-5 mb-5'>
        <h1 className='ps-5'>Add Plant</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor='name' className="col-2 col-form-label">Name</label>
          <div className="col-10">
            <input
              id='name'
              type="text"
              name="name"
              value={plant.question}
              onChange={handleChange}
              placeholder='Enter Name'
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor='type' className="col-2 col-form-label">Type</label>
          <div className='col-10'>
            <input
              id='type'
              type="text"
              name="type"
              value={plant.type}
              onChange={handleChange}
              placeholder='Enter Type'
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor='water_needs' className="col-2 col-form-label">Water Needs</label>
          <div className='col-10'>
            <input
              id='water_needs'
              type="number"
              name="water_needs"
              value={plant.water_needs}
              onChange={handleChange}
              placeholder='Enter Water Needs'
              required
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Add Plant</button>
      </form>
    </div>
  )
}

export default AddPlant