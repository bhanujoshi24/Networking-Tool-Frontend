import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Home from './Home';
import Login from './Login';
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsPower,
} from 'react-icons/bs';
import './App.css';


function App() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const handleSidebarButtonClick = (content) => {
    setSelectedContent(content);
    console.log(content);
  };

  const handleLogin = (loggedInUsername) => {
    setUsername(loggedInUsername);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
    setSelectedContent(null);
  };

  const handleSidebarToggle = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin}
          Usrname={[username, setUsername]} />
      ) : (
        <>
          <Sidebar
            onButtonClick={handleSidebarButtonClick}
            onLogout={handleLogout}
            openSidebarToggle={openSidebarToggle}
            username={username} // Pass the username to Sidebar
            OpenSidebar={handleSidebarToggle}
          />
          <Home 
          selectedContent={selectedContent}
          username={username} 
          />
        </>
      )}
    </div>
  );
}

export default App;