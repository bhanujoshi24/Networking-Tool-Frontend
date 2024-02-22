// SetDB.jsx
import React, { useState } from 'react';
import './setDB.css'; // Import the CSS file

const SetDB = () => {
  const [choice, setChoice] = useState('Set'); // Default choice is 'Set'
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState({ header: [], data: [] }); // Initialize with empty data

  const handleChoiceChange = (event) => {
    setChoice(event.target.value);
  };
  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target.result;
        const parsedData = parseCsvData(csvContent);
        setCsvData(parsedData);
      };
      reader.readAsText(file);
    }

    setCsvFile(file);
  };

  const parseCsvData = (csvContent) => {
    const rows = csvContent.split('\n');
    const header = rows[0].split(',');
    const data = rows.slice(1).map(row => row.split(','));
    return { header, data };
  };

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('file', csvFile);
    formData.append('choice', choice);

    // const response = await fetch('http://localhost:5000/upload', {
    //   method: 'POST',
    //   body: formData,
    // });

    const response = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('CSV data uploaded successfully');
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while uploading CSV data');
  }
};

  return (
    <div className='container'>
      <h2>{choice === 'Set' ? 'Set Database' : 'Update Database'}</h2>

      <div>
        <label>Choose action:</label>
          <select value={choice} onChange={handleChoiceChange}>
            <option value="Set">Set</option>
            <option value="Update">Update</option>
          </select>
      </div>

      <div>
        <label>Upload CSV file: [Consisting only two column name and location] </label>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {csvFile && csvData.header && csvData.data && (
      <div>
        <h3>CSV Content:</h3>
        <div className="scrollable-table-container">
         
          <table>
            <thead>
              <tr>
                {csvData.header.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
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

export default SetDB;
