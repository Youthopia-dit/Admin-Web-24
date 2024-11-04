import React from 'react';
import { Link } from 'react-router-dom';

function Card({ data }) {
  // console.log(data.event_id);

  return (
    <>
      <Link to={`/event/${data.event_id}`} state={{ id: data.event_id }}>
        <div className="card cursor-pointer">
          <div className=" w-[20vw] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {data.event_name}
              </h5>
            </div>
            {/* <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              {data.event_description}
            </p> */}
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
