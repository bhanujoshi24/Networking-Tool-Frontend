import React, { useState, useEffect } from 'react';
import './PreviewDB.css';

// const UpdateForm = ({ employee, onUpdate, onCancel }) => {
//   const [updatedName, setUpdatedName] = useState(employee.name);
//   const [updatedLocation, setUpdatedLocation] = useState(employee.location);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate({ ...employee, name: updatedName, location: updatedLocation });
//   };

//   return (
//     <div className="update-overlay">
//       <div className="update-form-container">
//         <form onSubmit={handleSubmit}>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={updatedName}
//             onChange={(e) => setUpdatedName(e.target.value)}
//           />

//           <label>Location:</label>
//           <input
//             type="text"
//             value={updatedLocation}
//             onChange={(e) => setUpdatedLocation(e.target.value)}
//           />

//           <button type="submit" className='update-submit-button'>Update</button>
//           <button type="button" onClick={onCancel} className='update-cancel-button'>
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
const UpdateForm = ({ employee, onUpdate, onCancel }) => {
  const [oldName, setOldName] = useState(employee.name);
  const [newName, setNewName] = useState(employee.name);
  const [newLocation, setNewLocation] = useState(employee.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      oldName: oldName,
      newName: newName,
      newLocation: newLocation,
    });
  };

  return (
    <div className="update-overlay">
      <div className="update-form-container">
        <form onSubmit={handleSubmit}>
          <label>Old Name:</label>
          <input type="text" value={oldName} readOnly />

          <label>New Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <label>New Location:</label>
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />

          <button type="submit" className="update-submit-button">
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="update-cancel-button"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const PreviewDB = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeData, setEmployeeData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/getEmployee');
        const data = await response.json();

        // Extract unique locations for the dropdown
        const locations = [...new Set(data.map(employee => employee.location))];
        setUniqueLocations(locations);

        // Apply filters
        const filteredData = data.filter(employee => {
          const nameMatch = employee.name.toLowerCase().includes(nameFilter.toLowerCase());
          const locationMatch = !locationFilter || employee.location === locationFilter;

          return nameMatch && locationMatch;
        });

        setEmployeeData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [nameFilter, locationFilter]); // Update data when filters change

  const totalPages = Math.ceil(employeeData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = employeeData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateForm(true);
  };


  const handleUpdateSubmit = async ({ oldName, newName, newLocation }) => {
    try {
      // Make a POST request to the backend endpoint
      const response = await fetch('http://127.0.0.1:5000/updateEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldName: oldName,
          newName: newName,
          location: newLocation,
        }),
      });
  
      if (response.ok) {
        // Update the employeeData state with the updated employee
        const updatedData = employeeData.map((employee) =>
          employee === selectedEmployee
            ? { ...employee, name: newName, location: newLocation }
            : employee
        );
        setEmployeeData(updatedData);
        // Close the update form
        setShowUpdateForm(false);
      } else {
        const errorData = await response.json();
        console.error('Error updating employee:', errorData.error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  
  const handleUpdateCancel = () => {
    // Close the update form
    setShowUpdateForm(false);
  };


  const handleDelete = async (employee) => {
    try {
      // Make a DELETE request to the backend endpoint
      const response = await fetch('http://127.0.0.1:5000/deleteByUsernameAndLocation', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: employee.name,
          location: employee.location,
        }),
      });

      if (response.ok) {
        // Remove the deleted employee from the employeeData state
        const updatedData = employeeData.filter((e) => e !== employee);
        setEmployeeData(updatedData);
      } else {
        const errorData = await response.json();
        console.error('Error deleting employee:', errorData.error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className='container'>
      <h2>Preview Database</h2>

      <div className="filter-container">
        <label>Name:</label>
        <input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <label>Location:</label>
        <select value={locationFilter} onChange={handleLocationChange}>
          <option value="">All Locations</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.location}</td>
                <td>
                  <button onClick={() => handleUpdate(employee)} className='update-submit-button'>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(employee)} className='update-cancel-button'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {showUpdateForm && (
        <UpdateForm
          employee={selectedEmployee}
          onUpdate={handleUpdateSubmit}
          onCancel={handleUpdateCancel}
        />
      )}
    </div>
  );
};

export default PreviewDB;
