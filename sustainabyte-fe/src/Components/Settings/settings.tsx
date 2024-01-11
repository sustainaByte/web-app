import {
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
    useTheme,
    Input,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {useAuth} from "../Login/login";
import {Navigate, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ParkIcon from '@mui/icons-material/Park';
import EventIcon from '@mui/icons-material/Event';
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import PaypalDonate from "../Paypal/paypalDonations";

const AccountInformation = () => {
    const theme = useTheme()
    const [user, setUser] = useState([])
    const [err, setErr] = useState([])

    useEffect(() => {
        fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/users/current',
            {
                method: "get",
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {'err': 'There was a problem loading posts!'}
                }
            })
            .then(data => setUser(data))
            .catch(err => setErr(err))
    }, [])

    if (err) {
        return (
            <Container component={"div"}
                   sx={{
                       display: 'flex',
                       flexDirection: 'column',
                       gap: '10px',
                       width: '80%',
                       ml: '20%',
                       pt: '50px'
                   }}
                >
                    <Typography color="primary">Error retrieving information</Typography>
            </Container>)
    }

    return (
        <Container component={"div"}
             sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 gap: '10px',
                 width: '80%',
                 ml: '20%',
                 pt: '50px'
            }}
        >
            <Typography mb="50px" fontSize={24} component="p" color="primary">
                Change your information
            </Typography>
            <Box component={"div"}>
                <Typography component="p" color="primary">Email</Typography>
                {user
                    ?
                    // @ts-ignore
                    <Input placeholder={user.email} />
                    :
                    <Input placeholder="Email" />
                }
            </Box>
        </Container>
    )
}

// @ts-ignore
function LeftDrawer ({currentDrawer, setCurrentDrawer}) {
    const theme = useTheme()
    const navigate = useNavigate()

    const handleClick = (ind: number) => {
        setCurrentDrawer(ind)
    }

    return (
        <Drawer
            sx={{
                width: '20%',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '20%',
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Button
                onClick={() => navigate("/")}
            >
                <ArrowBackIcon />
                <p>Go back</p>
            </Button>
            <Divider />
            <List>
                <ListItem key={"Account Information"}
                          sx={{
                                "backgroundColor": currentDrawer === 0 ? theme.palette.text.disabled: theme.palette.background.default
                            }}
                          disablePadding>
                    <ListItemButton onClick={() => handleClick(0)}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Account Information"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"Posts"}
                          sx={{
                              "backgroundColor": currentDrawer === 1 ? theme.palette.text.disabled: theme.palette.background.default
                          }}
                          disablePadding>
                    <ListItemButton onClick={() => handleClick(1)}>
                        <ListItemIcon>
                            <ParkIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Posts"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"Events"}
                          sx={{
                              "backgroundColor": currentDrawer === 2 ? theme.palette.text.disabled: theme.palette.background.default
                          }}
                          disablePadding>
                    <ListItemButton onClick={() => handleClick(2)}>
                        <ListItemIcon>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Events"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

const SettingsPage = () => {
    // @ts-ignore
    const { authKey } = useAuth();
    const theme = useTheme()
    const navigate = useNavigate()
    const [currentDrawer, setCurrentDrawer] = useState(0)

    if (!authKey) {
        return <Navigate to={"/"} replace={true} />
    }

    return (
        <Box
            component={"main"}
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: `${theme.palette.background.default}`
            }}
        >
            {currentDrawer === 0 && <AccountInformation />}
            <LeftDrawer currentDrawer={currentDrawer} setCurrentDrawer={setCurrentDrawer}/>
        </Box>
    )
}

export default SettingsPage;