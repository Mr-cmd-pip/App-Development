import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PendingIcon from '@mui/icons-material/Pending';
import LogoutIcon from '@mui/icons-material/Logout';

export const SideBarData = [
    {
        title: 'Home',
        icon: <HomeIcon />,
        link: '/admin_dashboard'
    },
    {
        title: 'Calendar',
        icon: <CalendarMonthIcon />,
        link: '/admin_calendar'
    },
    {
        title: 'Approved',
        icon: <DoneOutlineIcon />,
        link: '/admin_approved'
    },
    {
        title: 'Declined',
        icon: <ThumbDownAltIcon />,
        link: '/admin_declined'
    },
    {
        title: 'Pending',
        icon: <PendingIcon />,
        link: '/admin_pending'
    },
    {
        title: 'Logout',
        icon: <LogoutIcon />,
        link: '/'
    }
]