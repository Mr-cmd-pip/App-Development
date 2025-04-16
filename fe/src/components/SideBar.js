import React from 'react';
import "../css/Sidebar.css";
import { SideBarData } from './SideBarData';

function SideBar() {
    return (
        <div className='sidebar'>
            <ul className='sidebarList'>
                { SideBarData.map((val, key) => {
                return (
                    <li 
                        key={key} 
                        className='row'
                        onClick={()=> {
                            window.location.pathname = val.link
                        }}
                    >
                        <div>{val.icon}</div>
                        <div>
                            {val.title}
                        </div>
                    </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default SideBar;