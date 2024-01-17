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
import useFetchUser from "../Login/useFetchUser";
import Avatar from "@mui/material/Avatar";


const AccountInformation = () => {
    // @ts-ignore
    const {authKey} = useAuth()
    const theme = useTheme()
    // @ts-ignore
    const user = useFetchUser(authKey.data.jwtToken)['data']
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [roles, setRoles] = useState('');
    const [image, setImage] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [streetNumber, setStreetNumber] = useState('');


    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setName(user.name);
            setSurname(user.surname);
            setPhoneNumber(user.phoneNumber);
            setRoles(user.roles.join(', ')); // Assuming roles is an array
            setImage(user.image);
            setCity(user.address.city);
            setCountry(user.address.country);
            setStreet(user.address.street);
            setStreetNumber(user.streetNumber);
        }
    }, [user]);

    const updateUser = () => {
        fetch(`https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/users/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authKey.data.jwtToken}`,
            },
            body: JSON.stringify({
                "email": email,
                "name": name,
                "surname": surname,
                "phoneNumber": phoneNumber,
                "address": {
                    "city": city,
                    "country": country,
                    "street": street,
                    "streetNumber": streetNumber
                }
            }),
        })
            .then(response => {
                if (response.ok) {
                    window.location.reload()
                }
            })
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleSurnameChange = (event: any) => {
        setSurname(event.target.value);
    };

    const handlePhoneNumberChange = (event: any) => {
        setPhoneNumber(event.target.value);
    };

    const handleCityChange = (event: any) => {
        setCity(event.target.value);
    };

    const handleCountryChange = (event: any) => {
        setCountry(event.target.value);
    };

    const handleStreetChange = (event: any) => {
        setStreet(event.target.value);
    };

    const handleStreetNumberChange = (event: any) => {
        setStreetNumber(event.target.value);
    };

    const handleClickSave = () => {
        updateUser()
    }

    return (
        <Container
            component={'div'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '80%',
                ml: '20%',
                pt: '50px',
                pb: '50px',
                backgroundColor: `${theme.palette.background.default}`
            }}
        >
            <Typography mb="50px" fontSize={24} component="p" color="primary">
                Change your information
            </Typography>
            <Container sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px'
            }}>
                <Box component={'div'} sx={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <Box component={'div'} sx={{
                        paddingRight: '10px'
                    }}>
                        <Typography component="p" color="primary">
                            Email
                        </Typography>
                        {user ? (
                            <Input value={email} onChange={handleEmailChange} sx={{
                                width: '100%'
                            }}/>
                        ) : (
                            <Input placeholder="Email" />
                        )}
                    </Box>
                    <Box component={'div'} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                    }}>
                        <Box component={'div'}>
                            <Typography component="p" color="primary">
                                Name
                            </Typography>
                            <Input value={name} onChange={handleNameChange} />
                        </Box>
                        <Box component={'div'}>
                            <Typography component="p" color="primary">
                                Surname
                            </Typography>
                            <Input value={surname} onChange={handleSurnameChange} />
                        </Box>
                    </Box>
                    <Box component={'div'} sx={{
                    }}>
                        <Typography component="p" color="primary">
                            Phone Number
                        </Typography>
                        <Input value={phoneNumber} onChange={handlePhoneNumberChange} />
                    </Box>
                    <Box component={'div'}>
                        <Typography component="p" color="primary">
                            Roles
                        </Typography>
                        {roles}
                    </Box>
                    <Box component={'div'} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                    }}>
                        <Box component={'div'}>
                            <Typography component="p" color="primary">
                                City
                            </Typography>
                            <Input value={city} onChange={handleCityChange} />
                        </Box>
                        <Box component={'div'}>
                            <Typography component="p" color="primary">
                                Country
                            </Typography>
                            <Input value={country} onChange={handleCountryChange} />
                        </Box>
                    </Box>
                    <Box component={'div'} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                    }}>
                        <Box component={'div'}>
                            <Typography component="p" color="primary">
                                City
                            </Typography>
                            <Input value={street} onChange={handleStreetChange} />
                        </Box>
                        <Box component={'div'}>
                            <Typography component="p" color="primary">
                                City
                            </Typography>
                            <Input value={streetNumber} onChange={handleStreetNumberChange} />
                        </Box>
                    </Box>
                </Box>
                <Box component={'div'} sx={{
                    width: '50%'
                }}>
                    <Avatar src={image} sx={{
                        width: '300px',
                        height: '300px',
                        margin: '0 auto'
                    }}/>
                    <Box component={'div'} sx={{
                        margin: '20px auto',
                        width: 'max-content'
                    }}>
                        <Button onClick={handleClickSave} sx={{
                            width: '150px',
                        }}>
                            <Typography sx={{
                                fontSize: '1.25rem'
                            }}>Save</Typography>
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
};

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