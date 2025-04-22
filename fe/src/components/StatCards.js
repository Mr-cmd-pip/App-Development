import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import '../css/StatCards.css'; //

const statData = [
  {
    label: 'Pending Requests',
    value: 12,
    icon: <FaClock className="icon icon-pending" />,
    bgClass: 'bg-pending'
  },
  {
    label: 'Approved Requests',
    value: 8,
    icon: <FaCheckCircle className="icon icon-approved" />,
    bgClass: 'bg-approved'
  },
  {
    label: 'Declined Requests',
    value: 3,
    icon: <FaTimesCircle className="icon icon-declined" />,
    bgClass: 'bg-declined'
  },
];

const StatCards = () => {
  return (
    <div className="stat-cards-container">
      {statData.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.bgClass}`}>
          <div>{stat.icon}</div>
          <div className="stat-text">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
