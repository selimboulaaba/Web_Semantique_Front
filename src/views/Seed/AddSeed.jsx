import React, { useEffect, useState } from "react";
import { addSeed } from "../../services/seedService";
import { useNavigate } from "react-router-dom";

function AddSeed() {
  const [seed, setSeed] = useState({
    type: "",
    price: "",
    availability: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeed({
      ...seed,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSeed(seed).then((response) => {
      navigate("/seed");
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mt-5 mb-5">
        <h1 className="ps-5">Add Seed</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="type" className="col-2 col-form-label">
            type
          </label>
          <div className="col-10">
            <input
              id="type"
              type="text"
              name="type"
              value={seed.type}
              onChange={handleChange}
              placeholder="Enter the seed type"
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="price" className="col-2 col-form-label">
            price
          </label>
          <div className="col-10">
            <input
              id="price"
              type="number"
              name="price"
              value={seed.price}
              onChange={handleChange}
              placeholder="Enter the price"
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="availability" className="col-2 col-form-label">
            Availability
          </label>
          <div className="col-10">
            <select
              id="availability"
              name="availability"
              value={seed.availability}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select availability</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          Add Seed
        </button>
      </form>
    </div>
  );
}

export default AddSeed;
