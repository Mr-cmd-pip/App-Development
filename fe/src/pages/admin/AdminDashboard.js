import React from 'react';
import "../../css/Sidebar.css";
import Sidebar from '../../components/SideBar';

function AdminDashboard() {
    return (
        <div className='dashboard'>
            <Sidebar />
        </div>
    )
}

export default AdminDashboard;