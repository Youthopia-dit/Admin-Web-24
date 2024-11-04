import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ username }) {
  return (
    <>
      <div className="left w-56 h-full fixed">
        <nav className="h-full flex flex-col py-5 px-5 justify-between top-color">
          <div className="flex gap-5 flex-col">
            <div className="nav__title">
              <h3 className="text-white">{username}</h3>
            </div>
            <div className="nav__menu flex flex-col gap-4">
              <div className="cursor-pointer">
                <Link to="/">
                  <span className="text-white">Events</span>
                </Link>
              </div>
              <div className=" cursor-pointer">
                <Link to="/payments">
                  <span className="text-white">Payments</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="nav__footer">
            <div className="cursor-pointer">
              <span className="text-white hover:text-gray-300">Logout</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
