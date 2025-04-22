import React from 'react';
import "../../css/Sidebar.css";
import Sidebar from '../../components/SideBar';
import Calendar from '../../components/Calendar';

function AdminCalendar() {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                    <Calendar />
                </div>
            </div>
        </div>
    )
}

export default AdminCalendar;
