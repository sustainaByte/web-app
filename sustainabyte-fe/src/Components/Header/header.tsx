import { IconButton, TextField, useTheme} from '@mui/material';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import './header.scss'
// @ts-ignore
import logo from '../../images/logo.png'

const Header = () => {
    const theme = useTheme()
    return (
        <header>
            <div className='header-container'>
                <ul className='header-list'>
                    <img src={logo} alt="logo"/>
                    <TextField sx={{
                    '& .MuiInputLabel-root': {
                        color: `${theme.palette.text.primary}`, // Search text color
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                        borderColor: `${theme.palette.text.primary}`, //Border unfocused
                        },
                    '&.Mui-focused fieldset': {
                        borderColor: `${theme.palette.text.primary}`, // Border color when focused
                        }
                    },
                    }} id="outlined-basic" label="Search" variant="outlined"/>
                </ul>
                <ul className='header-list'>
                    <IconButton aria-label="menu" sx={{color: `${theme.palette.text.primary}`}}>
                        <WidgetsOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="chat" sx={{color: `${theme.palette.text.primary}`}}>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton aria-label="notifications" sx={{color: `${theme.palette.text.primary}`}}>
                        <NotificationsNoneIcon/>
                    </IconButton>
                    <IconButton aria-label="profile" sx={{color: `${theme.palette.text.primary}`}}>
                        <AccountCircleIcon/>
                    </IconButton>
                </ul>
            </div>
        </header>
    )
}

export default Header