import {useAuth} from "../Login/login";
import {Navigate, useNavigate} from "react-router-dom";
import * as React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useState} from "react";

const RegisterForm = () => {
    // @ts-ignore
    const { register } = useAuth()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            register(data.get('email'), data.get('password'), data.get('name'), data.get('surname'), data.get('phone'),
                data.get('city'), data.get('country'), data.get('street'), data.get('streetNumber'))
        } catch (err: any) {
            alert(err.message)
        }
    };

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
        // Check if passwords match
        setPasswordsMatch(event.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (event: any) => {
        setConfirmPassword(event.target.value);
        // Check if passwords match
        setPasswordsMatch(password === event.target.value);
    };

    return (
        <Container component="div" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Create an account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px'
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            color="primary"
                            variant="standard"
                        />
                        <TextField
                            margin="normal"
                            required
                            id="surname"
                            label="Surname"
                            name="surname"
                            autoComplete="surname"
                            autoFocus
                            color="primary"
                            variant="standard"
                        />
                    </Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        color="primary"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        color="primary"
                        variant="standard"
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Re-enter Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        color="primary"
                        variant="standard"
                        error={!passwordsMatch}
                        onChange={handleConfirmPasswordChange}
                    />
                    <TextField
                        margin="normal"
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="phone"
                        autoFocus
                        color="primary"
                        variant="standard"
                    />
                    <p style={{marginBottom: 0}}>Address</p>
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px'
                        }}
                    >
                        <TextField
                            margin="normal"
                            id="city"
                            label="City"
                            name="city"
                            autoComplete="city"
                            autoFocus
                            color="primary"
                            variant="standard"
                        />
                        <TextField
                            margin="normal"
                            id="street"
                            label="Street"
                            name="street"
                            autoComplete="street"
                            autoFocus
                            color="primary"
                            variant="standard"
                        />
                    </Box>
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px'
                        }}
                    >
                        <TextField
                            margin="normal"
                            id="street"
                            label="Street"
                            name="street"
                            autoComplete="street"
                            autoFocus
                            color="primary"
                            variant="standard"
                        />
                        <TextField
                            margin="normal"
                            id="streetNumber"
                            label="Street Number"
                            name="streetNumber"
                            autoComplete="streetNumber"
                            autoFocus
                            color="primary"
                            variant="standard"
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );

}

const RegisterHeroHeader = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    color: 'text.primary',
                }}
            >

                <h1>Welcome to sustainaByte: Uniting for a Greener Tomorrow</h1>
                <p>
                    🌱 Join a global community committed to making a positive impact on the planet! 🌍 sustainaByte is not just a social media app; it's a movement towards sustainability. Connect with like-minded individuals, share eco-friendly tips, and inspire change together. 🌿
                </p>
                <ul>
                    <li>📸 Capture and showcase your sustainable lifestyle.</li>
                    <li>🤝 Collaborate on green initiatives and challenges.</li>
                    <li>📢 Amplify your voice for a cleaner, greener future.</li>
                </ul>
                <p>Sign up now and be part of the environmental revolution! 🌐 Together, we can turn small actions into a powerful force for change. 🌟</p>
            </Box>
        </Container>
    )
}

const RegisterPage = () => {
    // @ts-ignore
    const { authKey } = useAuth()

    if (authKey) {
        return <Navigate to={"/ "} replace={true}/>
    }

    return (
        <Container
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100vh',
                backgroundColor: '${props => props.theme.colors.background}'
            }}
        >
            <RegisterForm />
            <RegisterHeroHeader />
        </Container>
    )
}

export default RegisterPage