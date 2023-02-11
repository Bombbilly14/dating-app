import HomeIcon from '@mui/icons-material/Home'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';


export const navData = [

    {
        id: 0,
        icon: <HomeIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>PROFILE</span>,
        link: "/profile"
    },
    {
        id: 1,
        icon: <AccountCircleIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>MESSAGES</span>,
        link: "/messages"
    },

    {
        id: 2,
        icon: <LoginIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>Logout</span>,
        link: "/signin"
    },
    {
        id: 3,
        icon: <HomeIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>Home</span>,
        link: "/home"
    },
    {
        id: 4,
        icon: <HomeIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>Matched Users</span>,
        link: "/matches"
    }

]