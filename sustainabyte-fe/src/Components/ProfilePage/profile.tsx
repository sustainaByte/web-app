import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from "react";
import {useTheme} from "@mui/material";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import "./profile.scss"
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Divider from '@mui/material/Divider';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfilePage() {
    const [value, setValue] = React.useState(1);
    const theme = useTheme();
    const navigate = useNavigate()
    const profilePic = "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const dummyUser = {
        name: "George",
        surname: "Bercu",
        email: "george.bercu341@gmail.com",
        phoneNumber: "0782 211 221",
        roles: ["donor"],
        imageUrl: profilePic || "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_640.png",
        address: {country: "Romania", city: "Timisoara", street: "Str. Lalelelor", number: "57", postalCode: "402231"}
    }
    const isOrganization = dummyUser.roles.includes("organization");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%', minHeight: "100vh", backgroundColor: theme.palette.background.default}}>
            <Box sx={{width: "100%", borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Button href="#contained-buttons" onClick={() => navigate("/")}>
                        <HomeIcon/>
                    </Button>
                    <Tab sx={{flexGrow: 1, maxWidth: "100%"}} label="Profile" {...a11yProps(0)} />
                    <Tab sx={{flexGrow: 1, maxWidth: "100%"}} label="Posts" {...a11yProps(1)} />
                    {isOrganization && <Tab sx={{flexGrow: 1, maxWidth: "100%"}} label="Events" {...a11yProps(2)} />}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={1}>
                <Box sx={{maxWidth: "1000px", margin: "40px auto 0"}}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "10px 10px 0 0",
                        border: `1px solid ${theme.palette.text.secondary}`,
                        borderBottom: 'none',
                        boxSizing:"border-box"
                    }}>
                        <img className="profilePic" src={dummyUser.imageUrl} alt="Profile Picture"/>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            flexGrow: 1,
                            margin: "30px 0"
                        }}>
                            <Typography
                                sx={{ml: "30px"}}
                                color={theme.palette.text.primary}><BadgeIcon/> Name: {dummyUser.name + " " + dummyUser.surname}
                            </Typography>
                            <Divider/>
                            <Typography sx={{ml: "30px"}}
                                        color={theme.palette.text.primary}><EmailIcon/> Email: {dummyUser.email}
                            </Typography>
                            <Divider/>
                            <Typography
                                sx={{ml: "30px"}}
                                color={theme.palette.text.primary}><PhoneIphoneIcon/> Phone: {dummyUser.phoneNumber}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flexGrow: 1,
                        padding: "35px 0",
                        height: "200px",
                        border: `1px solid ${theme.palette.text.secondary}`,
                        boxSizing:"border-box",
                        borderRadius:"0 0 10px 10px"
                    }}>
                        <Typography
                            sx={{ml: "30px"}} color={theme.palette.text.primary}><PublicIcon/> From: {dummyUser.address.city}, {dummyUser.address.country}
                        </Typography>
                        <Divider/>
                        <Typography
                            sx={{ml: "30px"}} color={theme.palette.text.primary}><BusinessIcon/> Address: {dummyUser.address.street} {dummyUser.address.number}{dummyUser.address.postalCode && (", Zip Code: " + dummyUser.address.postalCode)}
                        </Typography>
                    </Box>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item 2
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Item 3
            </CustomTabPanel>
        </Box>
    );
}