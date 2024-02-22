// Signup.jsx
import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file

const Signup = ({ onSignup }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    // You would typically make an API request to create a new user here
    // For simplicity, let's use basic validation for username and password
    if (newUsername && newPassword) {
      onSignup(newUsername, newPassword);
      setError('');
    } else {
      setError('Username and password are required');
    }
  };

  return (
    <div className='signup-container'>
      <h2>Signup</h2>
      <div>
        <label>Full Name:</label>
        <input
          type='text'
          value={newFullname}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type='text'
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      {error && <p className='error-message'>{error}</p>}
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
