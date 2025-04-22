import React from 'react';
import "../css/Sidebar.css";
import { useNavigate } from 'react-router-dom';
import { SideBarData } from './SideBarData';

function SideBar() {
    const navigate = useNavigate();

    // Split the data
    const mainItems = SideBarData.slice(0, -1); // everything except Logout
    const logoutItem = SideBarData[SideBarData.length - 1]; // Logout

    return (
        <div className="sidebar">
            <div className="sidebarList">
                {mainItems.map((val, key) => (
                    <div
                        key={key}
                        className="row"
                        onClick={() => navigate(val.link)}
                    >
                        <div id="icon">{val.icon}</div>
                        <div id="title">{val.title}</div>
                    </div>
                ))}
            </div>
            <div className="logout">
                <div className="logoutList">
                    <div
                        className="row"
                        onClick={() => navigate(logoutItem.link)}
                    >
                        <div id="icon">{logoutItem.icon}</div>
                        <div id="title">{logoutItem.title}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;