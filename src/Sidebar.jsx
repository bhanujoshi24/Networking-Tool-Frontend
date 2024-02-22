// export default Sidebar;
import React, { useState, useEffect } from 'react';
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsPower,
} from 'react-icons/bs';



function Sidebar({ onButtonClick, onLogout, openSidebarToggle,username , OpenSidebar }) {

  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Fetch Full Name based on username when the component mounts
    const fetchFullName = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_fullname', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setFullName(data.fullName || '');
        } else {
          console.error(data.error || 'Error fetching Full Name');
        }
      } catch (error) {
        console.error('An error occurred while fetching Full Name');
      }
    };

    fetchFullName();
  }, [username]);


  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          Synpulse
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a onClick={() => onButtonClick('Set/Refresh DB')}>
            <BsGrid1X2Fill className='icon' /> Set/Refresh DB
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a onClick={() => onButtonClick('Preview DB')}>
            <BsFillArchiveFill className='icon' /> Preview DB
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a onClick={() => onButtonClick('Generate Employee list for meet')}>
            <BsFillGrid3X3GapFill className='icon' /> Generate Employee list for meet
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a onClick={() => onButtonClick('See Generated past List')}>
            <BsPeopleFill className='icon' /> See Generated past List
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a onClick={onLogout}>
            <BsPower className='icon' /> Logout: {fullName || username}
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
