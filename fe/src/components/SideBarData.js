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
        link: '/admin/dashboard'
    },
    {
        title: 'Calendar',
        icon: <CalendarMonthIcon />,
        link: '/admin/calendar'
    },
    {
        title: 'Approved',
        icon: <DoneOutlineIcon />,
        link: '/admin/approved'
    },
    {
        title: 'Declined',
        icon: <ThumbDownAltIcon />,
        link: '/admin/declined'
    },
    {
        title: 'Pending',
        icon: <PendingIcon />,
        link: '/admin/pending'
    },
    {
        title: 'Logout',
        icon: <LogoutIcon />,
        link: '/'
    }
]