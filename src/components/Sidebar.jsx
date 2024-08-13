import React from 'react';
import { FaMusic, FaListUl, FaUser } from 'react-icons/fa';
import  logo  from '../assets/beats-logo.png'

const Sidebar = ({ setCurrentView }) => {
  return (
    <div className="w-64 bg-gray-800 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="p-6 flex justify-center">
          <img src={logo} alt="Logo" className="h-40 w-96" />
        </div>
        {/* Menu Items */}
        <div
          className="p-4 cursor-pointer hover:bg-gray-700 text-center"
          onClick={() => setCurrentView('music')}
        >
          <FaMusic className="inline-block mr-2" />
          Music
        </div>
        <div
          className="p-4 cursor-pointer hover:bg-gray-700 text-center"
          onClick={() => setCurrentView('playlist')}
        >
          <FaListUl className="inline-block mr-2" />
          My Playlist
        </div>
      </div>
      {/* User Credentials */}
      <div className="p-4 bg-gray-700 text-center ">
        <FaUser className="inline-block mr-2" />
        <span>Username</span>
      </div>
    </div>
  );
};

export default Sidebar;
