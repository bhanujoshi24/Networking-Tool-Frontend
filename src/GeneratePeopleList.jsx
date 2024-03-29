import React, { useState, useEffect } from 'react';
import './GeneratePeopleList.css';

const GeneratePeopleList = ({fullName}) => {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [numberOfEmployeesToChoose, setNumberOfEmployeesToChoose] = useState(5);
  const [chosenEmployees, setChosenEmployees] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    // Fetch locations when the component mounts
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/getLocations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleNumberToChooseChange = (event) => {
    setNumberOfEmployeesToChoose(Number(event.target.value));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/chooseAndStoreEmployees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: fullName,
          location,
          numEmployeesToChoose: numberOfEmployeesToChoose,
        }),
      });

      const data = await response.json();

      if (data.message) {
        setResponseMessage(data.message);
        setChosenEmployees([]); // Reset chosenEmployees when there is a message
      } else {
        setChosenEmployees(data);
        setResponseMessage(''); // Reset responseMessage when there is employee data
      }

    } catch (error) {
      console.error('Error choosing and storing employees:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Generate People List</h2>

      <div className="input-container-gen-list">
        <label>Location:</label>
        <select value={location} onChange={handleLocationChange}>
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container-gen-list">
        <label>Number of Employees to Choose:</label>
        <input
          type="number"
          value={numberOfEmployeesToChoose}
          onChange={handleNumberToChooseChange}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>

      {responseMessage && <p style={{ color: 'red' }}>{responseMessage}</p>}

      {/* {chosenEmployees.length > 0 && !responseMessage && (
        <div className="table-container">
          <p style={{ color: 'red' }}>Chosen Employees:</p>
          <ul>
            {chosenEmployees.map((employee, index) => (
              <li key={index}>
                {`Name: ${employee.employee}, Location: ${employee.location}, Quarter Start: ${employee.quarterStart}, User Name: ${employee.userName}`}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      
{chosenEmployees.length > 0 && !responseMessage && (
  <div>
  <p style={{ color: 'orange' }}>Chosen Employees:</p>
  <div className="table-container">
    
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Quarter Start</th>
          <th>List Generated By</th>
        </tr>
      </thead>
      <tbody>
        {chosenEmployees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.employee}</td>
            <td>{employee.location}</td>
            <td>{employee.quarterStart}</td>
            <td>{employee.userName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
)}

    </div>
    
  );
};

export default GeneratePeopleList;
