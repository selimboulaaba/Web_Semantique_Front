import React, { useEffect, useState } from "react";
import { deleteSeed, fetchSeed } from "../../services/seedService";
import { useNavigate } from "react-router-dom";

function SeedList() {
  const [seeds, setSeeds] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadSeeds();
  }, []);

  const loadSeeds = async () => {
    try {
      const data = await fetchSeed();
      console.log(data); // Inspect the fetched data
      setSeeds(data);
    } catch (error) {
      console.error("Error fetching Seeds:", error);
    }
  };

  const handleCreate = () => {
    navigate("/seed/add");
  };

  const handleDelete = (id) => {
    deleteSeed(id).then(() => loadSeeds());
  };

  //   const handleSearch = (e) => {
  //     setSearch(e.target.value);
  //   };

  //   const handleNewSearch = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const data = await searchSeed(search);
  //       setSeed(data);
  //     } catch (error) {
  //       console.error("Error fetching stores:", error);
  //     }
  //   };

  const extractValue = (property) => property?.value || "N/A";

  const extractValueBoolean = (availability) => {
    const value = availability?.value || "false"; // Default to "false" if undefined
    return value === "true" || value === true ? "Available" : "Not Available";
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mt-5 mb-5">
        <h1 className="ps-5">Seed List</h1>
        <button
          className="me-5 w-25 btn btn-success mb-3"
          onClick={handleCreate}
        >
          Add Seed
        </button>
      </div>

      {/* <form className="row mb-3">
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
      </form> */}

      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Type</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {seeds.map((seed, index) => (
            <tr key={index}>
              <td>{extractValue(seed.type)}</td>
              <td>{extractValue(seed.price)}</td>
              <td>{extractValueBoolean(seed.availability)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(extractValue(seed.Seed))}
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

export default SeedList;
