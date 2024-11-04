import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [events, setEvents] = useState([]);
  const { state } = useLocation();
  const { username } = state;
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const res = await axios({
      method: 'get',
      url: 'https://27.123.248.68:4000/api/events',
    });
    setEvents(res.data.events);
  };

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
    fetchEvents();
  }, []);

  return (
    <>
      <header>Header</header>
      <main>
        <h1 className="mb-5">Event</h1>
        <div className="flex justify-between gap-8 flex-wrap">
          {events.map((event) => (
            <Card data={event} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Main;
