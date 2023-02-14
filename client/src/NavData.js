import HomeIcon from '@mui/icons-material/Home'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import MessageIcon from '@mui/icons-material/Message';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


export const navData = [

    {
        id: 0,
        // icon: <AccountCircleIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>PROFILE</span>,
        link: "/profile"
    },
    {
        id: 1,
        // icon: <MessageIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>MESSAGES</span>,
        link: "/messages"
    },

    {
        id: 3,
        // icon: <HomeIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>Home</span>,
        link: "/home"
    },
    {
        id: 4,
        // icon: <PersonAddAltIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>Matched Users</span>,
        link: "/matches"
    },
    
    {
        id: 2,
        icon: <LoginIcon/>,
        text: <span style={{ fontWeight: 'bold' }}>Logout</span>,
        link: "/signin"
    }
]

export const profileData = [

    {
        id: 0,

        text: <span style={{ fontWeight: 'bold'}}>Profile</span>,
        link: "/profile"
    },
    {
        id: 1,

        text: <span style={{ fontWeight: 'bold'}}>Logout</span>,
        link: "/logout"
    },

]