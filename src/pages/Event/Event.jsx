import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Event() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchEventsById = async () => {
    try {
      const res = await axios.get(
        `https://27.123.248.68:4000/api/register/getRegistrations/${id}`
      );
      setData(res.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If a 404 error, set data to an empty array
        setData([]);
      } else {
        console.error('An error occurred while fetching data:', error);
      }
    }
  };

  useEffect(() => {
    fetchEventsById();
  }, [id]);

  return (
    <div>
      {data.length > 0 ? (
        data.map((d) => <EventCard key={d.regID} event={d} />)
      ) : (
        <div>Regret, No registrations are found</div>
      )}
    </div>
  );
}

function EventCard({ event }) {
  const [showMembers, setShowMembers] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-sm p-6 mx-auto mt-10 bg-gray-100 rounded-lg shadow-neumorphism">
      <div className="flex flex-col items-center">
        <img
          src={event.eventDetails.event_poster}
          alt="Event Poster"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          {event.eventDetails.eventName}
        </h2>
        <p className="text-gray-500 text-sm">
          {event.eventDetails.eventCategory}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Team Name</h3>
        <p className="text-gray-600">{event.teamName}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">College</h3>
        <p className="text-gray-600">{event.college}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Venue</h3>
        <p className="text-gray-600">{event.eventDetails.venue}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Registration ID</h3>
        <p className="text-gray-600">{event.regID}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Payment</h3>
        <p className="text-gray-600">
          {event.payment.paid ? `Paid: Rs.${event.payment.amount}` : 'Not Paid'}
        </p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setShowMembers(!showMembers)}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
        >
          {showMembers ? 'Hide Members' : 'View Members'}
        </button>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600"
        >
          {showDetails ? 'Hide Details' : 'More Details'}
        </button>
      </div>

      {showMembers && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700">Team Members</h3>
          {event.members.map((member) => (
            <div key={member._id || member.id} className="mt-2">
              <p className="text-gray-600 font-medium">{member.name}</p>
              <p className="text-gray-500 text-sm">Email: {member.collegeId}</p>
              <p className="text-gray-500 text-sm">
                ID: {member.id || member._id}
              </p>
            </div>
          ))}
        </div>
      )}

      {showDetails && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700">Event Details</h3>
          <p className="text-gray-600">
            Event ID: {event.eventDetails.eventID}
          </p>
          <p className="text-gray-600">
            Category: {event.eventDetails.eventCategory}
          </p>
          <p className="text-gray-600">Venue: {event.eventDetails.venue}</p>
          <p className="text-gray-600">Contact Email: {event.email}</p>
        </div>
      )}
    </div>
  );
}

export default Event;
