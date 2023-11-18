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
import {useNavigate} from "react-router-dom";
import {createContext, useContext, useMemo} from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }: any) => {
    const [authKey, setAuthKey] = useLocalStorage("user", null),
        navigate = useNavigate();

    const login = async (data: any) => {
        if (data.message)
            throw new Error(data.message)
        setAuthKey(data);
        navigate("/user/account")
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
            logout
        }),
        [authKey]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
};

const Login = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                    alignItems: 'center',
                    color: 'text.primary',
                }}
            >
                <h2>Hello There!</h2>
                <p>
                    While we strive to follow the Material Design guidelines where practical (applying common sense where guidelines contradict - a more common occurrence than one might expect), we do not expect to support every component, nor every feature of every component, but rather to provide the building blocks to allow developers to create compelling user interfaces and experiences.
                </p>
            </Box>
        </Container>
    )
}

const LoginPage = () => {
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
            <Login />
            <LoginHeroHeader />
        </Container>
    )
}



export default LoginPage