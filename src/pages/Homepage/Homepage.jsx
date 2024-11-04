import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import { useNavigate, useLocation } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const username = state?.username;

  useEffect(() => {
    if (!username) {
      navigate('/login', { state: { redirect: '/' } });
    }
  }, [username, navigate]);

  // If no username, return null to avoid rendering the component before navigation happens
  if (!username) {
    return null;
  }

  return (
    <div className="wrapper flex">
      <Navbar username={username} />
      <div className="right w-full p-5 ml-56">
        <Main />
      </div>
    </div>
  );
}

export default Homepage;
