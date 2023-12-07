import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useLocalStorage} from "./useLocalStorage";
import {Navigate, useNavigate} from "react-router-dom";
import {createContext, useContext, useMemo} from "react";
import {List, ListItem} from "@mui/material";

// @ts-ignore
const AuthContext = createContext()

export interface LoginError {
    message: string,
    code: string
}

export const AuthProvider = ({ children }: any) => {
    const [authKey, setAuthKey] = useLocalStorage("user", null),
        navigate = useNavigate();

    const login = async (email: any, password: any) => {
        await fetch('https://f126-2a02-a58-84f9-ee00-612d-f040-cb9f-e341.ngrok-free.app/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    setAuthKey(data)
                    navigate("/")
                }
                else {
                    data.errors.forEach((error: LoginError) => { throw new Error(error.message) })
                }
            })
    }

    const register = async (email: any, password: any, name: any, surname: any, phoneNumber: any,
                            city: any, country: any, street: any, streetNumber: any) => {
        await fetch('https://f126-2a02-a58-84f9-ee00-612d-f040-cb9f-e341.ngrok-free.app/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name,
                "surname": surname,
                "phoneNumber": phoneNumber,
                "address": JSON.stringify([
                    city,
                    country,
                    street,
                    streetNumber
                ])
            })
        })
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    login(email, password)
                }
                else {
                    data.errors.forEach((error: LoginError) => { throw new Error(error.message) })
                }
            })
            .catch(err => alert(err))
    }

    const logout = async () => {
        setAuthKey(null)
        await fetch('http://localhost:3000/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate("/", {replace: true})
    }

    const value = useMemo(
        () => ({
            authKey,
            login,
            logout,
            register
        }),
        [authKey]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
};

const LoginForm = () => {
    // @ts-ignore
    const { login } = useAuth()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        login(data.get('email'), data.get('password'))
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

const LoginHeroHeader = () => {
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
                <h3> 🌿 Ready to dive back into the green community? Your journey to a sustainable lifestyle continues here! </h3>
                <p> 🌏 Sign in to sustainaByte and: </p>
                <List>
                    <ListItem>🌱 Reconnect with eco-conscious friends.</ListItem>
                    <ListItem>🔄 Pick up where you left off on green initiatives.</ListItem>
                    <ListItem>🌐 Stay updated on the latest environmental trends.</ListItem>
                </List>
                <p>Your commitment to sustainability starts with each login. Let's keep the momentum going! 💚</p>
            </Box>
        </Container>
    )
}

const LoginPage = () => {
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
            <LoginForm />
            <LoginHeroHeader />
        </Container>
    )
}



export default LoginPage