// // Login.jsx
// import React, { useState } from 'react';
// import './Login.css'; // Import the CSS file
// import Signup from './Signup'; // Import the Signup component

// const Login = ({ onLogin, Usrname }) => {
//   const [username, setUsername] = Usrname;
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showSignup, setShowSignup] = useState(false);

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log(data.message); // Log the success message from the backend

//         // Additional logic if needed after successful login

//         onLogin(username); // Trigger the onLogin function to handle successful login
//       } else {
//         setError(data.error || 'An error occurred during login.');
//       }
//     } catch (error) {
//       setError('An error occurred during login.');
//     }
//   };

//   const handleSignup = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log(data.message); // Log the success message from the backend

//         // Additional logic if needed after successful signup

//         setShowSignup(false); // Hide the signup form after successful signup
//       } else {
//         setError(data.error || 'An error occurred during signup.');
//       }
//     } catch (error) {
//       setError('An error occurred during signup.');
//     }
//   };

//   const toggleView = () => {
//     setShowSignup(!showSignup);
//     setError(''); // Clear the error message when switching views
//   };

//   return (
//     <div className='login-container'>
//       <h2>{showSignup ? 'Signup' : 'Login'}</h2>
//       <div>
//         <label>Username:</label>
//         <input
//           type='text'
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type='password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       {error && <p className='error-message'>{error}</p>}
//       {showSignup ? (
//         <div>
//           <button onClick={handleSignup}>Signup</button>
//           <p className='signup-link' onClick={toggleView}>
//             Already have an account? Login here.
//           </p>
//         </div>
//       ) : (
//         <div>
//           <button onClick={handleLogin}>Login</button>
//           <p className='signup-link' onClick={toggleView}>
//             Don't have an account? Signup here.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;


// Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import Signup from './Signup'; // Import the Signup component

const Login = ({ onLogin, Usrname }) => {
  const [username, setUsername] = Usrname;
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Added Full Name state
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Log the success message from the backend

        // Additional logic if needed after successful login

        onLogin(username); // Trigger the onLogin function to handle successful login
      } else {
        setError(data.error || 'An error occurred during login.');
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          fullName: fullName, // Include the Full Name in the signup request
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Log the success message from the backend

        // Additional logic if needed after successful signup

        setShowSignup(false); // Hide the signup form after successful signup
      } else {
        setError(data.error || 'An error occurred during signup.');
      }
    } catch (error) {
      setError('An error occurred during signup.');
    }
  };

  const toggleView = () => {
    setShowSignup(!showSignup);
    setError(''); // Clear the error message when switching views
  };

  return (
    <div className='login-container'>
      <h2>{showSignup ? 'Signup' : 'Login'}</h2>
      {showSignup && (
        <div>
          <label>Full Name:</label>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
      )}
      <div>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className='error-message'>{error}</p>}
      {showSignup ? (
        <div>
          <button onClick={handleSignup}>Signup</button>
          <p className='signup-link' onClick={toggleView}>
            Already have an account? Login here.
          </p>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
          <p className='signup-link' onClick={toggleView}>
            Don't have an account? Signup here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
