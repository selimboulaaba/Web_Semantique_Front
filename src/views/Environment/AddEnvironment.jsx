import React, { useState } from 'react'
import { addEnvironment } from '../../services/environmentService'
import { useNavigate } from 'react-router-dom'

function AddEnvironment() {

  const [environment, setEnvironment] = useState({
    light_conditions: "",
    temperature: 0,
    humidity: 0
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnvironment({
      ...environment,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnvironment(environment)
    .then(response => {
      navigate("/environment")
    })
  }

  return (
    <div className="container mt-4">
      <div className='d-flex justify-content-between mt-5 mb-5'>
        <h1 className='ps-5'>Add Environment</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor='light_conditions' className="col-2 col-form-label">Light Conditions</label>
          <div className="col-10">
            <input
              id='light_conditions'
              type="text"
              name="light_conditions"
              value={environment.light_conditions}
              onChange={handleChange}
              placeholder='Enter Name'
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor='temperature' className="col-2 col-form-label">Temperature</label>
          <div className='col-10'>
            <input
              id='temperature'
              type="number"
              name="temperature"
              value={environment.temperature}
              onChange={handleChange}
              placeholder='Enter Temperature'
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor='humidity' className="col-2 col-form-label">Humidity</label>
          <div className='col-10'>
            <input
              id='humidity'
              type="number"
              name="humidity"
              value={environment.humidity}
              onChange={handleChange}
              placeholder='Enter Humidity'
              required
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Add Environment</button>
      </form>
    </div>
  )
}

export default AddEnvironment