import React from 'react';
import "../../css/Sidebar.css";
import Sidebar from '../../components/SideBar';

function AdminDeclined() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <h1>Hello from Declined</h1>
        </div>
      </div>
    )
}

export default AdminDeclined;