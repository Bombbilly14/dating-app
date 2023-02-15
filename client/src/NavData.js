
import LoginIcon from '@mui/icons-material/Login';



export const navData = [

    {
        id: 3,
        // icon: <HomeIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>BROWSE</span>,
        link: "/home"
    },
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
        id: 4,
        // icon: <PersonAddAltIcon/>,
        text: <span style={{ fontWeight: 'bold'}}>MATCHES</span>,
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