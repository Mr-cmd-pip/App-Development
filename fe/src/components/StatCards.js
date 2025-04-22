import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const statData = [
  {
    label: 'Pending Requests',
    value: 12, // Replace this with dynamic data
    icon: <FaClock className="text-yellow-500 text-3xl" />,
    bg: 'bg-yellow-100'
  },
  {
    label: 'Approved Requests',
    value: 8,
    icon: <FaCheckCircle className="text-green-500 text-3xl" />,
    bg: 'bg-green-100'
  },
  {
    label: 'Declined Requests',
    value: 3,
    icon: <FaTimesCircle className="text-red-500 text-3xl" />,
    bg: 'bg-red-100'
  },
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {statData.map((stat, index) => (
        <div key={index} className={`rounded-2xl shadow-md p-6 flex items-center space-x-4 ${stat.bg}`}>
          <div>{stat.icon}</div>
          <div>
            <div className="text-xl font-semibold">{stat.value}</div>
            <div className="text-gray-700">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
