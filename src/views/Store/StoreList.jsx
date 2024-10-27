import React, { useEffect, useState } from "react";
import {
  deleteStore,
  fetchStore,
  searchStore,
} from "../../services/storeService";
import { useNavigate } from "react-router-dom";

function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const data = await fetchStore();
      console.log(data); // Inspect the fetched data
      setStores(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const handleCreate = () => {
    navigate("/store/add");
  };

  const handleDelete = (id) => {
    deleteStore(id).then(() => loadStores());
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleNewSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchStore(search);
      setStores(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const extractValue = (property) => property?.value || "N/A";

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mt-5 mb-5">
        <h1 className="ps-5">Store List</h1>
        <button
          className="me-5 w-25 btn btn-success mb-3"
          onClick={handleCreate}
        >
          Add Store
        </button>
      </div>

      <form className="row mb-3">
        <input
          id="search"
          type="text"
          name="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Title"
          required
          className="offset-1 form-control w-50"
        />
        <button
          className="btn btn-success offset-2 col-2"
          onClick={handleNewSearch}
        >
          Search
        </button>
      </form>

      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <tr key={index}>
              <td>{extractValue(store.name)}</td>
              <td>{extractValue(store.location)}</td>
              <td>{extractValue(store.phone)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(extractValue(store.Store))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StoreList;
