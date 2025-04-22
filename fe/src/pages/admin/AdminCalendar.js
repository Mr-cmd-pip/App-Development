import React from 'react';
import "../../css/Sidebar.css";
import Sidebar from '../../components/SideBar';

function AdminCalendar() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <h1>Hello from Calendar</h1>
        </div>
      </div>
    )
}

export default AdminCalendar;