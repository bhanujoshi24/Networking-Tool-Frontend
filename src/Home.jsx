import React, { useState, useEffect } from 'react';
import SetDB from './SetDB';
import PreviewDB from './PreviewDB';
import GeneratePeopleList from './GeneratePeopleList';
import GeneratedList from './GeneratedList';

const Home = ({ selectedContent, username }) => {
  let contentToRender = null;


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



  switch (selectedContent) {
    case 'Set/Refresh DB':
      contentToRender = (
        <div>
          <SetDB></SetDB>
        </div>
      );
      break;
    case 'Preview DB':
      contentToRender = (
        <div>
          <PreviewDB></PreviewDB>
        </div>
      );
      break;
      case 'Generate Employee list for meet':
        contentToRender = (
          <div>
           <GeneratePeopleList fullName={fullName}></GeneratePeopleList>
          </div>
        );
        break;
        case 'See Generated past List':
          contentToRender = (
            <div>
              <GeneratedList></GeneratedList>
            </div>
          );
          break;


    default:
      contentToRender = (
        <div>
          {/* Default content when no button is selected */}
          <p>Please select a button from the sidebar</p>
        </div>
      );
      break;
  }

  return <div className='main-container'>{contentToRender}</div>;
};

export default Home;
