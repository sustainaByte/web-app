import {Button, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import {useAuth} from "../Login/login";
import {Navigate, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const SettingsPage = () => {
    // @ts-ignore
    const { authKey } = useAuth();
    const theme = useTheme()
    const navigate = useNavigate()

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
            <Button
                sx={{ color: `${theme.palette.text.primary}` }}
                onClick={() => navigate("/")}
            >
                <ArrowBackIcon />
                <p>Go back</p>
            </Button>
        </Box>
    )
}

export default SettingsPage;