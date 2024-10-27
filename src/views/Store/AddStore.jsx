import React, { useEffect, useState } from "react";
import { addStore } from "../../services/storeService";
import { useNavigate } from "react-router-dom";

function AddStore() {
  const [store, setStore] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore({
      ...store,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStore(store).then((response) => {
      navigate("/store");
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mt-5 mb-5">
        <h1 className="ps-5">Add Store</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-2 col-form-label">
            Name
          </label>
          <div className="col-10">
            <input
              id="name"
              type="text"
              name="name"
              value={store.name}
              onChange={handleChange}
              placeholder="Enter the store name"
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="location" className="col-2 col-form-label">
            location
          </label>
          <div className="col-10">
            <input
              id="location"
              type="text"
              name="location"
              value={store.location}
              onChange={handleChange}
              placeholder="Enter the Location"
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="phone" className="col-2 col-form-label">
            phone
          </label>
          <div className="col-10">
            <input
              id="phone"
              type="number"
              name="phone"
              value={store.phone}
              onChange={handleChange}
              placeholder="Enter the phone number"
              required
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Add Store
        </button>
      </form>
    </div>
  );
}

export default AddStore;
