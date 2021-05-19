import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
// import { socket } from "../../../service/socket";

import {
    Container, CssBaseline, Typography, Avatar, TextField,
    FormControlLabel, Checkbox, Button, Grid, Link,
    makeStyles
} from "@material-ui/core";
import { Instagram } from "@material-ui/icons";

import { useSelector, useDispatch } from "react-redux"; // connect component with redux store
import { loginUser } from "../../../actions/authActions"; // Actions

// Apply Styles for Html
const useStyles = makeStyles((theme) => ({
    loginDiv: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    loginAvatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    loginForm: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    loginSubmit: {
        margin: theme.spacing(3, 0, 2),
    }
}))

const Login = () => {
    const classes = useStyles();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // Store Data
    const onChange = (name, value) => {
        let login_data = credentials;
        login_data[name] = value;
        setCredentials(login_data);
    }

    // Get Redux Store Data
    const { auth, errors } = useSelector(state => { return state; });
    const dispatch = useDispatch();

    // For Routing
    const history = useHistory();

    // Form Submit
    const formSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser(credentials));
    }

    useEffect(() => {
        if (auth['isAuthenticated']) {
            // history.push('/');
            window.location.replace("/newsfeed");
        }
    }, [auth, history])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.loginDiv}>
                <Avatar className={classes.loginAvatar}>
                    <Instagram />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Instagram Clone
                </Typography>
                <form onSubmit={formSubmit} className={classes.loginForm} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={({ target }) => onChange(target.name, target.value)}
                        label="Email Address"
                        helperText={errors.email}
                        error={!!errors.email}
                        name="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={({ target }) => onChange(target.name, target.value)}
                        helperText={errors.password}
                        error={!!errors.password}
                        name="password"
                        label="Password"
                        type="password"
                        autoFocus
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.loginSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='/forget-password' variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Login;